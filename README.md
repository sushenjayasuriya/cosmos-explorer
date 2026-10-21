# COSMOS — Beyond the Horizon
### Next-Generation Interactive Space Exploration & Astronomy Platform

COSMOS is a cinematic, browser-based space exploration platform built with React 18, TypeScript, Three.js, React Three Fiber, Tailwind CSS, and Framer Motion. Originally starting as an interactive 3D solar system simulator, COSMOS has evolved into a comprehensive digital planetarium featuring historic space missions, an astronomy encyclopedia, and a deep space media gallery.

---

## Architecture & Core Sections

### 1. Solar System Explorer (`/`)
* **Cinematic 3D Simulation**: The Sun, all eight planets, and seven key moons (The Moon, Io, Europa, Ganymede, Titan, Enceladus, Triton) with accurate axial tilts, atmospheric glows, and ring systems.
* **Camera Navigation Rig**: Smooth spring-damped orbital transitions between celestial bodies, collision prevention, and smart framing based on celestial radii.
* **Interactive Scientific Telemetry**: Planetary physical metrics, orbital characteristics, atmospheric compositions, structural layers, and exploration missions.
* **Audio Atmosphere**: Generative Web Audio API cosmic drone synthesizer with ambient celestial frequencies.
* **Performance-First WebGL**: Fully unmounts and cleans up Three.js Canvas render loops and textures when navigating to other sections, preserving battery and GPU memory on laptops with integrated graphics.

### 2. Space Mission Explorer (`/missions` & `/missions/:id`)
* **Verified NASA/ESA/JPL Records**: Curated profiles for 8 landmark missions:
  * **Voyager 1 & Voyager 2**: Interstellar twin probes carrying the Golden Record.
  * **Cassini-Huygens**: The definitive Saturn orbiter and Titan atmospheric probe.
  * **Juno**: Jovian polar orbiter deciphering Jupiter's magnetic and gravitational core.
  * **Mars 2020 Perseverance**: Jezero crater rover with the MOXIE oxygen extractor and Ingenuity drone.
  * **New Horizons**: High-speed reconnaissance of Pluto, Charon, and Arrokoth.
  * **Europa Clipper**: Investigating habitability under Europa's icy crust.
  * **James Webb Space Telescope (JWST)**: Premier infrared space observatory stationed at Sun-Earth L2.
* **Interactive Filters & Search**: Search by name, destination filter (Interstellar, Saturn, Jupiter, Mars, Deep Space, Kuiper Belt), and mission status (Active, Operational, Concluded).
* **Storytelling Detail Pages**: Hero imagery, spacecraft specifications, interactive chronological timelines, scientific breakthroughs, destination galleries, and direct bi-directional links to the 3D Solar System.

### 3. Interactive 3D Spacecraft Viewer
* **High-Fidelity Procedural 3D Models**: Accurate 3D models for **Voyager**, **Cassini**, and the **James Webb Space Telescope**.
* **Interactive Hotspot Annotations**: Clickable 3D pins labeling key science instruments (e.g., High-Gain Antennas, RTGs, Magnetometer Booms, MIRI, NIRCam, Sunshields, Huygens Probe).
* **Cinematic Orbit Controls**: Mouse/touch rotate, smooth damping, zoom constraints, auto-rotation toggle, reset orientation, and fullscreen inspection mode.

### 4. Astronomy Encyclopedia (`/discover` & `/discover/:slug`)
* **15 In-Depth Researched Articles**: Covering 7 foundational astronomy categories:
  * *Stars*: How Stars Are Born, The Life Cycle of a Star
  * *Black Holes*: What Is a Black Hole?, Event Horizons Explained
  * *Galaxies*: The Milky Way Galaxy, Andromeda Galaxy, Types of Galaxies
  * *Nebulae*: What Are Nebulae?, The Pillars of Creation
  * *Exoplanets*: How Exoplanets Are Discovered, Habitable Zones
  * *Solar System*: The Kuiper Belt, The Oort Cloud
  * *Spacecraft Technology*: How Spacecraft Navigate, How the James Webb Space Telescope Works
* **Reading Experience**: Live search, category filtering, reading progress bar, estimated reading time, highlighted key facts callouts, and academic citations.

### 5. Deep Space Gallery (`/gallery`)
* **Curated NASA/ESA Imagery & Videos**: Authentic high-resolution captures from Hubble, JWST, Chandra, Curiosity, and Juno.
* **Interactive Lightbox**: Fullscreen modal view with progressive image loading, 1x/1.5x/2x zoom levels, captions, camera specs, and source attribution links.
* **NASA Scientific Visualization Studio (SVS) Video Player**: Authentic astronomy video observations with full playback controls, timestamps, and fullscreen support.

### 6. Bidirectional Cross-Platform Integration
* Selecting any planet or moon in the 3D Solar System highlights historical and active missions in its "Missions" telemetry tab with deep links to their dedicated mission profiles.
* From any mission detail page, users can click **"Explore in 3D"** to launch directly back into the solar system with the camera smoothly targeted at that destination (via `/?body=planetId`).

---

## Tech Stack & Performance Architecture

* **Frontend Framework**: React 18 + TypeScript + Vite
* **3D Engine**: Three.js + React Three Fiber (`@react-three/fiber`) + Drei (`@react-three/drei`)
* **Styling & Animation**: Tailwind CSS + Framer Motion
* **Routing**: React Router (`react-router-dom`) with lazy-loaded route chunking
* **Icons**: Lucide React
* **Bundle Optimization**: Route-level code splitting ensures initial page load drops from ~1.25 MB to ~367 kB, with WebGL bundles only loaded when visiting 3D routes.

---

## Getting Started

### Prerequisites
* Node.js 18+ and npm

### Local Development
```bash
# Install dependencies
npm install

# Start local development server
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### Production Build & Preview
```bash
# Type check and build optimized bundle
npm run build

# Preview production build locally
npm run preview
```

---

## Deployment

### Vercel Hosting (Recommended)

The project includes [`vercel.json`](file:///c:/Users/sushe/Downloads/cosmos-starter/cosmos-starter/vercel.json) pre-configured with SPA route rewrites:

#### Option A: Via GitHub (Continuous Deployment)
1. Push your repository to GitHub.
2. Go to [vercel.com/new](https://vercel.com/new) and import the repository.
3. Vercel will automatically detect **Vite**:
   * **Build Command**: `npm run build`
   * **Output Directory**: `dist`
   * **Install Command**: `npm install`
4. Click **Deploy**.

#### Option B: Via Vercel CLI
```bash
# Deploy to preview
npx vercel

# Deploy to production
npx vercel --prod
```

---

## Firebase Hosting Configuration

The project is also pre-configured for client-side routing on Firebase Hosting (`firebase.json`):
* Single-page app rewrite rule (`"rewrites": [{"source": "**", "destination": "/index.html"}]`) prevents 404s on page refresh for nested routes (`/missions/voyager-1`, `/discover/pillars-of-creation`, etc.).
* Immutable cache-control headers on static assets.

> **Note**: Do NOT deploy to Firebase or modify cloud resources without authorization.

---

## Media Attribution & Licensing

All visual assets and scientific materials are sourced from genuine, publicly available educational archives:
* **NASA / JPL-Caltech / ESA / STScI / ESO**
* NASA media is governed under NASA's Media Usage Guidelines for educational and informational purposes.
* Review the full in-app registry by clicking the **Attribution & Sources** link in the navigation header.
