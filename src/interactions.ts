const motion = matchMedia("(prefers-reduced-motion: reduce)");
const swaps = new WeakMap<HTMLElement, Animation>();
const activeSwaps = new Set<Animation>();
motion.addEventListener("change", () => {
  if (motion.matches) activeSwaps.forEach((animation) => animation.cancel());
});

export function animateSwap(element: HTMLElement, offset = 24) {
  swaps.get(element)?.cancel();
  if (motion.matches) return;
  const animation = element.animate(
    [
      { opacity: 0.3, translate: `0 ${offset}px`, filter: "blur(1.5px)" },
      { opacity: 1, translate: "0 0", filter: "blur(0)" },
    ],
    { duration: 620, easing: "cubic-bezier(.16,1,.3,1)" },
  );
  swaps.set(element, animation);
  activeSwaps.add(animation);
  animation.onfinish = animation.oncancel = () => activeSwaps.delete(animation);
}

export function initInteractions() {
  const finePointer = matchMedia("(hover: hover) and (pointer: fine)");
  const selector =
    ".destination-card, .resort-preview, .interior-item, .crew-card";
  let card: HTMLElement | null = null;
  let frame = 0;
  let x = 0;
  let y = 0;

  const reset = () => {
    cancelAnimationFrame(frame);
    frame = 0;
    if (card) {
      for (const name of [
        "--pointer-x",
        "--pointer-y",
        "--light-x",
        "--light-y",
      ])
        card.style.removeProperty(name);
    }
    card = null;
  };
  const move = (event: PointerEvent) => {
    if (motion.matches || !finePointer.matches || event.pointerType === "touch")
      return;
    const next = (event.target as Element).closest<HTMLElement>(selector);
    if (next !== card) reset();
    card = next;
    if (!card) return;
    const bounds = card.getBoundingClientRect();
    x = (event.clientX - bounds.left) / bounds.width;
    y = (event.clientY - bounds.top) / bounds.height;
    if (!frame)
      frame = requestAnimationFrame(() => {
        frame = 0;
        if (!card) return;
        card.style.setProperty("--pointer-x", `${(x - 0.5) * 12}px`);
        card.style.setProperty("--pointer-y", `${(y - 0.5) * 8}px`);
        card.style.setProperty("--light-x", `${x * 100}%`);
        card.style.setProperty("--light-y", `${y * 100}%`);
      });
  };
  const leave = (event: PointerEvent) => {
    if (
      card &&
      (!(event.relatedTarget instanceof Node) ||
        !card.contains(event.relatedTarget))
    )
      reset();
  };
  document.addEventListener("pointermove", move, { passive: true });
  document.addEventListener("pointerout", leave, { passive: true });
  window.addEventListener("blur", reset);
  motion.addEventListener("change", reset);
  finePointer.addEventListener("change", reset);

  document
    .querySelectorAll(".destination-grid, .crew-grid, .pillars")
    .forEach((group) => {
      Array.from(group.children).forEach((child, index) => {
        (child as HTMLElement).style.setProperty(
          "--reveal-delay",
          `${(index % 3) * 85}ms`,
        );
      });
    });
  window.addEventListener(
    "pagehide",
    () => {
      reset();
      document.removeEventListener("pointermove", move);
      document.removeEventListener("pointerout", leave);
      window.removeEventListener("blur", reset);
      motion.removeEventListener("change", reset);
      finePointer.removeEventListener("change", reset);
    },
    { once: true },
  );
}
