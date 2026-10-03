// Procedural alpine range for Swiss mode. Loaded on demand.
import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.169.0/build/three.module.js";

const SIZE_X = 900;
const SIZE_Z = 900;
const SEGMENTS = 300;
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

// Ridged multifractal: squares the inverted absolute noise so crests stay sharp,
// which is what separates alpine ridgelines from rolling hills.
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

function heightAt(x, z) {
  const u = x / 300;
  const v = z / 300;
  let h = ridged(u + 4.2, v - 1.7, 7);

  // keep the near foreground low so the camera sits in a valley looking out
  const nearness = Math.min(1, Math.max(0, (z + 60) / 320));
  h *= 0.1 + 0.9 * Math.pow(1 - nearness, 1.6);

  // and lift the far side into a dominant wall of summits
  const far = Math.min(1, Math.max(0, (-z - 20) / 360));
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
  camera.position.set(0, 52, 300);
  camera.lookAt(0, 128, -300);

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
  const clamp01 = (n) => Math.min(1, Math.max(0, n));

  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const z = pos.getZ(i);
    const h = pos.getY(i) / PEAK;
    const steep = 1 - normal.getY(i);

    tmp.copy(rockLow).lerp(rockHigh, clamp01(h * 1.8));

    // alpine pasture: only low down and only where it is not a cliff
    const pasture = clamp01((0.3 - steep * 0.85 - h) * 7);
    if (pasture > 0) {
      const patch = valueNoise(x / 34 + 11, z / 34 - 6);
      grass.copy(meadow).lerp(meadowSun, patch);
      tmp.lerp(grass, pasture);
    }

    const snowline = 0.21 + steep * 0.74;
    const cover = clamp01((h - snowline) * 7.5);
    if (cover > 0) {
      cap.copy(snowShade).lerp(snow, clamp01(1 - steep * 1.3));
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

  let frame = null;
  let scrollY = window.scrollY;
  const start = performance.now();

  function resize() {
    const w = container.clientWidth;
    const h = container.clientHeight;
    renderer.setSize(w, h);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }

  function onScroll() {
    scrollY = window.scrollY;
  }

  function render() {
    const t = (performance.now() - start) / 1000;
    // a slow drift plus a gentle lift as the page scrolls
    camera.position.x = Math.sin(t * 0.035) * 26;
    camera.position.y = 52 + Math.sin(t * 0.021) * 4 + scrollY * 0.014;
    camera.lookAt(Math.sin(t * 0.035) * 10, 128, -300);
    renderer.render(scene, camera);
    frame = requestAnimationFrame(render);
  }

  window.addEventListener("resize", resize, { passive: true });
  window.addEventListener("scroll", onScroll, { passive: true });
  render();

  return {
    dispose() {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
      geometry.dispose();
      terrain.material.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    },
  };
}
