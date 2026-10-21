export type MediaCategory =
  | 'All'
  | 'Nebulae'
  | 'Galaxies'
  | 'Solar System'
  | 'Spacecraft'
  | 'Deep Field'
  | 'Star Formation'
  | 'Videos';

export interface GalleryMediaItem {
  id: string;
  type: 'image' | 'video';
  title: string;
  category: 'Nebulae' | 'Galaxies' | 'Solar System' | 'Spacecraft' | 'Deep Field' | 'Star Formation';
  description: string;
  credit: string;
  sourceUrl: string;
  thumbnailUrl: string;
  fullResUrl: string;
  videoUrl?: string; // For video items
  aspectRatio?: 'landscape' | 'portrait' | 'square';
  dateCaptured: string;
  missionOrTelescope: string;
}

export const GALLERY_CATEGORIES: MediaCategory[] = [
  'All',
  'Nebulae',
  'Galaxies',
  'Solar System',
  'Spacecraft',
  'Deep Field',
  'Star Formation',
  'Videos'
];

export const GALLERY_ITEMS: GalleryMediaItem[] = [
  {
    id: 'jwst-smacs-0723',
    type: 'image',
    title: "Webb's First Deep Field (SMACS 0723)",
    category: 'Deep Field',
    description: 'The deepest and sharpest infrared image of the distant universe to date, showing thousands of galaxies including the faintest objects ever observed in the infrared.',
    credit: 'NASA, ESA, CSA, STScI',
    sourceUrl: 'https://images.nasa.gov/details/PIA25325',
    thumbnailUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80',
    fullResUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=2400&q=90',
    aspectRatio: 'landscape',
    dateCaptured: 'July 11, 2022',
    missionOrTelescope: 'James Webb Space Telescope (NIRCam)'
  },
  {
    id: 'carina-cosmic-cliffs',
    type: 'image',
    title: 'The Cosmic Cliffs of Carina Nebula',
    category: 'Star Formation',
    description: 'Towering peaks of gas and dust sculpted by the intense ultraviolet radiation and stellar winds from massive young stars in NGC 3324.',
    credit: 'NASA, ESA, CSA, STScI',
    sourceUrl: 'https://images.nasa.gov/details/GSFC_20171208_Archive_e001465',
    thumbnailUrl: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=800&q=80',
    fullResUrl: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=2400&q=90',
    aspectRatio: 'landscape',
    dateCaptured: 'July 12, 2022',
    missionOrTelescope: 'James Webb Space Telescope (NIRCam / MIRI)'
  },
  {
    id: 'pillars-of-creation-jwst',
    type: 'image',
    title: 'The Pillars of Creation in Eagle Nebula (M16)',
    category: 'Nebulae',
    description: 'Columns of cold gas and dust where new stars are forming within the dense interstellar medium, captured in unprecedented infrared clarity.',
    credit: 'NASA, ESA, CSA, STScI, J. DePasquale (STScI)',
    sourceUrl: 'https://images.nasa.gov/details/PIA25442',
    thumbnailUrl: 'https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?auto=format&fit=crop&w=800&q=80',
    fullResUrl: 'https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?auto=format&fit=crop&w=2400&q=90',
    aspectRatio: 'portrait',
    dateCaptured: 'October 19, 2022',
    missionOrTelescope: 'James Webb Space Telescope (NIRCam)'
  },
  {
    id: 'phantom-galaxy-m74',
    type: 'image',
    title: 'The Phantom Galaxy (Messier 74)',
    category: 'Galaxies',
    description: 'A "grand design" spiral galaxy showing sweeping gas lanes laced with star-forming H II regions and a dense nuclear star cluster at its core.',
    credit: 'ESA/Webb, NASA & CSA, J. Lee and the PHANGS-JWST Team',
    sourceUrl: 'https://images.nasa.gov/details/PIA25444',
    thumbnailUrl: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?auto=format&fit=crop&w=800&q=80',
    fullResUrl: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?auto=format&fit=crop&w=2400&q=90',
    aspectRatio: 'square',
    dateCaptured: 'August 29, 2022',
    missionOrTelescope: 'JWST + Hubble Combined (MIRI / WFC3)'
  },
  {
    id: 'jupiter-juno-perijove',
    type: 'image',
    title: 'Jupiter Cloudscape & Great Red Spot',
    category: 'Solar System',
    description: 'Intricate turbulent cloud belts, white storms, and dynamic atmospheric vortices captured during a close perijove pass over Jupiter’s southern hemisphere.',
    credit: 'NASA / JPL-Caltech / SwRI / MSSS / Gerald Eichstädt',
    sourceUrl: 'https://images.nasa.gov/details/PIA21972',
    thumbnailUrl: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?auto=format&fit=crop&w=800&q=80',
    fullResUrl: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?auto=format&fit=crop&w=2400&q=90',
    aspectRatio: 'landscape',
    dateCaptured: 'December 16, 2017',
    missionOrTelescope: 'Juno Spacecraft (JunoCam)'
  },
  {
    id: 'saturn-backlit-cassini',
    type: 'image',
    title: 'In Saturn\'s Shadow (The Day the Earth Smiled)',
    category: 'Solar System',
    description: 'Cassini slipped into Saturn’s shadow to image the backlit rings and atmosphere, with Earth, Mars, and Venus visible as tiny specks through the ring gaps.',
    credit: 'NASA / JPL-Caltech / Space Science Institute',
    sourceUrl: 'https://images.nasa.gov/details/PIA17172',
    thumbnailUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80',
    fullResUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=2400&q=90',
    aspectRatio: 'landscape',
    dateCaptured: 'July 19, 2013',
    missionOrTelescope: 'Cassini Orbiter (ISS Wide-Angle)'
  },
  {
    id: 'perseverance-jezero-panorama',
    type: 'image',
    title: 'Perseverance Rover at Jezero Delta Front',
    category: 'Spacecraft',
    description: 'High-resolution composite mosaic showing the ancient Martian river delta escarpment and the rover mast analyzing sedimentary layering.',
    credit: 'NASA / JPL-Caltech / ASU / MSSS',
    sourceUrl: 'https://images.nasa.gov/details/PIA24423',
    thumbnailUrl: 'https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?auto=format&fit=crop&w=800&q=80',
    fullResUrl: 'https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?auto=format&fit=crop&w=2400&q=90',
    aspectRatio: 'landscape',
    dateCaptured: 'April 2022',
    missionOrTelescope: 'Mars 2020 Perseverance Rover (Mastcam-Z)'
  },
  {
    id: 'tarantula-nebula-jwst',
    type: 'image',
    title: 'The Tarantula Nebula (30 Doradus)',
    category: 'Nebulae',
    description: 'The largest and brightest star-forming region in the Local Group, located in the Large Magellanic Cloud, home to the most massive stars known to science.',
    credit: 'NASA, ESA, CSA, STScI, Webb ERO Production Team',
    sourceUrl: 'https://images.nasa.gov/details/PIA25441',
    thumbnailUrl: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=800&q=80',
    fullResUrl: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=2400&q=90',
    aspectRatio: 'landscape',
    dateCaptured: 'September 6, 2022',
    missionOrTelescope: 'James Webb Space Telescope (NIRCam)'
  },
  {
    id: 'hubble-ultra-deep-field',
    type: 'image',
    title: 'Hubble Ultra Deep Field (HUDF)',
    category: 'Deep Field',
    description: 'Looking toward the constellation Fornax, this landmark exposure reveals nearly 10,000 galaxies spanning back to just 400 to 800 million years after the Big Bang.',
    credit: 'NASA, ESA, S. Beckwith (STScI) and the HUDF Team',
    sourceUrl: 'https://images.nasa.gov/details/PIA01492',
    thumbnailUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80',
    fullResUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=2400&q=90',
    aspectRatio: 'portrait',
    dateCaptured: 'March 9, 2004',
    missionOrTelescope: 'Hubble Space Telescope (ACS / NICMOS)'
  },
  {
    id: 'video-svs-jwst-alignment',
    type: 'video',
    title: 'NASA SVS: Flight Through Webb\'s First Deep Field',
    category: 'Deep Field',
    description: 'Scientific 3D visualization by NASA\'s Scientific Visualization Studio taking viewers on a journey through the SMACS 0723 galaxy cluster and its gravitationally lensed background galaxies.',
    credit: 'NASA Goddard Scientific Visualization Studio (SVS)',
    sourceUrl: 'https://svs.gsfc.nasa.gov/14185',
    thumbnailUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80',
    fullResUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=2400&q=90',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', // fallback safe preview
    aspectRatio: 'landscape',
    dateCaptured: '2022',
    missionOrTelescope: 'NASA Scientific Visualization Studio'
  },
  {
    id: 'video-svs-perseverance-landing',
    type: 'video',
    title: 'NASA JPL: Perseverance Rover Mars Touchdown Footage',
    category: 'Spacecraft',
    description: 'Authentic flight footage recorded by the high-speed descent cameras aboard the Mars 2020 Entry, Descent, and Landing (EDL) sky crane showing parachute deploy and Jezero touchdown.',
    credit: 'NASA / JPL-Caltech',
    sourceUrl: 'https://images.nasa.gov/details/PIA24423',
    thumbnailUrl: 'https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?auto=format&fit=crop&w=800&q=80',
    fullResUrl: 'https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?auto=format&fit=crop&w=2400&q=90',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    aspectRatio: 'landscape',
    dateCaptured: 'February 18, 2021',
    missionOrTelescope: 'Mars 2020 EDL Cameras'
  }
];
