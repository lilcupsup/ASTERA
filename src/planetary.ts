import * as THREE from "three";
import { orbitPose, nearestPhase, ORBIT_STEP } from "./orbital-motion";
import { createSpace, atmosphere, createRings } from "./space-effects";

export function initPlanetary(
  container: HTMLElement,
  onSelect: (n: number) => void,
  onFocus: (n: number) => void = () => {},
) {
  const hero = container.closest<HTMLElement>(".hero")!;
  const reduced = matchMedia("(prefers-reduced-motion: reduce)");
  const device = navigator as Navigator & {
    deviceMemory?: number;
    connection?: { saveData?: boolean };
  };
  const lowPower =
    container.clientWidth < 768 ||
    navigator.hardwareConcurrency <= 4 ||
    (device.deviceMemory ?? 8) <= 4 ||
    Boolean(device.connection?.saveData);
  const renderer = new THREE.WebGLRenderer({
    alpha: false,
    antialias: !lowPower,
    powerPreference: "default",
  });
  let dpr = Math.min(devicePixelRatio, lowPower ? 1.15 : 1.6);
  renderer.setPixelRatio(dpr);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.08;
  container.append(renderer.domElement);
  renderer.domElement.setAttribute("aria-hidden", "true");
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 600);
  camera.position.z = 14;
  scene.add(new THREE.AmbientLight(0xb7c7e4, 0.25));
  const sun = new THREE.DirectionalLight(0xffe8c6, 3.15);
  sun.position.set(-12, 8, 10);
  scene.add(sun);
  const fill = new THREE.DirectionalLight(0x7190bc, 0.13);
  fill.position.set(10, -1, -8);
  scene.add(fill);
  const space = createSpace(lowPower, dpr);
  scene.add(space.group);
  const geometry = new THREE.SphereGeometry(
    1,
    lowPower ? 64 : 112,
    lowPower ? 40 : 72,
  );
  const rings = createRings(lowPower);
  const names = ["luna", "mars", "europa", "saturn", "titan"];
  const baseColors = [0xaaa9a5, 0xb87955, 0xc7c9bf, 0xcdb98e, 0xbf9151];
  const materials = names.map(
    (_, i) =>
      new THREE.MeshStandardMaterial({
        color: baseColors[i],
        roughness: i === 2 ? 0.82 : 0.96,
        metalness: 0,
      }),
  );
  const shells: THREE.Mesh<THREE.SphereGeometry, THREE.ShaderMaterial>[] = [];
  function world(index: number) {
    const group = new THREE.Group();
    group.userData.world = index;
    const body = new THREE.Mesh(geometry, materials[index]);
    body.rotation.y = 0.5 + index * 0.43;
    group.add(body);
    if (index === 3) {
      const ring = new THREE.Mesh(rings.geometry, rings.material);
      ring.rotation.set(1.32, 0.03, 0);
      group.add(ring);
      group.rotation.z = 0.16;
    }
    if (index === 1 || index === 3 || index === 4) {
      const shell = atmosphere(
        index === 1 ? "#bf7851" : index === 3 ? "#e4c18c" : "#d4a162",
        index === 4 ? 1.032 : 1.012,
      );
      shell.userData.shell = true;
      group.add(shell);
      shells.push(shell);
    }
    scene.add(group);
    return { group, body };
  }
  const worlds = names.map((_, i) => world(i));
  // The overview echo fills the active world's place while its full-size mesh
  // travels toward the camera. Every position is derived from the same phase.
  const echoes = names.map((_, i) => world(i));
  const labels = Array.from(
    hero.querySelectorAll<HTMLElement>(".orbital-labels span"),
  );
  const projected = new THREE.Vector3();
  const ribbonGeo = new THREE.BufferGeometry();
  const ribbonPositions = new Float32Array(193 * 3);
  ribbonGeo.setAttribute(
    "position",
    new THREE.BufferAttribute(ribbonPositions, 3),
  );
  const ribbonMat = new THREE.LineBasicMaterial({
    color: 0xd6b56e,
    transparent: true,
    opacity: 0.27,
  });
  const ribbon = new THREE.Line(ribbonGeo, ribbonMat);
  scene.add(ribbon);
  const glintGeo = new THREE.SphereGeometry(0.023, 8, 6);
  const glintMat = new THREE.MeshBasicMaterial({
    color: 0xe8cea0,
    transparent: true,
    opacity: 0.7,
  });
  const glints = Array.from({ length: 9 }, () => {
    const dot = new THREE.Mesh(glintGeo, glintMat);
    scene.add(dot);
    return dot;
  });
  let phase = 3,
    target = 3,
    presented = 3,
    raf = 0,
    last = 0,
    elapsed = 0,
    visible = true,
    paused = false,
    disposed = false,
    lost = false;
  let slowFrames = 0,
    frameSamples = 0,
    slowTotal = 0;
  const pointerTarget = new THREE.Vector2(),
    pointer = new THREE.Vector2();
  const viewTarget = new THREE.Vector3();
  const narrow = () => container.clientWidth < 768;
  function overviewAt(angle: number) {
    return new THREE.Vector3(
      Math.sin(angle) * (narrow() ? 2 : 6.1),
      (narrow() ? 3.35 : 2.75) + Math.cos(angle) * (narrow() ? 0.18 : 0.35),
      -2.5 + Math.cos(angle) * 2.5,
    );
  }
  function updateRibbon() {
    for (let i = 0; i <= 192; i++) {
      const p = overviewAt((i / 192) * Math.PI * 2);
      ribbonPositions.set(p.toArray(), i * 3);
    }
    ribbonGeo.attributes.position.needsUpdate = true;
    ribbonGeo.computeBoundingSphere();
  }
  function schedule() {
    if (!raf && !disposed && !lost && visible && !document.hidden)
      raf = requestAnimationFrame(frame);
  }
  function render(dt: number) {
    const animate = !paused && !reduced.matches;
    phase = reduced.matches
      ? target
      : THREE.MathUtils.damp(phase, target, 3.15, dt);
    if (Math.abs(phase - target) < 0.00005) phase = target;
    if (animate) elapsed += dt;
    pointer.x = THREE.MathUtils.damp(
      pointer.x,
      animate ? pointerTarget.x : 0,
      2.25,
      dt,
    );
    pointer.y = THREE.MathUtils.damp(
      pointer.y,
      animate ? pointerTarget.y : 0,
      2.25,
      dt,
    );
    if (reduced.matches) pointer.set(0, 0);
    const travel = Math.min(1, Math.abs(target - phase));
    camera.position.set(
      pointer.x * 0.18,
      pointer.y * 0.11,
      14 + (reduced.matches ? 0 : Math.sin(travel * Math.PI) * 0.22),
    );
    viewTarget.set(pointer.x * 0.045, pointer.y * 0.025, 0);
    camera.lookAt(viewTarget);
    camera.updateMatrixWorld();
    const displayed = ((Math.round(phase) % 5) + 5) % 5;
    if (displayed !== presented) {
      presented = displayed;
      onFocus(displayed);
    }
    worlds.forEach(({ group, body }, i) => {
      const pose = orbitPose(
        i,
        phase + Math.sin(elapsed * 0.14) * 0.004,
        narrow(),
      );
      group.position.set(...pose.world);
      group.scale.setScalar(narrow() ? 4.05 : 4.8);
      if (animate) body.rotation.y += dt * (i === 3 ? 0.012 : 0.018);
      echoes[i].group.position.set(...pose.overview);
      echoes[i].group.scale.setScalar((narrow() ? 0.22 : 0.34) * pose.focus);
      echoes[i].body.rotation.y = body.rotation.y;
      echoes[i].group.visible = pose.focus > 0.00001;
      projected.set(...pose.overview).project(camera);
      const label = labels[i];
      if (label) {
        label.style.left = `${(projected.x * 0.5 + 0.5) * 100}%`;
        label.style.top = `${(-projected.y * 0.5 + 0.5) * 100}%`;
        label.style.opacity = String(0.55 + 0.45 * pose.focus);
        label.dataset.active = String(i === displayed);
        label.style.setProperty(
          "--label-depth",
          String(0.86 + 0.14 * (Math.cos(pose.angle) * 0.5 + 0.5)),
        );
      }
    });
    space.time.value = elapsed;
    space.view.value.copy(pointer);
    space.aspect.value = camera.aspect;
    ribbonMat.opacity = 0.24 + Math.sin(elapsed * 0.24) * 0.025;
    glints.forEach((dot, i) =>
      dot.position.copy(
        overviewAt(
          (i / 9) * Math.PI * 2 - phase * ORBIT_STEP + elapsed * 0.012,
        ),
      ),
    );
    hero.style.setProperty("--scene-x", `${pointer.x * 4}px`);
    hero.style.setProperty("--scene-y", `${-pointer.y * 3}px`);
    renderer.render(scene, camera);
  }
  function frame(time: number) {
    raf = 0;
    if (disposed || lost || !visible || document.hidden) return;
    const raw = last ? (time - last) / 1000 : 1 / 60;
    last = time;
    render(Math.min(raw, 0.05));
    // Sustained slow frames reduce pixel cost; a single loading spike does not.
    if (!paused && !reduced.matches && raw < 0.2) {
      slowTotal += raw;
      frameSamples++;
      if (raw > 0.036) slowFrames++;
    }
    if (frameSamples >= 120) {
      if (slowFrames > 85 && slowTotal / frameSamples > 0.038 && dpr > 1) {
        dpr = 1;
        renderer.setPixelRatio(dpr);
        hero.dataset.renderQuality = "balanced";
      }
      frameSamples = 0;
      slowFrames = 0;
      slowTotal = 0;
    }
    if (
      (!paused && !reduced.matches) ||
      Math.abs(phase - target) > 0.00005 ||
      pointer.length() > 0.001
    )
      schedule();
  }
  function resize() {
    if (disposed) return;
    renderer.setSize(container.clientWidth, container.clientHeight);
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    updateRibbon();
    render(0);
    schedule();
  }
  const loader = new THREE.TextureLoader();
  names.forEach((name, i) => {
    loader.load(
      `/media/images/TEX-${name}-${lowPower ? "1280" : "detail"}.webp`,
      (map) => {
        if (disposed) {
          map.dispose();
          return;
        }
        map.colorSpace = THREE.SRGBColorSpace;
        map.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());
        map.wrapS = THREE.RepeatWrapping;
        materials[i].map = map;
        materials[i].color.set(0xffffff);
        materials[i].needsUpdate = true;
        schedule();
      },
      undefined,
      () => {},
    );
    if (i < 3 && !lowPower)
      loader.load(
        `/media/images/TEX-${name}-relief.webp`,
        (map) => {
          if (disposed) {
            map.dispose();
            return;
          }
          map.wrapS = THREE.RepeatWrapping;
          materials[i].bumpMap = map;
          materials[i].bumpScale = i === 0 ? 0.022 : i === 1 ? 0.012 : 0.009;
          materials[i].needsUpdate = true;
          schedule();
        },
        undefined,
        () => {},
      );
  });
  const observer = new IntersectionObserver(
    ([e]) => {
      visible = e.isIntersecting;
      if (visible) {
        last = 0;
        schedule();
      } else {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    },
    { threshold: 0 },
  );
  observer.observe(container);
  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(container);
  const visibility = () => {
    if (document.hidden) {
      cancelAnimationFrame(raf);
      raf = 0;
    } else {
      last = 0;
      schedule();
    }
  };
  document.addEventListener("visibilitychange", visibility);
  const motionChange = () => {
    if (reduced.matches) {
      pointerTarget.set(0, 0);
      pointer.set(0, 0);
    }
    schedule();
  };
  reduced.addEventListener("change", motionChange);
  const move = (e: PointerEvent) => {
    if (reduced.matches || paused || e.pointerType === "touch") return;
    const r = hero.getBoundingClientRect();
    pointerTarget.set(
      THREE.MathUtils.clamp(((e.clientX - r.left) / r.width) * 2 - 1, -1, 1),
      THREE.MathUtils.clamp(1 - ((e.clientY - r.top) / r.height) * 2, -1, 1),
    );
    schedule();
  };
  const leave = () => {
    pointerTarget.set(0, 0);
    schedule();
  };
  hero.addEventListener("pointermove", move);
  hero.addEventListener("pointerleave", leave);
  const raycaster = new THREE.Raycaster();
  const input = new THREE.Vector2();
  let downX = 0,
    downY = 0;
  const down = (e: PointerEvent) => {
    downX = e.clientX;
    downY = e.clientY;
  };
  const click = (e: PointerEvent) => {
    if (Math.hypot(e.clientX - downX, e.clientY - downY) > 12) return;
    const r = container.getBoundingClientRect();
    input.set(
      ((e.clientX - r.left) / r.width) * 2 - 1,
      1 - ((e.clientY - r.top) / r.height) * 2,
    );
    raycaster.setFromCamera(input, camera);
    const objects = [
      ...echoes.filter((p) => p.group.visible).map((p) => p.body),
      ...worlds
        .filter((_, i) => orbitPose(i, phase, narrow()).focus < 0.5)
        .map((p) => p.body),
    ];
    const hit = raycaster.intersectObjects(objects, false)[0];
    if (hit) onSelect(hit.object.parent!.userData.world as number);
  };
  renderer.domElement.addEventListener("pointerdown", down);
  renderer.domElement.addEventListener("pointerup", click);
  const contextLost = (e: Event) => {
    e.preventDefault();
    lost = true;
    cancelAnimationFrame(raf);
    raf = 0;
    hero.classList.add("webgl-fallback");
  };
  const restored = () => {
    lost = false;
    hero.classList.remove("webgl-fallback");
    schedule();
  };
  renderer.domElement.addEventListener("webglcontextlost", contextLost);
  renderer.domElement.addEventListener("webglcontextrestored", restored);
  resize();
  return {
    select(index: number) {
      if (!raf) last = 0;
      target = nearestPhase(index, phase);
      if (reduced.matches) {
        phase = target;
        render(0);
      }
      schedule();
    },
    pause(value: boolean) {
      if (!raf) last = 0;
      paused = value;
      if (value) pointerTarget.set(0, 0);
      schedule();
    },
    inspect() {
      return {
        phase,
        target,
        camera: camera.position.toArray(),
        worlds: worlds.map((w) => ({
          position: w.group.position.toArray(),
          rotation: w.body.rotation.y,
        })),
        overview: echoes.map((w) => w.group.position.toArray()),
        drawCalls: renderer.info.render.calls,
        dpr,
        paused,
        visible,
      };
    },
    dispose() {
      disposed = true;
      cancelAnimationFrame(raf);
      observer.disconnect();
      resizeObserver.disconnect();
      document.removeEventListener("visibilitychange", visibility);
      reduced.removeEventListener("change", motionChange);
      hero.removeEventListener("pointermove", move);
      hero.removeEventListener("pointerleave", leave);
      renderer.domElement.removeEventListener("pointerdown", down);
      renderer.domElement.removeEventListener("pointerup", click);
      renderer.domElement.removeEventListener("webglcontextlost", contextLost);
      renderer.domElement.removeEventListener("webglcontextrestored", restored);
      geometry.dispose();
      rings.geometry.dispose();
      rings.material.dispose();
      ribbonGeo.dispose();
      ribbonMat.dispose();
      glintGeo.dispose();
      glintMat.dispose();
      space.dispose();
      shells.forEach((s) => {
        s.geometry.dispose();
        s.material.dispose();
      });
      materials.forEach((m) => {
        m.map?.dispose();
        m.bumpMap?.dispose();
        m.dispose();
      });
      renderer.dispose();
      renderer.domElement.remove();
    },
  };
}
