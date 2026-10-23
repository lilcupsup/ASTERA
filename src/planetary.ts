import * as THREE from "three";

// Deterministic procedural materials: no external texture requests.
function texture(kind: number) {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext("2d")!;
  const img = ctx.createImageData(1024, 512);
  const colors = [
    [158, 156, 151],
    [176, 95, 57],
    [170, 183, 187],
    [192, 162, 113],
    [177, 125, 59],
  ];
  let seed = kind + 19;
  const rnd = () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 4294967296;
  };
  for (let y = 0; y < 512; y++)
    for (let x = 0; x < 1024; x++) {
      const wave =
        Math.sin(y * 0.13 + Math.sin(x * 0.018) * 0.7) +
        0.45 * Math.sin(y * 0.41 + Math.sin(x * 0.035)) +
        0.15 * Math.sin(y * 1.6);
      const terrain =
        Math.sin(x * 0.026 + Math.sin(y * 0.038) * 3) *
        Math.cos(y * 0.041 + Math.sin(x * 0.017) * 2);
      let v =
        kind === 3
          ? wave * 16
          : terrain * 25 + Math.sin(x * 0.11 + y * 0.078) * 6;
      v += (rnd() - 0.5) * (kind === 3 ? 8 : 20);
      const p = (y * 1024 + x) * 4;
      for (let c = 0; c < 3; c++) img.data[p + c] = colors[kind][c] + v;
      img.data[p + 3] = 255;
    }
  ctx.putImageData(img, 0, 0);
  if (kind === 0 || kind === 1) {
    for (let i = 0; i < 350; i++) {
      const x = rnd() * 1024,
        y = rnd() * 512,
        r = 2 + rnd() * 20;
      const g = ctx.createRadialGradient(
        x - r * 0.25,
        y - r * 0.25,
        0,
        x,
        y,
        r,
      );
      g.addColorStop(0, "rgba(25,20,18,.4)");
      g.addColorStop(0.75, "rgba(35,30,25,.25)");
      g.addColorStop(0.9, "rgba(235,223,204,.3)");
      g.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = g;
      ctx.fillRect(x - r, y - r, r * 2, r * 2);
    }
  }
  if (kind === 2) {
    ctx.strokeStyle = "rgba(98,64,48,.45)";
    ctx.lineWidth = 1.3;
    for (let i = 0; i < 65; i++) {
      let x = rnd() * 1024,
        y = rnd() * 512;
      ctx.beginPath();
      ctx.moveTo(x, y);
      for (let j = 0; j < 15; j++) {
        x += rnd() * 35 - 10;
        y += rnd() * 30 - 15;
        ctx.lineTo(x, y);
      }
      ctx.stroke();
    }
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}
export function initPlanetary(
  container: HTMLElement,
  onSelect: (n: number) => void,
) {
  const reduced = matchMedia("(prefers-reduced-motion: reduce)");
  const mobile = () => container.clientWidth < 768;
  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true,
    powerPreference: "low-power",
  });
  renderer.setPixelRatio(Math.min(devicePixelRatio, mobile() ? 1.25 : 1.7));
  renderer.setClearColor(0x050911, 0);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.15;
  container.append(renderer.domElement);
  renderer.domElement.setAttribute("aria-hidden", "true");
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 160);
  camera.position.set(0, 0, 14);
  scene.add(new THREE.AmbientLight(0xaab5d1, 0.55));
  const sun = new THREE.DirectionalLight(0xffe0aa, 3.7);
  sun.position.set(-10, 8, 7);
  scene.add(sun);
  const blue = new THREE.DirectionalLight(0x6686b5, 0.25);
  blue.position.set(8, -2, 4);
  scene.add(blue);
  const geometry = new THREE.SphereGeometry(
    1,
    mobile() ? 48 : 80,
    mobile() ? 32 : 56,
  );
  const materials = Array.from(
    { length: 5 },
    (_, i) =>
      new THREE.MeshStandardMaterial({
        map: texture(i),
        roughness: 1,
        metalness: 0,
      }),
  );
  const textureLoader = new THREE.TextureLoader();
  ["luna", "mars", "europa", "saturn", "titan"].forEach((name, i) =>
    textureLoader.load(
      `/media/images/TEX-${name}-1280.webp`,
      (map) => {
        map.colorSpace = THREE.SRGBColorSpace;
        map.anisotropy = Math.min(4, renderer.capabilities.getMaxAnisotropy());
        materials[i].map?.dispose();
        materials[i].map = map;
        materials[i].needsUpdate = true;
        draw(0);
      },
      undefined,
      () => {},
    ),
  );
  const ringCanvas = document.createElement("canvas");
  ringCanvas.width = 512;
  ringCanvas.height = 1;
  const rc = ringCanvas.getContext("2d")!;
  for (let x = 0; x < 512; x++) {
    const gap = (x > 205 && x < 225) || (x > 365 && x < 374);
    const a = gap
      ? 0.03
      : 0.25 + 0.36 * Math.abs(Math.sin(x * 1.7)) + 0.2 * Math.sin(x * 0.08);
    rc.fillStyle = `rgba(${185 + Math.round(Math.sin(x * 0.1) * 25)},161,119,${a})`;
    rc.fillRect(x, 0, 1, 1);
  }
  const ringMap = new THREE.CanvasTexture(ringCanvas);
  ringMap.colorSpace = THREE.SRGBColorSpace;
  const ringGeo = new THREE.RingGeometry(1.22, 2.05, 160, 1);
  const pos = ringGeo.attributes.position;
  const uv = ringGeo.attributes.uv;
  for (let i = 0; i < pos.count; i++)
    uv.setXY(i, (Math.hypot(pos.getX(i), pos.getY(i)) - 1.22) / 0.83, 0);
  const ringMat = new THREE.MeshStandardMaterial({
    map: ringMap,
    transparent: true,
    side: THREE.DoubleSide,
    roughness: 1,
    depthWrite: false,
  });
  function planet(i: number) {
    const group = new THREE.Group();
    const globe = new THREE.Mesh(geometry, materials[i]);
    group.add(globe);
    if (i === 3) {
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = 1.34;
      ring.rotation.y = 0.03;
      group.add(ring);
      group.rotation.z = 0.16;
    }
    return group;
  }
  const planets = materials.map((_, i) => {
    const p = planet(i);
    scene.add(p);
    return p;
  });
  const minis = materials.map((_, i) => {
    const p = planet(i);
    p.scale.setScalar(i === 3 ? 0.27 : 0.3);
    scene.add(p);
    return p;
  });
  const starGeometry = new THREE.BufferGeometry();
  const starPositions = new Float32Array(1500 * 3);
  for (let i = 0; i < 1500; i++) {
    starPositions[i * 3] = (Math.random() - 0.5) * 100;
    starPositions[i * 3 + 1] = (Math.random() - 0.5) * 65;
    starPositions[i * 3 + 2] = -15 - Math.random() * 65;
  }
  starGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(starPositions, 3),
  );
  const stars = new THREE.Points(
    starGeometry,
    new THREE.PointsMaterial({
      color: 0xc9d4e5,
      size: 0.035,
      transparent: true,
      opacity: 0.7,
    }),
  );
  scene.add(stars);
  const arcPoints = Array.from({ length: 100 }, (_, i) => {
    const x = -9 + (i * 18) / 99;
    return new THREE.Vector3(x, 2.65 - x * x * 0.025, -0.3);
  });
  const arcGeometry = new THREE.BufferGeometry().setFromPoints(arcPoints);
  const arc = new THREE.Line(
    arcGeometry,
    new THREE.LineBasicMaterial({
      color: 0xd6b56e,
      transparent: true,
      opacity: 0.45,
    }),
  );
  scene.add(arc);
  let current = 3,
    target = 3,
    active = 3,
    visible = true,
    paused = false,
    last = 0,
    raf = 0;
  function resize() {
    const w = container.clientWidth,
      h = container.clientHeight;
    renderer.setSize(w, h);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    draw(0);
  }
  function draw(dt: number) {
    current = reduced.matches
      ? target
      : THREE.MathUtils.damp(current, target, 3.1, dt);
    const narrow = mobile();
    const span = narrow ? 1.72 : 5.1;
    planets.forEach((p, i) => {
      const theta = ((i - current) * Math.PI * 2) / 5;
      const depth = 1 - Math.cos(theta);
      p.visible = depth < 0.55;
      p.position.set(
        Math.sin(theta) * (narrow ? 9 : 12) + (narrow ? 0.6 : 1.2),
        -3.9 + depth * 4,
        1 - depth * 16,
      );
      p.scale.setScalar((narrow ? 4.0 : 4.8) / (1 + depth * 7));
      if (!reduced.matches && !paused)
        (p.children[0] as THREE.Mesh).rotation.y += dt * 0.018;
    });
    minis.forEach((p, i) => {
      const x = ((i - 2) * span) / 2;
      p.position.set(x, (narrow ? 2.95 : 2.55) - x * x * 0.025, 0);
      p.scale.setScalar(narrow ? 0.19 : i === 3 ? 0.27 : 0.3);
      const projected = p.position.clone().project(camera);
      const label = container.parentElement?.querySelectorAll<HTMLElement>(
        ".orbital-labels span",
      )[i];
      if (label) {
        label.style.left = `${(projected.x * 0.5 + 0.5) * 100}%`;
        label.style.top = `${(-projected.y * 0.5 + 0.5) * 100}%`;
      }
    });
    renderer.render(scene, camera);
  }
  function loop(time: number) {
    raf = requestAnimationFrame(loop);
    const dt = Math.min((time - last) / 1000, 0.05);
    last = time;
    if (!visible || document.hidden) return;
    if (paused && Math.abs(current - target) < 0.001) return;
    if (reduced.matches && Math.abs(current - target) < 0.001) return;
    draw(dt);
  }
  const observer = new IntersectionObserver(([e]) => {
    visible = e.isIntersecting;
  });
  observer.observe(container);
  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(container);
  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();
  const click = (e: PointerEvent) => {
    const r = container.getBoundingClientRect();
    pointer.set(
      ((e.clientX - r.left) / r.width) * 2 - 1,
      (-(e.clientY - r.top) / r.height) * 2 + 1,
    );
    raycaster.setFromCamera(pointer, camera);
    const hit = raycaster.intersectObjects(minis, true)[0];
    if (hit) {
      const i = minis.findIndex((p) => p === hit.object.parent);
      if (i >= 0) onSelect(i);
    }
  };
  renderer.domElement.addEventListener("pointerup", click);
  const lost = (e: Event) => {
    e.preventDefault();
    container.closest(".hero")?.classList.add("webgl-fallback");
  };
  renderer.domElement.addEventListener("webglcontextlost", lost);
  resize();
  draw(0);
  raf = requestAnimationFrame(loop);
  return {
    select(index: number) {
      let delta = index - active;
      if (delta > 2) delta -= 5;
      if (delta < -2) delta += 5;
      target += delta;
      active = index;
      draw(0);
    },
    pause(value: boolean) {
      paused = value;
      draw(0);
    },
    dispose() {
      cancelAnimationFrame(raf);
      observer.disconnect();
      resizeObserver.disconnect();
      renderer.domElement.removeEventListener("pointerup", click);
      geometry.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      ringMap.dispose();
      arcGeometry.dispose();
      (arc.material as THREE.Material).dispose();
      starGeometry.dispose();
      (stars.material as THREE.Material).dispose();
      materials.forEach((m) => {
        m.map?.dispose();
        m.dispose();
      });
      renderer.dispose();
      renderer.domElement.remove();
    },
  };
}
