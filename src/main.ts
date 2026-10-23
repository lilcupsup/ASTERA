import "@fontsource-variable/manrope/index.css";
import "@fontsource/cormorant-garamond/latin-400.css";
import "@fontsource/cormorant-garamond/latin-400-italic.css";
import "./style.css";
import { destinations, experiences, fleet, crew, imageUrl } from "./data";
import { searchJourneys, money } from "./booking";
import { enhanceBooking } from "./booking-controls";

const arrow = '<svg class="ui-arrow" viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" focusable="false"><path d="M6 18 18 6M6 6h12v12"/></svg>';
const img = (name: string, alt: string, cls = "", eager = false) =>
  `<img class="${cls}" src="${imageUrl(name)}" srcset="${imageUrl(name, 640)} 640w, ${imageUrl(name)} 1280w" sizes="(max-width: 767px) 100vw, 60vw" alt="${alt}" loading="${eager ? "eager" : "lazy"}" decoding="async" width="1280" height="720">`;
const label = (text: string) => `<p class="eyebrow">${text}</p>`;
const app = document.querySelector<HTMLDivElement>("#app")!;
app.innerHTML = `
<a class="skip" href="#destinations">Skip to destinations</a>
<header class="header"><a class="brand" href="#home" aria-label="ASTERA home"><img src="/media/images/astera-logo.png" alt="ASTERA" width="108" height="78"><span>INTERPLANETARY TRAVEL & RESORTS</span></a><nav aria-label="Main navigation"><a href="#destinations">Destinations</a><a href="#fleet">The Fleet</a><a href="#experience">Experience</a><a href="#crew">Crew</a></nav><a class="button outline header-book" href="#booking">Book a journey ${arrow}</a><button class="menu-toggle" aria-label="Open navigation" aria-expanded="false">☰</button></header>
<main>
<section id="home" class="hero" aria-label="Planetary destination carousel" tabindex="0">
 <div class="hero-fallback">${img("IMG-03_saturn", "Saturn and the ASTERA orbital resort", "", true)}</div><div id="planetary" class="planetary"></div><div class="hero-shade"></div>
 <div class="orbital-labels" aria-hidden="true">${destinations.map((d) => `<span>${d.name}</span>`).join("")}</div>
 <div class="hero-copy"><p class="eyebrow" id="hero-number">Destination 04 <span class="gold-line"></span></p><h1 id="hero-title">SATURN</h1><p id="hero-resort" class="hero-resort">THE RINGS RESORT</p><p id="hero-description" class="hero-description">Wake above the most extraordinary<br>view in the solar system.</p><div class="actions"><button class="button gold" id="hero-explore">Explore Saturn ${arrow}</button><a class="button outline" href="#booking" id="hero-book">Book your journey <span>→</span></a></div></div>
 <button class="orbit-arrow prev" aria-label="Previous destination"><svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="m15 6-6 6 6 6"/></svg></button><button class="orbit-arrow next" aria-label="Next destination"><svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="m9 6 6 6-6 6"/></svg></button>
 <button class="resort-preview" id="resort-preview">${img("IMG-03_saturn", "The Rings Resort above Saturn", "", true)}<span class="preview-body"><span><span class="preview-title">The Rings Resort</span><span class="eyebrow preview-type">Orbital luxury</span></span><span class="preview-arrow">${arrow}</span></span></button>
 <div class="hero-bottom"><span class="hero-caption">BEYOND ORDINARY HORIZONS.</span><div class="destination-tabs" role="group" aria-label="Choose a destination">${destinations.map((d, i) => `<button data-planet="${i}" aria-pressed="${i === 3}">${d.name}</button>`).join("")}</div><button id="motion-toggle" class="motion-toggle" aria-label="Pause planet motion" aria-pressed="false">Ⅱ</button></div>
 <span class="sr-only" id="planet-announcement" aria-live="polite"></span>
</section>
<section id="destinations" class="section destinations"><div class="section-heading reveal"><div>${label("01 / A collection of extraordinary places")}<h2>Extraordinary<br>worlds <em>await.</em></h2></div><p>Some journeys change your surroundings.<br>Others change your perspective.<br>Discover five worlds, each distinctly ASTERA.</p></div>
 <div class="destination-grid">${destinations.map((d, i) => `<button class="destination-card reveal ${i === 3 ? "wide" : ""}" data-destination="${i}">${img(d.image, d.resort + " on " + d.name)}<span class="card-scrim"></span><span class="card-index">0${i + 1} / ${d.type}</span><span class="destination-card-copy"><span><span class="card-planet">${d.name}</span><span class="card-resort">${d.resort}</span></span><span class="circle-link">${arrow}</span></span></button>`).join("")}</div><p class="small-note">An imagined collection of far-future destinations. A fictional ASTERA concept.</p>
</section>
<section id="interiors" class="section interiors"><div class="section-heading reveal"><div>${label("02 / Luxury between worlds")}<h2>Getting there is<br>half the <em>experience.</em></h2></div><div><p>The rare pleasure of feeling at home,<br>somewhere entirely new.</p><div class="gallery-controls"><button aria-label="Previous interior" id="interior-prev">←</button><button aria-label="Next interior" id="interior-next">→</button></div></div></div><div class="interior-gallery" tabindex="0" aria-label="Onboard spaces, horizontally scrollable">${experiences.map((x, i) => `<button class="interior-item" data-experience="${i}">${img(x.image, x.name)}<span class="interior-caption"><span class="eyebrow">0${i + 1} / ON BOARD</span><span class="interior-name">${x.name}</span><span>${x.text}</span></span></button>`).join("")}</div></section>
<section id="fleet" class="section fleet"><div class="center-heading reveal">${label("03 / Meet the ASTERA fleet")}<h2>Designed for the<br>journey <em>beyond.</em></h2><p>Exceptional vessels. One unmistakable philosophy.</p></div><div class="fleet-tabs" role="group" aria-label="Select spacecraft">${fleet.map((s, i) => `<button data-ship="${i}" aria-pressed="${i === 0}">${s.name}</button>`).join("")}</div><div class="fleet-stage reveal"><div class="fleet-image" id="fleet-image">${img(fleet[0].image, "ASTERA ONE spacecraft above Earth")}</div><div class="fleet-info"><div><p class="eyebrow" id="fleet-type">Interplanetary Flagship</p><h3 id="fleet-name">ASTERA ONE</h3><p id="fleet-copy">${fleet[0].text}</p></div><div class="guest-stat"><strong id="fleet-guests">120</strong><span>GUESTS</span></div><button class="text-link" id="fleet-details">Explore the spacecraft ${arrow}</button></div></div></section>
<section id="experience" class="section philosophy"><div class="philosophy-heading reveal">${label("04 / The ASTERA experience")}<h2>Five-star hospitality.<br><em>Zero Earth required.</em></h2><p>Every detail considered.<br>Every moment, entirely yours.</p></div><div class="pillars">${[
  ["01", "Private suites", "Room to be yourself. Space to see everything."],
  ["02", "Fine dining", "A sense of place, at every table."],
  [
    "03",
    "Personal concierge",
    "Your preferences, anticipated. Your time, protected.",
  ],
  [
    "04",
    "Extraordinary excursions",
    "Venture further, in exceptional company.",
  ],
]
  .map(
    ([n, t, p]) =>
      `<div class="pillar reveal"><span>${n}</span><div><h3>${t}</h3><p>${p}</p></div><span class="pillar-star">✧</span></div>`,
  )
  .join("")}</div></section>
<section id="crew" class="section crew"><div class="section-heading reveal"><div>${label("05 / Meet your crew")}<h2>In extraordinary<br><em>hands.</em></h2></div><p>The confidence to go further begins<br>with the people who take you there.</p></div><div class="crew-grid">${crew.map((c, i) => `<button class="crew-card reveal" data-crew="${i}">${img(c.image, c.name + ", " + c.role)}<span class="crew-role eyebrow">${c.role}</span><span class="crew-name">${c.name}</span><span class="crew-credential">${c.credential}</span><span class="text-link">Meet ${c.name.includes("Elena") ? "Elena" : c.name.includes("James") ? "James" : "Maya"} ${arrow}</span></button>`).join("")}</div><p class="small-note">Our crew are fictional characters created for the ASTERA universe.</p></section>
<section id="booking" class="section booking"><div class="center-heading">${label("06 / Your next chapter")}<h2>Where will you<br>go <em>next?</em></h2><p>A remarkable journey begins with a little curiosity.</p></div><form id="booking-form"><div class="booking-fields"><label>From<span class="fixed-field">Earth — Orbital Terminal</span></label><label>Destination<select name="destination" id="booking-destination">${destinations.map((d) => `<option value="${d.id}" ${d.id === "saturn" ? "selected" : ""}>${d.name} — ${d.resort}</option>`).join("")}</select></label><label>Departure date<input type="date" name="date" id="departure" required></label><label>Travelers<select name="travelers">${Array.from({ length: 12 }, (_, i) => `<option value="${i + 1}">${i + 1} ${i ? "guests" : "guest"}</option>`).join("")}</select></label><label>Cabin<select name="cabin"><option value="suite">Celestial Suite</option><option value="residence">Private Residence</option><option value="charter">Private Charter</option></select></label></div><div class="booking-bottom"><p>DEMO / CONCEPT<br><span>Imagined journeys. No real availability or payments.</span></p><button type="submit" class="button gold">Search journeys <span>→</span></button></div></form><div id="booking-results" aria-live="polite"></div></section>
<section id="app-preview" class="section app-section"><div class="app-copy reveal">${label("07 / The ASTERA app")}<h2>The universe<br>in your <em>pocket.</em></h2><p>Your itinerary. Your next discovery. Your personal concierge.<br>One considered companion for the journey beyond.</p><div class="app-switch" role="group" aria-label="Preview app screens"><button data-screen="0" aria-pressed="true">Discover</button><button data-screen="1" aria-pressed="false">Your journey</button><button data-screen="2" aria-pressed="false">Concierge</button></div><div class="store-buttons"><button data-coming="App Store"><span>COMING SOON</span>App Store ${arrow}</button><button data-coming="Google Play"><span>COMING SOON</span>Google Play ${arrow}</button></div><p class="small-note">An editable app concept. Not yet available for download.</p></div><div class="phone-wrap"><div class="phone"><div class="phone-camera"></div><div class="phone-status"><span>9:41</span><span>● ▰</span></div><div class="phone-content" id="phone-content"></div><div class="phone-nav"><span>⌂<small>Discover</small></span><span>✧<small>Journey</small></span><span>◉<small>Concierge</small></span></div></div><span class="phone-orbit" aria-hidden="true"></span></div></section>
<section id="prive" class="prive"><div class="prive-image">${img("IMG-18_horizon", "Traveler enjoying a private view of Saturn")}</div><div class="prive-copy reveal">${label("ASTERA PRIVÉ")}<h2>Travel beyond<br><em>ordinary.</em></h2><p>For those who see the universe differently.<br>An invitation to a more personal world of ASTERA.</p><ul><li>Priority journeys & private launches</li><li>Personal concierge & suite upgrades</li><li>Private excursions & charter access</li></ul><button class="button outline" id="prive-details">Discover Privé ${arrow}</button></div></section>
<section id="final" class="final-cta"><div class="final-media">${img("IMG-18_horizon", "A traveler looking out at Saturn through panoramic glass")}<video id="final-video" muted loop playsinline preload="none" hidden poster="${imageUrl("IMG-18_horizon")}"></video></div><div class="final-copy">${label("BEYOND ORDINARY HORIZONS.")}<h2>Your next world<br>is <em>waiting.</em></h2><div class="actions"><a class="button gold" href="#destinations">Explore destinations ${arrow}</a><a class="button outline" href="#booking">Book your journey →</a></div></div><button id="video-toggle" class="motion-toggle" hidden aria-label="Pause film">Ⅱ</button></section>
</main><footer><div class="footer-top"><a class="footer-brand" href="#home">ASTERA<span>Beyond Ordinary Horizons.</span></a><nav aria-label="Footer navigation"><a href="#destinations">Destinations</a><a href="#fleet">Spacecraft</a><a href="#experience">Experiences</a><a href="#prive">ASTERA Privé</a><button id="about">About</button><button id="contact">Contact</button></nav></div><div class="footer-bottom"><span>© ${new Date().getFullYear()} ASTERA · A fictional future-travel concept</span><span>IMAGINATION HAS NO FINAL FRONTIER.</span></div></footer>
<dialog id="detail-dialog"><button class="dialog-close" aria-label="Close details">×</button><div id="dialog-content"></div></dialog><div class="toast" role="status" hidden></div>`;

const $ = <T extends HTMLElement = HTMLElement>(q: string) =>
  document.querySelector<T>(q)!;
let active = 3,
  ship = 0,
  paused = matchMedia("(prefers-reduced-motion: reduce)").matches;
let scene:
  | Awaited<ReturnType<(typeof import("./planetary"))["initPlanetary"]>>
  | undefined;
const hero = $("#home");
let presentedPlanet = 3;
let copyAnimations: Animation[] = [];
function selectPlanet(n: number) {
  active = (n + 5) % 5;
  if (scene) {
    scene.select(active);
    if (hero.classList.contains("webgl-fallback")) presentPlanet(active);
  } else presentPlanet(active);
}
function presentPlanet(index: number) {
  presentedPlanet = index;
  const d = destinations[index];
  copyAnimations.forEach((animation) => animation.cancel());
  copyAnimations = [];
  $("#hero-title").textContent = d.name.toUpperCase();
  $("#hero-number").innerHTML =
    `Destination 0${index + 1} <span class="gold-line"></span>`;
  $("#hero-resort").textContent = d.resort.toUpperCase();
  $("#hero-description").textContent = d.description;
  $("#hero-explore").innerHTML = `Explore ${d.name} ${arrow}`;
  $("#resort-preview").innerHTML =
    `${img(d.image, d.resort, "", true)}<span class="preview-body"><span><span class="preview-title">${d.resort}</span><span class="eyebrow preview-type">${d.type}</span></span><span class="preview-arrow">${arrow}</span></span>`;
  document
    .querySelectorAll("[data-planet]")
    .forEach((b, i) => b.setAttribute("aria-pressed", String(i === index)));
  $("#planet-announcement").textContent =
    `${d.name}. ${d.resort}. ${d.description}`;
  $("#booking-destination").setAttribute("data-selected", d.id);
  $<HTMLSelectElement>("#booking-destination").value = d.id;
  $("#booking-destination").dispatchEvent(new Event("change"));
  hero.style.setProperty("--destination-accent", d.accent);
  $(".hero-fallback").innerHTML = img(d.image, d.resort, "", true);
  if (!matchMedia("(prefers-reduced-motion: reduce)").matches) {
    for (const [element, offset] of [
      [".hero-copy", 15],
      ["#resort-preview", 22],
    ] as const) {
      copyAnimations.push(
        $(element).animate(
          [
            {
              opacity: 0.6,
              translate: `${offset}px 7px`,
              filter: "blur(.7px)",
            },
            { opacity: 1, translate: "0px 0px", filter: "blur(0px)" },
          ],
          { duration: 650, easing: "cubic-bezier(.2,.65,.25,1)" },
        ),
      );
    }
  }
}
document
  .querySelectorAll<HTMLElement>("[data-planet]")
  .forEach((b) =>
    b.addEventListener("click", () => selectPlanet(Number(b.dataset.planet))),
  );
$(".prev").onclick = () => selectPlanet(active - 1);
$(".next").onclick = () => selectPlanet(active + 1);
hero.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
    e.preventDefault();
    selectPlanet(active + (e.key === "ArrowRight" ? 1 : -1));
  }
});
let pointerStart = 0,
  pointerY = 0;
hero.addEventListener("pointerdown", (e) => {
  if ((e.target as HTMLElement).closest("button,a")) return;
  pointerStart = e.clientX;
  pointerY = e.clientY;
});
hero.addEventListener("pointerup", (e) => {
  if (!pointerStart) return;
  const dx = e.clientX - pointerStart,
    dy = e.clientY - pointerY;
  pointerStart = 0;
  if (Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy))
    selectPlanet(active + (dx < 0 ? 1 : -1));
});
hero.addEventListener("pointercancel", () => (pointerStart = 0));
let lastWheel = 0;
hero.addEventListener(
  "wheel",
  (e) => {
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY) && Math.abs(e.deltaX) > 15) {
      e.preventDefault();
      if (Date.now() - lastWheel > 900) {
        selectPlanet(active + (e.deltaX > 0 ? 1 : -1));
        lastWheel = Date.now();
      }
    }
  },
  { passive: false },
);
function updateMotion() {
  const b = $("#motion-toggle");
  b.textContent = paused ? "▷" : "Ⅱ";
  b.setAttribute("aria-pressed", String(paused));
  b.setAttribute(
    "aria-label",
    paused ? "Resume planet motion" : "Pause planet motion",
  );
  scene?.pause(paused);
}
$("#motion-toggle").onclick = () => {
  paused = !paused;
  updateMotion();
};
updateMotion();
matchMedia("(prefers-reduced-motion: reduce)").addEventListener(
  "change",
  (e) => {
    paused = e.matches;
    updateMotion();
  },
);
import("./planetary")
  .then((m) => {
    try {
      scene = m.initPlanetary($("#planetary"), selectPlanet, presentPlanet);
      if (active !== 3) scene.select(active);
      updateMotion();
      hero.classList.add("webgl-ready");
    } catch (e) {
      hero.classList.add("webgl-fallback");
      console.info("Static destination fallback enabled.", e);
    }
  })
  .catch(() => hero.classList.add("webgl-fallback"));
const dialog = $<HTMLDialogElement>("#detail-dialog");
let lastFocus: HTMLElement | null = null;
function openDialog(content: string) {
  lastFocus = document.activeElement as HTMLElement;
  $("#dialog-content").innerHTML = content;
  dialog.showModal();
  document.body.classList.add("dialog-open");
  $(".dialog-close").focus();
  dialog
    .querySelector<HTMLElement>("[data-book]")
    ?.addEventListener("click", () => {
      dialog.close();
      $("#booking").scrollIntoView({ behavior: "smooth" });
      $("#destination-trigger").focus({
        preventScroll: true,
      });
    });
}
dialog.addEventListener("close", () => {
  document.body.classList.remove("dialog-open");
  lastFocus?.focus({ preventScroll: true });
});
$(".dialog-close").onclick = () => dialog.close();
dialog.addEventListener("click", (e) => {
  if (e.target === dialog) {
    const r = dialog.getBoundingClientRect();
    if (
      e.clientX < r.left ||
      e.clientX > r.right ||
      e.clientY < r.top ||
      e.clientY > r.bottom
    )
      dialog.close();
  }
});
function destinationDetail(i: number) {
  const d = destinations[i];
  $<HTMLSelectElement>("#booking-destination").value = d.id;
  $("#booking-destination").dispatchEvent(new Event("change"));
  openDialog(
    `${img(d.image, d.resort)}<div class="dialog-copy">${label(d.name + " / " + d.type)}<h2>${d.resort}</h2><p>${d.detail}</p><ul>${d.facts.map((f) => `<li>${f}</li>`).join("")}</ul><div class="dialog-meta"><span>Concept journey from ${money(d.price)} / guest</span><button class="button gold" data-book>Explore demo journeys →</button></div><p class="small-note">Fictional future concept. Durations and prices are illustrative, not real travel offers.</p></div>`,
  );
}
$("#hero-explore").onclick = () => destinationDetail(presentedPlanet);
$("#resort-preview").onclick = () => destinationDetail(presentedPlanet);
document
  .querySelectorAll<HTMLElement>("[data-destination]")
  .forEach(
    (b) => (b.onclick = () => destinationDetail(Number(b.dataset.destination))),
  );
document.querySelectorAll<HTMLElement>("[data-experience]").forEach(
  (b) =>
    (b.onclick = () => {
      const x = experiences[Number(b.dataset.experience)];
      openDialog(
        `${img(x.image, x.name)}<div class="dialog-copy">${label("Luxury between worlds")}<h2>${x.name}</h2><p>${x.text} Discover an environment shaped around your comfort, with panoramic views, exceptional materials and quietly attentive service.</p><button class="button gold" data-book>Find your journey →</button></div>`,
      );
    }),
);
const gallery = $(".interior-gallery");
$("#interior-prev").onclick = () =>
  gallery.scrollBy({ left: -gallery.clientWidth * 0.7, behavior: "smooth" });
$("#interior-next").onclick = () =>
  gallery.scrollBy({ left: gallery.clientWidth * 0.7, behavior: "smooth" });
document.querySelectorAll<HTMLElement>("[data-ship]").forEach(
  (b) =>
    (b.onclick = () => {
      ship = Number(b.dataset.ship);
      const s = fleet[ship];
      $("#fleet-image").innerHTML = img(
        s.image,
        s.name + " spacecraft",
        "",
        true,
      );
      $("#fleet-name").textContent = s.name;
      $("#fleet-type").textContent = s.type;
      $("#fleet-copy").textContent = s.text;
      $("#fleet-guests").textContent = String(s.guests);
      document
        .querySelectorAll("[data-ship]")
        .forEach((x, i) => x.setAttribute("aria-pressed", String(i === ship)));
    }),
);
$("#fleet-details").onclick = () => {
  const s = fleet[ship];
  openDialog(
    `${img(s.image, s.name)}<div class="dialog-copy">${label(s.type)}<h2>${s.name}</h2><p>${s.text}</p><ul><li>${s.guests} guests</li>${s.specs.map((t) => `<li>${t}</li>`).join("")}</ul><button class="button gold" data-book>Explore demo journeys →</button></div>`,
  );
};
document.querySelectorAll<HTMLElement>("[data-crew]").forEach(
  (b) =>
    (b.onclick = () => {
      const c = crew[Number(b.dataset.crew)];
      openDialog(
        `${img(c.image, c.name)}<div class="dialog-copy">${label(c.role)}<h2>${c.name}</h2><p>${c.credential}</p><p>${c.bio}</p><p class="small-note">A fictional member of the ASTERA crew.</p></div>`,
      );
    }),
);
const date = new Date();
const isoLocal = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
$<HTMLInputElement>("#departure").min = isoLocal(date);
date.setDate(date.getDate() + 30);
$<HTMLInputElement>("#departure").value = isoLocal(date);
enhanceBooking($<HTMLFormElement>("#booking-form"));
$("#booking-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const data = new FormData(e.target as HTMLFormElement);
  try {
    const input = {
      destination: String(data.get("destination")),
      date: String(data.get("date")),
      travelers: Number(data.get("travelers")),
      cabin: String(data.get("cabin")),
    };
    const results = searchJourneys(input);
    const d = destinations.find((d) => d.id === input.destination)!;
    $("#booking-results").innerHTML = results.length
      ? `<article class="journey-result">${label("DEMO / CONCEPT · Illustrative itinerary")}<div><div><h3>Earth → ${d.name}</h3><p>${d.resort} · ${d.days} nights · ${input.date}</p><p>${input.travelers} guest${input.travelers > 1 ? "s" : ""} · ${input.cabin === "suite" ? "Celestial Suite" : input.cabin === "residence" ? "Private Residence" : "Private Charter"}</p></div><div><strong>${money(results[0].total)}</strong><p>Total illustrative price · USD</p></div><button class="button outline" id="view-itinerary">View itinerary ${arrow}</button></div></article>`
      : `<div class="empty-state"><h3>No matching demo journeys</h3><p>Private charter is not included in our Europa concept collection. Try a suite or another destination.</p></div>`;
    $("#view-itinerary")?.addEventListener("click", () =>
      openDialog(
        `<div class="dialog-copy">${label("DEMO / CONCEPT · No reservation created")}<h2>Your ${d.name} journey</h2><p>${input.date} · ${input.travelers} guests · ${money(results[0].total)} total</p><ol><li>Private welcome at Earth Orbital Terminal</li><li>Departure aboard ${input.cabin === "charter" ? "AURELIA" : "ASTERA ONE"}</li><li>Arrival and private transfer to ${d.resort}</li><li>${d.facts[1]} and time entirely your own</li><li>Return passage to Earth</li></ol><p>This is an illustrative itinerary only. No booking has been made, no payment is collected and no data is sent.</p></div>`,
      ),
    );
  } catch (error) {
    $("#booking-results").textContent = (error as Error).message;
  }
});
const phoneScreens = [
  () =>
    `${label("ASTERA")}<h3>Your next<br><em>extraordinary.</em></h3>${img("IMG-03_saturn", "Saturn resort app preview")}<p class="eyebrow">FEATURED DESTINATION</p><h4>Saturn</h4><p>The Rings Resort</p><span class="phone-chip">Explore the collection ${arrow}</span>`,
  () =>
    `${label("YOUR JOURNEY")}<h3>Saturn<br><em>is calling.</em></h3><div class="countdown"><strong>30</strong><span>DAYS TO DEPARTURE · DEMO</span></div><div class="boarding"><span>ASTERA ONE</span><h4>EAR <span>→</span> SAT</h4><p>Celestial Suite · Deck 04</p><div class="boarding-code" aria-hidden="true"></div><small>CONCEPT BOARDING PASS</small></div><p>Itinerary · Arrival · Resort</p>`,
  () =>
    `${label("YOUR CONCIERGE")}<h3>Consider<br><em>it arranged.</em></h3><div class="phone-message">Good evening. Your private observation salon is ready for ringrise.</div><p class="phone-chip">Private excursions ${arrow}</p><p class="phone-chip">Resort information ${arrow}</p><p class="phone-chip">Dining reservations ${arrow}</p><p class="small-note">Illustrative app preview</p>`,
];
let phoneScreen = 0,
  phoneManual = false;
function screen(n: number) {
  phoneScreen = n;
  $("#phone-content").innerHTML = phoneScreens[n]();
  document
    .querySelectorAll("[data-screen]")
    .forEach((b, i) => b.setAttribute("aria-pressed", String(i === n)));
}
screen(0);
document.querySelectorAll<HTMLElement>("[data-screen]").forEach(
  (b) =>
    (b.onclick = () => {
      phoneManual = true;
      screen(Number(b.dataset.screen));
    }),
);
let appVisible = false;
new IntersectionObserver(([e]) => (appVisible = e.isIntersecting)).observe(
  $("#app-preview"),
);
window.addEventListener(
  "scroll",
  () => {
    if (
      !appVisible ||
      phoneManual ||
      matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    const rect = $("#app-preview").getBoundingClientRect();
    const progress = (innerHeight - rect.top) / (innerHeight + rect.height);
    const next = Math.min(2, Math.max(0, Math.floor(progress * 3)));
    if (next !== phoneScreen) screen(next);
  },
  { passive: true },
);
document
  .querySelectorAll<HTMLElement>("[data-coming]")
  .forEach(
    (b) =>
      (b.onclick = () =>
        openDialog(
          `<div class="dialog-copy">${label("THE ASTERA APP")}<h2>A little further<br>on the horizon.</h2><p>The ASTERA app is a design concept. It is not available on ${b.dataset.coming} yet. Explore the interactive preview on this page.</p></div>`,
        )),
  );
$("#prive-details").onclick = () =>
  openDialog(
    `<div class="dialog-copy">${label("ASTERA PRIVÉ")}<h2>A more personal<br>universe.</h2><p>A considered membership concept for those who want to travel on their own terms.</p><ul><li>Priority booking and private launches</li><li>Complimentary upgrades, subject to the imagined itinerary</li><li>Private planetary excursions and exclusive destinations</li><li>Personal travel concierge</li><li>Private spacecraft charter access</li></ul><p class="small-note">Concept only. Memberships are not currently offered for sale.</p><button class="button gold" data-book>Explore the collection →</button></div>`,
  );
$("#about").onclick = () =>
  openDialog(
    `<div class="dialog-copy">${label("ABOUT ASTERA")}<h2>Beyond Ordinary<br>Horizons.</h2><p>ASTERA is a fictional vision of luxury interplanetary travel, set in an imagined future. It brings the care of exceptional hospitality to extraordinary worlds.</p><p>This locally hosted website is a design and technology concept. Destinations, crew, vessels, durations and prices are fictional.</p></div>`,
  );
$("#contact").onclick = () =>
  openDialog(
    `<div class="dialog-copy">${label("CONTACT")}<h2>A future<br>conversation.</h2><p>ASTERA is a fictional concept and does not operate a booking or concierge service. No contact details or personal information are collected by this demo.</p><button class="button gold" data-book>Explore demo journeys →</button></div>`,
  );
$(".menu-toggle").onclick = () => {
  const open = $(".header").classList.toggle("menu-open");
  $(".menu-toggle").setAttribute("aria-expanded", String(open));
  $(".menu-toggle").setAttribute(
    "aria-label",
    open ? "Close navigation" : "Open navigation",
  );
};
document.querySelectorAll(".header nav a").forEach((a) =>
  a.addEventListener("click", () => {
    $(".header").classList.remove("menu-open");
    $(".menu-toggle").setAttribute("aria-expanded", "false");
  }),
);
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    $(".header").classList.remove("menu-open");
    $(".menu-toggle").setAttribute("aria-expanded", "false");
  }
});
const reveal = new IntersectionObserver(
  (entries) =>
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("visible");
        reveal.unobserve(e.target);
      }
    }),
  { threshold: 0.08 },
);
document.querySelectorAll(".reveal").forEach((el) => reveal.observe(el));
let scrollTick = false;
window.addEventListener(
  "scroll",
  () => {
    if (scrollTick) return;
    scrollTick = true;
    requestAnimationFrame(() => {
      $(".header").classList.toggle("scrolled", scrollY > 50);
      scrollTick = false;
    });
  },
  { passive: true },
);
// A local manifest prevents requests for missing footage. Add a received filename here after inspection.
fetch("/media/video/manifest.json")
  .then((r) => r.json())
  .then((m: { final?: string }) => {
    if (!m.final) return;
    const v = $<HTMLVideoElement>("#final-video");
    const toggle = $("#video-toggle");
    toggle.hidden = false;
    const motion = matchMedia("(prefers-reduced-motion: reduce)");
    let userPaused = false;
    let inView = false;
    let loaded = false;
    const load = () => {
      if (loaded) return;
      loaded = true;
      v.src = `/media/video/${m.final}`;
      v.muted = true;
      v.load();
    };
    const updateControl = () => {
      toggle.textContent = v.paused ? "▷" : "Ⅱ";
      toggle.setAttribute("aria-label", v.paused ? "Play film" : "Pause film");
      toggle.setAttribute("aria-pressed", String(!v.paused));
    };
    const play = () => {
      load();
      v.hidden = false;
      v.play().catch(updateControl);
    };
    v.addEventListener("play", updateControl);
    v.addEventListener("pause", updateControl);
    v.addEventListener("error", () => {
      v.hidden = true;
      toggle.hidden = true;
    });
    updateControl();
    const preloadObserver = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !motion.matches) load();
      },
      { rootMargin: "160px" },
    );
    preloadObserver.observe($("#final"));
    const observer = new IntersectionObserver(([e]) => {
      inView = e.isIntersecting;
      if (inView && !motion.matches && !userPaused && !document.hidden) play();
      else v.pause();
    });
    observer.observe($("#final"));
    toggle.onclick = () => {
      userPaused = !v.paused;
      if (v.paused) play();
      else v.pause();
    };
    motion.addEventListener("change", () => {
      if (motion.matches) {
        v.pause();
        v.hidden = true;
      } else if (inView && !userPaused && !document.hidden) play();
    });
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) v.pause();
      else if (inView && !motion.matches && !userPaused) play();
    });
    window.addEventListener("pagehide", () => {
      v.pause();
      observer.disconnect();
      preloadObserver.disconnect();
    });
  })
  .catch(() => {});
window.addEventListener("pagehide", () => scene?.dispose());
