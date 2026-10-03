// Procedural alpine range for Swiss mode. Loaded on demand.
import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.169.0/build/three.module.js";

const clamp01 = (n) => Math.min(1, Math.max(0, n));

const SIZE_X = 900;
const SIZE_Z = 900;
const SEGMENTS = 420;
const PEAK = 230;

function hash(x, y) {
  const n = Math.sin(x * 127.1 + y * 311.7) * 43758.5453123;
  return n - Math.floor(n);
}

function valueNoise(x, y) {
  const xi = Math.floor(x);
  const yi = Math.floor(y);
  const xf = x - xi;
  const yf = y - yi;
  const u = xf * xf * (3 - 2 * xf);
  const v = yf * yf * (3 - 2 * yf);
  const a = hash(xi, yi);
  const b = hash(xi + 1, yi);
  const c = hash(xi, yi + 1);
  const d = hash(xi + 1, yi + 1);
  return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
}

// Ridged multifractal: squares the inverted absolute noise so crests stay sharp.
function ridged(x, y, octaves) {
  let sum = 0;
  let amp = 0.5;
  let freq = 1;
  let weight = 1;
  for (let i = 0; i < octaves; i++) {
    let n = 1 - Math.abs(valueNoise(x * freq, y * freq) * 2 - 1);
    n *= n * weight;
    weight = Math.min(1, n * 2.4);
    sum += n * amp;
    freq *= 2.04;
    amp *= 0.52;
  }
  return sum;
}

function fbm(x, y, octaves) {
  let sum = 0;
  let amp = 0.5;
  let freq = 1;
  for (let i = 0; i < octaves; i++) {
    sum += valueNoise(x * freq, y * freq) * amp;
    freq *= 2.03;
    amp *= 0.5;
  }
  return sum;
}

// The Alps are broad glaciated massifs, not needles: a smooth body carries the
// bulk, crests only form where that body is already high, and the top of the
// range is compressed into snowfields instead of being allowed to spike.
function heightAt(x, z) {
  const u = x / 430;
  const v = z / 430;

  const body = fbm(u + 2.1, v - 0.8, 5);
  const massif = Math.pow(clamp01(body * 1.35), 1.5);
  const crest = ridged(u * 1.55 + 4.2, v * 1.55 - 1.7, 6);

  let h = massif * 0.74 + crest * 0.46 * massif;

  // glacier basins and summit plateaus
  h -= 0.3 * Math.pow(Math.max(0, h - 0.5), 1.4);

  // erosion, eased off on the high snowfields where it would read as noise
  const rough = 1 - clamp01((h - 0.42) * 1.5);
  h += (valueNoise(x / 16 + 17, z / 16 - 23) - 0.5) * 0.05 * rough;
  h += (valueNoise(x / 6 - 8, z / 6 + 14) - 0.5) * 0.02 * rough;

  // keep the near foreground low so the camera sits in a valley
  const nearness = clamp01((z + 60) / 320);
  h *= 0.1 + 0.9 * Math.pow(1 - nearness, 1.6);

  // and lift the far side into a dominant wall of summits
  const far = clamp01((-z - 20) / 360);
  h *= 0.4 + 1.05 * far;

  return h * PEAK;
}

export function createAlps(container, palette) {
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    powerPreference: "high-performance",
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.domElement.className = "alps-canvas";
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(new THREE.Color(palette.fog), palette.fogDensity);

  const camera = new THREE.PerspectiveCamera(
    52,
    container.clientWidth / container.clientHeight,
    1,
    3000,
  );

  const geometry = new THREE.PlaneGeometry(SIZE_X, SIZE_Z, SEGMENTS, SEGMENTS);
  geometry.rotateX(-Math.PI / 2);

  const pos = geometry.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    pos.setY(i, heightAt(pos.getX(i), pos.getZ(i)));
  }
  geometry.computeVertexNormals();

  // paint meadow, rock and snow by altitude and steepness
  const colors = new Float32Array(pos.count * 3);
  const meadow = new THREE.Color(palette.meadow);
  const meadowSun = new THREE.Color(palette.meadowSun);
  const rockLow = new THREE.Color(palette.rockLow);
  const rockHigh = new THREE.Color(palette.rockHigh);
  const snow = new THREE.Color(palette.snow);
  const snowShade = new THREE.Color(palette.snowShade);
  const normal = geometry.attributes.normal;
  const tmp = new THREE.Color();
  const grass = new THREE.Color();
  const cap = new THREE.Color();

  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const z = pos.getZ(i);
    const h = pos.getY(i) / PEAK;
    const steep = 1 - normal.getY(i);

    // mottling so bare rock reads as rock rather than a flat fill
    const fine = valueNoise(x / 5.5 + 31, z / 5.5 - 19);
    const broad = valueNoise(x / 46 - 5, z / 46 + 12);
    const strata = valueNoise(x / 13 + 71, pos.getY(i) / 7 - 3);

    tmp.copy(rockLow).lerp(rockHigh, clamp01(h * 1.8 + (broad - 0.5) * 0.5));
    tmp.multiplyScalar(0.8 + fine * 0.3 + strata * 0.12);

    // alpine pasture: only low down and only where it is not a cliff
    const pasture = clamp01((0.3 - steep * 0.85 - h + (broad - 0.5) * 0.08) * 7);
    if (pasture > 0) {
      const patch = clamp01(valueNoise(x / 34 + 11, z / 34 - 6) * 0.75 + fine * 0.35);
      grass.copy(meadow).lerp(meadowSun, patch);
      grass.multiplyScalar(0.86 + fine * 0.22);
      tmp.lerp(grass, pasture);
    }

    // a wobbling snowline, and wind-scoured patches on the steeper faces
    const snowline = 0.21 + steep * 0.74 + (broad - 0.5) * 0.09;
    let cover = clamp01((h - snowline) * 7.5);
    if (cover > 0) {
      cover *= clamp01(1 - steep * 0.5 * (1 - fine));
      cap.copy(snowShade).lerp(snow, clamp01(1 - steep * 1.3));
      cap.multiplyScalar(0.93 + fine * 0.1);
      tmp.lerp(cap, cover);
    }

    colors[i * 3] = tmp.r;
    colors[i * 3 + 1] = tmp.g;
    colors[i * 3 + 2] = tmp.b;
  }
  geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

  const terrain = new THREE.Mesh(
    geometry,
    new THREE.MeshStandardMaterial({
      vertexColors: true,
      roughness: 0.95,
      metalness: 0.0,
      flatShading: false,
    }),
  );
  terrain.position.z = -180;
  scene.add(terrain);

  const sun = new THREE.DirectionalLight(new THREE.Color(palette.sun), palette.sunIntensity);
  sun.position.set(-320, 78, 60);
  scene.add(sun);

  scene.add(
    new THREE.HemisphereLight(
      new THREE.Color(palette.skyLight),
      new THREE.Color(palette.groundLight),
      palette.ambient,
    ),
  );

  // The page is a flight through the range: scrolling moves the camera from a
  // wide establishing shot down into the valley.
  const PATH = [
    { pos: [0, 142, 408], look: [4, 110, -320] },
    { pos: [54, 104, 205], look: [-18, 96, -330] },
    { pos: [-26, 58, 10], look: [14, 104, -380] },
    { pos: [-62, 38, -140], look: [40, 118, -430] },
  ];

  const current = { pos: [...PATH[0].pos], look: [...PATH[0].look] };
  let frame = null;
  let target = 0;
  const start = performance.now();

  function readProgress() {
    const span = document.documentElement.scrollHeight - window.innerHeight;
    target = span > 0 ? Math.min(1, Math.max(0, window.scrollY / span)) : 0;
  }

  let eased = 0;

  function sample(p) {
    const span = (PATH.length - 1) * p;
    const i = Math.min(PATH.length - 2, Math.floor(span));
    const t = span - i;
    const smooth = t * t * (3 - 2 * t);
    const a = PATH[i];
    const b = PATH[i + 1];
    return {
      pos: a.pos.map((v, k) => v + (b.pos[k] - v) * smooth),
      look: a.look.map((v, k) => v + (b.look[k] - v) * smooth),
    };
  }

  function resize() {
    const w = container.clientWidth;
    const h = container.clientHeight;
    renderer.setSize(w, h);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }

  function render() {
    const t = (performance.now() - start) / 1000;
    eased += (target - eased) * 0.055;
    const frameAt = sample(eased);

    // a slow breathing drift so the shot is never completely static
    const sway = Math.sin(t * 0.05) * 9;
    for (let k = 0; k < 3; k++) {
      current.pos[k] += (frameAt.pos[k] - current.pos[k]) * 0.1;
      current.look[k] += (frameAt.look[k] - current.look[k]) * 0.1;
    }

    camera.position.set(current.pos[0] + sway, current.pos[1], current.pos[2]);
    camera.lookAt(current.look[0] + sway * 0.4, current.look[1], current.look[2]);
    renderer.render(scene, camera);
    frame = requestAnimationFrame(render);
  }

  window.addEventListener("resize", resize, { passive: true });
  window.addEventListener("scroll", readProgress, { passive: true });
  readProgress();
  eased = target;
  render();

  return {
    dispose() {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", readProgress);
      geometry.dispose();
      terrain.material.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    },
  };
}
