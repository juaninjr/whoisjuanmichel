// ─── CONTENT TYPES ───────────────────────────────────────────────────────────
// Replace placeholder data with your real content.
// Images: place files in /public/images/ and update the paths below.
// Videos: place files in /public/videos/ and update the paths below.

export interface StudioProject {
  id: string;
  title: string;
  studio: string;
  semester: string;
  year: number;
  description: string;
  tags: string[];
  coverImage: string;
  /** Optional: path to a looping ambient video in /public/videos/ — shown as the animated preview */
  videoUrl?: string;
  /** Optional: additional image paths for the multi-page viewer (beyond coverImage) */
  images?: string[];
  /** Optional: PDF of the project — shown as final page in viewer. Place in /public/docs/ */
  pdfUrl?: string;
  awards?: string[];
}

export interface Paper {
  id: string;
  title: string;
  subtitle?: string;
  course: string;
  year: number;
  abstract: string;
  tags: string[];
  pdfUrl?: string;
}

export type CVEntryType = 'education' | 'experience' | 'award';

export interface CVEntry {
  id: string;
  type: CVEntryType;
  title: string;
  institution: string;
  location: string;
  startYear: number;
  endYear: number | 'present';
  description?: string;
}

export interface Course {
  id: string;
  title: string;
  provider: string;
  year: number;
  category: string;
  certificateUrl?: string;
}

export type MusicCredit = 'Mixed' | 'Mastered' | 'Produced' | 'Written';

export interface MusicProject {
  id: string;
  /** Display name of the artist or project */
  artistName: string;
  /** Legacy field kept for compatibility — same as artistName */
  client?: string;
  title: string;
  year: number;
  role: string;
  description: string;
  genres: string[];
  isPublic: boolean;
  /** true = own artistic project (emisito, personal), false = work for another artist */
  isOwn?: boolean;
  coverImage?: string;
  /** Direct Spotify link */
  spotifyUrl?: string;
  /** Legacy listen link */
  listenUrl?: string;
  /** Which production credits apply */
  credits?: MusicCredit[];
}

export type PerformanceType = 'recital' | 'band' | 'session' | 'competition';

export interface Performance {
  id: string;
  type: PerformanceType;
  title: string;
  venue: string;
  city: string;
  date: string;
  role: string;
  ensemble?: string;
  program?: string[];
  videoUrl?: string;
  /** Photo of the event — used as a large card in the LIVE musician view */
  photo?: string;
  /** Mark as a headline event — gets the large photo card treatment */
  isFeatured?: boolean;
}

export type ArtMedium = 'drawing' | 'painting' | 'digital' | 'mixed' | 'photography';

export interface ArtPiece {
  id: string;
  title: string;
  year: number;
  medium: ArtMedium;
  dimensions?: string;
  description?: string;
  image: string;
  series?: string;
}

export interface EmisitoRelease {
  id: string;
  title: string;
  year: number;
  type: 'single' | 'ep' | 'album';
  description: string;
  coverImage: string;
  streamingUrls: {
    spotify?: string;
    appleMusic?: string;
    soundcloud?: string;
    bandcamp?: string;
  };
}

// ─── PLACEHOLDER DATA ─────────────────────────────────────────────────────────
// Replace these with your real content.

// ── Image/file naming convention ──────────────────────────────────────────────
// Files in /public/images/studio/ or /public/videos/studio/ that START with the
// project's slug prefix are automatically associated with that project.
// Slug prefixes: FuturisticClubhouse | TheCarp | TheWing | PlaytrollStation | Other
// Example: FuturisticClubhouse_render01.png → assigned to Futuristic Clubhouse images[]

export const studioProjects: StudioProject[] = [
  {
    id: 's1',
    title: 'Futuristic Clubhouse',
    studio: 'Design Studio II',
    semester: 'Easter 2025',
    year: 2025,
    description: 'A wellness centre for preventative healthcare in Bottisham (Cambridgeshire)',
    tags: ['Commercial', 'Spatial', 'Materiality'],
    coverImage: '/images/studio/FC/FC1.png',
    pdfUrl: '/docs/FuturisticClubhouse.pdf',
    videoUrl: '/videos/tourMOCKHeatherwick.mp4',
    

    images: ['/images/studio/FC/FC1_1.png','/images/studio/FC/FC1_2.png','/images/studio/FC/FCb_3.png','/images/studio/FC/FCb_4.png',
      '/images/studio/FC/FC2.png', '/images/studio/FC/FC3.png', '/images/studio/FC/FC4.png', '/images/studio/FC/FC5.png',
       '/images/studio/FC/FC6.png'],
    // videoUrl: '/videos/studio/FuturisticClubhouse.mp4',   ← add video here
    // images: ['/images/studio/FuturisticClubhouse_01.jpg'], ← add extra pages here
  },
  {
    id: 's3',
    title: 'The Wing',
    studio: 'Design Studio I',
    semester: 'Easter 2024',
    year: 2024,
    description: 'Refurbishment of abandoned bar into a theatre with a permeable reception wing in Cambridge.',
    tags: ['Infrastructure', 'Light'],
    coverImage: '/images/studio/thewingsnap.png',
    pdfUrl: '/docs/Year1_Q3_TheWing.pdf',
    images: ['/images/studio/wing/WING12.png','/images/studio/wing/WING8.png','/images/studio/wing/WING9.png',
      '/images/studio/wing/WING11.png','/images/studio/wing/WING7.png','/images/studio/wing/WING13.png','/images/studio/wing/WING10.png',
      '/images/studio/wing/WING5.png','/images/studio/wing/WING14.png'],
    // images: ['/images/studio/TheWing_plans.jpg'],          ← add extra pages here
  },
   {
    id: 's_playtroll',
    title: 'Playtroll Station',
    studio: 'Design Studio II',
    semester: 'Michaelmas 2024',
    year: 2024,
    description: 'A playful public playground and café to encourage social interaction of all ages in a natural and contemporary ergonomic form.',
    tags: ['Public Space', 'Materiality'],
    coverImage: '/images/studio/playtroll1.png',
    pdfUrl: '/docs/PlaytrollStation.pdf',
    images: ['/images/studio/playtrolA.png', '/images/studio/playtrolB.png', '/images/studio/playtroll2.png', '/images/studio/playtroll3.png', '/images/studio/playtroll4.png'],
    // videoUrl: '/videos/studio/PlaytrollStation.mp4',       ← add video here
  },
  {
    id: 's2',
    title: 'The Carp',
    studio: 'Structures II',
    semester: 'Spring 2024',
    year: 2024,
    description: 'A lightweight public pavilion in the shape of a carp, designed to be assembled and disassembled seasonally in a city park and having a big open floor.',
    tags: ['Cultural', 'Urban', 'Public Space'],
    coverImage: '/images/studio/fig_image_12_64.png',
    pdfUrl: '/docs/TheCarpProject.pdf',
   
    // images: ['/images/studio/TheCarp_section.jpg'],        ← add extra pages here
  },
 
  {
    id: 's4',
    title: 'Landquiitecture',
    studio: 'Design Studio I',
    semester: 'Spring 2024',
    year: 2024,
    description: 'Market area insertion next to Cambridge F.C. stadium. Movable ledges for blending experience between market and stadium. Reuse of materials from the stadium.',
    tags: [],
    coverImage: '/images/studio/other/Land7.png',
    images: ['/images/studio/other/Land2.png','/images/studio/other/Land3.png','/images/studio/other/Land6.png',
      '/images/studio/other/Land4.png','/images/studio/other/Land1.png',]
  },
];

export const papers: Paper[] = [
  {
    id: 'p1',
    title: 'The Threshold as Political Territory',
    subtitle: 'Boundary, Power, and the Architecture of the Doorway',
    course: 'Architectural Theory',
    year: 2024,
    abstract: 'This paper examines the doorway as a site of political and social negotiation, drawing on Simmel\'s theory of the bridge and the door alongside contemporary examples of access architecture.',
    tags: ['Theory', 'Space', 'Politics'],
    pdfUrl: '#',
  },
];

export const cvEntries: CVEntry[] = [
  {
    id: 'cv1',
    type: 'education',
    title: 'Bachelor of Arts (Architecture)',
    institution: 'University of Cambridge',
    location: 'Cambridge, United Kingdom',
    startYear: 2023,
    endYear: 'present',
    description: 'Studio, Structures I & II, Materials & Construction I & II, Sustainable Design I & II, Urbanism, Sound in Architecture, Gardens & Landscapes. Robinson College.',
  },
  {
    id: 'cv1b',
    type: 'education',
    title: 'Technological Bilingual Baccalaureate',
    institution: 'British Council School',
    location: 'Madrid, Spain',
    startYear: 2009,
    endYear: 2023,
    description: 'English/Spanish bilingual programme. BiBac Prize 2023, Academic Excellence Prize 2017 & 2019.',
  },
  {
    id: 'cv2',
    type: 'experience',
    title: 'Architecture & Engineering Intern',
    institution: 'Aluminios Cortizo S.A.U.',
    location: 'A Coruña, Spain',
    startYear: 2025,
    endYear: 2025,
    description: 'Provided technical assistance and client-facing solutions on system specifications. Supported validation tests and experiments of architectural systems. Applied calculation methods and regulatory compliance checks (CTE). Trained in specialized industry software (Alcorsa, Cortizolab, Cortizocenter).',
  },
  {
    id: 'cv3',
    type: 'experience',
    title: 'Sound & Production Engineer',
    institution: 'FIVE Media Clan',
    location: 'Remote, Andorra',
    startYear: 2022,
    endYear: 2025,
    description: 'Produced, mixed and mastered 100+ tracks for clients and self. Achieved 20M+ streams with international artists. Strong record of building audiences and creating value in creative industries. Event planning and setup for concerts.',
  },
  {
    id: 'cv4',
    type: 'experience',
    title: 'Carpentry Intern',
    institution: 'Carpintería Dimmler',
    location: 'Karlsruhe, Germany',
    startYear: 2024,
    endYear: 2024,
    description: 'Designed and installed countertop/front desk in a dental clinic. Built countertop and shelving unit for a school. Conducted flooring and repair work in schools, hospitals, and private homes.',
  },
  {
    id: 'cv4b',
    type: 'experience',
    title: 'Physical Education Volunteer',
    institution: 'Community School',
    location: 'Chame, Panama',
    startYear: 2024,
    endYear: 2024,
    description: 'Delivered sports and games lessons to primary school students.',
  },
  {
    id: 'cv5',
    type: 'award',
    title: '[Scholarship / Prize Name]',
    institution: '[Awarding Body]',
    location: '[City, Country]',
    startYear: 2022,
    endYear: 2022,
    description: 'Brief context about the award.',
  },
];

export const courses: Course[] = [
  {
    id: 'c1',
    title: 'Rhino + Grasshopper',
    provider: 'Self-directed',
    year: 2023,
    category: 'Software',
  },
  {
    id: 'c2',
    title: 'CS50x: Introduction to Computer Science',
    provider: 'Harvard University (Online)',
    year: 2023,
    category: 'Computer Science',
    certificateUrl: '#',
  },
  {
    id: 'c3',
    title: 'Adobe Creative Suite',
    provider: 'Self-directed',
    year: 2022,
    category: 'Software',
  },
  {
    id: 'c4',
    title: 'RIBA Skill Up Project',
    provider: 'Royal Institute of British Architects',
    year: 2022,
    category: 'Architecture',
  },
  {
    id: 'c5',
    title: 'Divemaster',
    provider: 'PADI',
    year: 2025,
    category: 'Sport',
    certificateUrl: '#',
  },
];

export const musicProjects: MusicProject[] = [
  {
    id: 'm1',
    artistName: '[Artist / Project Name]',
    title: 'Score for Short Film',
    year: 2024,
    role: 'Composer',
    description: 'Original orchestral score for a 12-minute documentary short.',
    genres: ['Orchestral', 'Documentary'],
    isPublic: true,
    isOwn: false,
    credits: ['Written', 'Produced', 'Mixed', 'Mastered'],
    spotifyUrl: '#',
  },
  {
    id: 'm2',
    artistName: '[Brand / Agency]',
    title: 'Brand Identity Soundscape',
    year: 2023,
    role: 'Composer & Producer',
    description: 'Sonic identity system for a lifestyle brand — main theme, stingers, ambient tracks.',
    genres: ['Electronic', 'Ambient', 'Commercial'],
    isPublic: true,
    isOwn: false,
    credits: ['Written', 'Produced', 'Mixed', 'Mastered'],
    spotifyUrl: '#',
  },
  {
    id: 'm3',
    artistName: 'emisito',
    title: '[Own Track Title]',
    year: 2024,
    role: 'Artist',
    description: 'Personal release under the emisito name.',
    genres: ['Electronic', 'Ambient'],
    isPublic: true,
    isOwn: true,
    credits: ['Written', 'Produced', 'Mixed', 'Mastered'],
    spotifyUrl: '#',
  },
  {
    id: 'm4',
    artistName: 'Private',
    title: 'Private Client Project',
    year: 2024,
    role: 'Producer',
    description: 'Confidential commercial project.',
    genres: ['Commercial'],
    isPublic: false,
    isOwn: false,
    credits: ['Mixed', 'Mastered'],
  },
];

export const performances: Performance[] = [
  {
    id: 'perf1',
    type: 'recital',
    title: 'Year-End Piano Recital',
    venue: '[Concert Hall / Venue]',
    city: '[City]',
    date: '2024-05-15',
    role: 'Pianist',
    isFeatured: true,
    // photo: '/images/live/recital-2024.jpg',  ← add your event photo here
    program: [
      'Bach — Partita No. 2 in C minor, BWV 826',
      'Chopin — Ballade No. 1 in G minor, Op. 23',
    ],
  },
  {
    id: 'perf2',
    type: 'band',
    title: '[Band Name] — Live at [Venue]',
    venue: '[Venue]',
    city: '[City]',
    date: '2024-03-08',
    role: 'Keys / Guitar',
    ensemble: '[Band Name]',
    isFeatured: true,
    // photo: '/images/live/band-2024.jpg',  ← add your event photo here
  },
  {
    id: 'perf3',
    type: 'recital',
    title: 'Chamber Music Evening',
    venue: '[Venue]',
    city: '[City]',
    date: '2023-11-20',
    role: 'Pianist',
    program: [
      'Brahms — Violin Sonata No. 1 in G major, Op. 78',
    ],
  },
  {
    id: 'perf4',
    type: 'band',
    title: '[University Jazz Ensemble]',
    venue: '[Venue]',
    city: '[City]',
    date: '2023-12-01',
    role: 'Piano',
    ensemble: 'University Jazz Ensemble',
    program: ['Misty', 'Autumn Leaves', 'So What'],
  },
];

export const artPieces: ArtPiece[] = [
  {
    id: 'a1',
    title: 'Study in Ochre',
    year: 2024,
    medium: 'painting',
    dimensions: '50 × 70 cm',
    description: 'Landscape study with heavy impasto and limited palette.',
    image: '/images/art/ochre-study.jpg',
  },
  {
    id: 'a2',
    title: 'Figures in Transit',
    year: 2024,
    medium: 'drawing',
    dimensions: 'A3',
    description: 'Ink studies of people in motion captured in public transit.',
    image: '/images/art/figures-transit.jpg',
    series: 'In Motion',
  },
  {
    id: 'a3',
    title: 'Urban Fragment I',
    year: 2023,
    medium: 'photography',
    description: 'Detail photograph of decaying architectural surface.',
    image: '/images/art/urban-fragment-1.jpg',
    series: 'Urban Fragments',
  },
  {
    id: 'a4',
    title: 'Urban Fragment II',
    year: 2023,
    medium: 'photography',
    description: 'Rusted fire escape abstracted through compression and crop.',
    image: '/images/art/urban-fragment-2.jpg',
    series: 'Urban Fragments',
  },
  {
    id: 'a5',
    title: 'Memory Trace',
    year: 2022,
    medium: 'mixed',
    dimensions: '40 × 60 cm',
    description: 'Layered mixed media work exploring architectural memory through collage and drawing.',
    image: '/images/art/memory-trace.jpg',
  },
  {
    id: 'a6',
    title: 'Self',
    year: 2023,
    medium: 'drawing',
    dimensions: 'A4',
    image: '/images/art/self.jpg',
  },
];

export const emisitoReleases: EmisitoRelease[] = [];
