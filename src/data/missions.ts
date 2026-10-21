export interface MissionMilestone {
  date: string;
  title: string;
  description: string;
}

export interface MissionSpecification {
  launchVehicle: string;
  launchMassKg: number;
  powerSource: string;
  missionDuration: string;
  costEstimate?: string;
  primaryInstruments: string[];
}

export interface SpacecraftComponent {
  name: string;
  description: string;
  position: [number, number, number];
}

export interface SpacecraftModelConfig {
  has3DViewer: boolean;
  modelType: 'voyager' | 'cassini' | 'jwst';
  components: SpacecraftComponent[];
}

export interface SpaceMission {
  id: string;
  name: string;
  agency: string;
  agencyLogo?: string;
  launchDate: string;
  status: 'Active' | 'Completed' | 'En Route';
  statusAsOf: string;
  primaryDestination: string;
  destinationCategory: 'Outer Solar System' | 'Jupiter' | 'Saturn' | 'Mars' | 'Deep Space';
  relatedBodyIds: string[]; // e.g. ['earth', 'jupiter', 'saturn', 'europa']
  tagline: string;
  heroImage: string;
  spacecraftImage: string;
  description: string;
  longOverview: string;
  objectives: string[];
  keyDiscoveries: string[];
  specifications: MissionSpecification;
  milestones: MissionMilestone[];
  officialSourceUrls: {
    label: string;
    url: string;
  }[];
  modelConfig?: SpacecraftModelConfig;
}

export const MISSIONS_DATA: SpaceMission[] = [
  {
    id: 'voyager-1',
    name: 'Voyager 1',
    agency: 'NASA / JPL',
    launchDate: 'September 5, 1977',
    status: 'Active',
    statusAsOf: 'October 2024 (Operating in Interstellar Space at >164 AU from Sun)',
    primaryDestination: 'Interstellar Space (via Jupiter & Saturn)',
    destinationCategory: 'Deep Space',
    relatedBodyIds: ['jupiter', 'saturn', 'titan', 'io'],
    tagline: "Humanity's most distant emissary exploring the space between the stars",
    heroImage: 'https://images.nasa.gov/details/PIA21980',
    spacecraftImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1600&q=80',
    description: 'Launched in 1977, Voyager 1 completed historic flybys of Jupiter (1979) and Saturn (1980) before becoming the first human-made object to enter interstellar space in August 2012.',
    longOverview: 'Voyager 1 is a 722-kilogram space probe launched by NASA on September 5, 1977, to study the outer Solar System and interstellar space. Operating for over 47 years, it communicates through the Deep Space Network to receive routine commands and transmit data. On August 25, 2012, Voyager 1 crossed the heliopause at 121 AU to become the first spacecraft to enter interstellar space. It carries the Golden Record, a gold-plated copper phonograph record containing sounds and images selected to portray the diversity of life and culture on Earth.',
    objectives: [
      'Investigate the weather, magnetic fields, and rings of Jupiter and Saturn',
      'Provide first high-resolution imagery of Jovian moons (Io, Europa, Ganymede, Callisto)',
      'Perform close-range radar and optical reconnaissance of Saturn\'s giant moon Titan',
      'Characterize the outer boundary of the Sun\'s magnetic influence (heliopause) and interstellar medium'
    ],
    keyDiscoveries: [
      'Discovered active volcanism on Jupiter\'s moon Io—the first proof of active volcanoes beyond Earth',
      'Identified complex ringlets, spokes, and new shepherd moons in Saturn\'s intricate ring system',
      'Determined that Titan possesses a dense, nitrogen-dominated atmosphere with complex organic chemistry',
      'Measured the precise transition into interstellar space by detecting an 80-fold increase in galactic cosmic rays'
    ],
    specifications: {
      launchVehicle: 'Titan IIIE / Centaur',
      launchMassKg: 773,
      powerSource: '3 Radioisotope Thermoelectric Generators (RTGs) fueled by Plutonium-238',
      missionDuration: '47+ Years (Ongoing)',
      costEstimate: '$865 Million (Voyager program combined)',
      primaryInstruments: [
        'High-Gain Cassegrain Antenna (3.7-meter diameter)',
        'Cosmic Ray Subsystem (CRS)',
        'Low-Energy Charged Particle (LECP)',
        'Magnetometer (MAG)',
        'Plasma Wave Subsystem (PWS)'
      ]
    },
    milestones: [
      { date: 'September 5, 1977', title: 'Launch from Cape Canaveral', description: 'Launched aboard a Titan IIIE/Centaur rocket on a trajectory to Jupiter.' },
      { date: 'March 5, 1979', title: 'Closest Approach to Jupiter', description: 'Passed within 349,000 km of Jupiter\'s cloud tops, discovering volcanoes on Io.' },
      { date: 'November 12, 1980', title: 'Encounter with Saturn & Titan', description: 'Flew within 6,490 km of Titan, gathering atmospheric composition measurements.' },
      { date: 'February 14, 1990', title: 'The Pale Blue Dot Portrait', description: 'Snapped the famous Family Portrait of the Solar System from 6 billion km away.' },
      { date: 'August 25, 2012', title: 'Crossing into Interstellar Space', description: 'Crossed the heliopause into true interstellar space at 121 astronomical units.' }
    ],
    officialSourceUrls: [
      { label: 'NASA Voyager Mission Profile', url: 'https://science.nasa.gov/mission/voyager/' },
      { label: 'JPL Voyager Where Are They Now?', url: 'https://voyager.jpl.nasa.gov/mission/status/' }
    ],
    modelConfig: {
      has3DViewer: true,
      modelType: 'voyager',
      components: [
        { name: '3.7m High-Gain Antenna', description: 'Transmits microwave signals across billions of kilometers back to Earth.', position: [0, 0.9, 0] },
        { name: 'Radioisotope Thermoelectric Generator (RTG)', description: 'Decaying Plutonium-238 converts heat into electrical power.', position: [-1.4, -0.3, 0] },
        { name: 'Magnetometer Boom', description: 'Extends 13 meters away from spacecraft electrical interference.', position: [0, -0.2, 1.8] },
        { name: 'Golden Record', description: 'Gold-plated phonograph disc containing sounds and images of Earth.', position: [0.6, -0.4, 0.4] }
      ]
    }
  },
  {
    id: 'voyager-2',
    name: 'Voyager 2',
    agency: 'NASA / JPL',
    launchDate: 'August 20, 1977',
    status: 'Active',
    statusAsOf: 'October 2024 (Operating in Interstellar Space at >137 AU from Sun)',
    primaryDestination: 'Interstellar Space (The Grand Tour: Jupiter, Saturn, Uranus, Neptune)',
    destinationCategory: 'Outer Solar System',
    relatedBodyIds: ['jupiter', 'saturn', 'uranus', 'neptune', 'europa', 'enceladus'],
    tagline: 'The only spacecraft to conduct close reconnaissance of all four giant planets',
    heroImage: 'https://images.nasa.gov/details/PIA01492',
    spacecraftImage: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=1600&q=80',
    description: 'Voyager 2 completed the historic "Grand Tour" of the outer planets, providing humankind\'s only close-up visits to Uranus (1986) and Neptune (1989), before crossing into interstellar space in 2018.',
    longOverview: 'Voyager 2 was launched 16 days before Voyager 1 on a longer, looping trajectory that capitalized on a rare geometric alignment of the outer planets occurring only once every 175 years. It remains the only probe to have visited both ice giants, Uranus and Neptune. In November 2018, Voyager 2 joined its twin in interstellar space, providing humanity with its second direct data stream from beyond the solar bubble.',
    objectives: [
      'Complete the rare four-planet alignment Grand Tour (Jupiter, Saturn, Uranus, Neptune)',
      'Conduct first in-situ analysis of ice giant atmospheres and magnetic fields',
      'Discover rings, moons, and atmospheric dynamics of Uranus and Neptune',
      'Sample the heliospheric termination shock and interstellar medium'
    ],
    keyDiscoveries: [
      'Discovered 11 new moons and 2 new rings around Uranus; revealed its 98° tilted magnetic field',
      'Discovered the Great Dark Spot and supersonic 2,100 km/h winds in Neptune\'s dynamic atmosphere',
      'Captured geysers of liquid nitrogen erupting on Neptune\'s frigid moon Triton',
      'Confirmed the heliopause boundary thickness and interstellar magnetic alignment'
    ],
    specifications: {
      launchVehicle: 'Titan IIIE / Centaur',
      launchMassKg: 773,
      powerSource: '3 Radioisotope Thermoelectric Generators (RTGs)',
      missionDuration: '47+ Years (Ongoing)',
      costEstimate: '$865 Million (Voyager program combined)',
      primaryInstruments: [
        '3.7m Parabolic High-Gain Antenna',
        'Plasma Science Instrument (PLS)',
        'Cosmic Ray Subsystem (CRS)',
        'Magnetometer (MAG)',
        'Photopolarimeter Subsystem (PPS)'
      ]
    },
    milestones: [
      { date: 'August 20, 1977', title: 'Launch from Cape Canaveral', description: 'Lifted off before Voyager 1 to begin its historic multi-planet journey.' },
      { date: 'July 9, 1979', title: 'Jupiter Encounter', description: 'Closest approach to Jupiter, mapping atmospheric currents and the Great Red Spot.' },
      { date: 'August 26, 1981', title: 'Saturn Encounter', description: 'Used Saturn\'s gravitational field to slingshot toward Uranus.' },
      { date: 'January 24, 1986', title: 'First Visit to Uranus', description: 'Closest approach to Uranus (81,500 km), discovering 10 new moons.' },
      { date: 'August 25, 1989', title: 'First Visit to Neptune', description: 'Passed 4,950 km above Neptune\'s north pole, imaging geysers on moon Triton.' },
      { date: 'November 5, 2018', title: 'Entered Interstellar Space', description: 'Plasma instrument detected sudden drop in solar wind particles at 119 AU.' }
    ],
    officialSourceUrls: [
      { label: 'NASA Voyager 2 Science Facts', url: 'https://science.nasa.gov/mission/voyager/voyager-2/' },
      { label: 'JPL Planetary Grand Tour History', url: 'https://voyager.jpl.nasa.gov/mission/' }
    ]
  },
  {
    id: 'cassini-huygens',
    name: 'Cassini-Huygens',
    agency: 'NASA / ESA / ASI',
    launchDate: 'October 15, 1997',
    status: 'Completed',
    statusAsOf: 'September 15, 2017 (Grand Finale deliberate atmospheric plunge into Saturn)',
    primaryDestination: 'Saturnian System & Titan',
    destinationCategory: 'Saturn',
    relatedBodyIds: ['saturn', 'titan', 'enceladus'],
    tagline: 'A 13-year epic voyage unveiling the jewel of the solar system',
    heroImage: 'https://images.nasa.gov/details/PIA12713',
    spacecraftImage: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?auto=format&fit=crop&w=1600&q=80',
    description: 'Cassini orbited Saturn from 2004 to 2017, deploying the European Huygens lander onto Titan\'s surface and discovering subsurface global liquid water oceans under the icy crust of Enceladus.',
    longOverview: 'A flagship collaboration between NASA, the European Space Agency (ESA), and the Italian Space Agency (ASI), Cassini-Huygens spent nearly two decades in space. It entered Saturn orbit in July 2004, and in January 2005, the Huygens probe made the first landing in the outer solar system on the methane-rich world of Titan. Cassini revolutionized astrobiology by discovering active water-ice geysers erupting from the south pole of Enceladus, indicating a warm, subsurface ocean with hydrothermal vents capable of harboring life.',
    objectives: [
      'Determine the 3D structure and dynamic behavior of Saturn\'s rings',
      'Map the surface chemistry and geology of giant moon Titan',
      'Investigate the atmosphere, internal core, and magnetosphere of Saturn',
      'Conduct close flybys of icy satellites to assess their composition and potential habitability'
    ],
    keyDiscoveries: [
      'Discovered subsurface liquid water ocean with hydrothermal activity on moon Enceladus',
      'Huygens probe landed on Titan, discovering liquid methane-ethane lakes, rivers, and rain',
      'Discovered giant hexagonal jet-stream storm spinning around Saturn\'s north pole',
      'Mapped the density waves and dynamic shepherd moon gravitational interactions in Saturn\'s rings'
    ],
    specifications: {
      launchVehicle: 'Titan IVB / Centaur',
      launchMassKg: 5712,
      powerSource: '3 Radioisotope Thermoelectric Generators (GPHS-RTGs)',
      missionDuration: '19 Years, 11 Months',
      costEstimate: '$3.26 Billion (NASA, ESA, ASI combined)',
      primaryInstruments: [
        'Huygens Atmospheric Descent Probe',
        'Composite Infrared Spectrometer (CIRS)',
        'Imaging Science Subsystem (ISS)',
        'Cassini Radar Mapper',
        'Ion and Neutral Mass Spectrometer (INMS)',
        'Magnetometer (MAG)'
      ]
    },
    milestones: [
      { date: 'October 15, 1997', title: 'Launch from Cape Canaveral', description: 'Began 7-year interplanetary journey utilizing Venus-Venus-Earth-Jupiter gravity assists.' },
      { date: 'July 1, 2004', title: 'Saturn Orbit Insertion (SOI)', description: 'Became the first artificial satellite to enter orbit around the ringed planet.' },
      { date: 'January 14, 2005', title: 'Huygens Descent on Titan', description: 'ESA probe landed on Titan, transmitting photos of rounded riverbed pebbles.' },
      { date: 'March 9, 2006', title: 'Water Geysers on Enceladus', description: 'Confirmed cryovolcanic plumes shooting organic compounds and water into space.' },
      { date: 'September 15, 2017', title: 'The Grand Finale', description: 'Deliberate plunge into Saturn\'s crushing atmosphere to protect pristine moons from biological contamination.' }
    ],
    officialSourceUrls: [
      { label: 'NASA Cassini Legacy Archive', url: 'https://science.nasa.gov/mission/cassini/' },
      { label: 'ESA Cassini-Huygens Mission Portal', url: 'https://www.esa.int/Science_Exploration/Space_Science/Cassini-Huygens' }
    ],
    modelConfig: {
      has3DViewer: true,
      modelType: 'cassini',
      components: [
        { name: '4m High-Gain Antenna', description: 'Primary radar dish and Earth communications reflector.', position: [0, 1.2, 0] },
        { name: 'Huygens Titan Probe Shell', description: '2.7-meter disc-shaped probe deployed into Titan\'s methane clouds.', position: [0.9, -0.1, 0.4] },
        { name: 'Magnetometer Boom', description: '11-meter extendable boom carrying dual fluxgate sensors.', position: [-1.2, 0.2, -0.6] },
        { name: 'Main Rocket Engine (445 N)', description: 'Bipropellant thruster used for orbit insertion and major trajectory maneuvers.', position: [0, -1.1, 0] }
      ]
    }
  },
  {
    id: 'juno',
    name: 'Juno',
    agency: 'NASA / JPL',
    launchDate: 'August 5, 2011',
    status: 'Active',
    statusAsOf: 'October 2024 (Operating in Extended Mission around Jupiter)',
    primaryDestination: 'Jupiter System',
    destinationCategory: 'Jupiter',
    relatedBodyIds: ['jupiter', 'io', 'europa', 'ganymede'],
    tagline: 'Peering beneath the violent clouds of the solar system\'s king of worlds',
    heroImage: 'https://images.nasa.gov/details/PIA21972',
    spacecraftImage: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?auto=format&fit=crop&w=1600&q=80',
    description: 'Juno arrived at Jupiter in July 2016 in a highly elliptical polar orbit, using microwave sounding and gravity mapping to probe deep beneath the gas giant\'s dense ammonia-hydrogen clouds.',
    longOverview: 'Juno is the first mission to orbit Jupiter using solar panels instead of RTGs, featuring three massive 9-meter solar arrays. It dives as close as 3,500 km above Jupiter\'s swirling storm tops every few weeks. Juno has revolutionized planetary physics by discovering that Jupiter does not possess a dense rock-metal core, but rather a "fuzzy", diluted core mixed with metallic hydrogen that extends across nearly half the planet\'s radius.',
    objectives: [
      'Determine the amount of water and oxygen in Jupiter\'s atmosphere',
      'Map the gravitational and magnetic fields to understand planetary core structure',
      'Measure the depth and roots of atmospheric jet streams and the Great Red Spot',
      'Investigate Jupiter\'s intense polar magnetosphere and ultraviolet auroras'
    ],
    keyDiscoveries: [
      'Discovered Jupiter has a diffuse, diluted core rather than a compact rocky center',
      'Determined that the Great Red Spot extends roughly 300 to 500 km deep into the atmosphere',
      'Revealed geometric clusters of cyclonic storms at both poles (8 surrounding 1 at north, 5 at south)',
      'Captured ultra-high-resolution views of volcanic eruptions on Io and ice rifts on Europa'
    ],
    specifications: {
      launchVehicle: 'Atlas V 551',
      launchMassKg: 3625,
      powerSource: '3 Tri-Fold Solar Array Wings (Total span: 20 meters, 18,698 solar cells)',
      missionDuration: '13+ Years (Active)',
      costEstimate: '$1.13 Billion',
      primaryInstruments: [
        'JunoCam Public Outreach Imager',
        'Microwave Radiometer (MWR)',
        'Fluxgate Magnetometer (FGM)',
        'Jovian Auroral Distributions Experiment (JADE)',
        'Gravity Science Experiment (Ka-band/X-band)'
      ]
    },
    milestones: [
      { date: 'August 5, 2011', title: 'Launch from Cape Canaveral', description: 'Launched on an Atlas V rocket into a five-year cruise to Jupiter.' },
      { date: 'October 9, 2013', title: 'Earth Gravity Assist', description: 'Flew past Earth at 559 km altitude to gain orbital velocity.' },
      { date: 'July 4, 2016', title: 'Jupiter Orbit Insertion (JOI)', description: 'Executed 35-minute engine burn to lock into polar orbit around Jupiter.' },
      { date: 'July 10, 2017', title: 'First Close Flyby of Great Red Spot', description: 'Passed directly 9,000 km over the 16,000-km-wide storm.' },
      { date: 'June 2021', title: 'Extended Mission: Moon Reconnaissance', description: 'Began close passes by Ganymede, Europa, and volcanic Io.' }
    ],
    officialSourceUrls: [
      { label: 'NASA Juno Mission Overview', url: 'https://science.nasa.gov/mission/juno/' },
      { label: 'Mission Juno SouthWest Research Institute Portal', url: 'https://www.missionjuno.swri.edu/' }
    ]
  },
  {
    id: 'perseverance',
    name: 'Mars 2020 Perseverance',
    agency: 'NASA / JPL',
    launchDate: 'July 30, 2020',
    status: 'Active',
    statusAsOf: 'October 2024 (Exploring Jezero Crater rim & collecting return samples)',
    primaryDestination: 'Mars (Jezero Crater)',
    destinationCategory: 'Mars',
    relatedBodyIds: ['mars'],
    tagline: 'Seeking signs of ancient life and collecting rock cores for return to Earth',
    heroImage: 'https://images.nasa.gov/details/PIA24423',
    spacecraftImage: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?auto=format&fit=crop&w=1600&q=80',
    description: 'Perseverance touched down in Mars\' Jezero Crater in February 2021, deploying the Ingenuity Mars Helicopter, demonstrating in-situ oxygen generation with MOXIE, and hermetically sealing rock core samples for Mars Sample Return.',
    longOverview: 'Perseverance is a car-sized rover manufactured by JPL, weighing 1,025 kilograms. It landed in Jezero Crater—a 45-km-wide impact basin that was flooded with liquid water 3.5 billion years ago, featuring an ancient river delta. Equipped with advanced Raman and fluorescence spectrometers (SHERLOC) and an X-ray lithochemist (PIXL), the rover identifies ancient biosignatures and deposits sealed sample tubes for retrieval by a future joint NASA-ESA Mars Sample Return campaign.',
    objectives: [
      'Assess past planetary habitability and identify candidate biosignatures',
      'Collect and seal a diverse cache of scientifically valuable rock and soil cores',
      'Demonstrate technology for human exploration: produce oxygen from Martian atmospheric CO₂',
      'Fly the first powered, controlled aircraft on another planet (Ingenuity Mars Helicopter)'
    ],
    keyDiscoveries: [
      'Confirmed Jezero Crater was once an ancient lake with an active river delta flowing into it',
      'Discovered diverse organic carbon compounds preserved in multiple sedimentary rock formations',
      'Produced breathable oxygen (MOXIE instrument) directly from Mars\' thin CO₂ atmosphere',
      'Supported Ingenuity helicopter through 72 successful flights covering over 17 kilometers'
    ],
    specifications: {
      launchVehicle: 'Atlas V 541',
      launchMassKg: 1025,
      powerSource: 'Multi-Mission Radioisotope Thermoelectric Generator (MMRTG)',
      missionDuration: '4+ Years on Mars (Ongoing)',
      costEstimate: '$2.75 Billion',
      primaryInstruments: [
        'Mastcam-Z Multispectral Stereo Camera',
        'SuperCam Laser-Induced Breakdown Spectrometer',
        'PIXL Planetary Instrument for X-ray Lithochemistry',
        'SHERLOC UV Raman Biosignature Spectrometer',
        'MOXIE Mars Oxygen ISRU Experiment',
        'RIMFAX Subsurface Radar'
      ]
    },
    milestones: [
      { date: 'July 30, 2020', title: 'Launch from Cape Canaveral', description: 'Departed Earth during the 2020 Mars launch window.' },
      { date: 'February 18, 2021', title: 'Touchdown in Jezero Crater', description: 'Executed autonomous Terrain Relative Navigation and Sky Crane descent.' },
      { date: 'April 19, 2021', title: 'Ingenuity First Flight', description: 'Completed first powered, controlled aviation flight on another world.' },
      { date: 'September 6, 2021', title: 'First Martian Rock Core Sealed', description: 'Extracted and sealed core sample "Montdenier" into an airtight titanium tube.' },
      { date: 'January 2023', title: 'Sample Depot Completed', description: 'Deposited 10 backup sample tubes at the "Three Forks" staging area.' }
    ],
    officialSourceUrls: [
      { label: 'NASA Mars 2020 Mission Hub', url: 'https://science.nasa.gov/mission/mars-2020-perseverance/' },
      { label: 'JPL Mars Perseverance Rover Interactive', url: 'https://mars.nasa.gov/mars2020/' }
    ]
  },
  {
    id: 'new-horizons',
    name: 'New Horizons',
    agency: 'NASA / JHUAPL',
    launchDate: 'January 19, 2006',
    status: 'Active',
    statusAsOf: 'October 2024 (Cruising the Outer Kuiper Belt at >58 AU from Sun)',
    primaryDestination: 'Pluto & The Kuiper Belt',
    destinationCategory: 'Outer Solar System',
    relatedBodyIds: ['neptune'],
    tagline: 'The first exploration of Pluto and the primordial icy frontier of the Kuiper Belt',
    heroImage: 'https://images.nasa.gov/details/PIA19952',
    spacecraftImage: 'https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?auto=format&fit=crop&w=1600&q=80',
    description: 'Launched at the highest Earth-escape velocity ever achieved (58,536 km/h), New Horizons flew past Pluto in July 2015, revealing glaciers of nitrogen ice, before encountering the primordial Kuiper Belt contact binary Arrokoth in 2019.',
    longOverview: 'Built and operated by the Johns Hopkins University Applied Physics Laboratory (JHUAPL) for NASA, New Horizons was designed to unlock the mysteries of the dwarf planet Pluto and the Kuiper Belt. In July 2015, New Horizons revealed that Pluto is not a dead ice ball, but a geologically active world featuring the vast nitrogen-ice glacier Sputnik Planitia, ice mountains as high as the Rockies, and a thin hazy blue atmosphere.',
    objectives: [
      'Characterize the global geology, morphology, and surface temperatures of Pluto and Charon',
      'Map the chemical compositions of surface materials and search for an active atmosphere',
      'Fly by a primordial cold classical Kuiper Belt Object (Arrokoth) to investigate planet formation',
      'Characterize the solar wind and dust particle distribution across the outer Solar System'
    ],
    keyDiscoveries: [
      'Discovered that Pluto has active nitrogen ice glaciers that convect and reshape its surface',
      'Discovered towering water-ice mountains up to 3,500 meters high floating on deeper nitrogen ice',
      'Imaged the contact binary Arrokoth—the most pristine, primitive celestial body ever explored',
      'Discovered blue haze layers in Pluto\'s nitrogen-methane atmosphere extending 200 km above surface'
    ],
    specifications: {
      launchVehicle: 'Atlas V 551 with Star 48B third stage',
      launchMassKg: 478,
      powerSource: 'Single Radioisotope Thermoelectric Generator (GPHS-RTG)',
      missionDuration: '18+ Years (Active)',
      costEstimate: '$720 Million',
      primaryInstruments: [
        'LORRI Long-Range Reconnaissance Imager',
        'Ralph Visible and Infrared Imager',
        'Alice Ultraviolet Imaging Spectrometer',
        'REX Radio Science Experiment',
        'SWAP Solar Wind Around Pluto',
        'PEPSSI Energetic Particle Spectrometer'
      ]
    },
    milestones: [
      { date: 'January 19, 2006', title: 'Launch from Cape Canaveral', description: 'Fastest human-made object at launch, crossing Moon\'s orbit in 9 hours.' },
      { date: 'February 28, 2007', title: 'Jupiter Gravity Slingshot', description: 'Gained 14,000 km/h speed boost while imaging volcanic plumes on moon Io.' },
      { date: 'July 14, 2015', title: 'Pluto Closest Approach', description: 'Passed within 12,500 km of Pluto, revealing its famous "heart" (Tombaugh Regio).' },
      { date: 'January 1, 2019', title: 'Flyby of Arrokoth (Ultima Thule)', description: 'First exploration of a pristine Kuiper Belt contact binary at 43.4 AU.' }
    ],
    officialSourceUrls: [
      { label: 'NASA New Horizons Mission Overview', url: 'https://science.nasa.gov/mission/new-horizons/' },
      { label: 'JHUAPL New Horizons Portal', url: 'https://pluto.jhuapl.edu/' }
    ]
  },
  {
    id: 'europa-clipper',
    name: 'Europa Clipper',
    agency: 'NASA / JPL / APL',
    launchDate: 'October 14, 2024',
    status: 'En Route',
    statusAsOf: 'October 2024 (En Route to Jupiter; Scheduled Arrival April 2030)',
    primaryDestination: 'Jupiter\'s Moon Europa',
    destinationCategory: 'Jupiter',
    relatedBodyIds: ['jupiter', 'europa'],
    tagline: 'Investigating the habitability of Europa\'s vast subsurface saltwater ocean',
    heroImage: 'https://images.nasa.gov/details/PIA26390',
    spacecraftImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1600&q=80',
    description: 'Launched in October 2024 aboard a SpaceX Falcon Heavy, Europa Clipper is NASA\'s largest planetary spacecraft ever constructed, designed to perform 49 low-altitude flybys of Europa to confirm whether conditions beneath its icy shell could support life.',
    longOverview: 'Europa Clipper is an interplanetary mission to study Europa, an icy Galilean moon of Jupiter harboring a global subsurface liquid ocean containing twice the volume of all Earth\'s oceans combined. The spacecraft weighs approximately 6,000 kilograms with propellant and spans over 30 meters from solar array tip to tip. It will perform repeated flybys as low as 25 kilometers above Europa\'s fractured ice shell, using ice-penetrating radar, infrared spectroscopy, and dust analyzers to search for organic compounds, water plumes, and thermal hotspots.',
    objectives: [
      'Confirm the presence and depth of Europa\'s global subsurface ocean',
      'Determine the thickness of the outer ice shell and characterize ice-ocean exchanges',
      'Analyze the chemistry of the surface and atmospheric composition for essential bio-ingredients',
      'Identify and characterize locations for a potential future Europa surface lander mission'
    ],
    keyDiscoveries: [
      'Successfully launched and deployed its massive 30-meter solar arrays in interplanetary space',
      'Carries advanced REASON radar capable of transmitting through kilometers of cold water ice',
      'Configured with PIMS plasma sensors to calibrate Europa\'s induced magnetic dipole field'
    ],
    specifications: {
      launchVehicle: 'SpaceX Falcon Heavy (Fully expendable high-energy configuration)',
      launchMassKg: 6000,
      powerSource: 'Dual 5-Panel Solar Array Wings (Total span: 30.5 meters, highest-area deep space solar array ever deployed)',
      missionDuration: 'En Route (Primary science phase begins 2030)',
      costEstimate: '$5.2 Billion',
      primaryInstruments: [
        'REASON Radar for Europa Assessment and Sounding',
        'Europa Imaging System (EIS) Narrow & Wide Angle Cameras',
        'MISE Mapping Imaging Spectrometer for Europa',
        'MASPEX Europa Mass Spectrometer',
        'SUDA Surface Dust Analyzer',
        'PIMS Plasma Instrument for Magnetic Sounding'
      ]
    },
    milestones: [
      { date: 'October 14, 2024', title: 'Successful Launch from KSC 39A', description: 'Lifted off on a Falcon Heavy into an Earth-Mars gravity assist trajectory.' },
      { date: 'February 2025', title: 'Mars Gravity Assist (Scheduled)', description: 'Will fly past Mars to boost velocity toward Earth.' },
      { date: 'December 2026', title: 'Earth Gravity Assist (Scheduled)', description: 'Final slingshot maneuver to sling the probe directly into Jupiter orbit.' },
      { date: 'April 2030', title: 'Jupiter Arrival (Scheduled)', description: 'Enter Jupiter orbit and commence 49 low-altitude Europa reconnaissance flybys.' }
    ],
    officialSourceUrls: [
      { label: 'NASA Europa Clipper Official Mission Site', url: 'https://science.nasa.gov/mission/europa-clipper/' },
      { label: 'JPL Europa Clipper Interactive', url: 'https://europa.nasa.gov/' }
    ]
  },
  {
    id: 'jwst',
    name: 'James Webb Space Telescope',
    agency: 'NASA / ESA / CSA',
    launchDate: 'December 25, 2021',
    status: 'Active',
    statusAsOf: 'October 2024 (Operating at Sun-Earth L2 Lagrange Point, 1.5M km from Earth)',
    primaryDestination: 'Deep Cosmic Dawn & Exoplanet Atmospheres (Sun-Earth L2)',
    destinationCategory: 'Deep Space',
    relatedBodyIds: ['earth', 'jupiter', 'saturn', 'uranus', 'neptune'],
    tagline: 'Unfolding the universe from the first luminous stars to alien exoplanet skies',
    heroImage: 'https://images.nasa.gov/details/GSFC_20171208_Archive_e001465',
    spacecraftImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1600&q=80',
    description: 'Positioned at the Sun-Earth L2 Lagrange point, JWST is the most powerful space observatory ever built. Its 6.5-meter gold-coated beryllium mirror and 5-layer tennis-court-sized sunshield observe the cosmos in infrared, peering back over 13.5 billion years to the dawn of the first galaxies.',
    longOverview: 'The James Webb Space Telescope is the premier observatory of the 21st century, engineered as an international collaboration between NASA, the European Space Agency (ESA), and the Canadian Space Agency (CSA). Operating in deep infrared wavelengths at cryogenic temperatures (-233°C), its 18 hexagonal primary mirror segments collect light from galaxies that formed less than 300 million years after the Big Bang, detect water and carbon dioxide in exoplanet atmospheres, and pierce through obscuring cosmic dust clouds.',
    objectives: [
      'Search for the first stars and galaxies formed after the Big Bang ("Cosmic Dawn")',
      'Determine how galaxies evolved from their earliest states to today\'s diverse spirals and ellipticals',
      'Observe the formation of stars and planetary systems inside dense interstellar clouds',
      'Measure physical and chemical compositions of exoplanet atmospheres and search for biosignatures'
    ],
    keyDiscoveries: [
      'Discovered galaxies dating to just 290 million years after the Big Bang (JADES-GS-z14-0)',
      'Detected atmospheric carbon dioxide, methane, and water vapor on alien exoplanets (WASP-39b, K2-18b)',
      'Captured unprecedented infrared deep field portraits of the Carina and Southern Ring Nebulae',
      'Discovered glowing ring systems and dynamic weather patterns on Neptune and Uranus'
    ],
    specifications: {
      launchVehicle: 'Ariane 5 ECA (Arianespace flight VA256)',
      launchMassKg: 6161,
      powerSource: '2 kW Solar Array Wing (Deployable 5-panel array)',
      missionDuration: 'Design life 10–20+ Years (Active)',
      costEstimate: '$10 Billion',
      primaryInstruments: [
        '6.5-meter Segmented Gold-Coated Beryllium Primary Mirror',
        '5-Layer Kapton Tennis-Court-Sized Sunshield (21 × 14 meters)',
        'NIRCam Near-Infrared Camera (0.6 to 5.0 µm)',
        'NIRSpec Near-Infrared Spectrograph',
        'MIRI Mid-Infrared Instrument (5.0 to 28 µm with Cryocooler)',
        'FGS/NIRISS Fine Guidance Sensor and Slitless Spectrograph'
      ]
    },
    milestones: [
      { date: 'December 25, 2021', title: 'Flawless Launch from Kourou', description: 'Launched on Ariane 5 rocket from Europe\'s Spaceport in French Guiana.' },
      { date: 'January 4, 2022', title: 'Sunshield Full Tensioning', description: 'Unfolded and tensioned 5 fragile Kapton membranes in zero gravity.' },
      { date: 'January 24, 2022', title: 'Arrival at Sun-Earth L2', description: 'Fired thrusters to enter halo orbit around Lagrange Point 2, 1.5 million km away.' },
      { date: 'July 11, 2022', title: 'First Deep Field Released', description: 'Revealed SMACS 0723 gravitational lensing galaxy cluster to global audience.' }
    ],
    officialSourceUrls: [
      { label: 'NASA James Webb Space Telescope Home', url: 'https://science.nasa.gov/mission/webb/' },
      { label: 'Space Telescope Science Institute (STScI) Webb Portal', url: 'https://webbtelescope.org/' }
    ],
    modelConfig: {
      has3DViewer: true,
      modelType: 'jwst',
      components: [
        { name: '18 Primary Mirror Segments', description: '6.5-meter diameter array of gold-coated beryllium hexagons.', position: [0, 0.4, 0.1] },
        { name: 'Secondary Mirror Tripod', description: 'Directs light from primary mirror back into science instruments.', position: [0, 0.7, 1.3] },
        { name: '5-Layer Sunshield', description: '21x14m Kapton layers maintain instruments below -233°C (-388°F).', position: [0, -0.6, 0] },
        { name: 'Spacecraft Bus & Solar Wing', description: 'Commands, propulsion, attitude control, and solar power generation.', position: [0, -1.0, -0.6] }
      ]
    }
  }
];

export const MISSION_DESTINATIONS = [
  'All',
  'Outer Solar System',
  'Jupiter',
  'Saturn',
  'Mars',
  'Deep Space'
] as const;

export const MISSION_STATUSES = [
  'All',
  'Active',
  'En Route',
  'Completed'
] as const;
