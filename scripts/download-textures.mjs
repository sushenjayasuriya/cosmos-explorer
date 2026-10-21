import fs from 'fs';
import path from 'path';
import https from 'https';

const outDir = path.resolve('public/textures');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const textures = [
  'sun.jpg',
  'mercury.jpg',
  'venus.jpg',
  'earth.jpg',
  'earth-clouds.jpg',
  'moon.jpg',
  'mars.jpg',
  'jupiter.jpg',
  'saturn.jpg',
  'saturn-ring.png',
  'uranus.jpg',
  'neptune.jpg'
];

async function downloadFile(name) {
  const url = `https://raw.githubusercontent.com/KyleGough/solar-system/master/static/textures/${name}`;
  const dest = path.join(outDir, name);
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'node-fetch' } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        https.get(res.headers.location, (redirectRes) => {
          const file = fs.createWriteStream(dest);
          redirectRes.pipe(file);
          file.on('finish', () => file.close(resolve));
        }).on('error', reject);
        return;
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`Status ${res.statusCode} for ${name}`));
      }
      const file = fs.createWriteStream(dest);
      res.pipe(file);
      file.on('finish', () => file.close(resolve));
    }).on('error', reject);
  });
}

async function run() {
  console.log('Downloading high quality NASA / Solar System Scope textures...');
  for (const name of textures) {
    process.stdout.write(`Fetching ${name}... `);
    try {
      await downloadFile(name);
      console.log('OK');
    } catch (err) {
      console.error('Failed:', err.message);
    }
  }
  console.log('Finished downloading textures.');
}

run();
