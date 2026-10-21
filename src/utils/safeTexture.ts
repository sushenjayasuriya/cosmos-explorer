import * as THREE from 'three';

const textureCache = new Map<string, THREE.Texture>();
const loader = new THREE.TextureLoader();

/**
 * Creates a procedural canvas-backed fallback texture.
 * Prevents WebGL crashes if image network/decoding errors occur.
 */
function createFallbackTexture(color: string = '#475569', isTransparent = false): THREE.Texture {
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 32;
  const ctx = canvas.getContext('2d');
  
  if (ctx) {
    if (isTransparent) {
      ctx.clearRect(0, 0, 64, 32);
    } else {
      ctx.fillStyle = color;
      ctx.fillRect(0, 0, 64, 32);
      // Subtle planetary banding
      ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.fillRect(0, 10, 64, 12);
      ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
      ctx.fillRect(0, 22, 64, 10);
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

/**
 * Loads a texture safely with in-memory caching and procedural fallback.
 * Guaranteed never to throw an uncaught error or freeze React suspense.
 */
export function getSafeTexture(
  url: string | undefined,
  fallbackColor: string = '#64748b',
  isTransparent = false
): THREE.Texture {
  if (!url) {
    return createFallbackTexture(fallbackColor, isTransparent);
  }

  if (textureCache.has(url)) {
    return textureCache.get(url)!;
  }

  const texture = createFallbackTexture(fallbackColor, isTransparent);
  textureCache.set(url, texture);

  loader.load(
    url,
    (loaded) => {
      loaded.colorSpace = THREE.SRGBColorSpace;
      texture.image = loaded.image;
      texture.format = loaded.format;
      texture.type = loaded.type;
      texture.needsUpdate = true;
    },
    undefined,
    (err) => {
      console.warn(`[COSMOS SafeTexture] Texture fallback engaged for "${url}".`, err);
    }
  );

  return texture;
}
