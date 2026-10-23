import { getLanguage, getLocale } from "./locale";

// Native controls retain the form data; visible controls use local, themed popovers.
export function enhanceBooking(form: HTMLFormElement) {
  let active: { panel: HTMLElement; trigger: HTMLButtonElement } | null = null;
  const close = (focus = false) => {
    if (!active) return;
    const { panel, trigger } = active;
    active = null;
    panel.hidePopover();
    trigger.setAttribute("aria-expanded", "false");
    if (focus) trigger.focus({ preventScroll: true });
  };
  const position = () => {
    if (!active) return;
    const { panel, trigger } = active;
    const rect = trigger.getBoundingClientRect();
    const width = Math.min(
      innerWidth - 24,
      Math.max(rect.width, panel.classList.contains("date-panel") ? 320 : 280),
    );
    panel.style.width = `${width}px`;
    panel.style.maxHeight = "none";
    const naturalHeight = Math.min(
      panel.scrollHeight + 2,
      panel.classList.contains("date-panel") ? 520 : 430,
    );
    const below = innerHeight - rect.bottom - 18;
    const above = rect.top - 18;
    const useAbove = below < naturalHeight && above > below;
    panel.style.maxHeight = `${Math.max(120, Math.min(naturalHeight, useAbove ? above : below))}px`;
    panel.style.left = `${Math.max(12, Math.min(rect.left, innerWidth - width - 12))}px`;
    panel.style.top = `${useAbove ? Math.max(12, rect.top - panel.offsetHeight - 10) : rect.bottom + 10}px`;
  };
  const open = (panel: HTMLElement, trigger: HTMLButtonElement) => {
    if (active?.panel === panel) {
      close(true);
      return;
    }
    close();
    active = { panel, trigger };
    panel.showPopover();
    trigger.setAttribute("aria-expanded", "true");
    position();
  };
  window.addEventListener("resize", position);
  window.addEventListener("scroll", position, true);
  document.addEventListener("pointerdown", (e) => {
    if (
      active &&
      !active.panel.contains(e.target as Node) &&
      !active.trigger.contains(e.target as Node)
    )
      close();
  });
  document.addEventListener("keydown", (e) => {
    if (!active) return;
    if (e.key === "Escape") {
      e.preventDefault();
      close(true);
    }
    if (e.key === "Tab" && active) {
      const stops = Array.from(
        active.panel.querySelectorAll<HTMLElement>(
          'button:not(:disabled):not([tabindex="-1"])',
        ),
      );
      if (
        !active.panel.classList.contains("date-panel") ||
        (e.shiftKey && document.activeElement === stops[0]) ||
        (!e.shiftKey && document.activeElement === stops.at(-1))
      )
        close(true);
    }
  });
  const setup = (
    control: HTMLSelectElement | HTMLInputElement,
    title: string,
  ) => {
    const old = control.parentElement!;
    const field = document.createElement("div");
    field.className = "booking-field";
    const heading = document.createElement("span");
    heading.className = "booking-label";
    heading.textContent = title;
    heading.id = `${control.name}-label`;
    const trigger = document.createElement("button");
    trigger.type = "button";
    trigger.className = "booking-trigger";
    trigger.id = `${control.name}-trigger`;
    trigger.setAttribute("aria-expanded", "false");
    trigger.setAttribute(
      "aria-labelledby",
      `${heading.id} ${control.name}-value`,
    );
    trigger.innerHTML = `<span id="${control.name}-value" class="booking-value"></span><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.3" aria-hidden="true"><path d="m7 10 5 5 5-5"/></svg>`;
    const panel = document.createElement("div");
    panel.className = "booking-popover";
    panel.id = `${control.name}-panel`;
    panel.setAttribute("popover", "manual");
    panel.setAttribute("aria-labelledby", heading.id);
    trigger.setAttribute("aria-controls", panel.id);
    old.replaceWith(field);
    control.hidden = true;
    field.append(heading, control, trigger);
    document.body.append(panel);
    return {
      trigger,
      panel,
      value: trigger.querySelector<HTMLElement>(".booking-value")!,
    };
  };
  form.querySelectorAll<HTMLSelectElement>("select").forEach((control) => {
    const title = control.parentElement!.firstChild!.textContent!.trim();
    const { trigger, panel, value } = setup(control, title);
    trigger.setAttribute("aria-haspopup", "listbox");
    panel.setAttribute("role", "listbox");
    const options = Array.from(control.options);
    panel.innerHTML = `<div class="picker-caption">${title === "Destination" ? "YOUR NEXT WORLD" : title === "Travelers" ? "IN GOOD COMPANY" : "YOUR PRIVATE SPACE"}</div>`;
    const buttons = options.map((option) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "booking-option";
      button.tabIndex = -1;
      button.setAttribute("role", "option");
      const [name, subtitle] = option.text.split(" — ");
      button.innerHTML = `<span><span class="option-name">${name}</span>${subtitle ? `<small>${subtitle}</small>` : ""}</span><span class="option-check" aria-hidden="true">✓</span>`;
      button.onclick = () => {
        control.value = option.value;
        control.dispatchEvent(new Event("change", { bubbles: true }));
        close(true);
      };
      panel.append(button);
      return button;
    });
    const sync = () => {
      value.textContent = options[control.selectedIndex].text;
      buttons.forEach((b, i) =>
        b.setAttribute("aria-selected", String(i === control.selectedIndex)),
      );
    };
    sync();
    control.addEventListener("change", sync);
    const focusOption = (index: number) => {
      const b = buttons[(index + buttons.length) % buttons.length];
      b.focus({ preventScroll: true });
      b.scrollIntoView({ block: "nearest" });
    };
    trigger.onclick = () => {
      open(panel, trigger);
      if (active?.panel === panel) focusOption(control.selectedIndex);
    };
    trigger.onkeydown = (e) => {
      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        e.preventDefault();
        if (active?.panel !== panel) open(panel, trigger);
        focusOption(control.selectedIndex);
      }
    };
    let typed = "",
      typedAt = 0;
    panel.onkeydown = (e) => {
      const current = buttons.indexOf(
        document.activeElement as HTMLButtonElement,
      );
      if (["ArrowDown", "ArrowUp", "Home", "End"].includes(e.key)) {
        e.preventDefault();
        focusOption(
          e.key === "Home"
            ? 0
            : e.key === "End"
              ? buttons.length - 1
              : current + (e.key === "ArrowDown" ? 1 : -1),
        );
      } else if (e.key.length === 1 && e.key !== " ") {
        typed = Date.now() - typedAt > 700 ? e.key : typed + e.key;
        typedAt = Date.now();
        const index = buttons.findIndex((button) =>
          (button.querySelector(".option-name")?.textContent ?? "")
            .toLowerCase()
            .startsWith(typed.toLowerCase()),
        );
        if (index >= 0) focusOption(index);
      }
    };
  });
  const input = form.querySelector<HTMLInputElement>("#departure")!;
  const { trigger, panel, value } = setup(input, "Departure date");
  input.type = "hidden";
  panel.classList.add("date-panel");
  panel.setAttribute("role", "dialog");
  trigger.setAttribute("aria-haspopup", "dialog");
  trigger.querySelector("svg")!.innerHTML =
    '<rect x="4" y="6" width="16" height="15" rx="3"/><path d="M8 3v6m8-6v6M4 11h16"/>';
  const parse = (s: string) => new Date(`${s}T12:00:00`);
  const iso = (d: Date) =>
    `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  const today = new Date();
  today.setHours(12, 0, 0, 0);
  let shown = parse(input.value),
    focused = parse(input.value);
  const format = (d: Date) =>
    new Intl.DateTimeFormat(getLocale(), {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(d);
  const syncDate = () => {
    value.textContent = format(parse(input.value));
  };
  syncDate();
  input.addEventListener("change", syncDate);
  const render = (focusDay = false) => {
    const year = shown.getFullYear(),
      month = shown.getMonth();
    const first = new Date(year, month, 1, 12),
      count = new Date(year, month + 1, 0).getDate();
    const offset = (first.getDay() + 6) % 7;
    const canPrevious =
      year > today.getFullYear() ||
      (year === today.getFullYear() && month > today.getMonth());
    panel.innerHTML = `<div class="picker-caption">A DATE WITH THE EXTRAORDINARY</div><div class="calendar-heading"><button type="button" data-month="-1" aria-label="Previous month" ${canPrevious ? "" : "disabled"}>‹</button><span aria-live="polite">${new Intl.DateTimeFormat(getLocale(), { month: "long", year: "numeric" }).format(shown)}</span><button type="button" data-month="1" aria-label="Next month">›</button></div><div class="calendar-week" aria-hidden="true">${(getLanguage() === "ru" ? ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"] : ["M", "T", "W", "T", "F", "S", "S"]).map((d) => `<span>${d}</span>`).join("")}</div><div class="calendar-days" role="group" aria-label="Choose departure date">${'<span class="calendar-empty"></span>'.repeat(offset)}${Array.from(
      { length: count },
      (_, i) => {
        const d = new Date(year, month, i + 1, 12),
          day = iso(d),
          disabled = d < today;
        return `<button type="button" class="calendar-day ${day === iso(today) ? "is-today" : ""}" data-date="${day}" aria-label="${format(d)}" aria-pressed="${day === input.value}" tabindex="${day === iso(focused) ? 0 : -1}" ${disabled ? "disabled" : ""}>${i + 1}</button>`;
      },
    ).join(
      "",
    )}</div><div class="calendar-footer"><span>Time for a new perspective.</span><button type="button" data-today>Today</button></div>`;
    panel.querySelectorAll<HTMLButtonElement>("[data-month]").forEach(
      (b) =>
        (b.onclick = () => {
          const day = focused.getDate();
          shown = new Date(year, month + Number(b.dataset.month), 1, 12);
          focused = new Date(
            shown.getFullYear(),
            shown.getMonth(),
            Math.min(
              day,
              new Date(shown.getFullYear(), shown.getMonth() + 1, 0).getDate(),
            ),
            12,
          );
          if (focused < today) focused = new Date(today);
          render();
          panel
            .querySelector<HTMLButtonElement>(
              `[data-month="${b.dataset.month}"]`,
            )
            ?.focus();
          position();
        }),
    );
    const choose = (day: string) => {
      input.value = day;
      input.dispatchEvent(new Event("change", { bubbles: true }));
      close(true);
    };
    panel
      .querySelectorAll<HTMLButtonElement>("[data-date]")
      .forEach((b) => (b.onclick = () => choose(b.dataset.date!)));
    panel.querySelector<HTMLButtonElement>("[data-today]")!.onclick = () =>
      choose(iso(today));
    if (focusDay)
      panel
        .querySelector<HTMLButtonElement>(`[data-date="${iso(focused)}"]`)
        ?.focus({ preventScroll: true });
  };
  trigger.onclick = () => {
    if (active?.panel === panel) {
      close(true);
      return;
    }
    shown = parse(input.value);
    focused = parse(input.value);
    render();
    open(panel, trigger);
    render(true);
  };
  panel.addEventListener("keydown", (e) => {
    if (!(e.target as HTMLElement).matches("[data-date]")) return;
    const steps: Record<string, number> = {
      ArrowLeft: -1,
      ArrowRight: 1,
      ArrowUp: -7,
      ArrowDown: 7,
    };
    if (e.key in steps) {
      e.preventDefault();
      focused.setDate(focused.getDate() + steps[e.key]);
    } else if (e.key === "PageUp" || e.key === "PageDown") {
      e.preventDefault();
      const day = focused.getDate();
      const next = new Date(
        focused.getFullYear(),
        focused.getMonth() + (e.key === "PageDown" ? 1 : -1),
        1,
        12,
      );
      focused = new Date(
        next.getFullYear(),
        next.getMonth(),
        Math.min(
          day,
          new Date(next.getFullYear(), next.getMonth() + 1, 0).getDate(),
        ),
        12,
      );
    } else if (e.key === "Home" || e.key === "End") {
      e.preventDefault();
      focused.setDate(
        e.key === "Home"
          ? 1
          : new Date(
              focused.getFullYear(),
              focused.getMonth() + 1,
              0,
            ).getDate(),
      );
    } else return;
    if (focused < today) focused = new Date(today);
    shown = new Date(focused);
    render(true);
    position();
  });
  document.addEventListener("astera:languagechange", () => {
    close();
    syncDate();
    if (panel.childElementCount) render();
  });
}
