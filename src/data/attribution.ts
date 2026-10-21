export interface AttributionEntry {
  assetName: string;
  category: 'Spacecraft 3D & Models' | 'Planetary Textures' | 'Deep Space Photography' | 'Scientific Telemetry & Ephemerides';
  sourceOrganization: string;
  sourceUrl: string;
  licenseTerms: string;
  requiredCredit: string;
  notes?: string;
}

export const ATTRIBUTION_REGISTRY: AttributionEntry[] = [
  {
    assetName: 'Solar System Planetary & Moon Surface Textures',
    category: 'Planetary Textures',
    sourceOrganization: 'NASA / Jet Propulsion Laboratory (JPL) / USGS Astrogeology Science Center',
    sourceUrl: 'https://www.solarsystemscope.com/textures/ & https://astrogeology.usgs.gov/',
    licenseTerms: 'Public Domain / Creative Commons Attribution 4.0 International (CC-BY 4.0)',
    requiredCredit: 'Texture maps courtesy of NASA/JPL-Caltech and Solar System Scope under CC-BY 4.0.',
    notes: 'Derived from NASA spacecraft imaging data including Viking, Magellan, Lunar Reconnaissance Orbiter, Cassini, Messenger, and New Horizons.'
  },
  {
    assetName: 'Planetary Radii, Orbits, Rotation Periods & Physical Constants',
    category: 'Scientific Telemetry & Ephemerides',
    sourceOrganization: 'NASA Planetary Data System (PDS) & JPL Horizons On-Line Ephemeris System',
    sourceUrl: 'https://ssd.jpl.nasa.gov/horizons/ & https://pds.nasa.gov/',
    licenseTerms: 'Public Domain / US Government Work (17 U.S.C. § 105)',
    requiredCredit: 'Data courtesy of NASA / JPL Solar System Dynamics Group and IAU Working Group on Cartographic Coordinates.',
    notes: 'Real physical diameters, orbital semi-major axes, eccentricities, and rotation rates adapted for calibrated 3D visualization.'
  },
  {
    assetName: 'Deep Space High-Resolution Imagery (JWST, Hubble, Spitzer)',
    category: 'Deep Space Photography',
    sourceOrganization: 'NASA, European Space Agency (ESA), Canadian Space Agency (CSA), Space Telescope Science Institute (STScI)',
    sourceUrl: 'https://images.nasa.gov/ & https://webbtelescope.org/resource-gallery/images',
    licenseTerms: 'Public Domain / Open Access Educational Use',
    requiredCredit: 'NASA, ESA, CSA, and STScI. Image manipulation and processing by individual instrument science teams as cited in image captions.',
    notes: 'Free to use for educational and non-commercial visualization purposes in accordance with NASA Media Usage Guidelines.'
  },
  {
    assetName: 'Spacecraft 3D Models & Procedural Architectural Geometry',
    category: 'Spacecraft 3D & Models',
    sourceOrganization: 'NASA 3D Resources / JPL Design Lab / COSMOS Engineering',
    sourceUrl: 'https://nasa3d.arc.nasa.gov/ & https://github.com/nasa',
    licenseTerms: 'NASA Open Source Agreement / Creative Commons Zero (CC0) Public Domain',
    requiredCredit: 'Spacecraft geometries adapted from NASA 3D Resources and JPL mission specifications.',
    notes: 'Custom procedural and GLTF assemblies built with component callouts for Voyager, Cassini, and JWST.'
  },
  {
    assetName: 'NASA Scientific Visualization Studio Videos & Visualizations',
    category: 'Deep Space Photography',
    sourceOrganization: 'NASA Goddard Space Flight Center Scientific Visualization Studio (SVS)',
    sourceUrl: 'https://svs.gsfc.nasa.gov/',
    licenseTerms: 'Public Domain / NASA Media Usage Guidelines',
    requiredCredit: 'NASA Scientific Visualization Studio. Conceptual animations and data visualizations.',
    notes: 'Educational footage embedded directly or streamed via official high-bandwidth CDNs.'
  }
];

export const LEGAL_DISCLAIMER = `COSMOS — Beyond the Horizon is an independent educational and scientific visualization platform created for astronomy research and public science communication. COSMOS is not affiliated with, sponsored by, or endorsed by NASA, JPL, ESA, or any governmental agency. All NASA mission logos, names, and telemetry remain the intellectual property of their respective originating institutions under public domain guidelines (17 U.S.C. § 105).`;
