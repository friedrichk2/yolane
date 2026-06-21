export interface MemoryItem {
  id: number;
  image: string;
  video?: string;
  title: string;
  date: string;
  description: string;
}

// Poetic collection of the Queen's 19 uploaded memories, designed like a high-end interactive scrapbook album.
// Automatically mapped to point directly to your /video folder files.
export const REINE_MEMORIES: MemoryItem[] = [
  {
    id: 1,
    image: "/video/yolande.jpg",
    video: "/video/vyo.mp4",
    title: "La Reine aux Tresses de Feu",
    date: "Aura Flamboyante",
    description: "Chaque fois que je vois tes tresses de feu, mon cœur s'enflamme d'un amour infini pour toi."
  },
  {
    id: 2,
    image: "/video/yolande.jpg",
    title: "L'Éclat du Soleil Couchant",
    date: "Lumière Dorée",
    description: "Le soleil se couche, mais ta beauté brille pour toujours dans mon âme."
  },
  {
    id: 3,
    image: "/video/yol.jpg",
    video: "/video/yoyo.mp4",
    title: "La Reine aux Lunettes d'Or",
    date: "Élégance Moderne",
    description: "Même derrière tes lunettes, ton regard doux lit dans mes pensées les plus douces."
  },
  {
    id: 4,
    image: "/video/yk.jpg",
    video: "/video/shi.mp4",
    title: "Reflets de Notre Douceur",
    date: "Tendre Monochrome",
    description: "Un simple miroir ne pourra jamais refléter toute la grandeur de mon amour pour toi."
  },
  {
    id: 5,
    image: "/video/yol.jpg",
    title: "Ton Regard Hypnotique",
    date: "Instants Complices",
    description: "Tes yeux sont des étoiles qui guident chacun de mes pas vers ton cœur."
  },
  {
    id: 6,
    image: "/video/yk.jpg",
    title: "Les Quatre Saisons de Ton Charme",
    date: "Prisme d'Amour",
    description: "Peu importe les saisons, ton sourire reste mon plus doux refuge."
  },
  {
    id: 7,
    image: "/video/land.jpg",
    video: "/video/tr.mp4",
    title: "Éclat Sportif et Audacieux",
    date: "Style Magique",
    description: "Ton énergie m'inspire, ton sourire me désarme, tu es parfaite sous toutes tes facettes."
  },
  {
    id: 8,
    image: "/video/lande.jpg",
    video: "/video/viy.mp4",
    title: "Mélodie Spontanée",
    date: "Douce Écoute",
    description: "Quand tu écoutes ta musique, c'est mon cœur qui bat au rythme de tes rêves."
  },
  {
    id: 9,
    image: "/video/y.jpg",
    video: "/video/viyoyo.mp4",
    title: "Douce Espièglerie Rétro",
    date: "Pétillante Reine",
    description: "Une petite moue, un clin d'œil, et je succombe à nouveau à ton charme si unique."
  },
  {
    id: 10,
    image: "/video/land.jpg",
    title: "Douce Muse d'Automne",
    date: "Rêverie",
    description: "La douceur de ta peau n'a d'égal que la tendresse infinie que j'ai pour toi."
  },
  {
    id: 11,
    image: "/video/yoyo.jpg",
    video: "/video/vi1.mp4",
    title: "La Valse aux Curls Dorés",
    date: "Éclat Surnaturel",
    description: "Danse avec moi à travers la vie, ma Reine, car mon cœur ne veut que toi."
  },
  {
    id: 12,
    image: "/video/lande.jpg",
    title: "Simplicité Enchanteresse",
    date: "Pureté Vraie",
    description: "C'est dans ta plus grande simplicité que se cache toute la magie de ton être."
  },
  {
    id: 13,
    image: "/video/y.jpg",
    title: "Chic Sous le Chapeau",
    date: "Souveraine du Style",
    description: "Une reine reste royale, peu importe ce qu'elle porte. Tu es mon éternelle élégance."
  },
  {
    id: 14,
    image: "/video/ph1.jpg",
    title: "Un Souffle de Tendresse",
    date: "Tendre Espièglerie",
    description: "Un bisou soufflé de tes lèvres, et tout mon monde s'éclaire d'une douceur magique."
  },
  {
    id: 15,
    image: "/video/ph2.jpg",
    title: "Dîner Sous Tes Yeux Célestes",
    date: "Tête-à-Tête Doré",
    description: "Un moment partagé avec toi à table vaut plus que tous les trésors du monde."
  },
  {
    id: 16,
    image: "/video/yoyo.jpg",
    title: "Couronne de Roses Célestes",
    date: "Aura Divine",
    description: "Toutes les roses pâlissent de jalousie devant la douceur et l'éclat de ta peau."
  },
  {
    id: 17,
    image: "/video/yv.jpg",
    title: "Ton Doux Regard Complice",
    date: "Regard Sincère",
    description: "Dans un seul de tes regards complices, je vois tout notre avenir se dessiner."
  },
  {
    id: 18,
    image: "/video/yvl.jpg",
    title: "Étreinte Sous la Lune",
    date: "Nuit Magique",
    description: "Sous la lune ou sous le soleil, ma place préférée sera toujours blottie contre toi."
  },
  {
    id: 19,
    image: "/video/yolande.jpg",
    title: "Majesté Souveraine Éternelle",
    date: "Amour Éternel",
    description: "Tu règnes en Reine absolue sur mon cœur, aujourd'hui, demain et pour toute l'éternité."
  }
];
