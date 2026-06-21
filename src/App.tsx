import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Heart, Play, Pause, Volume2, VolumeX, Sparkles, Calendar, Smile, Star, 
  Send, Settings, Save, RefreshCw, X, ChevronRight, Eye, Check, 
  Music, Clipboard, ChevronDown, Award, Plus, Trash2
} from 'lucide-react';

// Import custom generated fairytale images
import heroImg from './assets/images/my_queen_perfect_authentic_1782054502066.jpg';
import { REINE_MEMORIES } from './memories_data';

// Types for the customization state
interface MemoryItem {
  id: number;
  image: string;
  video?: string;
  title: string;
  date: string;
  description: string;
}

interface InnerBeautyItem {
  id: number;
  title: string;
  description: string;
  icon: 'star' | 'heart' | 'smile';
}

interface AppConfig {
  queenName: string;
  sceneryTitle: string;
  scenerySubtitle: string;
  letterTitle: string;
  letterText: string;
  whatsappNumber: string;
  whatsappText: string;
  musicUrl: string;
  memories: MemoryItem[];
  innerBeauty: InnerBeautyItem[];
  heroImage?: string;
}

// Preset Default Data (to keep the experience movingly romantic out of the box in fluent French)
const DEFAULT_CONFIG: AppConfig = {
  queenName: "Ma Reine 🌹",
  sceneryTitle: "Yolande Ma Reine🌹",
  scenerySubtitle: "Yolande Jenny de la part de ton BB s'il l'est toujours",
  heroImage: "/video/yv.jpg",
  letterTitle: "Ma Lettre  pour Toi ma Reine🌹",
  letterText: `Rebonjour ma Reine.

Je sais que ce jour est lourd. Symbolique, oui, mais surtout tellement douloureux pour toi. Même si tu le caches si bien.

Je ne te cache pas que ça me tord le ventre de te savoir comme ça. J'aimerais te donner tout ce qui est humainement possible pour apaiser un peu cette absence. Je ne cherche pas à prendre sa place. Jamais. Je veux juste te voir heureuse. Et au fond, je sais que c'est ce qu'il aurait voulu pour toi.

J'aimerais tellement passer du temps avec toi, un peu comme la fois ou tu m'as raconter ce que tu faisais avec ton père quand vous preniez l'ai devant chez vous juste à vous moquer des gens qui passent. Comme cette fois où vous aviez donné un nom chelou à cette petite avec son sac, qui marchait bizarrement Ou ces moments où il cuisinait pour vous, ces plats que tu aimais tant. J'aimerais recréer ces instants avec toi. Pas pour remplacer quoi que ce soit, mais pour que repenser à lui te fasse d'abord sourire avant de te faire mal. Pour que tu aimes revivre ces souvenirs.

J'ai merdé récemment. Je le sais. Mais pour être franc, cette frustration dont je t'ai parlé c'est en même temps une motivation pour moi de me pousser à bout pour vite réussir, Ça me pousse à ne vraiment rien lâcher et ça me ferais plaisir de les vivres encore d'avantage pour me booster encore plus je suis habituer à ça en vrai et ça ne me met pas mal à l'aise encore moins venant de toi en vrai. Je ne sais pas comment effacer ça, mais je te jure que je ne baisserai pas les bras. Je veux pouvoir être là pour toi, comme il l'était. Sans jamais devenir un poids. Juste une présence sur laquelle tu peux t'appuyer.

J'essaie d'apprendre, tu sais. J'apprends chaque jour pour réussir à te rendre vraiment heureuse. Parce que tu as déjà trop porté. Ta mère qui vous laisse, devoir te construire sans elle avec cette douleur de devoir t'adapter sans avoir le choix Je sais un peu ce que ça fait. Ça ne se voit pas de l'extérieur, on ne s'en rend pas vraiment compte, mais j'imagine ce que ça a dû être. Ensuite, ces relations où tu as donné de ton cœur, et où ils se sont juste foutus de toi. Où ils ont joué avec toi. Et puis t'occuper de ton père quand il était malade. Être là, jusqu'au bout, quand il est parti.

Tu fais toujours comme si de rien n'était. Mais quand tu m'as raconté tout ça j'ai essayé d'imaginer le poids de ce que tu portes. Et je te trouve tellement, tellement forte. Je ne peux pas mesurer toute ta douleur, mais j'aimerais vraiment pouvoir l'alléger.

Je ne te demande pas de me faire confiance dans la seconde. Même si, au fond, c'est ce que j'espère le plus au monde. Pendant longtemps, je ne me jugeais pas assez bien pour mériter de me mettre avec quelqu'un. Mais avec toi, je commence à y croire. Je sais que je ne te ferai pas de mal.

Je suis encore plus déterminer et ma détermination actuel, c'est de réussir à te rendre heureuse parce que j'aime cette façon que tu as de me faire rire comme un idiot ou de me comporter comme un idiot souvent et ta façon de te blottis contre moi souvent ou de t'asseoir sur moi ou ta façon de me faire céder avec ta petite voix douce et qui me rend vraiment encore plus faible. Je te veux toi je suis là pour toi maintenant et je veux toujours l'être, à chaque fois que tu auras besoin de quoi que ce soit sans te mettre la pression. 

Je suis là.

je t'embrasse fort ma Reine

ça me ferais plaisir que tu fasses attention aux paroles de cette chanson ma Reine.

Je t'aime

Kenneth Friedrich`,
  whatsappNumber: "+22898411791",
  whatsappText: "Oui mon Prince, j'ai lu ta merveilleuse lettre et visité notre royaume secret... Mon cœur est profondément ému. Je t'aime ! 🌹👑",
  musicUrl: "/video/Reine.mp3",
  memories: REINE_MEMORIES,
  innerBeauty: [
    {
      id: 1,
      title: "Ta Force Silencieuse",
      description: "Tu affrontes chaque tempête de la vie avec une grâce et une résilience qui m’émerveillent. Derrière ta délicatesse naturelle se cache l'âme la plus forte que je connaisse.",
      icon: 'star'
    },
    {
      id: 2,
      title: "Ta Beauté Intérieure",
      description: "Ton cœur est un océan d'empathie divine. Ta capacité à comprendre, à illuminer la vie de ton entourage montre que tu es une véritable reine moderne.",
      icon: 'heart'
    },
    {
      id: 3,
      title: "L'Éclat de Ton Sourire",
      description: "Quand ton visage s'éclaire, tout s'aligne. C'est mon phare dans la nuit, ma boussole préférée et ma plus douce récompense dans cette tendre existence.",
      icon: 'smile'
    }
  ]
};

// Helper to merge saved custom user memories with standard default structure to ensure correct slots and zero data loss
const mergeMemoriesWithDefaults = (savedMemories?: MemoryItem[]): MemoryItem[] => {
  if (!savedMemories || savedMemories.length === 0) {
    return REINE_MEMORIES;
  }
  return REINE_MEMORIES.map((defMem) => {
    const saved = savedMemories.find((m) => m.id === defMem.id);
    if (saved) {
      const isPlaceholderSvg = !saved.image || saved.image.startsWith("data:image/svg+xml") || saved.image.includes("<svg");
      return {
        ...defMem,
        ...saved,
        title: saved.title || defMem.title,
        description: defMem.id <= 19 ? defMem.description : (saved.description || defMem.description),
        image: isPlaceholderSvg ? defMem.image : saved.image,
        video: saved.video || defMem.video,
      };
    }
    return defMem;
  });
};

export default function App() {
  // Config state (defaults with localStorage cache)
  const [config, setConfig] = useState<AppConfig>(() => {
    const saved = localStorage.getItem('royaume_secret_config');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Automatically upgrade to include all 19 romantic memory elements, keeping any user files intact
        if (!parsed.memories || parsed.memories.length < 19 || parsed.memories[0]?.title === "La Rencontre Étoilée" || parsed.memories[0]?.title === "Ton Sourire d'Ange") {
          parsed.memories = mergeMemoriesWithDefaults(parsed.memories);
          localStorage.setItem('royaume_secret_config', JSON.stringify({ ...DEFAULT_CONFIG, ...parsed }));
        }
        // Force restore the original letter if it has the placeholder fairytale text or typos
        if (!parsed.letterText || !parsed.letterText.startsWith("Rebonjour ma Reine.") || parsed.letterText.includes("with toi") || parsed.letterText.includes("bizarreement")) {
          parsed.letterText = DEFAULT_CONFIG.letterText;
          localStorage.setItem('royaume_secret_config', JSON.stringify({ ...parsed, letterText: DEFAULT_CONFIG.letterText }));
        }
        // Transparent transition to the requested yv.jpg for the hero image if it maps to old or missing file
        if (!parsed.heroImage || parsed.heroImage === "/video/yv_1782072834279.jpg" || parsed.heroImage.includes("my_queen_perfect")) {
          parsed.heroImage = "/video/yv.jpg";
          localStorage.setItem('royaume_secret_config', JSON.stringify({ ...parsed, heroImage: "/video/yv.jpg" }));
        }
        return { ...DEFAULT_CONFIG, ...parsed, memories: mergeMemoriesWithDefaults(parsed.memories), letterText: DEFAULT_CONFIG.letterText };
      } catch (e) {
        return DEFAULT_CONFIG;
      }
    }
    return DEFAULT_CONFIG;
  });

  // App running states
  const [entered, setEntered] = useState(false);
  const [isEntering, setIsEntering] = useState(false);
  const [burstHearts, setBurstHearts] = useState<{ id: number; x: number; y: number; scale: number; delay: number; rotate: number }[]>([]);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [letterOpen, setLetterOpen] = useState(false);
  const [selectedMemory, setSelectedMemory] = useState<MemoryItem | null>(null);
  const [draggedMemoryId, setDraggedMemoryId] = useState<number | null>(null);
  const [draggedHero, setDraggedHero] = useState(false);
  
  // Customization editor modal states
  const [editorOpen, setEditorOpen] = useState(false);
  const [tempConfig, setTempConfig] = useState<AppConfig>({ ...config });
  const [showConfigExport, setShowConfigExport] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Background atmosphere states
  const [petals, setPetals] = useState<{ id: number; left: number; delay: number; duration: number; size: number; path: string; color: string }[]>([]);
  const [stars, setStars] = useState<{ id: number; x: number; y: number; size: number; delay: number; duration: number }[]>([]);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Load persistent configuration from the server on startup
  useEffect(() => {
    fetch("/api/config")
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error("Erreur de requête API");
      })
      .then((data) => {
        if (data && Object.keys(data).length > 0) {
          console.log("Configuration royale chargée depuis le serveur ! 🌹");
          
          // Ensure we merge memories with defaults to get a full 19 items list even if server had old 15 items config
          // Also enforce pristine correctness of the letter text
          let finalLetterText = data.letterText;
          if (!finalLetterText || !finalLetterText.startsWith("Rebonjour ma Reine.") || finalLetterText.includes("with toi") || finalLetterText.includes("bizarreement")) {
            finalLetterText = DEFAULT_CONFIG.letterText;
          }

          const upgradedData = {
            ...data,
            memories: mergeMemoriesWithDefaults(data.memories),
            letterText: finalLetterText
          };
          
          setConfig(upgradedData);
          setTempConfig({ ...upgradedData });
          // Synchronize localStorage with server version
          localStorage.setItem('royaume_secret_config', JSON.stringify(upgradedData));
        }
      })
      .catch((err) => {
        console.log("Aucune configuration sur le serveur ou erreur, utilisation des données locales :", err);
      });
  }, []);

  // Generate background elements once
  useEffect(() => {
    // Generate specialized SVG petal shapes
    const petalShapes = [
      "M15,5 C22,5 27,11 27,18 C27,25 20,29 15,29 C10,29 3,25 3,18 C3,11 8,5 15,5 Z", // broad organic rose petal
      "M15,2 C20,2 25,8 24,16 C23,24 18,28 15,28 C12,28 7,24 6,16 C5,8 10,2 15,2 Z",  // teardrop rounded petal
      "M12,4 C19,2 26,8 24,17 C22,26 15,28 11,28 C7,28 4,24 4,18 C4,12 5,6 12,4 Z"   // curved romantic petal
    ];
    const colors = [
      "#9f1239", // deep scarlet rose-800
      "#be123c", // vivid rose-700
      "#e11d48", // glowing crimson rose-600
      "#881337", // royal burgundy rose-900
      "#fda4af"  // delicate pale blush rose-300
    ];

    // Using negative delays makes petals appear already distributed on layout load!
    const generatedPetals = Array.from({ length: 26 }).map((_, i) => ({
      id: i,
      left: Math.random() * 105,
      delay: Math.random() * -18,
      duration: 10 + Math.random() * 12,
      size: 14 + Math.random() * 18,
      path: petalShapes[i % petalShapes.length],
      color: colors[i % colors.length]
    }));

    const generatedStars = Array.from({ length: 55 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 0.6 + Math.random() * 1.6,
      delay: Math.random() * 5,
      duration: 2.5 + Math.random() * 3.5
    }));

    setPetals(generatedPetals);
    setStars(generatedStars);
  }, []);

  // Update real audio volume when state changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  // Toast helper
  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Start experience, scroll & trigger audio (only on envelope click now)
  const handleEnterRoyaume = () => {
    setIsEntering(true);
    
    // Generate a romantic flurry of hearts around the button to celebrate entry
    const generatedHearts = Array.from({ length: 18 }).map((_, i) => ({
      id: Date.now() + i,
      x: (Math.random() - 0.5) * 260, // float outwards left/right
      y: -40 - Math.random() * 180,    // float upwards gracefully
      scale: 0.6 + Math.random() * 1.4,
      delay: Math.random() * 0.45,
      rotate: (Math.random() - 0.5) * 50
    }));
    setBurstHearts(generatedHearts);

    // Give the user 1.8 seconds of beautiful visual interlude before transitioning and scrolling
    setTimeout(() => {
      setEntered(true);
      setTimeout(() => {
        document.getElementById('souvenirs')?.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    }, 1800);
  };

  // Toggle Background Music
  const togglePlayMusic = () => {
    if (!audioRef.current) return;
    if (musicPlaying) {
      audioRef.current.pause();
      setMusicPlaying(false);
      triggerToast("Musique en pause 🎵");
    } else {
      audioRef.current.play().catch(e => console.log(e));
      setMusicPlaying(true);
      triggerToast("Musique activée 💖");
    }
  };

  // Direct server configuration persistence helper 
  const saveConfigToServer = (updatedConfig: AppConfig) => {
    fetch("/api/config", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedConfig),
    })
      .then((res) => {
        if (res.ok) {
          console.log("Configuration synchronisée avec succès sur le serveur ! 🌹👑");
        } else {
          console.warn("Échec de la sauvegarde de la configuration sur le serveur.");
        }
      })
      .catch((err) => {
        console.error("Erreur de communication avec le serveur :", err);
      });
  };

  // Editor Save Configuration
  const handleSaveEditor = (newConfig: AppConfig) => {
    setConfig(newConfig);
    localStorage.setItem('royaume_secret_config', JSON.stringify(newConfig));
    saveConfigToServer(newConfig);
    setEditorOpen(false);
    triggerToast("Le royaume a été personnalisé avec succès ! ✨🌹");
  };

  // Direct memory card file replacement uploader (Image or Video)
  const handleMemoryImageUpload = (memoryId: number, file: File) => {
    const isImage = file.type.startsWith('image/');
    const isVideo = file.type.startsWith('video/');

    if (!isImage && !isVideo) {
      triggerToast("Oups, ce format de fichier n'est pas supporté. Choisis une photo ou une vidéo ! 📽️🌹");
      return;
    }

    const reader = new FileReader();
    reader.onload = async (e) => {
      const base64 = e.target?.result as string;
      triggerToast("Téléversement sécurisé de ta vidéo/photo en cours... 🌹☁️");

      let finalUrl = base64;
      let uploadSuccessful = false;

      try {
        const response = await fetch("/api/upload", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fileName: file.name,
            fileType: file.type,
            base64: base64
          })
        });

        if (response.ok) {
          const data = await response.json();
          if (data.url) {
            finalUrl = data.url;
            uploadSuccessful = true;
          }
        }
      } catch (err) {
        console.error("Échec du téléversement vers le serveur, repli sur localStorage.", err);
      }

      const updatedMemories = config.memories.map(m => {
        if (m.id === memoryId) {
          if (isVideo) {
            return { ...m, image: '', video: finalUrl };
          } else {
            return { ...m, image: finalUrl, video: undefined };
          }
        }
        return m;
      });
      const updatedConfig = { ...config, memories: updatedMemories };
      setConfig(updatedConfig);
      
      try {
        localStorage.setItem('royaume_secret_config', JSON.stringify(updatedConfig));
        saveConfigToServer(updatedConfig);
        
        if (uploadSuccessful) {
          triggerToast(isVideo 
            ? "Merveilleux ! La vidéo de ta Reine a été enregistrée à tout jamais dans le royaume secret ! 🎬✨👑" 
            : "La photo de ta Reine a été enregistrée à tout jamais dans le royaume secret ! 🌹✨👑"
          );
        } else {
          triggerToast(isVideo 
            ? "Merveilleux ! Vidéo ajoutée (localStorage temporaire) ! 🎬✨" 
            : "Photo ajoutée (localStorage temporaire) ! 🌹✨"
          );
        }
      } catch (err) {
        console.warn("LocalStorage space limit reached, video is saved for active session only.", err);
        triggerToast("Enregistré pour cette session active ! (Pour persister, réduis la taille du fichier) 💖");
      }
    };
    reader.readAsDataURL(file);
  };

  // Direct hero cover image replacement uploader
  const handleHeroImageUpload = (file: File) => {
    if (!file.type.startsWith('image/')) {
      triggerToast("Oups, ce fichier n'est pas une image. 🖼️");
      return;
    }
    const reader = new FileReader();
    reader.onload = async (e) => {
      const base64 = e.target?.result as string;
      triggerToast("Mise à jour de la photo de couverture... 🌹☁️");

      let finalUrl = base64;
      try {
        const response = await fetch("/api/upload", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fileName: file.name,
            fileType: file.type,
            base64: base64
          })
        });

        if (response.ok) {
          const data = await response.json();
          if (data.url) {
            finalUrl = data.url;
          }
        }
      } catch (err) {
        console.error("Échec de la sauvegarde de la couverture sur le serveur.", err);
      }

      const updatedConfig = { ...config, heroImage: finalUrl };
      setConfig(updatedConfig);
      localStorage.setItem('royaume_secret_config', JSON.stringify(updatedConfig));
      saveConfigToServer(updatedConfig);
      triggerToast("La photo de couverture de ta Reine a été mise à jour ! 👑✨");
    };
    reader.readAsDataURL(file);
  };

  // Clear all memories to clean uploader placeholders
  const handleClearAllMemoryImages = () => {
    const clearedMemories = config.memories.map(m => ({
      ...m,
      image: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'><rect width='400' height='300' fill='%230f172a'/><rect width='384' height='284' x='8' y='8' rx='8' ry='8' fill='none' stroke='%23fda4af' stroke-opacity='0.15' stroke-width='1.5' stroke-dasharray='4,4'/><circle cx='200' cy='125' r='30' fill='%23be123c' fill-opacity='0.1'/><path d='M200 115 C205 110, 215 110, 220 115 C225 120, 220 130, 200 145 C180 130, 175 120, 180 115 C185 110, 195 110, 200 115 Z' fill='%23be123c' fill-opacity='0.6'/><text x='50%' y='195' dominant-baseline='middle' text-anchor='middle' fill='%23fda4af' font-family='sans-serif' font-size='11' font-weight='600' letter-spacing='0.5'>GLISSE SA PHOTO ICI 🌹</text><text x='50%' y='215' dominant-baseline='middle' text-anchor='middle' fill='%2364748b' font-family='sans-serif' font-size='10'>Ou clique pour importer l&apos;image</text></svg>",
      video: undefined
    }));
    const updatedConfig = { ...config, memories: clearedMemories };
    setConfig(updatedConfig);
    localStorage.setItem('royaume_secret_config', JSON.stringify(updatedConfig));
    saveConfigToServer(updatedConfig);
    triggerToast("Toutes les illustrations ont été retirées. À toi de mettre des photos ou vidéos d'elle ! 🌹📸📽️");
  };

  // Add a brand new memory card for custom photos/videos
  const handleAddCustomMemoryCard = () => {
    const nextId = config.memories.length > 0 ? Math.max(...config.memories.map(m => m.id)) + 1 : 1;
    const newMemory: MemoryItem = {
      id: nextId,
      image: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'><rect width='400' height='300' fill='%230f172a'/><rect width='384' height='284' x='8' y='8' rx='8' ry='8' fill='none' stroke='%23f59e0b' stroke-opacity='0.15' stroke-width='1.5' stroke-dasharray='4,4'/><circle cx='200' cy='125' r='30' fill='%23f59e0b' fill-opacity='0.1'/><path d='M200 115 C205 110, 215 110, 220 115 C225 120, 220 130, 200 145 C180 130, 175 120, 180 115 C185 110, 195 110, 200 115 Z' fill='%23f59e0b' fill-opacity='0.6'/><text x='50%' y='195' dominant-baseline='middle' text-anchor='middle' fill='%23f59e0b' font-family='sans-serif' font-size='11' font-weight='600' letter-spacing='0.5'>GLISSE PHOTO OU VIDEO ICI 🌹</text><text x='50%' y='215' dominant-baseline='middle' text-anchor='middle' fill='%2364748b' font-family='sans-serif' font-size='10'>Ou clique pour importer</text></svg>",
      title: `Contemplation ${nextId}`,
      date: "Instant précieux",
      description: "Un nouvel instant capturé dans l'éternité."
    };
    const updatedConfig = { ...config, memories: [...config.memories, newMemory] };
    setConfig(updatedConfig);
    localStorage.setItem('royaume_secret_config', JSON.stringify(updatedConfig));
    saveConfigToServer(updatedConfig);
    triggerToast("Une nouvelle carte a été ajoutée à ton royaume ! 📸📽️✨");
  };

  // Delete a memory card
  const handleDeleteMemoryCard = (memoryId: number) => {
    if (window.confirm("Es-tu sûr de vouloir supprimer définitivement cette carte de souvenir ? 🌹")) {
      const updatedMemories = config.memories.filter(m => m.id !== memoryId);
      const updatedConfig = { ...config, memories: updatedMemories };
      setConfig(updatedConfig);
      localStorage.setItem('royaume_secret_config', JSON.stringify(updatedConfig));
      saveConfigToServer(updatedConfig);
      triggerToast("La carte de souvenir a été retirée ! 🗑️✨");
    }
  };

  // Reset to original fairytale defaults
  const handleResetDefaults = () => {
    if (window.confirm("Es-tu sûr d'effacer tes modifications et de restaurer le poème original ?")) {
      setConfig(DEFAULT_CONFIG);
      setTempConfig({ ...DEFAULT_CONFIG });
      localStorage.removeItem('royaume_secret_config');
      triggerToast("Poème d'origine restauré ! 📜");
    }
  };

  // Helper to copy code config for permanent server usage
  const copyConfigSnippet = () => {
    const snippet = JSON.stringify(config, null, 2);
    navigator.clipboard.writeText(snippet);
    triggerToast("Snippet JSON copié ! Tu peux le coller dans ton code. 📋");
  };

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-100 overflow-x-hidden relative selection:bg-rose-900 selection:text-rose-100">
      
      {/* Background audio tag */}
      <audio 
        ref={audioRef} 
        src={config.musicUrl} 
        loop 
        preload="auto"
      />

      {/* BACKGROUND ATMOSPHERE: Sparkles, Stars and Falling Rose Petals */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Soft Royal Radial Gradients for deep cosmic atmosphere */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-zinc-950 to-black opacity-90" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_var(--tw-gradient-stops))] from-rose-950/20 via-transparent to-transparent opacity-80" />

        {/* Constellation Stars Rendering */}
        {stars.map(star => (
          <div
            key={star.id}
            className="absolute rounded-full bg-white opacity-40 animate-twinkle"
            style={{
              top: `${star.y}%`,
              left: `${star.x}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              animationDelay: `${star.delay}s`,
              animationDuration: `${star.duration}s`,
              boxShadow: star.size > 1.2 ? '0 0 6px rgba(255, 255, 255, 0.4)' : 'none'
            }}
          />
        ))}

        {/* Elegant shooting star streaking across */}
        <div className="absolute top-10 right-10 w-[2px] h-[200px] bg-gradient-to-t from-transparent via-rose-300/60 to-white/90 origin-top-left -rotate-45 animate-shooting-star" style={{ animationDelay: '3s' }} />
        <div className="absolute top-[35%] right-[25%] w-[1.5px] h-[150px] bg-gradient-to-t from-transparent via-rose-400/40 to-white/80 origin-top-left -rotate-45 animate-shooting-star" style={{ animationDelay: '8.5s' }} />

        {/* falling custom-shaped realistic red rose petals */}
        {petals.map(petal => (
          <div
            key={petal.id}
            className="absolute animate-rose-fall opacity-0"
            style={{
              left: `${petal.left}%`,
              animationDelay: `${petal.delay}s`,
              animationDuration: `${petal.duration}s`,
              width: `${petal.size}px`,
              height: `${petal.size}px`,
              top: '-40px',
            }}
          >
            <svg 
              viewBox="0 0 30 30" 
              fill="none" 
              className="w-full h-full drop-shadow-[0_2px_4px_rgba(159,18,57,0.35)]"
            >
              <path 
                d={petal.path} 
                fill={petal.color} 
                opacity="1"
              />
              {/* Petal structural vein line for elegant realism */}
              <path 
                d="M15,5 C16.5,12 17.5,19 15,26" 
                stroke="#fda4af" 
                strokeWidth="0.4" 
                opacity="0.25" 
              />
            </svg>
          </div>
        ))}
      </div>

      {/* PERSISTENT BRANDING LOGO (Top-Left Corner) */}
      <div className="fixed top-4 left-4 z-40 flex items-center gap-2.5 select-none pointer-events-auto">
        <div className="glass-panel w-10 h-10 rounded-full flex items-center justify-center text-rose-300 hover:bg-rose-950/60 transition-all border border-white/10 hover:border-rose-500/35 shadow-lg shadow-black/40">
          <svg 
            viewBox="0 0 100 100" 
            className="w-5 h-5 text-rose-200 fill-current hover:rotate-12 transition-transform duration-300"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Elegant outer layout matching the user's uploaded circular S-Curve design */}
            <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="2.5" className="opacity-30" />
            <path d="M50,15 C30.7,15 15,30.7 15,50 C15,69.3 30.7,85 50,85 C69.3,85 85,69.3 85,50 C85,30.7 69.3,15 50,15 Z M50,22 C61.6,22 71.3,29.1 75.3,39.1 C71.3,37.1 66.8,36 62,36 C48.7,36 38,46.7 38,60 C38,64.8 39.1,69.3 41.1,73.3 C29.9,69.3 22,58.6 22,46 C22,32.7 32.7,22 46,22 C47.4,22 48.7,22 50,22 Z M50,78 C48.7,78 47.4,78 46,78 C34.4,78 24.7,70.9 20.7,60.9 C24.7,62.9 29.2,64 34,64 C47.3,64 58,53.3 58,40 C58,35.2 56.9,30.7 54.9,26.7 C66.1,30.7 74,41.4 74,54 C74,67.3 63.3,78 50,78 Z" />
          </svg>
        </div>
        <div className="flex flex-col">
          <span className="text-xs font-serif italic text-rose-200 tracking-wider">Le Royaume</span>
          <span className="text-[8px] font-sans font-semibold text-rose-400/70 uppercase tracking-widest leading-none">Secret</span>
        </div>
      </div>

      {/* FLOATING ACTION TOOLBARS (Glassmorphic & Elegant) */}
      <div className="fixed top-4 right-4 z-40 flex items-center gap-2">
        {/* Playback controller button pill */}
        <AnimatePresence>
          {letterOpen && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: -15, filter: "blur(4px)" }}
              animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.9, y: -15, filter: "blur(4px)" }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }} // Elegant, smooth custom cinematic cubic bezier curve
              className="glass-panel px-3 py-1.5 rounded-full flex items-center gap-3 shadow-lg shadow-black/40 border border-white/5"
            >
              <button 
                type="button"
                id="control-music-toggle"
                onClick={togglePlayMusic}
                className="w-8 h-8 rounded-full bg-rose-950/60 hover:bg-rose-900 flex items-center justify-center text-rose-300 hover:text-white transition-all scale-95 active:scale-90"
                title="Symphonie de fond"
              >
                {musicPlaying ? (
                  <span className="relative flex h-4 w-4 items-center justify-center">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                    <Volume2 size={16} />
                  </span>
                ) : <VolumeX size={16} />}
              </button>
              
              {musicPlaying && (
                <div className="hidden sm:flex items-center gap-1.5" id="audio-visualizer">
                  <span className="w-[3px] h-3 bg-rose-500 rounded-sm animate-bounce [animation-duration:1s]"></span>
                  <span className="w-[3px] h-4 bg-rose-400 rounded-sm animate-bounce [animation-duration:0.6s]"></span>
                  <span className="w-[3px] h-2 bg-rose-600 rounded-sm animate-bounce [animation-duration:1.2s]"></span>
                  <span className="w-[3px] h-3.5 bg-rose-500 rounded-sm animate-bounce [animation-duration:0.8s]"></span>
                </div>
              )}

              {/* Hidden/Hover Volume slider */}
              <div className="flex items-center gap-1 text-slate-400">
                <input 
                  type="range" 
                  min="0" 
                  max="1" 
                  step="0.05" 
                  value={volume}
                  onChange={(e) => setVolume(parseFloat(e.target.value))}
                  className="w-14 sm:w-20 accent-rose-500 h-[3px] bg-slate-800 rounded-lg cursor-pointer"
                  title="Volume de la flûte"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>


      </div>

      {/* REVOLUTIONARY LIVE EDIT PANEL OVERLAY (Only visual for customization) */}
      <AnimatePresence>
        {editorOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            id="editor-overlay-panel"
            className="fixed inset-0 bg-slate-950/95 z-50 flex items-center justify-center p-4 backdrop-blur-md overflow-y-auto"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="bg-zinc-900 border border-rose-900/30 w-full max-w-3xl rounded-2xl shadow-2xl p-6 text-slate-200 flex flex-col max-h-[90vh]"
            >
              <div className="flex items-center justify-between border-b border-rose-900/20 pb-4 mb-4">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-rose-950/40 rounded-lg text-rose-400">
                    <Settings size={20} />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl text-rose-200">Palais de Customisation du Prince</h3>
                    <p className="text-xs text-slate-400">Modifie les textes en direct. Les changements seront visibles instantanément !</p>
                  </div>
                </div>
                <button
                  type="button"
                  id="close-editor-btn"
                  onClick={() => setEditorOpen(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Editor Tabs Scroll container */}
              <div className="flex-1 overflow-y-auto space-y-5 pr-2">
                
                {/* Intro advice banner */}
                <div className="bg-rose-950/20 border border-rose-900/30 p-3.5 rounded-lg text-xs leading-relaxed text-rose-200 flex items-start gap-2">
                  <span className="text-rose-400 text-lg">💡</span>
                  <p>
                    <strong>Cher Prince :</strong> Remplis les champs ci-dessous avec vos jolis mots doux. Ton texte est sauvegardé automatiquement sur cet ordinateur ! Pour le déployer officiellement, tu pourras copier le JSON finale en fin de page.
                  </p>
                </div>

                {/* Section 1: Identity & Queen */}
                <div className="space-y-3">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-rose-400 border-b border-slate-800 pb-1">1. Identité et En-tête</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-slate-400 mb-1">Nom de votre Reine / Princesse</label>
                      <input 
                        type="text" 
                        value={tempConfig.queenName}
                        onChange={(e) => setTempConfig({ ...tempConfig, queenName: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 focus:border-rose-700 rounded p-2 text-sm focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-400 mb-1">Titre de l'expérience</label>
                      <input 
                        type="text" 
                        value={tempConfig.sceneryTitle}
                        onChange={(e) => setTempConfig({ ...tempConfig, sceneryTitle: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 focus:border-rose-700 rounded p-2 text-sm focus:outline-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Sous-titre d'accueil</label>
                    <textarea 
                      rows={2}
                      value={tempConfig.scenerySubtitle}
                      onChange={(e) => setTempConfig({ ...tempConfig, scenerySubtitle: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 focus:border-rose-700 rounded p-2 text-sm focus:outline-none resize-none"
                    />
                  </div>
                </div>

                {/* Section 2: Love letter text */}
                <div className="space-y-3">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-rose-400 border-b border-slate-800 pb-1">2. Ma Lettre Sacrée</h4>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Titre de la lettre</label>
                    <input 
                      type="text" 
                      value={tempConfig.letterTitle}
                      onChange={(e) => setTempConfig({ ...tempConfig, letterTitle: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 focus:border-rose-700 p-2 rounded text-sm focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1 flex justify-between">
                      <span>Message long (Collez votre lettre d'amour ici)</span>
                      <span className="text-[10px] text-slate-400 italic">Séparez vos paragraphes par des retours à la ligne</span>
                    </label>
                    <textarea 
                      rows={8}
                      value={tempConfig.letterText}
                      onChange={(e) => setTempConfig({ ...tempConfig, letterText: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 focus:border-rose-700 p-3 rounded text-sm focus:outline-none font-sans leading-relaxed"
                      placeholder="Tapez vos mots sacrés ici..."
                    />
                  </div>
                </div>

                {/* Section 3: Memories customization */}
                <div className="space-y-3">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-rose-400 border-b border-slate-800 pb-1">3. Textes de Nos Souvenirs</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {tempConfig.memories.map((mem, idx) => (
                      <div key={mem.id} className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                        <span className="text-[10px] bg-rose-950 text-rose-300 px-1.5 py-0.5 rounded-full font-mono">Souvenir {idx + 1}</span>
                        <div className="mt-2 space-y-2">
                          <input 
                            type="text"
                            placeholder="Titre du Souvenir"
                            value={mem.title}
                            onChange={(e) => {
                              const updated = [...tempConfig.memories];
                              updated[idx].title = e.target.value;
                              setTempConfig({ ...tempConfig, memories: updated });
                            }}
                            className="w-full bg-slate-900 border border-slate-800 rounded p-1.5 text-xs text-slate-100 focus:outline-none"
                          />
                          <input 
                            type="text"
                            placeholder="Date ou Climat"
                            value={mem.date}
                            onChange={(e) => {
                              const updated = [...tempConfig.memories];
                              updated[idx].date = e.target.value;
                              setTempConfig({ ...tempConfig, memories: updated });
                            }}
                            className="w-full bg-slate-900 border border-slate-800 rounded p-1.5 text-xs text-slate-300 focus:outline-none"
                          />
                          <textarea 
                            rows={2}
                            placeholder="Court récit mélancolique..."
                            value={mem.description}
                            onChange={(e) => {
                              const updated = [...tempConfig.memories];
                              updated[idx].description = e.target.value;
                              setTempConfig({ ...tempConfig, memories: updated });
                            }}
                            className="w-full bg-slate-900 border border-slate-800 rounded p-1.5 text-xs text-slate-400 focus:outline-none resize-none"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Section 4: Inner beauty */}
                <div className="space-y-3">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-rose-400 border-b border-slate-800 pb-1">4. Ses Qualités Uniques (Ce que je vois en toi)</h4>
                  <div className="space-y-3">
                    {tempConfig.innerBeauty.map((item, idx) => (
                      <div key={item.id} className="bg-slate-950 p-3 rounded-lg border border-slate-800 flex gap-3">
                        <div className="w-12 h-12 rounded-lg bg-rose-950/50 flex items-center justify-center text-rose-300">
                          <Award size={20} />
                        </div>
                        <div className="flex-1 space-y-1.5">
                          <input 
                            type="text"
                            value={item.title}
                            onChange={(e) => {
                              const updated = [...tempConfig.innerBeauty];
                              updated[idx].title = e.target.value;
                              setTempConfig({ ...tempConfig, innerBeauty: updated });
                            }}
                            className="w-full bg-slate-900 border border-slate-800 rounded p-1 text-xs text-slate-100 font-bold focus:outline-none"
                          />
                          <textarea 
                            rows={2}
                            value={item.description}
                            onChange={(e) => {
                              const updated = [...tempConfig.innerBeauty];
                              updated[idx].description = e.target.value;
                              setTempConfig({ ...tempConfig, innerBeauty: updated });
                            }}
                            className="w-full bg-slate-900 border border-slate-800 rounded p-1 text-xs text-slate-300 focus:outline-none resize-none"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Section 5: Audio & WhatsApp Config */}
                <div className="space-y-3">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-rose-400 border-b border-slate-800 pb-1">5. Câblage de l'avenir et musique</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-slate-400 mb-1">Lien de la musique de fond (MP3/OGG/Vidéo)</label>
                      <input 
                        type="text" 
                        value={tempConfig.musicUrl}
                        onChange={(e) => setTempConfig({ ...tempConfig, musicUrl: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-100/10 focus:border-rose-700 p-2 rounded text-xs focus:outline-none font-mono"
                      />
                      <div className="mt-1.5 space-y-1">
                        <label className="block text-[10px] text-zinc-500">Ou choisir rapidement le son d'un de vos souvenirs :</label>
                        <select
                          className="w-full bg-slate-950 text-slate-300 border border-slate-100/10 focus:border-rose-700 p-1.5 rounded text-[11px] focus:outline-none cursor-pointer"
                          value={tempConfig.musicUrl}
                          onChange={(e) => {
                            if (e.target.value) {
                              setTempConfig({ ...tempConfig, musicUrl: e.target.value });
                              triggerToast("Bande-son sélectionnée ! 🌹 Pensez à enregistrer.");
                            }
                          }}
                        >
                          <option value="">-- Sélectionner une bande-son --</option>
                          <option value="https://archive.org/download/DebussyClairDeLune/ClaudeDebussy-ClairDeLune.mp3">Clair de Lune (Romantique Classique)</option>
                          {tempConfig.memories?.filter((m: any) => m.video).map((m: any) => (
                            <option key={m.id} value={m.video}>
                              Le son de "{m.title}" ({m.video.split('/').pop()})
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs text-slate-400 mb-1">N° WhatsApp du Prince (Indicatif incl., ex: +33612345678)</label>
                      <input 
                        type="text" 
                        value={tempConfig.whatsappNumber}
                        onChange={(e) => setTempConfig({ ...tempConfig, whatsappNumber: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-100/10 focus:border-rose-700 p-2 rounded text-xs focus:outline-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Message WhatsApp pré-rempli pour le Prince</label>
                    <textarea 
                      rows={2}
                      value={tempConfig.whatsappText}
                      onChange={(e) => setTempConfig({ ...tempConfig, whatsappText: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-100/10 focus:border-rose-700 p-2 rounded text-xs focus:outline-none"
                    />
                  </div>
                </div>

                {/* Section 6: Export Tool */}
                <div className="space-y-3 bg-slate-950/40 border border-slate-800 p-3 rounded-lg">
                  <button
                    type="button"
                    onClick={() => setShowConfigExport(!showConfigExport)}
                    className="text-xs text-slate-400 hover:text-rose-300 flex items-center gap-1 transition"
                  >
                    <span>{showConfigExport ? "Ouvrir" : "Exporter le JSON des données pour le projet"}</span>
                    <ChevronRight size={14} className={showConfigExport ? "rotate-90" : ""} />
                  </button>
                  {showConfigExport && (
                    <div className="mt-2 space-y-2">
                      <p className="text-[10px] text-slate-400 leading-normal">
                        Copie ce snippet et remplace le contenu complet de la variable <code>DEFAULT_CONFIG</code> dans ton code source si tu souhaites graver tes modifications de manière définitive pour tout le monde (sans dépendre du stockage navigateur !).
                      </p>
                      <pre className="p-2.5 bg-black/50 text-[10px] font-mono text-emerald-400 rounded overflow-x-auto max-h-40 border border-slate-800">
                        {JSON.stringify(tempConfig, null, 2)}
                      </pre>
                      <button
                        type="button"
                        onClick={copyConfigSnippet}
                        className="bg-slate-800 hover:bg-slate-700 text-xs px-3 py-1 rounded flex items-center gap-1 transition text-slate-200"
                      >
                        <Clipboard size={12} /> Copier le code JSON
                      </button>
                    </div>
                  )}
                </div>

              </div>

              {/* Action buttons footer */}
              <div className="border-t border-rose-900/20 pt-4 mt-4 flex items-center justify-end">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setEditorOpen(false)}
                    className="px-4 py-1.5 text-xs text-slate-400 hover:text-slate-200 transition"
                  >
                    Annuler
                  </button>
                  <button
                    type="button"
                    id="save-editor-btn"
                    onClick={() => handleSaveEditor(tempConfig)}
                    className="px-4 py-1.5 text-xs text-white bg-rose-600 hover:bg-rose-700 rounded-full flex items-center gap-1 bg-gradient-to-r from-rose-700 to-rose-600 shadow-md shadow-rose-950/40 font-semibold transition"
                  >
                    <Save size={14} /> Sauvegarder ✨
                  </button>
                </div>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* PERSISTENT ELEVATED SPARKLE NOTIFIER TOAST */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            id="toast-notification"
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 glass-panel-warm px-4 py-2.5 rounded-full flex items-center gap-2 border border-rose-400/20 shadow-xl shadow-rose-950/20"
          >
            <Sparkles size={14} className="text-rose-400 animate-pulse" />
            <span className="text-xs font-medium text-rose-200">{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* COVER / HOME PAGE: Un entrouvert magique vers le royaume */}
      <section 
        id="home" 
        className="relative h-screen w-full flex flex-col items-center justify-center text-center px-4 overflow-hidden z-10"
      >
        <div className="absolute inset-0 bg-black/40 pointer-events-none" />

        {/* Intimate decorative frame and crown */}
        <div className="relative max-w-xl mx-auto flex flex-col items-center space-y-6">
          
          {/* Magical Princess Mirror Circular Hero frame */}
          <div 
            onClick={() => document.getElementById('hero-image-input')?.click()}
            onDragOver={(e) => {
              e.preventDefault();
              setDraggedHero(true);
            }}
            onDragLeave={() => {
              setDraggedHero(false);
            }}
            onDrop={(e) => {
              e.preventDefault();
              setDraggedHero(false);
              if (e.dataTransfer.files?.[0]) {
                handleHeroImageUpload(e.dataTransfer.files[0]);
              }
            }}
            className={`relative w-44 h-44 sm:w-52 sm:h-52 rounded-full p-1.5 bg-gradient-to-tr from-yellow-600 via-rose-500 to-amber-500 shadow-[0_0_40px_rgba(225,29,72,0.4)] md:hover:scale-105 transition-all duration-700 ease-in-out cursor-pointer animate-float group ${
              draggedHero ? 'ring-4 ring-rose-500 ring-offset-4 ring-offset-slate-950 scale-105' : ''
            }`}
          >
            <input 
              type="file" 
              id="hero-image-input"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                if (e.target.files?.[0]) {
                  handleHeroImageUpload(e.target.files[0]);
                }
              }}
            />
            <div className="absolute inset-0 rounded-full border border-yellow-400/40 animate-pulse" />
            
            {/* The beautiful custom artwork generated */}
            <div className="w-full h-full rounded-full overflow-hidden border-2 border-slate-950 relative">
              <img 
                src={config.heroImage || heroImg} 
                alt="Château de ma Reine" 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-80" />

              {/* Dynamic Overlay Guidance */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-center p-4 z-10">
                <Sparkles size={20} className="text-amber-400 animate-pulse mb-1" />
                <span className="text-[10px] text-white font-medium uppercase tracking-wider">Changer sa photo 👑</span>
              </div>

              {draggedHero && (
                <div className="absolute inset-0 bg-slate-950/90 flex flex-col items-center justify-center text-center p-4 z-20">
                  <Heart size={28} className="text-rose-400 fill-rose-500 animate-pulse mb-1" />
                  <span className="text-[11px] text-rose-100 font-semibold uppercase">Dépose sa photo ! 🌹</span>
                </div>
              )}
            </div>
          </div>

          {/* Majestic Royal Plaque containing Title */}
          <div className="space-y-3">
            <div className="flex items-center justify-center gap-1.5 text-xs font-semibold tracking-widest text-rose-400 uppercase select-none">
              <span className="w-6 h-[1px] bg-gradient-to-r from-transparent to-rose-400"></span>
              <span>Royaume Intime</span>
              <span className="w-6 h-[1px] bg-gradient-to-l from-transparent to-rose-400"></span>
            </div>
            
            <h1 className="font-serif italic text-4xl sm:text-5xl md:text-6xl text-rose-100 tracking-tight text-glow-white">
              {config.queenName}
            </h1>
            
            <p className="font-sans text-xs sm:text-sm text-slate-300 font-light max-w-md mx-auto leading-relaxed italic border-t border-white/5 pt-3">
              "{config.scenerySubtitle}"
            </p>
          </div>

          {/* Cover Interaction Heartbeat CTA Button */}
          <div className="pt-4 space-y-4 min-h-[70px] flex flex-col items-center justify-center relative">
            
            {/* Burst hearts animation layer */}
            {isEntering && burstHearts.map((heart) => (
              <motion.div
                key={heart.id}
                initial={{ opacity: 0, scale: 0, x: 0, y: 0, rotate: 0 }}
                animate={{ 
                  opacity: [0, 1, 0.8, 0], 
                  scale: [0, heart.scale, heart.scale * 1.15, 0],
                  x: heart.x,
                  y: heart.y,
                  rotate: heart.rotate
                }}
                transition={{ 
                  duration: 1.8, 
                  delay: heart.delay,
                  ease: [0.25, 1, 0.5, 1]
                }}
                className="absolute pointer-events-none z-50"
                style={{
                  left: '50%',
                  top: '40%',
                  marginLeft: '-8px',
                  marginTop: '-8px',
                }}
              >
                <Heart size={16} className="fill-rose-500 text-rose-300 drop-shadow-[0_0_10px_rgba(244,63,94,0.6)]" />
              </motion.div>
            ))}

            <AnimatePresence>
              {!isEntering && !entered && (
                <motion.div
                  initial={{ opacity: 1, scale: 1 }}
                  exit={{ 
                    opacity: 0, 
                    scale: 0.8, 
                    filter: "blur(16px)",
                    y: 15,
                    transition: { duration: 1.5, ease: [0.16, 1, 0.3, 1] } 
                  }}
                  className="flex flex-col items-center space-y-4 w-full"
                >
                  <button
                    type="button"
                    id="enter-royaume-btn"
                    onClick={handleEnterRoyaume}
                    className="group relative px-8 py-3.5 rounded-full bg-gradient-to-r from-rose-700 via-rose-600 to-amber-700 text-white font-semibold flex items-center gap-2.5 shadow-lg shadow-rose-950/60 border border-rose-400/20 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer text-sm overflow-hidden"
                  >
                    <div className="absolute inset-0 rounded-full bg-rose-500/20 blur-lg group-hover:scale-110 transition duration-300" />
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                      className="relative z-10 flex items-center justify-center"
                    >
                      <Heart size={16} className="text-white fill-rose-100" />
                    </motion.div>
                    <span className="relative z-10">Entrer dans notre royaume</span>
                    <ChevronRight size={16} className="relative z-10 group-hover:translate-x-1 transition duration-200" />
                  </button>

                  <span className="block text-[10px] text-slate-400 font-light tracking-wide select-none">
                    🔈 active ton son pour entendre l'expérience poétique
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

        {/* Scroll helper anchor bottom */}
        {entered && (
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-slate-500 animate-bounce cursor-pointer select-none"
               onClick={() => document.getElementById('souvenirs')?.scrollIntoView({ behavior: 'smooth' })}>
            <span className="text-[10px] uppercase font-semibold tracking-wider font-sans">Continuer</span>
            <ChevronDown size={14} />
          </div>
        )}
      </section>

      {/* CORE EXPERIENCE CHAPTERS (Revealed always, or guided smoothly) */}
      <AnimatePresence>
        {entered && (
          <motion.main 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative z-10 w-full max-w-5xl mx-auto px-4 pb-28 space-y-28 md:space-y-40"
          >
            
            {/* SECTION 2: NOS SOUVENIRS (The Interactive Fairytale Sketchbook) */}
          <section id="souvenirs" className="scroll-mt-20 space-y-10">
            <div className="text-center space-y-2">
              <h2 className="font-serif italic text-3xl sm:text-4xl text-rose-100">Fil de souvenirs 📖</h2>
              <p className="text-xs text-slate-400 max-w-md mx-auto">Toujours aussi belles peut importe l'instant</p>
              
              <div className="flex flex-col sm:flex-row justify-center items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleAddCustomMemoryCard}
                  className="px-4 py-1.5 bg-amber-950/40 border border-amber-500/30 hover:border-amber-400/50 text-amber-200 text-xs font-medium rounded-full shadow-md hover:bg-amber-900/30 active:scale-95 transition-all duration-300 flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus size={12} className="text-amber-400" />
                  <span>Ajouter une carte (Photo/Vidéo) 📸📽️</span>
                </button>
              </div>

              <div className="w-14 h-[1.5px] bg-rose-500/40 mx-auto mt-2"></div>
            </div>

            {/* Photo memories GRID with exact layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {config.memories.map((memory, index) => {
                const tilts = ['-rotate-1', 'rotate-1', '-rotate-2', 'rotate-2', '-rotate-1', 'rotate-1', 'rotate-2', '-rotate-1', 'rotate-0'];
                const cardTilt = tilts[index % tilts.length];

                return (
                  <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    key={memory.id}
                    id={`memory-card-${memory.id}`}
                    onClick={() => setSelectedMemory(memory)}
                    onDragOver={(e) => {
                      e.preventDefault();
                      setDraggedMemoryId(memory.id);
                    }}
                    onDragLeave={() => {
                      setDraggedMemoryId(null);
                    }}
                    onDrop={(e) => {
                      e.preventDefault();
                      setDraggedMemoryId(null);
                      if (e.dataTransfer.files?.[0]) {
                        handleMemoryImageUpload(memory.id, e.dataTransfer.files[0]);
                      }
                    }}
                    className={`bg-gradient-to-b from-stone-900/90 via-slate-900/90 to-slate-950/90 border ${
                      draggedMemoryId === memory.id ? 'border-amber-400 ring-2 ring-rose-500/30' : 'border-rose-500/10'
                    } rounded-xl p-2.5 shadow-xl shadow-slate-950/80 group hover:border-rose-400/40 hover:-translate-y-2.5 hover:shadow-[0_15px_40px_rgba(225,29,72,0.15)] transition-all duration-500 cursor-pointer flex flex-col h-full relative ${cardTilt}`}
                  >
                    {/* Magical Wax Seal Ribbon / Crown Emblem on Top */}
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-20 w-8 h-8 rounded-full bg-gradient-to-tr from-rose-700 via-rose-600 to-amber-600 border border-amber-400/30 flex items-center justify-center shadow-md transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                      <Heart size={12} className="text-rose-100 fill-rose-200 animate-pulse" />
                    </div>

                    {/* Hidden Input for manual trigger */}
                    <input 
                      type="file" 
                      id={`file-input-${memory.id}`}
                      accept="image/*,video/*"
                      className="hidden"
                      onClick={(e) => e.stopPropagation()}
                      onChange={(e) => {
                        if (e.target.files?.[0]) {
                          handleMemoryImageUpload(memory.id, e.target.files[0]);
                        }
                      }}
                    />

                    {/* Polaroid Frame Picture / Video with Dynamic Sizing */}
                    <div className={`w-full ${memory.video ? 'aspect-[9/16]' : 'aspect-[3/4]'} rounded-lg overflow-hidden bg-slate-950 relative border border-slate-800/80 shadow-inner transition-all duration-300`}>
                      {memory.video ? (
                        <video 
                          src={memory.video} 
                          autoPlay 
                          loop 
                          muted 
                          playsInline
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                        />
                      ) : (
                        <img 
                          src={memory.image} 
                          alt={memory.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                          referrerPolicy="no-referrer"
                        />
                      )}

                      {/* Drag and Drop Overlaid Indicator */}
                      {draggedMemoryId === memory.id && (
                        <div className="absolute inset-0 bg-slate-950/90 border-2 border-dashed border-rose-400/70 flex flex-col items-center justify-center text-center p-3 z-20">
                          <Heart size={24} className="text-rose-400 fill-rose-500 animate-pulse mb-1" />
                          <span className="text-[11px] text-rose-100 font-medium">Dépose photo/vidéo ici 🌹</span>
                        </div>
                      )}

                      {/* Double interactive controls on hover */}
                      <div className="absolute inset-0 bg-slate-950/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-2 z-10">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedMemory(memory);
                          }}
                          className="px-3 py-1.5 bg-rose-600 hover:bg-rose-500 text-white text-[10px] font-bold tracking-wider uppercase rounded-full flex items-center gap-1.5 shadow-md active:scale-95 transition-all w-40 justify-center"
                        >
                          <Eye size={12} />
                          <span>Agrandir</span>
                        </button>

                        <label
                          htmlFor={`file-input-${memory.id}`}
                          onClick={(e) => e.stopPropagation()}
                          className="px-3 py-1.5 bg-slate-800 border border-slate-700 hover:border-amber-400 text-amber-200 text-[10px] font-bold tracking-wider uppercase rounded-full flex items-center gap-1.5 shadow-md active:scale-95 transition-all w-40 justify-center cursor-pointer"
                        >
                          <Sparkles size={11} className="text-amber-400" />
                          <span>Mettre photo/vidéo</span>
                        </label>

                        {/* Supprimer la carte option disabled for safety and permanence */}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* LIGHTBOX OVERLAY IF A MEMORY IMAGE CLICKED */}
            <AnimatePresence>
              {selectedMemory && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  id="memory-lightbox"
                  onClick={() => setSelectedMemory(null)}
                  className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 backdrop-blur-md"
                >
                  <motion.div 
                    initial={{ scale: 0.95 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0.95 }}
                    onClick={(e) => e.stopPropagation()}
                    className="glass-panel max-w-xl w-full rounded-2xl overflow-hidden border border-rose-500/20 shadow-2xl flex flex-col bg-slate-950"
                  >
                    {/* Immersive high resolution photo/video representation */}
                    <div className="w-full relative bg-slate-950">
                      {selectedMemory?.video ? (
                        <video 
                          src={selectedMemory.video} 
                          controls
                          autoPlay
                          playsInline
                          className="w-full h-auto max-h-[60vh] object-contain mx-auto rounded-t-2xl"
                        />
                      ) : (
                        <img 
                          src={selectedMemory?.image || ''} 
                          alt={selectedMemory?.title || ''} 
                          className="w-full h-auto max-h-[60vh] object-contain mx-auto rounded-t-2xl"
                          referrerPolicy="no-referrer"
                        />
                      )}
                      <button
                        type="button"
                        id="close-lightbox"
                        onClick={() => setSelectedMemory(null)}
                        className="absolute top-3 right-3 bg-slate-950/70 text-slate-400 hover:text-white p-2 rounded-full backdrop-blur-sm transition-all"
                      >
                        <X size={18} />
                      </button>
                    </div>

                    {/* Enriched Poetic Detail Panel */}
                    <div className="p-6 bg-gradient-to-b from-slate-900 to-slate-950 flex flex-col space-y-3 prose border-t border-rose-500/10">
                      <div className="text-center">
                        <h4 className="font-cursive text-amber-200 text-4xl mb-0.5 tracking-wide select-none">
                          {selectedMemory?.title || ''}
                        </h4>
                        
                        <div className="flex items-center justify-center gap-1 text-[10px] text-rose-400 uppercase tracking-widest font-mono">
                          <Calendar size={12} />
                          <span>{selectedMemory?.date || ''}</span>
                        </div>
                        
                        <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-rose-500/30 to-transparent mx-auto mt-2"></div>
                      </div>

                      <p className="text-slate-200 text-xs sm:text-sm font-sans font-light leading-relaxed text-center italic border-l-2 border-rose-500/40 pl-4 py-1.5 my-2 max-w-md mx-auto">
                        "{selectedMemory?.description || ''}"
                      </p>

                      <div className="flex justify-between items-center text-[10px] text-slate-500 pt-2 border-t border-white/5">
                        <span>Photographie intime de ma Reine 👑</span>
                        <div className="flex items-center gap-1 text-rose-500 font-semibold animate-pulse">
                          <Heart size={12} className="fill-current" />
                          <span>Pour Toujours Épris</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </section>

          {/* SECTION 4: MA LETTRE (Wax Sealed Crown Scroll Interaction) */}
          <section id="lettre" className="scroll-mt-20 space-y-12">
            <div className="text-center space-y-2">
              <h2 className="font-serif italic text-3xl sm:text-4xl text-rose-100">Ma lettre pour ma Reine ✉️</h2>
              <p className="text-xs text-slate-400 max-w-md mx-auto">mon message pour toi</p>
              <div className="w-14 h-[1.5px] bg-rose-500/40 mx-auto mt-2"></div>
            </div>

            {/* Simulated physically responsive Crimson Envelope */}
            <div className="max-w-2xl mx-auto flex flex-col items-center">
              
              {!letterOpen ? (
                /* CLOSED ENVELOPE STAGE */
                <div 
                  id="closed-envelope-button"
                  onClick={() => {
                    setLetterOpen(true);
                    setMusicPlaying(true);
                    if (audioRef.current) {
                      audioRef.current.play().catch(err => {
                        console.log("Autoplay was prevented by browser, music ready for tap interaction", err);
                      });
                    }
                    triggerToast("La cire s'est fissurée, ton mot doux s'élance et la musique commence... 🌹📜🎵");
                  }}
                  className="bg-radial from-rose-950 to-zinc-950 border border-yellow-600/30 w-full rounded-2xl p-8 sm:p-12 text-center shadow-xl shadow-black/80 hover:border-yellow-400/50 hover:shadow-[0_0_30px_rgba(225,29,72,0.15)] active:scale-[0.98] transition-all duration-500 cursor-pointer flex flex-col items-center space-y-6 relative overflow-hidden group py-16"
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-rose-950/10 via-transparent to-transparent pointer-events-none" />
                  
                  {/* Majestic decorative seal visual lines */}
                  <div className="absolute top-4 left-4 border-l border-t border-yellow-600/20 w-8 h-8 rounded-tl-lg"></div>
                  <div className="absolute top-4 right-4 border-r border-t border-yellow-600/20 w-8 h-8 rounded-tr-lg"></div>
                  <div className="absolute bottom-4 left-4 border-l border-b border-yellow-600/20 w-8 h-8 rounded-bl-lg"></div>
                  <div className="absolute bottom-4 right-4 border-r border-b border-yellow-600/20 w-8 h-8 rounded-br-lg"></div>

                  <div className="w-16 h-16 rounded-full bg-slate-900 border border-amber-500 flex items-center justify-center text-amber-400 shadow-lg group-hover:scale-110 group-hover:rotate-12 transition duration-500">
                    <Music size={26} className="animate-pulse" />
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-serif italic text-2xl text-rose-100 group-hover:text-rose-200 transition">Pour les yeux de ma Reine</h3>
                    <p className="text-slate-400 text-xs font-light max-w-sm">pose ton doigt ici pour voir</p>
                  </div>

                  {/* Royal Gold Wax Seal design */}
                  <div className="relative pt-4">
                    <div className="absolute -inset-1 rounded-full bg-yellow-500/30 blur animate-ping group-hover:block" />
                    
                    {/* The wax seal circle button */}
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-amber-500 via-rose-700 to-amber-700 p-1 flex items-center justify-center shadow-md shadow-rose-950/50 relative border-2 border-yellow-600">
                      <div className="w-full h-full rounded-full bg-rose-900 border border-yellow-500/20 flex items-center justify-center text-amber-200">
                        <Heart size={20} className="fill-amber-300 stroke-yellow-700" />
                      </div>
                    </div>
                  </div>

                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#d97706]/70 group-hover:text-amber-500 transition-all font-mono">
                    cliquer ici
                  </span>
                </div>
              ) : (
                /* OPEN SCROLL/PARCHMENT STAGE WITH SEAMLESS SHUTDOWN */
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  id="open-letter-parchment"
                  className="bg-[#fafaf9] text-zinc-900 border-2 border-amber-900/10 w-full rounded-2xl shadow-2xl p-6 sm:p-10 relative overflow-hidden"
                >
                  {/* Subtle luxurious cream background textures represent high craft */}
                  <div className="absolute inset-0 bg-radial from-transparent to-stone-100 pointer-events-none" />
                  <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-yellow-700 via-rose-700 to-amber-700"></div>

                  <div className="relative space-y-6">
                    {/* Paper Header */}
                    <div className="flex justify-between items-start border-b border-stone-200 pb-4 select-none">
                      <div>
                        <h4 className="font-serif italic text-rose-700 text-lg font-medium">lettre à toi ma Reine</h4>
                      </div>
                      <button
                        type="button"
                        id="reseal-letter-btn"
                        onClick={() => {
                          setLetterOpen(false);
                          triggerToast("La lettre a été à nouveau scellée 🌹 En sécurité.");
                        }}
                        className="text-stone-400 hover:text-stone-800 p-1 px-2.5 bg-stone-100 hover:bg-stone-200 transition text-xs rounded-full flex items-center gap-1 border border-stone-200"
                        title="Refermer l'enveloppe"
                      >
                        <X size={12} /> Ré-envelopper
                      </button>
                    </div>

                    {/* Scrollable text container styled elegantly with beautiful cursive/serif styling */}
                    <div className="text-stone-800 text-lg subpixel-antialiased leading-relaxed font-serif italic whitespace-pre-wrap font-medium">
                      {config.letterText}
                    </div>

                    {/* Romantic Seal Sign-off Footer */}
                    <div className="border-t border-stone-200 pt-5 flex justify-between items-center bg-stone-50/50 p-4 rounded-xl select-none">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-600">
                          <Heart size={14} className="fill-current" />
                        </div>
                        <span className="font-cursive text-stone-600 text-xl font-bold">Ton éternel Prince, ton BB</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

            </div>
          </section>

          {/* SINCERE FOOTER EMBED */}
          <footer className="text-center pt-10 border-t border-white/5 space-y-1">
            <p className="text-xs text-slate-500">
              Pour toi
            </p>
            <p className="font-cursive text-rose-500 text-xl font-bold select-none">
              🌹 Ma Reine
            </p>
          </footer>

          </motion.main>
        )}
      </AnimatePresence>

      {/* FLOATING GLASS NAVIGATION DOCK FOR INSTANT REACH (Highly Mobile friendly feature!) */}
      <AnimatePresence>
        {entered && (
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            id="floating-navigation-dock"
            className="fixed bottom-4 inset-x-0 mx-auto w-fit z-40 max-w-[90%] select-none px-2"
          >
            <div className="glass-panel px-4 py-2 rounded-full flex items-center justify-center gap-4 sm:gap-6 shadow-xl shadow-black/80 border border-white/10">
              
              <button 
                type="button"
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                  triggerToast("Vers le trône... 👑");
                }}
                className="flex flex-col items-center gap-1.5 text-xs text-slate-400 hover:text-rose-400 transition"
                title="Mon Trône"
              >
                <Heart size={16} />
                <span className="hidden sm:inline text-[9px] font-sans font-medium">Accueil</span>
              </button>

              <div className="w-[1px] h-4 bg-slate-800"></div>

              <button 
                type="button"
                onClick={() => {
                  document.getElementById('souvenirs')?.scrollIntoView({ behavior: 'smooth' });
                  triggerToast("Notre journal intime... ✨");
                }}
                className="flex flex-col items-center gap-1.5 text-xs text-slate-400 hover:text-rose-400 transition-all"
                title="Clichés"
              >
                <Calendar size={16} />
                <span className="hidden sm:inline text-[9px] font-sans font-medium">Souvenirs</span>
              </button>

              <div className="w-[1px] h-4 bg-slate-800"></div>

              <button 
                type="button"
                onClick={() => {
                  document.getElementById('lettre')?.scrollIntoView({ behavior: 'smooth' });
                  triggerToast("Secret d'encre dévoilé... ✉️");
                }}
                className="flex flex-col items-center gap-1.5 text-xs text-slate-400 hover:text-rose-400 transition-all font-sans"
                title="Lettre"
              >
                <Music size={16} />
                <span className="hidden sm:inline text-[9px] font-sans font-medium">Lettre</span>
              </button>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
