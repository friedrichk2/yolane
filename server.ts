import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Increase body size limits to allow larger photo and video uploads
  app.use(express.json({ limit: "150mb" }));
  app.use(express.urlencoded({ limit: "150mb", extended: true }));

  // Ensure uploads directory exists
  const uploadsDir = path.join(process.cwd(), "uploads");
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }

  // Serve static uploads
  app.use("/uploads", express.static(uploadsDir));

  // Serve static videos/photos inside /video folder created by the user
  const videoDir = path.join(process.cwd(), "video");
  if (fs.existsSync(videoDir)) {
    app.use("/video", express.static(videoDir));
  }

  // Health check API
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Path to persistent configuration file
  const configFilePath = path.join(process.cwd(), "config_secret_kingdom.json");

  // Load configuration from file
  app.get("/api/config", (req, res) => {
    try {
      if (fs.existsSync(configFilePath)) {
        const data = fs.readFileSync(configFilePath, "utf-8");
        return res.json(JSON.parse(data));
      }
      return res.json({});
    } catch (err: any) {
      console.error("Erreur de chargement du config :", err);
      return res.status(500).json({ error: "Impossible de charger la configuration" });
    }
  });

  // Save configuration to file
  app.post("/api/config", (req, res) => {
    try {
      const config = req.body;
      fs.writeFileSync(configFilePath, JSON.stringify(config, null, 2), "utf-8");
      console.log("Configuration du royaume enregistrée sur le serveur !");
      return res.json({ success: true });
    } catch (err: any) {
      console.error("Erreur d'enregistrement de la config :", err);
      return res.status(500).json({ error: "Impossible de sauvegarder la configuration" });
    }
  });

  // Base64 upload API to solve the 5MB localStorage limit of the browser
  app.post("/api/upload", (req, res) => {
    try {
      const { fileName, fileType, base64 } = req.body;
      if (!base64 || !fileName) {
        return res.status(400).json({ error: "Données de fichier manquantes" });
      }

      // Extract the actual base64 payload
      const commaIndex = base64.indexOf(",");
      const actualBase64 = commaIndex !== -1 ? base64.substring(commaIndex + 1) : base64;
      
      const buffer = Buffer.from(actualBase64, "base64");
      
      // Determine file extension
      const ext = path.extname(fileName) || (fileType?.startsWith("video/") ? ".mp4" : ".jpg");
      const baseName = path.basename(fileName, ext).replace(/[^a-zA-Z0-9_-]/g, "_");
      const uniqueFileName = `${baseName}_${Date.now()}${ext}`;
      
      const filePath = path.join(uploadsDir, uniqueFileName);
      fs.writeFileSync(filePath, buffer);

      console.log(`Fichier royal téléversé : ${uniqueFileName}`);
      return res.json({ 
        url: `/uploads/${uniqueFileName}`,
        fileName: uniqueFileName
      });
    } catch (err: any) {
      console.error("Erreur de téléversement :", err);
      return res.status(500).json({ error: err.message || "Impossible d'enregistrer le fichier" });
    }
  });

  // Vite middleware for development or serving production assets
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Serveur du Royaume Secret en ligne sur le port ${PORT}`);
  });
}

startServer();
