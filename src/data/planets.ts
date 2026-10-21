export interface ExplorationMission {
  name: string;
  agency: string;
  year: string;
  type: 'Flyby' | 'Orbiter' | 'Lander' | 'Rover' | 'Sample Return' | 'Telescope';
  summary: string;
}

export interface MoonSummary {
  id: string;
  name: string;
  diameterKm: number;
  feature: string;
}

export interface CelestialBody {
  id: string;
  name: string;
  tagline: string;
  category: 'Star' | 'Terrestrial Planet' | 'Gas Giant' | 'Ice Giant' | 'Moon';
  parentId?: string; // If it's a moon, points to parent planet ('earth', 'jupiter', 'saturn')
  
  // 3D Visual parameters (Harmonically scaled for interactive exploration)
  visualRadius: number;
  visualDistance: number; // For planets: distance from Sun. For moons: distance from parent planet
  orbitPeriodVisual: number; // visual revolution time scale
  rotationPeriodVisual: number; // visual spin time scale
  axialTiltDeg: number; // true astronomical tilt
  color: string;
  glowColor: string;
  texturePath: string;
  cloudsPath?: string;
  nightMapPath?: string; // High-res city lights
  ring?: {
    innerRadius: number;
    outerRadius: number;
    texturePath: string;
    tiltDeg: number;
  };
  
  // Real Astronomical Reference Data (NASA / JPL Fact Sheets)
  diameterKm: number;
  diameterRelativeToEarth: number;
  massScientific: string;
  massRelativeToEarth: number;
  distanceFromSunAU: number;
  distanceFromSunMillionKm: number;
  orbitalPeriodDays: number;
  orbitalPeriodDescription: string;
  rotationPeriodHours: number;
  rotationPeriodDescription: string;
  surfaceGravityMs2: number;
  surfaceGravityG: number;
  meanTempC: number;
  tempRangeC: string;
  confirmedMoons: number;
  atmosphereComposition: string[];
  notableFeatures: string[];
  missions: ExplorationMission[];
  overview: string;
  scaleNote: string;

  // Major interactive moons list
  interactiveMoons?: MoonSummary[];
}

export const SUN_DATA: CelestialBody = {
  id: 'sun',
  name: 'The Sun (Sol)',
  tagline: 'The Radiant Heart of Our Solar System',
  category: 'Star',
  visualRadius: 4.8,
  visualDistance: 0,
  orbitPeriodVisual: 0,
  rotationPeriodVisual: 25.4,
  axialTiltDeg: 7.25,
  color: '#ffaa22',
  glowColor: '#ffdd55',
  texturePath: '/textures/sun.jpg',
  diameterKm: 1392700,
  diameterRelativeToEarth: 109.2,
  massScientific: '1.989 × 10³⁰ kg',
  massRelativeToEarth: 333000,
  distanceFromSunAU: 0,
  distanceFromSunMillionKm: 0,
  orbitalPeriodDays: 0,
  orbitalPeriodDescription: 'Orbits the Galactic Center every ~230 million years',
  rotationPeriodHours: 609.6, // ~25.4 Earth days at equator
  rotationPeriodDescription: 'Differential: 25.4 days (Equator) to 36 days (Poles)',
  surfaceGravityMs2: 274.0,
  surfaceGravityG: 27.9,
  meanTempC: 5505,
  tempRangeC: '5,505°C (Photosphere) to 15,000,000°C (Core)',
  confirmedMoons: 0,
  atmosphereComposition: ['73.46% Hydrogen', '24.85% Helium', '0.77% Oxygen', '0.29% Carbon'],
  notableFeatures: ['Core Nuclear Fusion Furnace', 'Dynamic Solar Flares & CMEs', 'Sunspot Magnetic Vortexes', 'Corona Hot Gas Halos'],
  missions: [
    { name: 'Parker Solar Probe', agency: 'NASA', year: '2018–Present', type: 'Orbiter', summary: 'Humanity’s closest approach to the Sun, flying through the corona.' },
    { name: 'SOHO', agency: 'NASA / ESA', year: '1995–Present', type: 'Orbiter', summary: 'Continuous real-time solar flare and CME surveillance.' },
    { name: 'Solar Orbiter', agency: 'ESA / NASA', year: '2020–Present', type: 'Orbiter', summary: 'High-resolution imaging of the unexplored solar polar regions.' }
  ],
  overview: 'The Sun contains 99.86% of all mass in the Solar System. Powered by thermonuclear fusion in its core, converting 600 million tons of hydrogen into helium every second, it radiates the energy that drives planetary weather, ocean currents, seasons, and life itself.',
  scaleNote: 'In true scale, the Sun is 109 times wider than Earth. Here it is scaled to 4.8 units to ensure the inner terrestrial planets remain readily visible and interactive on screen.'
};

export const PLANETS_DATA: CelestialBody[] = [
  {
    id: 'mercury',
    name: 'Mercury',
    tagline: 'The Swift Scorched Messenger',
    category: 'Terrestrial Planet',
    visualRadius: 0.55,
    visualDistance: 9.0,
    orbitPeriodVisual: 88,
    rotationPeriodVisual: 58.6,
    axialTiltDeg: 0.034,
    color: '#a39e93',
    glowColor: '#c4beb2',
    texturePath: '/textures/mercury.jpg',
    diameterKm: 4879,
    diameterRelativeToEarth: 0.383,
    massScientific: '3.301 × 10²³ kg',
    massRelativeToEarth: 0.055,
    distanceFromSunAU: 0.387,
    distanceFromSunMillionKm: 57.9,
    orbitalPeriodDays: 87.97,
    orbitalPeriodDescription: '88 Earth Days (Fastest planetary orbit)',
    rotationPeriodHours: 1407.6,
    rotationPeriodDescription: '58.6 Earth Days (3:2 spin-orbit resonance)',
    surfaceGravityMs2: 3.7,
    surfaceGravityG: 0.38,
    meanTempC: 167,
    tempRangeC: '-180°C (Night) to 430°C (Day)',
    confirmedMoons: 0,
    atmosphereComposition: ['42% Molecular Oxygen', '29% Sodium', '22% Hydrogen', '6% Helium', '0.5% Potassium'],
    notableFeatures: ['Caloris Basin (1,550 km impact basin)', 'Discovery Rupes (Kilometer-high tectonic thrust fault)', 'Permanent polar water ice inside shadowed craters'],
    missions: [
      { name: 'MESSENGER', agency: 'NASA', year: '2011–2015', type: 'Orbiter', summary: 'First probe to orbit Mercury; mapped entire surface and confirmed polar water ice.' },
      { name: 'Mariner 10', agency: 'NASA', year: '1974–1975', type: 'Flyby', summary: 'First spacecraft to visit Mercury, capturing initial close-up photographic sweeps.' },
      { name: 'BepiColombo', agency: 'ESA / JAXA', year: '2018–Present', type: 'Orbiter', summary: 'Joint European-Japanese mission carrying dual orbiters for comprehensive analysis.' }
    ],
    overview: 'Mercury is the closest planet to the Sun and the smallest planet in the solar system. Because it has virtually no atmosphere to trap heat, it experiences the most extreme temperature swings in the solar system, from scorching 430°C days to freezing -180°C nights.',
    scaleNote: 'Visual orbital distance is compressed for interactive visualization. Real Mercury orbits on an eccentric path varying from 46 to 70 million km.'
  },
  {
    id: 'venus',
    name: 'Venus',
    tagline: 'The Veiled Greenhouse Inferno',
    category: 'Terrestrial Planet',
    visualRadius: 0.95,
    visualDistance: 13.5,
    orbitPeriodVisual: 224.7,
    rotationPeriodVisual: -243, // Retrograde spin
    axialTiltDeg: 177.36,
    color: '#e3bb76',
    glowColor: '#ffd899',
    texturePath: '/textures/venus.jpg',
    diameterKm: 12104,
    diameterRelativeToEarth: 0.949,
    massScientific: '4.867 × 10²⁴ kg',
    massRelativeToEarth: 0.815,
    distanceFromSunAU: 0.723,
    distanceFromSunMillionKm: 108.2,
    orbitalPeriodDays: 224.7,
    orbitalPeriodDescription: '224.7 Earth Days',
    rotationPeriodHours: -5832.5,
    rotationPeriodDescription: '243 Earth Days (Retrograde spin: Sun rises in West)',
    surfaceGravityMs2: 8.87,
    surfaceGravityG: 0.90,
    meanTempC: 464,
    tempRangeC: '464°C Constant across entire planet',
    confirmedMoons: 0,
    atmosphereComposition: ['96.5% Carbon Dioxide', '3.5% Nitrogen', '0.015% Sulfur Dioxide (Sulfuric acid clouds)'],
    notableFeatures: ['Maxwell Montes (11 km high volcanic mountain)', 'Maat Mons (Active volcano with recent lava flows)', 'Dense supercritical CO₂ atmospheric pressure (92 bar)'],
    missions: [
      { name: 'Magellan', agency: 'NASA', year: '1989–1994', type: 'Orbiter', summary: 'Used synthetic aperture radar to map 98% of Venus’s veiled surface.' },
      { name: 'Venera 13', agency: 'Soviet Union', year: '1981', type: 'Lander', summary: 'Survived 127 minutes in the inferno, transmitting color surface photography and audio.' },
      { name: 'DAVINCI / VERITAS', agency: 'NASA', year: 'Upcoming (2030s)', type: 'Orbiter', summary: 'Next-generation probes to analyze atmospheric origin and tectonic activity.' }
    ],
    overview: 'Often called Earth’s twin due to similar size and composition, Venus is a hellish greenhouse world. Shrouded in opaque reflective sulfuric acid clouds, its surface pressure is equivalent to 900 meters underwater on Earth, hot enough to melt lead.',
    scaleNote: 'Venus spins in retrograde direction (clockwise when viewed from north), resulting in a solar day lasting 117 Earth days.'
  },
  {
    id: 'earth',
    name: 'Earth',
    tagline: 'The Pale Blue Cradle of Life',
    category: 'Terrestrial Planet',
    visualRadius: 1.0,
    visualDistance: 18.5,
    orbitPeriodVisual: 365.25,
    rotationPeriodVisual: 23.93,
    axialTiltDeg: 23.44,
    color: '#2b82d9',
    glowColor: '#60a5fa',
    texturePath: '/textures/earth.jpg',
    cloudsPath: '/textures/earth-clouds.jpg',
    nightMapPath: '/textures/earth-night.jpg',
    diameterKm: 12742,
    diameterRelativeToEarth: 1.0,
    massScientific: '5.972 × 10²⁴ kg',
    massRelativeToEarth: 1.0,
    distanceFromSunAU: 1.0,
    distanceFromSunMillionKm: 149.6,
    orbitalPeriodDays: 365.256,
    orbitalPeriodDescription: '365.25 Earth Days (1 Solar Year)',
    rotationPeriodHours: 23.934,
    rotationPeriodDescription: '23 Hours, 56 Minutes, 4 Seconds (1 Sidereal Day)',
    surfaceGravityMs2: 9.807,
    surfaceGravityG: 1.0,
    meanTempC: 15,
    tempRangeC: '-89.2°C (Vostok, Antarctica) to 56.7°C (Death Valley)',
    confirmedMoons: 1, // Luna
    interactiveMoons: [
      { id: 'moon', name: 'The Moon (Luna)', diameterKm: 3474, feature: 'Only extraterrestrial world stepped upon by human explorers' }
    ],
    atmosphereComposition: ['78.08% Nitrogen', '20.95% Oxygen', '0.93% Argon', '0.04% Carbon Dioxide & Water Vapor'],
    notableFeatures: ['Liquid surface oceans covering 70.8% of surface', 'Dynamo-driven magnetosphere shielding cosmic rays', 'Active plate tectonics recycling crustal carbon'],
    missions: [
      { name: 'Apollo Program', agency: 'NASA', year: '1961–1972', type: 'Lander', summary: 'Landed 12 humans on the Moon; captured the iconic "Earthrise" photograph.' },
      { name: 'Terra & Aqua', agency: 'NASA', year: '1999–Present', type: 'Orbiter', summary: 'Global earth-observing fleet measuring climate, biosphere, and atmosphere.' },
      { name: 'ISS (International Space Station)', agency: 'International', year: '1998–Present', type: 'Orbiter', summary: 'Continuously inhabited microgravity laboratory in low Earth orbit.' }
    ],
    overview: 'Earth is the third planet from the Sun and the only astronomical object known to harbor life. It maintains an ocean-rich surface, a nitrogen-oxygen atmosphere, and a dynamic geomagnetic field produced by its molten iron-nickel outer core.',
    scaleNote: 'Earth serves as the reference unit (1.0 AU distance, 1.0 Mass, 1.0 Diameter) for planetary science comparisons.'
  },
  {
    id: 'mars',
    name: 'Mars',
    tagline: 'The Rust-Hued Frontier of Humanity',
    category: 'Terrestrial Planet',
    visualRadius: 0.68,
    visualDistance: 24.0,
    orbitPeriodVisual: 687,
    rotationPeriodVisual: 24.62,
    axialTiltDeg: 25.19,
    color: '#c25838',
    glowColor: '#f97316',
    texturePath: '/textures/mars.jpg',
    diameterKm: 6779,
    diameterRelativeToEarth: 0.532,
    massScientific: '6.417 × 10²³ kg',
    massRelativeToEarth: 0.107,
    distanceFromSunAU: 1.524,
    distanceFromSunMillionKm: 227.9,
    orbitalPeriodDays: 686.98,
    orbitalPeriodDescription: '687 Earth Days (1.88 Earth Years)',
    rotationPeriodHours: 24.623,
    rotationPeriodDescription: '24 Hours, 37 Minutes (1 Martian Sol)',
    surfaceGravityMs2: 3.721,
    surfaceGravityG: 0.38,
    meanTempC: -63,
    tempRangeC: '-140°C (Polar Winter) to 20°C (Equator Summer)',
    confirmedMoons: 2, // Phobos & Deimos
    atmosphereComposition: ['95.3% Carbon Dioxide', '2.6% Nitrogen', '1.9% Argon', '0.16% Oxygen', '0.08% Carbon Monoxide'],
    notableFeatures: ['Olympus Mons (21.9 km shield volcano, tallest in solar system)', 'Valles Marineris (4,000 km grand canyon system)', 'Dry riverbeds, ancient deltas, and polar CO₂/water ice caps'],
    missions: [
      { name: 'Perseverance & Ingenuity', agency: 'NASA', year: '2021–Present', type: 'Rover', summary: 'Searching for ancient biosignatures in Jezero Crater; first powered flight on another planet.' },
      { name: 'Curiosity Rover', agency: 'NASA', year: '2012–Present', type: 'Rover', summary: 'Discovered ancient persistent freshwater lake in Gale Crater suitable for life.' },
      { name: 'Mars Reconnaissance Orbiter', agency: 'NASA', year: '2006–Present', type: 'Orbiter', summary: 'High-resolution HiRISE imaging and high-bandwidth telecom relay.' }
    ],
    overview: 'Mars is a cold, desert world coated in iron oxide (rust) dust. While its thin atmosphere prevents stable liquid water on the surface today, ancient riverbeds, sedimentary minerals, and subsurface glaciers prove Mars was once warm, wet, and potentially habitable.',
    scaleNote: 'Mars has almost the exact same axial tilt (25.19°) as Earth (23.44°), resulting in similar seasonal patterns, though each season lasts twice as long.'
  },
  {
    id: 'jupiter',
    name: 'Jupiter',
    tagline: 'The King of Worlds and Great Red Eye',
    category: 'Gas Giant',
    visualRadius: 2.2,
    visualDistance: 32.0,
    orbitPeriodVisual: 4333,
    rotationPeriodVisual: 9.93,
    axialTiltDeg: 3.13,
    color: '#c99661',
    glowColor: '#f59e0b',
    texturePath: '/textures/jupiter.jpg',
    diameterKm: 139820,
    diameterRelativeToEarth: 10.97,
    massScientific: '1.898 × 10²⁷ kg',
    massRelativeToEarth: 317.8,
    distanceFromSunAU: 5.204,
    distanceFromSunMillionKm: 778.5,
    orbitalPeriodDays: 4332.59,
    orbitalPeriodDescription: '11.86 Earth Years',
    rotationPeriodHours: 9.925,
    rotationPeriodDescription: '9 Hours, 55 Minutes (Fastest spinning planet)',
    surfaceGravityMs2: 24.79,
    surfaceGravityG: 2.53,
    meanTempC: -110,
    tempRangeC: '-110°C (Cloud tops) to 24,000°C (Core boundary)',
    confirmedMoons: 95,
    interactiveMoons: [
      { id: 'io', name: 'Io', diameterKm: 3643, feature: 'Most volcanically active body in the Solar System (>400 active volcanoes)' },
      { id: 'europa', name: 'Europa', diameterKm: 3122, feature: 'Subsurface global liquid ocean beneath smooth fractured ice crust' },
      { id: 'ganymede', name: 'Ganymede', diameterKm: 5268, feature: 'Largest moon in the Solar System, with its own internal magnetic field' },
      { id: 'callisto', name: 'Callisto', diameterKm: 4821, feature: 'Most heavily cratered, ancient undisturbed surface in the Solar System' }
    ],
    atmosphereComposition: ['89.8% Molecular Hydrogen', '10.2% Helium', '0.3% Methane', '0.026% Ammonia'],
    notableFeatures: ['Great Red Spot (Anticyclonic storm raging for >350 years)', 'Metallic hydrogen mantle generating immense magnetosphere', 'Subsurface ocean moons (Europa, Ganymede, Callisto)'],
    missions: [
      { name: 'Juno', agency: 'NASA', year: '2016–Present', type: 'Orbiter', summary: 'Polar orbiter probing deep core gravity harmonics, water abundance, and auroras.' },
      { name: 'Galileo', agency: 'NASA', year: '1995–2003', type: 'Orbiter', summary: 'First orbiter of Jupiter; dropped probe into atmosphere and detected ocean at Europa.' },
      { name: 'JUICE & Europa Clipper', agency: 'ESA / NASA', year: 'En Route', type: 'Orbiter', summary: 'Targeting Jupiter’s icy ocean moons to evaluate habitability.' }
    ],
    overview: 'Jupiter is more than twice as massive as all other planets combined. With no solid surface, its banded atmosphere is shaped by violent jet streams reaching 600 km/h, deep convection, and the Great Red Spot—a storm wide enough to swallow Earth whole.',
    scaleNote: 'Jupiter’s rapid 10-hour rotation causes a noticeable equatorial bulge, flattening its poles by about 6.5%.'
  },
  {
    id: 'saturn',
    name: 'Saturn',
    tagline: 'The Crown Jewel of the Solar System',
    category: 'Gas Giant',
    visualRadius: 1.85,
    visualDistance: 41.5,
    orbitPeriodVisual: 10759,
    rotationPeriodVisual: 10.7,
    axialTiltDeg: 26.73,
    color: '#d6b885',
    glowColor: '#fbbf24',
    texturePath: '/textures/saturn.jpg',
    ring: {
      innerRadius: 2.3,
      outerRadius: 4.5,
      texturePath: '/textures/saturn-ring.png',
      tiltDeg: 26.73
    },
    diameterKm: 116460,
    diameterRelativeToEarth: 9.14,
    massScientific: '5.683 × 10²⁶ kg',
    massRelativeToEarth: 95.2,
    distanceFromSunAU: 9.582,
    distanceFromSunMillionKm: 1433.5,
    orbitalPeriodDays: 10759.22,
    orbitalPeriodDescription: '29.45 Earth Years',
    rotationPeriodHours: 10.7,
    rotationPeriodDescription: '10 Hours, 42 Minutes',
    surfaceGravityMs2: 10.44,
    surfaceGravityG: 1.06,
    meanTempC: -140,
    tempRangeC: '-140°C (Cloud tops) to 11,700°C (Core)',
    confirmedMoons: 146,
    interactiveMoons: [
      { id: 'titan', name: 'Titan', diameterKm: 5150, feature: 'Dense atmosphere with active liquid methane lakes, rivers, and rain' },
      { id: 'enceladus', name: 'Enceladus', diameterKm: 504, feature: 'Cryovolcanic geysers erupting water vapor & organics from south polar fractures' }
    ],
    atmosphereComposition: ['96.3% Molecular Hydrogen', '3.25% Helium', '0.45% Methane', '0.01% Ammonia'],
    notableFeatures: ['Spectacular ring system spanning 282,000 km but only ~10 meters thick', 'North polar atmospheric Hexagon storm', 'Enceladus water ice geysers feeding the E ring'],
    missions: [
      { name: 'Cassini-Huygens', agency: 'NASA / ESA', year: '1997–2017', type: 'Orbiter', summary: '13-year exploration of Saturn, deployed Huygens to Titan, found ocean geysers at Enceladus.' },
      { name: 'Voyager 1 & 2', agency: 'NASA', year: '1980–1981', type: 'Flyby', summary: 'Provided humanity’s first detailed imagery of Saturn’s intricate ring structure.' },
      { name: 'Dragonfly', agency: 'NASA', year: 'Planned 2028', type: 'Lander', summary: 'Rotorcraft drone mission to fly between methane lakes on moon Titan.' }
    ],
    overview: 'Saturn is the second-largest planet, distinguished by its magnificent rings composed of billions of chunks of 99% pure water ice, ranging from micro-grains to house-sized boulders. Saturn is so light (average density 0.687 g/cm³) that it would float in a giant bathtub of water.',
    scaleNote: 'Saturn’s rings span 282,000 kilometers in width, yet are only about 10 meters thick in most regions.'
  },
  {
    id: 'uranus',
    name: 'Uranus',
    tagline: 'The Sideways Ice Giant',
    category: 'Ice Giant',
    visualRadius: 1.35,
    visualDistance: 50.5,
    orbitPeriodVisual: 30685,
    rotationPeriodVisual: -17.24, // Retrograde
    axialTiltDeg: 97.77, // Rotates on its side!
    color: '#82d3de',
    glowColor: '#38bdf8',
    texturePath: '/textures/uranus.jpg',
    diameterKm: 50724,
    diameterRelativeToEarth: 3.98,
    massScientific: '8.681 × 10²⁵ kg',
    massRelativeToEarth: 14.54,
    distanceFromSunAU: 19.201,
    distanceFromSunMillionKm: 2872.5,
    orbitalPeriodDays: 30685.4,
    orbitalPeriodDescription: '84.02 Earth Years',
    rotationPeriodHours: -17.24,
    rotationPeriodDescription: '17 Hours, 14 Minutes (Retrograde & Tilted 98°)',
    surfaceGravityMs2: 8.69,
    surfaceGravityG: 0.89,
    meanTempC: -195,
    tempRangeC: '-224°C (Coldest measured atmosphere in solar system)',
    confirmedMoons: 28,
    atmosphereComposition: ['82.5% Molecular Hydrogen', '15.2% Helium', '2.3% Methane (Gives cyan-blue tint)', 'Traces of Hydrogen Sulfide'],
    notableFeatures: ['Extreme 97.8° axial tilt—essentially rolling along its orbital plane', 'Miranda’s chevron-ridged fractured canyon geology', 'Faint system of 13 narrow dark rings'],
    missions: [
      { name: 'Voyager 2', agency: 'NASA', year: '1986', type: 'Flyby', summary: 'Only spacecraft to visit Uranus, discovering 10 new moons and 2 new rings.' },
      { name: 'Uranus Orbiter and Probe (UOP)', agency: 'NASA Flagship Priority', year: 'Concept 2030s', type: 'Orbiter', summary: 'Top-priority Decadal Survey flagship mission to explore the ice giant system.' }
    ],
    overview: 'Uranus is an ice giant planet whose mantle consists of superheated, high-pressure water, ammonia, and methane ices. Its extreme 98° tilt—likely caused by an ancient collision with an Earth-sized protoplanet—causes 42 years of continuous sunlight followed by 42 years of polar darkness.',
    scaleNote: 'Uranus rotates almost entirely on its side relative to the solar plane, creating extreme seasonal variations.'
  },
  {
    id: 'neptune',
    name: 'Neptune',
    tagline: 'The Azure Stormworld of the Deep Abyss',
    category: 'Ice Giant',
    visualRadius: 1.3,
    visualDistance: 59.0,
    orbitPeriodVisual: 60189,
    rotationPeriodVisual: 16.11,
    axialTiltDeg: 28.32,
    color: '#3462dc',
    glowColor: '#60a5fa',
    texturePath: '/textures/neptune.jpg',
    diameterKm: 49244,
    diameterRelativeToEarth: 3.86,
    massScientific: '1.024 × 10²⁶ kg',
    massRelativeToEarth: 17.15,
    distanceFromSunAU: 30.047,
    distanceFromSunMillionKm: 4495.1,
    orbitalPeriodDays: 60189.0,
    orbitalPeriodDescription: '164.8 Earth Years',
    rotationPeriodHours: 16.11,
    rotationPeriodDescription: '16 Hours, 6 Minutes',
    surfaceGravityMs2: 11.15,
    surfaceGravityG: 1.14,
    meanTempC: -201,
    tempRangeC: '-218°C (Upper atmosphere) to 7,000°C (Core)',
    confirmedMoons: 16,
    atmosphereComposition: ['80% Molecular Hydrogen', '19% Helium', '1.5% Methane', 'Traces of Deuteride & Ethane'],
    notableFeatures: ['Supersonic winds exceeding 2,100 km/h (Fastest in solar system)', 'Great Dark Spot cyclonic vortexes', 'Moon Triton with retrograde orbit and nitrogen cryovolcanoes'],
    missions: [
      { name: 'Voyager 2', agency: 'NASA', year: '1989', type: 'Flyby', summary: 'Discovered Neptune’s Great Dark Spot, active nitrogen geysers on moon Triton, and rings.' },
      { name: 'Hubble & JWST', agency: 'NASA / ESA', year: 'Ongoing', type: 'Telescope', summary: 'Monitors disappearing clouds, infrared thermal banding, and ring systems.' }
    ],
    overview: 'Neptune is the most distant major planet in the solar system, taking nearly 165 Earth years to complete one orbit. Despite receiving only 0.1% of the sunlight Earth receives, Neptune drives the most violent weather in the solar system with supersonic winds reaching 2,100 km/h.',
    scaleNote: 'Neptune is more than 30 times farther from the Sun than Earth, marking the outer threshold before the icy Kuiper Belt.'
  }
];

export const MOONS_DATA: CelestialBody[] = [
  // 1. EARTH'S MOON (LUNA)
  {
    id: 'moon',
    name: 'The Moon (Luna)',
    tagline: 'Earth’s Faithful Celestial Companion',
    category: 'Moon',
    parentId: 'earth',
    visualRadius: 0.28,
    visualDistance: 2.1,
    orbitPeriodVisual: 27.3,
    rotationPeriodVisual: 27.3,
    axialTiltDeg: 1.54,
    color: '#d1d5db',
    glowColor: '#f3f4f6',
    texturePath: '/textures/moon.jpg',
    diameterKm: 3474.8,
    diameterRelativeToEarth: 0.272,
    massScientific: '7.342 × 10²² kg',
    massRelativeToEarth: 0.0123,
    distanceFromSunAU: 1.0,
    distanceFromSunMillionKm: 149.6,
    orbitalPeriodDays: 27.32,
    orbitalPeriodDescription: '27.3 Earth Days (Tidally locked to Earth)',
    rotationPeriodHours: 655.7,
    rotationPeriodDescription: '27.3 Days (Synchronous rotation)',
    surfaceGravityMs2: 1.62,
    surfaceGravityG: 0.165,
    meanTempC: -20,
    tempRangeC: '-130°C (Night) to +120°C (Day)',
    confirmedMoons: 0,
    atmosphereComposition: ['Trace Exosphere: Helium, Neon, Hydrogen, Argon'],
    notableFeatures: ['Mare Tranquillitatis (Sea of Tranquility - Apollo 11 landing site)', 'South Pole-Aitken Basin (One of largest impact craters in solar system)', 'Permanently shadowed polar craters harboring water ice deposits'],
    missions: [
      { name: 'Apollo 11–17', agency: 'NASA', year: '1969–1972', type: 'Lander', summary: 'Landed 12 astronauts, returned 382 kg of lunar rocks, deployed ALSEP surface experiments.' },
      { name: 'Lunar Reconnaissance Orbiter', agency: 'NASA', year: '2009–Present', type: 'Orbiter', summary: 'Global sub-meter cartography, water-ice identification, radiation environment mapping.' },
      { name: 'Artemis Program', agency: 'NASA / ESA / JAXA', year: '2024–Future', type: 'Lander', summary: 'Return of human crews to lunar south pole and establishment of sustained base.' }
    ],
    overview: 'The Moon is Earth’s only natural satellite and the fifth largest moon in the Solar System. Tidally locked so the same face always points toward Earth, its gravitational pull stabilizes Earth’s axial tilt and drives the ocean tides essential to Earth’s biosphere.',
    scaleNote: 'In reality, the Moon orbits at 384,400 km (~30 Earth diameters away). Here it is scaled closer (2.1 units) for interactive viewing alongside Earth.'
  },

  // 2. IO (JUPITER)
  {
    id: 'io',
    name: 'Io',
    tagline: 'The Volcanic Inferno of Jupiter',
    category: 'Moon',
    parentId: 'jupiter',
    visualRadius: 0.32,
    visualDistance: 3.4,
    orbitPeriodVisual: 1.77,
    rotationPeriodVisual: 1.77,
    axialTiltDeg: 0.0,
    color: '#eab308',
    glowColor: '#facc15',
    texturePath: '/textures/io.jpg',
    diameterKm: 3643.2,
    diameterRelativeToEarth: 0.286,
    massScientific: '8.932 × 10²² kg',
    massRelativeToEarth: 0.015,
    distanceFromSunAU: 5.2,
    distanceFromSunMillionKm: 778.5,
    orbitalPeriodDays: 1.77,
    orbitalPeriodDescription: '1.77 Earth Days (Orbits Jupiter every 42 hours)',
    rotationPeriodHours: 42.5,
    rotationPeriodDescription: '42.5 Hours (Tidally locked)',
    surfaceGravityMs2: 1.796,
    surfaceGravityG: 0.183,
    meanTempC: -130,
    tempRangeC: '-143°C (Surface) to 1,300°C (Volcanic lava calderas)',
    confirmedMoons: 0,
    atmosphereComposition: ['90% Sulfur Dioxide (Volcanic exosphere)'],
    notableFeatures: ['Over 400 active silicate volcanoes (Loki Patera, Pele)', 'Tidal flex heating causing 100-meter ground swells daily', 'Sulfur volcanic plumes erupting 500 km into space'],
    missions: [
      { name: 'Voyager 1', agency: 'NASA', year: '1979', type: 'Flyby', summary: 'Discovered first active extraterrestrial volcanoes, forever changing planetary geology.' },
      { name: 'Galileo Orbiter', agency: 'NASA', year: '1995–2003', type: 'Orbiter', summary: 'Multiple close flybys mapping thermal hotspots and massive lava eruptions.' },
      { name: 'Juno', agency: 'NASA', year: '2023–2024', type: 'Orbiter', summary: 'Executed closest flybys in two decades, imaging complex magma lakes.' }
    ],
    overview: 'Io is caught in a gravitational tug-of-war between colossal Jupiter and sister moons Europa and Ganymede. This intense tidal friction generates immense internal friction, melting its interior and making Io the most volcanically active body in the Solar System.',
    scaleNote: 'Visual orbital radius around Jupiter is illustrative for simultaneous viewing with the Galilean system.'
  },

  // 3. EUROPA (JUPITER)
  {
    id: 'europa',
    name: 'Europa',
    tagline: 'The Ice-Crusted Global Ocean World',
    category: 'Moon',
    parentId: 'jupiter',
    visualRadius: 0.29,
    visualDistance: 4.4,
    orbitPeriodVisual: 3.55,
    rotationPeriodVisual: 3.55,
    axialTiltDeg: 0.1,
    color: '#93c5fd',
    glowColor: '#bfdbfe',
    texturePath: '/textures/europa.jpg',
    diameterKm: 3121.6,
    diameterRelativeToEarth: 0.245,
    massScientific: '4.800 × 10²² kg',
    massRelativeToEarth: 0.008,
    distanceFromSunAU: 5.2,
    distanceFromSunMillionKm: 778.5,
    orbitalPeriodDays: 3.55,
    orbitalPeriodDescription: '3.55 Earth Days (In 2:1 orbital resonance with Io)',
    rotationPeriodHours: 85.2,
    rotationPeriodDescription: '85.2 Hours (Tidally locked)',
    surfaceGravityMs2: 1.315,
    surfaceGravityG: 0.134,
    meanTempC: -160,
    tempRangeC: '-160°C (Equator) to -220°C (Poles)',
    confirmedMoons: 0,
    atmosphereComposition: ['Trace Molecular Oxygen (Radiolytic origin)'],
    notableFeatures: ['Subsurface saltwater ocean 60–150 km deep (Twice volume of all Earth’s oceans)', 'Crisscrossing red-brown "lineae" fractures & cycloid ridges', 'Cryovolcanic water plumes venting directly into space'],
    missions: [
      { name: 'Galileo', agency: 'NASA', year: '1995–2003', type: 'Orbiter', summary: 'Induced magnetic field measurements provided definitive evidence of liquid saltwater mantle.' },
      { name: 'Europa Clipper', agency: 'NASA', year: 'Launched Oct 2024', type: 'Orbiter', summary: 'Flagship mission to execute 49 low-altitude flybys to evaluate astrobiological habitability.' }
    ],
    overview: 'Europa is one of the highest-priority astrobiological exploration targets in the solar system. Beneath a 15–25 km thick water ice crust lies a global liquid ocean kept warm by tidal hydrothermal vents on its seafloor, providing energy, water, and chemistry for potential life.',
    scaleNote: 'Europa’s surface is one of the smoothest in the solar system because fractured ice continuously welds shut.'
  },

  // 4. GANYMEDE (JUPITER)
  {
    id: 'ganymede',
    name: 'Ganymede',
    tagline: 'The Colossus Moon with Its Own Magnetic Field',
    category: 'Moon',
    parentId: 'jupiter',
    visualRadius: 0.44,
    visualDistance: 5.6,
    orbitPeriodVisual: 7.15,
    rotationPeriodVisual: 7.15,
    axialTiltDeg: 0.2,
    color: '#cbd5e1',
    glowColor: '#e2e8f0',
    texturePath: '/textures/ganymede.jpg',
    diameterKm: 5268.2,
    diameterRelativeToEarth: 0.413,
    massScientific: '1.482 × 10²³ kg',
    massRelativeToEarth: 0.025,
    distanceFromSunAU: 5.2,
    distanceFromSunMillionKm: 778.5,
    orbitalPeriodDays: 7.15,
    orbitalPeriodDescription: '7.15 Earth Days (4:2:1 Laplace resonance with Europa and Io)',
    rotationPeriodHours: 171.7,
    rotationPeriodDescription: '171.7 Hours (Tidally locked)',
    surfaceGravityMs2: 1.428,
    surfaceGravityG: 0.146,
    meanTempC: -163,
    tempRangeC: '-113°C (Day) to -183°C (Night)',
    confirmedMoons: 0,
    atmosphereComposition: ['Trace Oxygen & Ozone Exosphere'],
    notableFeatures: ['Only moon in solar system with an internally generated dynamo magnetic field', 'Larger in diameter than planet Mercury and dwarf planet Pluto', 'Subterranean ocean sandwiched between multiple high-pressure ice polymorph layers'],
    missions: [
      { name: 'Galileo', agency: 'NASA', year: '1995–2000', type: 'Orbiter', summary: 'Discovered Ganymede’s intrinsic magnetosphere and mini auroral belts.' },
      { name: 'JUICE (JUpiter ICy moons Explorer)', agency: 'ESA', year: 'Launched 2023', type: 'Orbiter', summary: 'Will enter dedicated orbit around Ganymede in 2034, first probe to orbit an icy moon.' }
    ],
    overview: 'Ganymede is the giant among moons—larger than Mercury and 8% wider than Titan. It has a molten liquid iron core producing its own magnetic field embedded inside Jupiter’s giant magnetosphere, generating spectacular ultraviolet polar auroras.',
    scaleNote: 'Ganymede has two distinct terrain types: dark, ancient heavily cratered regions and lighter, younger grooved tectonic terrains.'
  },

  // 5. CALLISTO (JUPITER)
  {
    id: 'callisto',
    name: 'Callisto',
    tagline: 'The Ancient Heavily Cratered Time Capsule',
    category: 'Moon',
    parentId: 'jupiter',
    visualRadius: 0.40,
    visualDistance: 7.0,
    orbitPeriodVisual: 16.69,
    rotationPeriodVisual: 16.69,
    axialTiltDeg: 0.0,
    color: '#94a3b8',
    glowColor: '#cbd5e1',
    texturePath: '/textures/callisto.jpg',
    diameterKm: 4820.6,
    diameterRelativeToEarth: 0.378,
    massScientific: '1.076 × 10²³ kg',
    massRelativeToEarth: 0.018,
    distanceFromSunAU: 5.2,
    distanceFromSunMillionKm: 778.5,
    orbitalPeriodDays: 16.69,
    orbitalPeriodDescription: '16.69 Earth Days',
    rotationPeriodHours: 400.5,
    rotationPeriodDescription: '400.5 Hours (Tidally locked)',
    surfaceGravityMs2: 1.235,
    surfaceGravityG: 0.126,
    meanTempC: -139,
    tempRangeC: '-108°C (Subsolar point) to -193°C (Night)',
    confirmedMoons: 0,
    atmosphereComposition: ['Trace Carbon Dioxide & Molecular Oxygen'],
    notableFeatures: ['Most heavily cratered object in the Solar System', 'Valhalla Basin (Massive multiring impact structure 3,800 km in diameter)', 'Orbits outside Jupiter’s harsh main radiation belt, candidate for future human base'],
    missions: [
      { name: 'Voyager 1 & 2', agency: 'NASA', year: '1979', type: 'Flyby', summary: 'Revealed completely saturated cratered landscape with zero signs of tectonic renewal.' },
      { name: 'Galileo', agency: 'NASA', year: '1995–2003', type: 'Orbiter', summary: 'Detected induced magnetic signature suggesting an ancient, deep, non-circulating salty layer.' }
    ],
    overview: 'Callisto is the outermost of the Galilean satellites. With no internal tidal heating from orbital resonances, its surface has remained geologically frozen in time for over 4 billion years, preserving an unvarnished chronicle of the early Solar System’s heavy bombardment epoch.',
    scaleNote: 'Because it sits outside Jupiter’s deadly radiation belt, Callisto is considered the safest staging base for future human exploration of the Jovian system.'
  },

  // 6. TITAN (SATURN)
  {
    id: 'titan',
    name: 'Titan',
    tagline: 'The Golden Methane-River World',
    category: 'Moon',
    parentId: 'saturn',
    visualRadius: 0.43,
    visualDistance: 6.0,
    orbitPeriodVisual: 15.95,
    rotationPeriodVisual: 15.95,
    axialTiltDeg: 0.3,
    color: '#f97316',
    glowColor: '#fb923c',
    texturePath: '/textures/titan.webp',
    diameterKm: 5149.5,
    diameterRelativeToEarth: 0.404,
    massScientific: '1.345 × 10²³ kg',
    massRelativeToEarth: 0.0225,
    distanceFromSunAU: 9.58,
    distanceFromSunMillionKm: 1433.5,
    orbitalPeriodDays: 15.945,
    orbitalPeriodDescription: '15.95 Earth Days',
    rotationPeriodHours: 382.7,
    rotationPeriodDescription: '15.95 Days (Tidally locked to Saturn)',
    surfaceGravityMs2: 1.352,
    surfaceGravityG: 0.138,
    meanTempC: -179,
    tempRangeC: '-179°C Constant dense greenhouse haze',
    confirmedMoons: 0,
    atmosphereComposition: ['94.2% Nitrogen', '5.65% Methane', 'Trace Hydrocarbons (Ethane, Acetylene, Propane)'],
    notableFeatures: ['Surface lakes, rivers, and seas of liquid methane and ethane (Kraken Mare)', 'Dense atmosphere 1.5× Earth’s atmospheric pressure', 'Organic orange tholin photochemical smog obscuring surface from space'],
    missions: [
      { name: 'Cassini-Huygens', agency: 'NASA / ESA', year: '2004–2017', type: 'Lander', summary: 'ESA Huygens probe executed historic landing in 2005, transmitting sound and photos of rounded ice pebbles on a methane mud plain.' },
      { name: 'Dragonfly', agency: 'NASA', year: 'Target Launch 2028', type: 'Lander', summary: 'Nuclear-powered octocopter drone designed to fly dozens of kilometers across Titan’s dunes.' }
    ],
    overview: 'Titan is the only moon in the Solar System with a dense, substantial atmosphere and the only extraterrestrial body known to support active liquid rivers, lakes, and seas on its surface. Instead of water, Titan’s hydrologic cycle runs on liquid methane and ethane at -179°C.',
    scaleNote: 'Titan’s atmospheric pressure is 50% greater than Earth’s. Combined with low gravity (0.14g), humans on Titan could strap wings on their arms and easily fly through the air!'
  },

  // 7. ENCELADUS (SATURN)
  {
    id: 'enceladus',
    name: 'Enceladus',
    tagline: 'The Cryovolcanic Ocean Jewel',
    category: 'Moon',
    parentId: 'saturn',
    visualRadius: 0.22,
    visualDistance: 4.8,
    orbitPeriodVisual: 1.37,
    rotationPeriodVisual: 1.37,
    axialTiltDeg: 0.0,
    color: '#e0f2fe',
    glowColor: '#38bdf8',
    texturePath: '/textures/enceladus.jpg',
    diameterKm: 504.2,
    diameterRelativeToEarth: 0.0395,
    massScientific: '1.080 × 10²⁰ kg',
    massRelativeToEarth: 0.000018,
    distanceFromSunAU: 9.58,
    distanceFromSunMillionKm: 1433.5,
    orbitalPeriodDays: 1.37,
    orbitalPeriodDescription: '1.37 Earth Days (Orbits just outside Saturn’s main rings)',
    rotationPeriodHours: 32.9,
    rotationPeriodDescription: '32.9 Hours (Tidally locked)',
    surfaceGravityMs2: 0.113,
    surfaceGravityG: 0.0115,
    meanTempC: -198,
    tempRangeC: '-201°C (Surface) to -130°C (South polar geyser fractures)',
    confirmedMoons: 0,
    atmosphereComposition: ['Water vapor, nitrogen, carbon dioxide, methane plumes (91% H₂O, 4% N₂, 3.2% CO₂, 1.7% CH₄)'],
    notableFeatures: ['Four active "Tiger Stripes" fractures venting water vapor & ice grains at 1,400 km/h', 'Global subsurface liquid water ocean harboring alkaline hydrothermal vents', 'Highest geometric albedo of any body in solar system (reflects 99% of sunlight)'],
    missions: [
      { name: 'Cassini', agency: 'NASA / ESA', year: '2005–2017', type: 'Orbiter', summary: 'Discovered south polar cryovolcanic plumes, flew through geysers, detecting salts, silica nanoparticles, and complex organic macromolecules.' }
    ],
    overview: 'Despite its tiny size (smaller than the United Kingdom), Enceladus is one of the most exciting worlds in planetary science. Plumes of salty water spray from its subsurface ocean directly into space through south-polar fissures, confirming hydrothermal activity and all key chemical prerequisites for life.',
    scaleNote: 'Enceladus is the brightest world in the solar system, coated in fresh, pristine water ice sprayed continuously from its south-polar geysers.'
  }
];

export const CELESTIAL_BODIES: CelestialBody[] = [SUN_DATA, ...PLANETS_DATA];
export const ALL_CELESTIAL_BODIES: CelestialBody[] = [...CELESTIAL_BODIES, ...MOONS_DATA];

export interface GuidedTourStep {
  id: string;
  name: string;
  tagline: string;
  category: string;
  scientificFact: string;
  durationMs: number;
}

export const GUIDED_TOUR_STEPS: GuidedTourStep[] = [
  {
    id: 'sun',
    name: 'The Sun (Sol)',
    tagline: 'The Radiant Heart of Our Solar System',
    category: 'Yellow Dwarf Star',
    scientificFact: 'The Sun accounts for 99.86% of the total mass of the entire Solar System, converting 600 million tons of hydrogen into helium every second via core thermonuclear fusion.',
    durationMs: 7500
  },
  {
    id: 'mercury',
    name: 'Mercury',
    tagline: 'The Swift Scorched Messenger',
    category: 'Terrestrial Planet',
    scientificFact: 'Because it lacks a substantial atmosphere to distribute heat, Mercury undergoes the most violent temperature swings in the solar system: from 430°C during the day down to -180°C at night.',
    durationMs: 7000
  },
  {
    id: 'venus',
    name: 'Venus',
    tagline: 'The Veiled Greenhouse Inferno',
    category: 'Terrestrial Planet',
    scientificFact: 'A runaway greenhouse effect driven by a 96.5% carbon dioxide atmosphere and 92 atmospheres of surface pressure traps heat constantly at 464°C—hotter than the melting point of lead.',
    durationMs: 7000
  },
  {
    id: 'earth',
    name: 'Earth',
    tagline: 'The Pale Blue Cradle of Life',
    category: 'Terrestrial Planet',
    scientificFact: 'Earth is the only planetary body known to maintain surface oceans of liquid water and active plate tectonics, shielded by a powerful geomagnetic field generated by its churning liquid iron core.',
    durationMs: 7000
  },
  {
    id: 'mars',
    name: 'Mars',
    tagline: 'The Rust-Hued Frontier of Humanity',
    category: 'Terrestrial Planet',
    scientificFact: 'Mars hosts Olympus Mons, a massive shield volcano standing 21.9 km high—nearly three times the height of Mount Everest—and Valles Marineris, a canyon system wide enough to span the entire United States.',
    durationMs: 7000
  },
  {
    id: 'jupiter',
    name: 'Jupiter',
    tagline: 'The King of Worlds and Great Red Eye',
    category: 'Gas Giant',
    scientificFact: 'Jupiter’s famous Great Red Spot is an anticyclonic storm wider than Earth that has been observed raging for over 350 years, sustained by deep atmospheric convection.',
    durationMs: 7500
  },
  {
    id: 'saturn',
    name: 'Saturn',
    tagline: 'The Crown Jewel of the Solar System',
    category: 'Gas Giant',
    scientificFact: 'Saturn’s rings span 282,000 km across but are astonishingly thin—averaging only about 10 meters thick—composed of billions of fragments of 99% pure water ice.',
    durationMs: 7500
  },
  {
    id: 'uranus',
    name: 'Uranus',
    tagline: 'The Sideways Ice Giant',
    category: 'Ice Giant',
    scientificFact: 'Uranus rotates almost entirely on its side with an axial tilt of 97.8 degrees, likely the aftermath of a cataclysmic collision with an Earth-sized protoplanet billions of years ago.',
    durationMs: 7000
  },
  {
    id: 'neptune',
    name: 'Neptune',
    tagline: 'The Azure Stormworld of the Deep Abyss',
    category: 'Ice Giant',
    scientificFact: 'Despite receiving only 0.1% of Earth’s sunlight, Neptune drives the fastest recorded atmospheric winds in the solar system, reaching supersonic speeds over 2,100 km/h.',
    durationMs: 7000
  }
];

export const ATTRIBUTIONS = [
  {
    title: 'Planetary Surface & Atmospheric Textures',
    source: 'Solar System Scope (CC BY 4.0) & NASA / JPL-Caltech',
    url: 'https://www.solarsystemscope.com/textures/',
    details: 'Equirectangular maps derived from Cassini, Galileo, MESSENGER, New Horizons, Viking, and Lunar Reconnaissance Orbiter spacecraft telemetry.'
  },
  {
    title: 'Galilean & Saturnian Moon Maps',
    source: 'NASA Scientific Visualization Studio & USGS Astrogeology',
    url: 'https://svs.gsfc.nasa.gov/',
    details: 'Surface imagery for the Moon, Io, Europa, Ganymede, Callisto, Titan, and Enceladus processed from raw probe observation mosaics.'
  },
  {
    title: 'Astronomical Reference Telemetry',
    source: 'NASA Planetary Science Data / JPL Fact Sheets',
    url: 'https://nssdc.gsfc.nasa.gov/planetary/factsheet/',
    details: 'Gravitational parameters, orbital periods, masses, axial tilts, and physical dimensions from official NASA/NSSDC publications.'
  },
  {
    title: 'Visual Scale & Distance Harmonization',
    source: 'COSMOS Interactive Space Engine',
    url: 'https://science.nasa.gov/solar-system/',
    details: 'Planetary radii and orbital radii are harmonically scaled using a compressed logarithmic model for interactive WebGL viewport navigation while retaining true scientific relative values in telemetry panels.'
  }
];

export function getInitialBodyPositions(): Record<string, [number, number, number]> {
  const positions: Record<string, [number, number, number]> = {
    sun: [0, 0, 0],
  };

  PLANETS_DATA.forEach((planet, index) => {
    const angle = (index * 2.39996) % (Math.PI * 2);
    positions[planet.id] = [
      Math.cos(angle) * planet.visualDistance,
      0,
      Math.sin(angle) * planet.visualDistance
    ];
  });

  MOONS_DATA.forEach((moon, index) => {
    const parentPos = positions[moon.parentId!] || [0, 0, 0];
    const angle = (index * 1.57 + 0.8) % (Math.PI * 2);
    positions[moon.id] = [
      parentPos[0] + Math.cos(angle) * moon.visualDistance,
      parentPos[1],
      parentPos[2] + Math.sin(angle) * moon.visualDistance
    ];
  });

  return positions;
}

