export type ArticleCategory =
  | 'Stars'
  | 'Galaxies'
  | 'Nebulae'
  | 'Black Holes'
  | 'Exoplanets'
  | 'Solar System'
  | 'Spacecraft Technology';

export interface ArticleSection {
  heading: string;
  body: string[];
  keyFact?: string;
  diagramSvg?: string;
}

export interface AstronomyArticle {
  slug: string;
  title: string;
  subtitle: string;
  category: ArticleCategory;
  readTimeMinutes: number;
  publishedDate: string;
  heroImage: string;
  authorAgency: string;
  summary: string;
  sections: ArticleSection[];
  relatedSlugs: string[];
  sources: {
    title: string;
    url: string;
  }[];
}

export const ARTICLE_CATEGORIES: ArticleCategory[] = [
  'Stars',
  'Galaxies',
  'Nebulae',
  'Black Holes',
  'Exoplanets',
  'Solar System',
  'Spacecraft Technology',
];

export const ARTICLES_DATA: AstronomyArticle[] = [
  {
    slug: 'how-stars-are-born',
    title: 'How Stars Are Born: Inside Stellar Nurseries',
    subtitle: 'From gravitational collapse to the ignition of nuclear fusion',
    category: 'Stars',
    readTimeMinutes: 6,
    publishedDate: '2024-08-10',
    heroImage: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=1600&q=80',
    authorAgency: 'NASA Goddard / ESA Astrophysics',
    summary: 'Every star in the cosmos originates inside cold, dense molecular clouds of gas and dust. Discover how gravity conquers pressure to ignite thermonuclear fusion.',
    sections: [
      {
        heading: '1. The Molecular Cloud and the Jeans Instability',
        body: [
          'Stars begin their lives deep within giant molecular clouds (GMCs)—vast cosmic reservoirs containing hydrogen, helium, and minute traces of heavier interstellar dust. These clouds can span hundreds of light-years and contain masses equivalent to hundreds of thousands of Suns.',
          'Under ordinary conditions, internal thermal gas pressure resists gravitational compression. However, when an external shockwave—such as a nearby supernova explosion or galactic spiral density wave—passes through the cloud, localized regions exceed the critical Jeans Mass.',
          'Once the Jeans threshold is breached, internal gravity overwhelms thermal pressure, triggering an inexorable gravitational collapse.'
        ],
        keyFact: 'Jeans Mass equation demonstrates that colder and denser clouds collapse far more easily to birth stars.'
      },
      {
        heading: '2. The Protostellar Stage and Hydrostatic Equilibrium',
        body: [
          'As gas collapses inward, gravitational potential energy transforms into kinetic energy and heat. A dense, spinning core known as a protostar forms at the center, surrounded by an accreting circumstellar disk.',
          'Bipolar outflows and magnetic jets blast from the protostar’s poles, blowing away surplus material. Meanwhile, the central core continues heating until core temperatures reach roughly 10 to 15 million Kelvin.',
          'At this threshold, proton-proton chain nuclear fusion begins: hydrogen nuclei fuse into helium, releasing enormous radiative energy. The outward radiation pressure balances inward gravitational collapse, establishing hydrostatic equilibrium—and a new main-sequence star is officially born.'
        ],
        keyFact: 'A star spends approximately 90% of its entire lifespan in stable hydrostatic equilibrium on the main sequence.'
      }
    ],
    relatedSlugs: ['the-life-cycle-of-a-star', 'what-are-nebulae', 'the-pillars-of-creation'],
    sources: [
      { title: 'NASA Astrophysics: How Stars Form', url: 'https://science.nasa.gov/astrophysics/focus-areas/how-do-stars-form-and-evolve/' },
      { title: 'ESA Science & Technology: Star Formation', url: 'https://www.cosmos.esa.int/' }
    ]
  },
  {
    slug: 'the-life-cycle-of-a-star',
    title: 'The Life Cycle of a Star: From Cradle to Supernova',
    subtitle: 'The evolutionary pathways determined entirely by stellar mass',
    category: 'Stars',
    readTimeMinutes: 7,
    publishedDate: '2024-07-22',
    heroImage: 'https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?auto=format&fit=crop&w=1600&q=80',
    authorAgency: 'STScI / NASA Science',
    summary: 'A star\'s destiny is written at birth. Discover how low-mass stars become white dwarfs, while massive stars produce blinding supernovae, neutron stars, or black holes.',
    sections: [
      {
        heading: 'Low-to-Medium Mass Stars (Like Our Sun)',
        body: [
          'Stars with masses below eight solar masses burn through their core hydrogen over billions of years. When core hydrogen exhausts, the core contracts, heating the outer layers until hydrogen fuses in a shell around the core, expanding the star into a Red Giant.',
          'Eventually, the core becomes hot enough to fuse helium into carbon and oxygen via the triple-alpha process. Once helium is depleted, the star gently pulses and sheds its outer gas layers into space, forming a luminous planetary nebula.',
          'The remaining exposed degenerate carbon-oxygen core cools slowly over trillions of years as a dense White Dwarf, supported against gravitational collapse by electron degeneracy pressure.'
        ],
        keyFact: 'Our Sun is currently middle-aged at 4.6 billion years, and will spend another 5 billion years on the main sequence.'
      },
      {
        heading: 'Massive Stars: Core-Collapse Supernovae and Remnants',
        body: [
          'Stars exceeding eight solar masses live fast and die young. They fuse progressively heavier elements in concentric "onion" shells: hydrogen to helium, carbon, neon, oxygen, and silicon, terminating at iron-56.',
          'Iron fusion consumes energy rather than releasing it. When the iron core exceeds the Chandrasekhar limit (~1.4 solar masses), electron degeneracy fails, and the core collapses within a fraction of a second at 23% the speed of light.',
          'The resulting rebound shockwave blasts the star apart in a Type II Core-Collapse Supernova, leaving behind either an ultra-dense Neutron Star (pulsar/magnetar) or, if core mass exceeds the Tolman-Oppenheimer-Volkoff limit (~2.2 solar masses), an inescapable Black Hole.'
        ],
        keyFact: 'A single supernova outshines an entire galaxy of 100 billion stars for several weeks.'
      }
    ],
    relatedSlugs: ['how-stars-are-born', 'what-is-a-black-hole', 'the-pillars-of-creation'],
    sources: [
      { title: 'NASA Universe: Stellar Evolution', url: 'https://science.nasa.gov/universe/stars/' },
      { title: 'Harvard-Smithsonian Center for Astrophysics', url: 'https://www.cfa.harvard.edu/' }
    ]
  },
  {
    slug: 'what-is-a-black-hole',
    title: 'What Is a Black Hole? The Ultimate Gravitational Abyss',
    subtitle: 'Where spacetime curves infinitely and classical physics breaks down',
    category: 'Black Holes',
    readTimeMinutes: 8,
    publishedDate: '2024-09-01',
    heroImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1600&q=80',
    authorAgency: 'Event Horizon Telescope Consortium / NASA',
    summary: 'A black hole is a region of spacetime exhibiting gravitational acceleration so extreme that nothing—no particles or even electromagnetic radiation such as light—can escape.',
    sections: [
      {
        heading: 'General Relativity and the Curvature of Spacetime',
        body: [
          'In 1915, Albert Einstein published his theory of General Relativity, showing that mass and energy warp the fabric of spacetime. Just months later, physicist Karl Schwarzschild solved Einstein\'s field equations for a point mass, discovering the mathematical existence of black holes.',
          'If an object is compressed within its Schwarzschild radius ($R_s = 2GM/c^2$), escape velocity equals the speed of light. At this point, spacetime curvature becomes so severe that all future paths in spacetime point toward the central singularity.',
          'Astronomers now categorize black holes into three primary classes: Stellar-mass black holes (3 to 100 solar masses), Intermediate-mass black holes (hundreds to thousands of solar masses), and Supermassive black holes (millions to billions of solar masses inhabiting galactic centers).'
        ],
        keyFact: 'If Earth were compressed into a black hole, its Schwarzschild radius would measure only 9 millimeters—the size of a marble.'
      },
      {
        heading: 'Accretion Disks, Relativistic Jets, and Direct Imaging',
        body: [
          'While the black hole itself is completely dark, matter spiraling inward forms an accretion disk that reaches temperatures of millions of degrees due to friction and gravitational shear, emitting intense X-rays.',
          'Magnetic field lines twisted by the black hole\'s spin funnel charged particles outward along the rotational axes at 99.9% the speed of light, producing relativistic plasma jets that pierce hundreds of thousands of light-years into intergalactic space.',
          'In 2019, the Event Horizon Telescope (EHT)—a global network of synchronized radio dishes acting as an Earth-sized telescope—captured the first direct shadow image of the supermassive black hole at the heart of galaxy M87.'
        ],
        keyFact: 'The M87* supermassive black hole has a mass equivalent to 6.5 billion Suns and spans 38 billion kilometers across.'
      }
    ],
    relatedSlugs: ['event-horizons-explained', 'the-milky-way-galaxy', 'the-life-cycle-of-a-star'],
    sources: [
      { title: 'NASA Black Holes Science Overview', url: 'https://science.nasa.gov/universe/black-holes/' },
      { title: 'Event Horizon Telescope Results', url: 'https://eventhorizontelescope.org/' }
    ]
  },
  {
    slug: 'event-horizons-explained',
    title: 'Event Horizons Explained: The Cosmic Point of No Return',
    subtitle: 'Gravitational time dilation, spaghettification, and Hawking radiation',
    category: 'Black Holes',
    readTimeMinutes: 6,
    publishedDate: '2024-08-18',
    heroImage: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=1600&q=80',
    authorAgency: 'NASA JPL Theoretical Astrophysics',
    summary: 'The event horizon is not a physical surface, but an absolute boundary in spacetime. Learn what an observer would see when falling toward a black hole.',
    sections: [
      {
        heading: 'Gravitational Time Dilation and Redshift',
        body: [
          'According to General Relativity, gravity affects the flow of time. For an outside observer watching an astronaut fall toward an event horizon, the astronaut’s clocks appear to tick progressively slower.',
          'The light emitted by the falling astronaut undergoes extreme gravitational redshift, shifting toward red, then infrared, and fading to undetectable radio wavelengths. From the perspective of the outside universe, the falling traveler appears frozen at the event horizon forever.',
          'However, for the falling astronaut, their own wristwatch ticks normally. They cross the event horizon in finite proper time, noticing no barrier at the horizon itself, unaware of the point where escape has become geometrically impossible.'
        ],
        keyFact: 'At the exact boundary of the event horizon, the coordinate speed of time relative to an observer at infinity slows to zero.'
      },
      {
        heading: 'Tidal Forces and Spaghettification',
        body: [
          'As an object approaches the singularity, the difference in gravitational pull between its near side and far side produces extreme tidal forces. For a human falling feet-first, their feet experience drastically stronger gravity than their head.',
          'This vertical stretching and horizontal compression is mathematically referred to as "spaghettification". Counter-intuitively, supermassive black holes have much gentler tidal forces at their event horizons than stellar-mass black holes, meaning a traveler could cross the horizon of a supermassive black hole without being immediately torn apart.'
        ],
        keyFact: 'Stephen Hawking proved in 1974 that quantum vacuum fluctuations near the horizon cause black holes to slowly emit thermal Hawking radiation and eventually evaporate.'
      }
    ],
    relatedSlugs: ['what-is-a-black-hole', 'the-milky-way-galaxy'],
    sources: [
      { title: 'NASA Science: Anatomy of a Black Hole', url: 'https://science.nasa.gov/universe/black-holes/anatomy/' }
    ]
  },
  {
    slug: 'the-milky-way-galaxy',
    title: 'The Milky Way Galaxy: Our Cosmic Island of 400 Billion Stars',
    subtitle: 'Barred spiral architecture, dark matter halo, and Sagittarius A*',
    category: 'Galaxies',
    readTimeMinutes: 7,
    publishedDate: '2024-07-30',
    heroImage: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?auto=format&fit=crop&w=1600&q=80',
    authorAgency: 'European Southern Observatory / NASA',
    summary: 'Spanning over 100,000 light-years, the Milky Way is a barred spiral galaxy containing hundreds of billions of stars, planets, and a supermassive black hole at its gravitational anchor.',
    sections: [
      {
        heading: 'Spiral Structure and the Galactic Bar',
        body: [
          'The Milky Way is classified as a barred spiral galaxy (SBbc in Hubble sequence). At its center lies a rectangular central bar of ancient stars spanning roughly 27,000 light-years.',
          'From the tips of this bar extend major spiral arms: Scutum-Centaurus, Perseus, Norma, and Sagittarius, alongside minor spurs like the Orion-Cygnus Arm—where our Solar System resides roughly 26,000 light-years from the galactic core.',
          'Our Sun orbits the galactic center at approximately 220 kilometers per second, taking 230 million years to complete a single "cosmic year".'
        ],
        keyFact: 'The Solar System has completed only about 20 full orbits around the Milky Way since Earth first formed 4.6 billion years ago.'
      },
      {
        heading: 'Sagittarius A* and the Dark Matter Halo',
        body: [
          'At the exact gravitational center of the Milky Way sits Sagittarius A* (Sgr A*), a supermassive black hole with a mass of 4.3 million solar masses. Nobel-prize winning observations tracked stars orbiting Sgr A* at speeds exceeding 7,000 km/s.',
          'Astronomers measuring the rotational speeds of outer stars discovered they move just as fast as inner stars—defying Keplerian physics. This proved that 85% of the galaxy\'s total mass consists of an invisible spherical halo of Dark Matter extending up to 600,000 light-years.'
        ],
        keyFact: 'In May 2022, the Event Horizon Telescope published the first direct visual image of Sagittarius A* at our galaxy\'s core.'
      }
    ],
    relatedSlugs: ['andromeda-galaxy', 'types-of-galaxies', 'what-is-a-black-hole'],
    sources: [
      { title: 'NASA Galactic Astronomy: The Milky Way', url: 'https://science.nasa.gov/universe/galaxies/milky-way/' },
      { title: 'ESA Gaia Satellite Galactic Mapping', url: 'https://www.cosmos.esa.int/web/gaia' }
    ]
  },
  {
    slug: 'andromeda-galaxy',
    title: 'The Andromeda Galaxy: Our Nearest Giant Spiral Neighbor',
    subtitle: 'Messier 31, its one trillion stars, and the inevitable galactic collision',
    category: 'Galaxies',
    readTimeMinutes: 5,
    publishedDate: '2024-06-14',
    heroImage: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=1600&q=80',
    authorAgency: 'Hubble Space Telescope / NASA',
    summary: 'Located 2.5 million light-years away, Andromeda (M31) is the largest member of our Local Group. In 4.5 billion years, it will collide with the Milky Way to form a giant elliptical galaxy.',
    sections: [
      {
        heading: 'Scale and Physical Characteristics',
        body: [
          'The Andromeda Galaxy (cataloged as M31 or NGC 224) spans roughly 220,000 light-years in diameter—more than double the diameter of the Milky Way. It is estimated to contain up to one trillion stars, compared to the Milky Way\'s 100 to 400 billion.',
          'Visible to the naked eye on dark nights as a hazy oval smudge in the constellation Andromeda, M31 is the most distant object visible without binoculars or telescopes.',
          'At its core lies a supermassive black hole containing approximately 100 million solar masses—over 20 times more massive than the Milky Way\'s Sagittarius A*.'
        ],
        keyFact: 'Light arriving from Andromeda tonight began its journey 2.5 million years ago, when early hominids were first crafting stone tools on Earth.'
      },
      {
        heading: 'The Great Galactic Collision: Milkomeda',
        body: [
          'Unlike distant galaxies moving away due to cosmic expansion, Andromeda and the Milky Way are gravitationally bound. Andromeda is rushing toward us at roughly 110 kilometers per second.',
          'In approximately 4.5 billion years, the two giants will begin a grand gravitational collision. Stars are so widely separated that almost no two individual stars will physically collide.',
          'Instead, tidal forces will distort spiral arms into majestic tidal bridges of gas and stars. Over hundreds of millions of years, the galaxies will settle into a giant super-elliptical galaxy unofficially dubbed "Milkomeda".'
        ],
        keyFact: 'By the time the merger begins, our Sun will be expanding into a red giant, but the planets will likely survive the galactic merger intact.'
      }
    ],
    relatedSlugs: ['the-milky-way-galaxy', 'types-of-galaxies'],
    sources: [
      { title: 'NASA Hubble: Andromeda Collision Simulation', url: 'https://science.nasa.gov/mission/hubble/' }
    ]
  },
  {
    slug: 'types-of-galaxies',
    title: 'Types of Galaxies: The Hubble Tuning Fork and Beyond',
    subtitle: 'Spirals, ellipticals, lenticulars, and irregular cosmic assemblies',
    category: 'Galaxies',
    readTimeMinutes: 6,
    publishedDate: '2024-05-19',
    heroImage: 'https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?auto=format&fit=crop&w=1600&q=80',
    authorAgency: 'Space Telescope Science Institute',
    summary: 'In 1926, Edwin Hubble established the morphological classification of galaxies. Learn how galaxy shapes reveal their evolutionary history, star formation rates, and internal dynamics.',
    sections: [
      {
        heading: 'The Morphological Classification Scheme',
        body: [
          'Galaxies are cosmic megastructures containing millions to trillions of stars bound by gravity and dark matter. Hubble organized galaxies into four principal morphological categories:',
          '1. Spiral Galaxies (S/SB): Feature prominent rotating disks, dust lanes, and young blue stars actively forming in spiral arms. Examples include the Milky Way, Andromeda, and the Whirlpool Galaxy (M51).',
          '2. Elliptical Galaxies (E): Smooth, featureless, football-shaped ellipsoids populated by older, red stars with little interstellar gas. They range from dwarf spheroids to supergiant ellipticals like IC 1101, which spans millions of light-years.',
          '3. Lenticular Galaxies (S0): Disk galaxies with central bulges that have exhausted or lost their interstellar gas, halting new star formation.',
          '4. Irregular Galaxies (Irr): Galaxies lacking symmetric structure, often torn by tidal interactions with larger neighbors, such as the Large and Small Magellanic Clouds.'
        ],
        keyFact: 'The observable universe contains an estimated 2 trillion galaxies across a sphere 93 billion light-years in diameter.'
      }
    ],
    relatedSlugs: ['the-milky-way-galaxy', 'andromeda-galaxy', 'what-is-a-black-hole'],
    sources: [
      { title: 'NASA Galaxies Overview', url: 'https://science.nasa.gov/universe/galaxies/' }
    ]
  },
  {
    slug: 'what-are-nebulae',
    title: 'What Are Nebulae? The Cosmic Tapestries of Gas and Dust',
    subtitle: 'Emission, reflection, dark, and planetary nebulae illuminated',
    category: 'Nebulae',
    readTimeMinutes: 6,
    publishedDate: '2024-08-04',
    heroImage: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=1600&q=80',
    authorAgency: 'NASA Chandra X-Ray Observatory',
    summary: 'Nebulae are gigantic clouds of dust, hydrogen, and helium gas in interstellar space. They serve as both the vibrant birthplaces of new stars and the glowing tombs of dying ones.',
    sections: [
      {
        heading: 'The Four Principal Classes of Nebulae',
        body: [
          'The word nebula comes from the Latin word for "cloud" or "fog". Modern astrophysics classifies interstellar nebulae into four distinct physical types:',
          '1. Emission Nebulae: Clouds of ionized gas glowing with their own light, excited by ultraviolet radiation from hot, young O- and B-type stars. The Orion Nebula (M42) is the most famous example, glowing red from ionized hydrogen-alpha emissions.',
          '2. Reflection Nebulae: Clouds of interstellar dust that do not emit light of their own, but scatter and reflect the light of nearby stars, appearing distinctive blue (such as the nebulosity surrounding the Pleiades cluster).',
          '3. Dark Nebulae (Absorption Nebulae): Dense clouds so packed with microscopic dust grains that they completely block background starlight, appearing as silhouettes (such as the Horsehead Nebula in Orion).',
          '4. Planetary Nebulae & Supernova Remnants: Expanding shells of gas ejected by dying stars, enriched with carbon, nitrogen, and oxygen synthesized inside stellar cores.'
        ],
        keyFact: 'Despite their breathtaking visual presence, nebulae are vacuum environments more sparse than any vacuum chamber achievable on Earth.'
      }
    ],
    relatedSlugs: ['the-pillars-of-creation', 'how-stars-are-born', 'the-life-cycle-of-a-star'],
    sources: [
      { title: 'NASA Science: All About Nebulae', url: 'https://science.nasa.gov/universe/nebulae/' }
    ]
  },
  {
    slug: 'the-pillars-of-creation',
    title: 'The Pillars of Creation: Inside the Eagle Nebula',
    subtitle: 'Hubble and JWST\'s most iconic cosmic portrait dissected',
    category: 'Nebulae',
    readTimeMinutes: 5,
    publishedDate: '2024-09-12',
    heroImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1600&q=80',
    authorAgency: 'JWST Science Team / NASA / ESA',
    summary: 'Standing 4 to 5 light-years tall inside the Eagle Nebula (M16), these towering fingers of cool interstellar hydrogen gas and dust are actively sculpting embryonic protostars.',
    sections: [
      {
        heading: 'Anatomy of the Sculpted Pillars',
        body: [
          'Located approximately 6,500 light-years away in the constellation Serpens, the Pillars of Creation were first made world-famous by the Hubble Space Telescope in 1995.',
          'The columns are composed of cold molecular hydrogen and microscopic dust grains that are being eroded and photo-evaporated by blistering ultraviolet radiation from a cluster of nearby massive young stars (NGC 6611).',
          'Protruding from the pillars are dense nodules of gas known as Evaporating Gaseous Globules (EGGs). Inside many of these EGGs, gravity is actively compressing gas into new protostars and planetary systems.'
        ],
        keyFact: 'The tallest pillar is approximately 4 light-years from base to tip—roughly the entire distance between our Sun and Proxima Centauri.'
      },
      {
        heading: 'Infrared Revolution: JWST\'s 2022 Portrait',
        body: [
          'In October 2022, the James Webb Space Telescope imaged the Pillars of Creation with NIRCam (Near-Infrared Camera). Because near-infrared light passes straight through interstellar dust clouds, JWST revealed thousands of newly born stars nestled inside the pillars that were previously invisible to Hubble.',
          'Bright red orbs seen at the tips of dusty pillars indicate young stars only a few hundred thousand years old, complete with supersonic shockwave jets plowing through surrounding gas.'
        ],
        keyFact: 'JWST\'s Mid-Infrared Instrument (MIRI) showed the dust itself glowing in eerie, translucent grey silhouettes.'
      }
    ],
    relatedSlugs: ['what-are-nebulae', 'how-stars-are-born', 'how-the-james-webb-space-telescope-works'],
    sources: [
      { title: 'NASA JWST Pillars of Creation Feature', url: 'https://www.nasa.gov/image-article/james-webb-space-telescope-captures-new-view-of-pillars-of-creation/' }
    ]
  },
  {
    slug: 'how-exoplanets-are-discovered',
    title: 'How Exoplanets Are Discovered: Detecting Alien Worlds',
    subtitle: 'Transit photometry, radial velocity, gravitational microlensing, and direct imaging',
    category: 'Exoplanets',
    readTimeMinutes: 7,
    publishedDate: '2024-07-15',
    heroImage: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?auto=format&fit=crop&w=1600&q=80',
    authorAgency: 'NASA Exoplanet Exploration Program',
    summary: 'Over 5,700 planets orbiting other stars have been confirmed. Learn the clever astronomical detection techniques that transformed science fiction into hard science.',
    sections: [
      {
        heading: '1. The Transit Photometry Method',
        body: [
          'Responsible for over 75% of all exoplanet discoveries, the transit method detects the minuscule dip in a star\'s brightness when an orbiting planet passes directly between the star and the observer.',
          'The depth of the light dip reveals the planet\'s physical radius relative to the star: a Jupiter-sized planet dims a Sun-like star by about 1%, while an Earth-sized world causes a barely perceptible drop of only 0.01% (100 parts per million).',
          'NASA\'s Kepler and TESS missions utilized high-precision transit photometry to discover thousands of planetary systems.'
        ],
        keyFact: 'During a transit, starlight filtering through the exoplanet\'s atmosphere reveals its chemical fingerprints through transmission spectroscopy.'
      },
      {
        heading: '2. Radial Velocity (The Doppler Wobble)',
        body: [
          'A planet does not orbit the exact center of its star; rather, both orbit their shared center of mass (barycenter). As the star wobbles back and forth, its spectral light periodically shifts toward blue as it approaches Earth and red as it recedes.',
          'By measuring Doppler shifts as small as 1 meter per second (walking speed), astronomers calculate the minimum mass ($M \\sin i$) and orbital eccentricity of the orbiting planet.'
        ],
        keyFact: 'Combining transit photometry (which gives radius) with radial velocity (which gives mass) yields density, revealing whether an alien world is rocky, watery, or gaseous.'
      }
    ],
    relatedSlugs: ['habitable-zones', 'how-the-james-webb-space-telescope-works'],
    sources: [
      { title: 'NASA Exoplanet Archive', url: 'https://exoplanetarchive.ipac.caltech.edu/' },
      { title: 'NASA 5,000 Exoplanets Milestone', url: 'https://science.nasa.gov/exoplanets/' }
    ]
  },
  {
    slug: 'habitable-zones',
    title: 'Habitable Zones: The Goldilocks Search for Life',
    subtitle: 'Where liquid water can pool on a terrestrial planet\'s surface',
    category: 'Exoplanets',
    readTimeMinutes: 6,
    publishedDate: '2024-06-28',
    heroImage: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=1600&q=80',
    authorAgency: 'NASA Astrobiology Institute',
    summary: 'The circumstellar habitable zone defines the orbital sweet spot where temperatures allow liquid water. But stellar activity, atmosphere, and magnetospheres dictate true habitability.',
    sections: [
      {
        heading: 'Defining the Circumstellar Habitable Zone',
        body: [
          'Water is the universal solvent essential for all known biochemistry. The circumstellar habitable zone (HZ)—often called the "Goldilocks Zone"—is the range of orbits around a star where radiant flux allows water to exist in liquid form under sufficient atmospheric pressure.',
          'For a hot, luminous star (like an F-type star), the habitable zone lies further out. For a cool, dim red dwarf (M-dwarf), the habitable zone is hugged tightly within a few million kilometers of the star.',
          'In our Solar System, Earth sits comfortably within the habitable zone at 1.0 AU, while Venus lies just inside the runaway greenhouse threshold, and Mars resides near the cold outer boundary.'
        ],
        keyFact: 'The TRAPPIST-1 system contains seven Earth-sized rocky planets orbiting an ultra-cool red dwarf, with three situated squarely within the habitable zone.'
      },
      {
        heading: 'Beyond Orbit: Atmosphere, Magnetism, and Ocean Worlds',
        body: [
          'Being in the habitable zone does not guarantee habitability. A planet requires an active geomagnetic dynamo to shield its atmosphere from stellar wind stripping, and greenhouse gases (CO₂, H₂O) to regulate surface climate.',
          'Furthermore, outer solar system moons like Europa and Enceladus prove that subsurface liquid water oceans can thrive far outside traditional stellar habitable zones, powered by tidal gravitational heating rather than sunlight.'
        ],
        keyFact: 'Tidal flexing from Jupiter generates enough geothermal heat to maintain Europa\'s global liquid ocean beneath 15–25 km of ice.'
      }
    ],
    relatedSlugs: ['how-exoplanets-are-discovered', 'the-kuiper-belt'],
    sources: [
      { title: 'NASA Astrobiology Habitable Worlds', url: 'https://astrobiology.nasa.gov/' }
    ]
  },
  {
    slug: 'the-kuiper-belt',
    title: 'The Kuiper Belt: The Frozen Frontier Beyond Neptune',
    subtitle: 'Pluto, Arrokoth, and trillions of primordial icy relics',
    category: 'Solar System',
    readTimeMinutes: 6,
    publishedDate: '2024-05-30',
    heroImage: 'https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?auto=format&fit=crop&w=1600&q=80',
    authorAgency: 'NASA Planetary Science Division',
    summary: 'Extending from 30 to 55 AU from the Sun, the Kuiper Belt is a vast disk of icy remnants left over from the birth of the solar system 4.6 billion years ago.',
    sections: [
      {
        heading: 'Discovery and Architecture',
        body: [
          'Hypothesized by Gerard Kuiper in 1951 and confirmed observationally in 1992 by David Jewitt and Jane Luu, the Kuiper Belt is a doughnut-shaped ring of icy bodies extending beyond Neptune\'s orbit (30 AU) to roughly 55 AU.',
          'Similar to the asteroid belt between Mars and Jupiter, the Kuiper Belt is a realm of remnants from the primordial protoplanetary disk that were prevented from coalescing into a full planet by Neptune\'s gravitational turbulence.',
          'Objects in the Kuiper Belt (KBOs) are composed predominantly of frozen volatiles such as methane, ammonia, nitrogen, and water ice.'
        ],
        keyFact: 'The Kuiper Belt is over 20 times wider and 20 to 200 times more massive than the main asteroid belt.'
      },
      {
        heading: 'Dwarf Planets and the New Horizons Revolution',
        body: [
          'The Kuiper Belt is home to several recognized dwarf planets, including Pluto, Haumea, and Makemake. Many KBOs, known as "Plutinos", orbit in a 2:3 orbital resonance with Neptune.',
          'In 2015, NASA\'s New Horizons spacecraft provided humanity\'s first close-up reconnaissance of Pluto, revealing active nitrogen glaciers and water-ice mountains.',
          'On New Year\'s Day 2019, New Horizons flew past Arrokoth (486958 Arrokoth), a 36-km-long contact binary that represents the most pristine, un-altered planetesimal ever observed.'
        ],
        keyFact: 'Arrokoth was formed by two separate objects gently docking at walking speed in the cold outer solar nebula.'
      }
    ],
    relatedSlugs: ['the-oort-cloud', 'how-spacecraft-navigate'],
    sources: [
      { title: 'NASA Solar System Exploration: Kuiper Belt', url: 'https://science.nasa.gov/solar-system/kuiper-belt/' }
    ]
  },
  {
    slug: 'the-oort-cloud',
    title: 'The Oort Cloud: The True Gravitational Edge of the Solar System',
    subtitle: 'A colossal spherical shell of icy comets extending halfway to the nearest star',
    category: 'Solar System',
    readTimeMinutes: 5,
    publishedDate: '2024-04-12',
    heroImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1600&q=80',
    authorAgency: 'NASA JPL Small Bodies Group',
    summary: 'Far beyond the Kuiper Belt lies the Oort Cloud—a theoretical spherical bubble of billions of icy bodies extending up to 100,000 AU (nearly 2 light-years) from the Sun.',
    sections: [
      {
        heading: 'Origin and Monumental Scale',
        body: [
          'Proposed in 1950 by Dutch astronomer Jan Oort, this immense cloud explains the origin of long-period comets that enter the inner Solar System with orbital periods of thousands to millions of years.',
          'The Oort Cloud is believed to occupy space starting from roughly 2,000 to 5,000 AU and extending out to 50,000 to 100,000 AU from the Sun. The outer edge marks the boundary of the Sun\'s gravitational dominance (Hill sphere), extending nearly halfway to Proxima Centauri.',
          'Unlike the Kuiper Belt and planetary orbits which lie in a flat plane, the Oort Cloud forms a giant spherical shell surrounding the entire solar system in all three dimensions.'
        ],
        keyFact: 'Voyager 1 will take approximately 300 years to reach the inner edge of the Oort Cloud, and another 30,000 years to exit its outer edge.'
      }
    ],
    relatedSlugs: ['the-kuiper-belt', 'how-stars-are-born'],
    sources: [
      { title: 'NASA Solar System Exploration: Oort Cloud', url: 'https://science.nasa.gov/solar-system/oort-cloud/' }
    ]
  },
  {
    slug: 'how-spacecraft-navigate',
    title: 'How Spacecraft Navigate in Deep Space',
    subtitle: 'Gravity assists, the Deep Space Network, and celestial triangulation',
    category: 'Spacecraft Technology',
    readTimeMinutes: 7,
    publishedDate: '2024-08-29',
    heroImage: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=1600&q=80',
    authorAgency: 'NASA Deep Space Network / JPL Navigation Group',
    summary: 'With no GPS satellites billions of kilometers from Earth, how do spacecraft navigate with millimeter precision? Explore radio Doppler tracking, Delta-DOR, and celestial star trackers.',
    sections: [
      {
        heading: 'Radio Metric Tracking and Delta-DOR',
        body: [
          'Deep space navigation is orchestrated by NASA’s Deep Space Network (DSN), with massive 70-meter antenna complexes spaced approximately 120 degrees apart in California (Goldstone), Spain (Madrid), and Australia (Canberra).',
          'Navigators measure three fundamental radio properties: Range (distance calculated by light round-trip travel time), Doppler shift (velocity along the line of sight derived from frequency changes), and Delta-Differential One-Way Ranging (Delta-DOR).',
          'Delta-DOR uses two widely separated Earth antennas to observe both the spacecraft signal and an ultra-distant celestial quasar simultaneously, determining angular positions across billions of miles to within nanoradians.'
        ],
        keyFact: 'Delta-DOR triangulation is accurate enough to pinpoint the position of a probe at Mars to within a single meter.'
      },
      {
        heading: 'Gravity Assist Slingshots and Orbital Mechanics',
        body: [
          'Carrying enough chemical rocket fuel to accelerate a probe to Jupiter, Saturn, or interstellar space is physically impossible due to the rocket equation. Instead, probes steal orbital momentum from planets via gravity assists.',
          'As a spacecraft swings through a planet\'s gravitational well behind its orbital path, the planet transfers a fraction of its orbital velocity to the probe. The planet slows down by an imperceptible fraction ($10^{-24}$ m/s), while the probe gains thousands of kilometers per hour.'
        ],
        keyFact: 'Voyager 2 utilized four sequential gravity assists (Jupiter, Saturn, Uranus, Neptune) to trim decades off its flight time.'
      }
    ],
    relatedSlugs: ['how-the-james-webb-space-telescope-works', 'the-kuiper-belt'],
    sources: [
      { title: 'NASA Deep Space Network Basics', url: 'https://www.jpl.nasa.gov/missions/deep-space-network-dsn' },
      { title: 'JPL Basics of Space Flight', url: 'https://science.nasa.gov/learn/basics-of-space-flight/' }
    ]
  },
  {
    slug: 'how-the-james-webb-space-telescope-works',
    title: 'How the James Webb Space Telescope Works',
    subtitle: 'Beryllium optics, cryogenic cooling, and peering through cosmic dust',
    category: 'Spacecraft Technology',
    readTimeMinutes: 8,
    publishedDate: '2024-09-20',
    heroImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1600&q=80',
    authorAgency: 'NASA Goddard Space Flight Center',
    summary: 'Positioned 1.5 million kilometers from Earth at Lagrange point L2, JWST is an engineering marvel designed to detect the faint infrared heat signatures of the first stars.',
    sections: [
      {
        heading: 'Why Infrared? Piercing Dust and Cosmic Redshift',
        body: [
          'Because the universe has been expanding for 13.8 billion years, light emitted as ultraviolet and visible light by the earliest stars has been stretched ("redshifted") by cosmic expansion into the near- and mid-infrared spectrum.',
          'Furthermore, cosmic dust clouds that scatter and block visible light are transparent to longer infrared wavelengths. By observing in infrared (0.6 to 28 microns), JWST peers straight into dense stellar nurseries and gazes back to 200 million years after the Big Bang.'
        ],
        keyFact: 'JWST can detect the thermal heat of a bumblebee located at the distance of the Moon.'
      },
      {
        heading: 'The 6.5m Beryllium Mirror and Kapton Sunshield',
        body: [
          'JWST\'s primary mirror is composed of 18 hexagonal segments made from beryllium—a lightweight metal that maintains structural rigidity at cryogenic temperatures. Each segment is coated in a vapor-deposited layer of pure gold just 100 nanometers thick (about 48 grams of gold total), which maximizes infrared reflectivity.',
          'To detect faint infrared heat, the telescope must stay colder than -233°C (-388°F). This is achieved by a five-layer Kapton sunshield measuring 21 by 14 meters. While the Sun-facing side bakes at +85°C (+185°F), the shaded instrument side stays at -233°C—a 300°C thermal gradient across just a few meters.'
        ],
        keyFact: 'MIRI (Mid-Infrared Instrument) utilizes a helium loop cryocooler to chill its detectors down to just 6.7 Kelvin (-266.5°C), a fraction above absolute zero.'
      }
    ],
    relatedSlugs: ['how-stars-are-born', 'how-exoplanets-are-discovered', 'the-pillars-of-creation'],
    sources: [
      { title: 'NASA Webb Engineering Instruments', url: 'https://science.nasa.gov/mission/webb/observatory/' }
    ]
  }
];
