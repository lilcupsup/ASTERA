Build a complete, production-quality, responsive website for a fictional ultra-luxury interplanetary travel and resort company called **ASTERA**.

This should NOT look like a typical sci-fi website, aerospace company, or gaming website. Astera should feel like a combination of **ultra-luxury hospitality, private aviation, and futuristic space travel**. Think of the sophistication and restraint of the world's finest luxury hotel, automotive, fashion, and travel brands—but set 50–100 years in the future.

The final website should feel cinematic, expensive, immersive, believable, and technologically advanced.

# ASTERA — MASTER CODEX BUILD PROMPT

> This is an instruction to the coding agent. Build the website, not merely a concept. Keep all brand identity, actual interactivity, and the media handoff process below. This is a fictional future-travel brand and its journeys, resorts, and staff are fictional concepts.

## **MANDATORY COMMUNICATION LANGUAGE — RUSSIAN ONLY**

**Always communicate with me in Russian. This is a strict requirement for the entire project.**

- Write **all your messages to me in Russian**: greetings, plans, progress reports, explanations, clarifying questions, technical advice, bug reports, test summaries, and final delivery instructions.
- When you need me to generate a video in Google Flow/Veo, **explain the task, required settings, file name, and upload instructions in Russian**. Provide the actual **copy-paste video-generation prompt in English** inside a clearly labeled code block so I can paste it directly into Flow.
- If I need to provide images or other assets, request them and describe the requirements **in Russian**. Image-generation prompts may be in English for better output.
- Code, technical identifiers, file paths, terminal commands, API names, and deliberately English-language website copy may remain in their appropriate original language; this does **not** change the language of our conversation.
- Do not switch to English simply because the specification or task is written in English. **Default back to Russian immediately in every response.**

---

## **BRAND**

Company: **ASTERA**

Tagline:  
**Beyond Ordinary Horizons.**

Astera operates luxury spacecraft and exclusive resorts throughout the solar system.

Primary brand palette (use these exact design tokens and maintain accessible contrast):

* Midnight Obsidian — `#0B1020` (primary background)
* Cosmic Navy — `#16213E` (secondary background)
* Starlight Silver — `#C9D4E5` (soft highlights and selected typography)
* Champagne Gold — `#D6B56E` (premium accent, CTAs, delicate orbital strokes)
* Aurora Violet — `#7C6CFF` (rare optional accent only when artistically justified)
* Pearl white / soft ivory (high contrast headings and body text)
* Occasional authentic planetary colors depending on the destination

The brand logo is **ASTERA**, never **ASTRAEA**: a tall golden stylized A/spire, four-point central star, thin elliptical orbit with a small star, and an elegant widely spaced ASTERA wordmark. Preserve or reuse the existing ASTERA logo files if provided; do not redraw a conflicting mark. If the actual logo asset is missing from the repository, request its transparent PNG/SVG from me and create only a temporary typographic fallback. The public UI must never accidentally say ASTRAEA.

Use the attached user inspiration screenshot as a **composition reference** for the hero: rich dark starfield, five small planets along a glowing upper orbital arc, an enormous dramatic foreground planet filling the lower viewport, editorial left-aligned title, subtle left/right navigation arrows, floating luxury resort preview on the right, gold CTA buttons, and destination selector along the bottom. Do not copy an unrelated brand's name or assets. Preserve the ASTERA look.

Use champagne gold sparingly as a premium accent rather than covering the interface in gold.

Typography should feel sophisticated, editorial, minimal, futuristic, and luxurious. Use large typography, generous letter spacing, strong hierarchy, and plenty of negative space.

Animations should feel smooth, slow, cinematic, and premium rather than flashy or gimmicky.

## **CRITICAL: MEDIA GENERATION AND ASSET-HANDOFF WORKFLOW**

There are **two distinct media production pipelines**. Never confuse them.

**A. STILL IMAGES — ChatGPT Images 2.5 (native image generation available in Codex, when connected).**

- You (Codex) must generate the website's **still imagery yourself**, using the built-in ChatGPT Images / GPT Image 2.5 image-generation capability **if this session actually exposes it**. Inspect the tools you have rather than assuming an undocumented command or hallucinating image assets.
- Favor the high-quality image option for hero/resort/ship key art (e.g., GPT Image 2.5 Sunburst where the corresponding API/tool is available); a faster model can be used for drafts. Use the installed native image tool if the app provides it, not an imaginary local CLI.
- Generate the actual required stills: destination/resort exteriors, interior environments, suites, fine dining, observation lounges, spa, crew portraits, membership lifestyle, promotional stills, and optional stylized backdrops. Keep the source output and web-optimized derivatives.
- Reference earlier approved ASTERA renders and use consistent architectural details, ship silhouettes, crew uniform style, lighting, materials, color grade, and logo treatment across generations.
- If native image generation is **not accessible in the active Codex runtime**, say so plainly. For each missing still, provide a copy-ready image prompt, preferred aspect ratio, intended pixel size, and filename, then request that I provide the generated image. Continue coding everything that does not depend on it. Do **not** claim image generation succeeded unless an actual file exists.
- Never source images from Higgsfield. **Higgsfield is not part of this project.** Do not use it or mention it as the content provider in the site.

**B. VIDEOS — Google Flow with Veo, created manually by me (the user).**

- I will generate all cinematic videos myself in **Google Flow using a supported Veo model**, then upload the files to Codex/the project.
- **You must NEVER pretend you can generate, upload, or retrieve my Flow video files automatically.** You are responsible for planning exactly which videos are needed and requesting the actual files from me.
- Before each video is required, proactively ask me to create it in Flow. Supply a **complete, professional, copy-paste-ready English video prompt** and a practical settings checklist. Give the human instructions and upload request in **Russian**.
- For every requested clip supply ALL fields below, without omissions:
  1. `VIDEO ID` and proposed filename, e.g. `VID-01_saturn_orbit_resort_hero.mp4`.
  2. The page section, purpose, how it will be used (background, feature film, transition, hover accent, CTA), and **priority** (required vs optional).
  3. **Google Flow mode**: Text to Video, Frames to Video (first frame, or first+last if available), or Ingredients/References to Video, explaining why. If it depends on a previously generated still, name the exact `IMG-...` filename and ask me to upload/use that frame in Flow.
  4. **Veo model recommendation**: best currently available quality preset for a major hero/CTA film, or a faster economical preset for experiments, but first respect what models and controls are actually shown in my Flow interface. Do not invent unsupported models or settings.
  5. **Aspect ratio** (`16:9` desktop by default, `9:16` only when separately needed for mobile, or other genuinely supported setting).
  6. **Duration** (e.g., `8 s` for a short cinematic loop, adjusted to what the chosen Flow mode supports); mention whether the asset must loop seamlessly or have a defined start/end.
  7. **Resolution / quality recommendation** (best available that fits the use; `1080p` if offered, otherwise use available output and optimize it); output format if available; whether sound is wanted. Do not assert unsupported codec, fps or frame-rate controls.
  8. Full **English positive prompt**: subject, placement, architecture/materials, destination details, framing, shot size, lens feeling, camera motion and speed, lighting, motion, restrained luxury mood, photorealism, intended negative space for HTML overlay, consistent ASTERA art direction.
  9. **Avoidance constraints**: no text/logos/UI rendered in the video, no obvious morphing, flicker, warping, broken geometry, extra planets appearing, abrupt cuts or frantic camera motion; no cyberpunk/neon/gaming look; steady architecture and coherent spacecraft design.
  10. **Reference assets**, if any: reference still filename, and what must remain identical between video and still.
  11. **Delivery requirements**: exact expected filename and folder, e.g. `/public/media/video/VID-01_saturn_orbit_resort_hero.mp4`; instruct me to upload it into the chat/repository. Tell me whether an additional mobile crop/poster frame is useful.
  12. **Acceptance check** (2–4 concrete visual criteria) so I can decide which generation to upload.
- Request clips in **small prioritized batches** (1–3 at a time), starting with the clips that truly affect a section being implemented, not with 20 expensive optional clips. I can ask you to revise any Veo prompt, choose a different camera move, or adapt to the exact settings visible in my Flow UI.
- Maintain a tracking file, e.g. `/docs/ASSET_MANIFEST.md`, marking each video as `planned`, `prompt sent`, `waiting for user`, `received`, `integrated`, or `approved`. Include each expected filename, ratio, section and poster/still fallback. In the final handoff list any missing user-provided videos explicitly.
- When I send a video, inspect the file and integrate it into the specified section, optimizing loading and playback; don't make me explain again where it goes. Preserve untouched originals, and make web-ready copies only when appropriate.
- Until an external video arrives, **keep building the full site**: use the already generated ASTERA still as a designed poster/fallback, implement video components and animations, and flag that media as pending. Do not display a black empty video box or claim it is finished.
- Videos are for **cinematic support** (ambient resort shots, ship flybys, interior reveals, emotional final CTA). The hero's planetary selector MUST remain genuine interactive 3D, **not** a Flow/Veo video masquerading as an interactive 3D carousel.
- Prefer a few exceptional cinematic films over auto-playing video in every section. Autoplay only muted, inline, short and where allowed; provide pause control when meaningful, static fallback, `prefers-reduced-motion` fallback and performance-safe loading. Do not auto-play sound.

### **GLOBAL MEDIA ART DIRECTION**

The recurring ASTERA universe must include:

- Pearl-white architectural shells and spacecraft, with intentional champagne-gold trim.
- Cosmic navy and obsidian details, large curved panoramic glass, restrained premium materials.
- Warm indirect architectural lighting, sophisticated suites and lounge furnishings.
- Visually plausible planetary environments for a **fictional far-future concept**, high realism and cinematic scale.
- Sophisticated private aviation and elite hospitality, never generic sci-fi props.
- One consistent ASTERA fleet family (ASTERA ONE / CELESTE / AURELIA), coherent proportions and repeated distinguishing details.
- Genuine planets and orbital depth in the WebGL hero; generate carefully grounded still/textures for supplementary media if useful.
- Distinct but coherent resort identities (Luna, Mars, Europa, Saturn, Titan).

Static assets required include destination imagery, resort imagery, ships, ship interiors, celestial suites, dining, observation lounges, Zero-G Spa, crew portraiture, lifestyle/membership, app promotion, and planet/background stills as needed. These should come from the integrated ChatGPT image pipeline whenever available.

**Luxury first, science fiction second.** No cheap sci-fi, no excessive neon, no cyberpunk, no fake NASA branding, no generic SaaS images. Do not bake headlines, buttons, navigation, dates, booking fields or long marketing copy into rendered images/videos: real copy must live in accessible HTML.

### **ASSET PRODUCTION MANAGEMENT (IMPLEMENT THIS, NOT JUST DISCUSS IT)**

1. Before coding media-heavy sections, produce `/docs/IMPLEMENTATION_PLAN.md`, `/docs/ASSET_MANIFEST.md` and `/docs/VIDEO_REQUESTS.md`. `VIDEO_REQUESTS.md` should accumulate all completed copy-ready prompts and approved Flow settings. Give assets stable IDs like `IMG-01`, `VID-01`.
2. Generate a small set of visual **anchor stills** through ChatGPT Images 2.5: one flagship ship, one flagship interior, one Saturn resort, one Luna resort, and (if needed) a 16:9 scene/frame establishing the hero mood. These establish consistency. Then produce the remaining stills referenced to the anchors.
3. For **each video**, prefer creating an ASTERA still/reference frame first, then write a Flow Veo **Frames to Video** prompt when that mode is supported and helpful for architectural consistency. Offer Text to Video as fallback if no reference is needed or the mode is unsupported.
4. Plan a short video slate. Suggested **candidate slots** (select only those that improve the design):
   - `VID-01`: atmospheric orbit/resort reveal for Saturn destination detail or feature card — optional; don't replace WebGL planet interactions.
   - `VID-02`: slow cinematic spacecraft exterior flyby for the fleet section.
   - `VID-03`: slow forward glide through the flagship observation lounge or suite.
   - `VID-04`: luxurious dining / Atrium / Zero-G Spa ambient film, only if it adds value.
   - `VID-05`: emotional final CTA, traveler silhouette at huge panoramic window overlooking a planet.
   - `VID-06`: Privé membership or select resort reveal, optional.
   Additional clips are allowed **only when a specific section benefits**; explain why and the loading/performance cost.
5. Build a real responsive asset pipeline: descriptive filenames, `public/media/images/`, `public/media/video/`, poster frames, responsive sizes, WebP/AVIF where supported, lazy loading and compression. Do not depend on external temporary image URLs.
6. Store generated images and received videos in the actual project directory. Never use a nonexistent `src` path, claim a file exists without checking it, or leave final UI with broken media.
7. While pending, continue implementing the site, and put the next clear user action in the chat: “Сгенерируй в Google Flow ролик VID-XX по этому промпту и загрузи файл …”.

---

# **1\. INTERACTIVE 3D HERO**

The hero section is the centerpiece of the entire website.

Build a genuine interactive **3D planetary destination carousel**, not a prerecorded video pretending to be interactive.

Use an appropriate performant web 3D technology such as **Three.js/WebGL**.

The hero should occupy approximately the full initial viewport.

### **Layout**

Create a deep cinematic starfield.

Five Astera destinations exist around a large invisible **3D circular/orbital carousel**:

**LUNA**  
Tranquility Resort

**MARS**  
Elysium Resort

**EUROPA**  
Oceanus Resort

**SATURN**  
The Rings Resort

**TITAN**  
Horizon Resort

The planets should exist at different depths along the circular path.

The currently selected destination moves dramatically toward the camera and becomes enormous, filling approximately the **bottom 50–60% of the screen**.

The remaining planets recede around the circular path into the background.

Give the scene genuine perspective and depth.

The selected planet should slowly rotate on its axis.

Other planets should also have extremely subtle movement.

Add subtle atmospheric glow, stars, lighting, depth, and parallax.

**Visual composition must follow the user's approved ASTERA hero reference** (not a conventional carousel):

- Fixed minimal transparent top header with ASTERA logo at far left, centered navigation, and outlined champagne-gold BOOK A JOURNEY button at far right.
- Upper third: miniature photoreal-looking destination planets spaced along a thin illuminated **curved/elliptical orbital ribbon**, with delicate dots and small labels underneath.
- Lower-middle: immense active world, dramatic partial horizon and realistic surface/cloud material. When SATURN is active, the rings sweep across the lower foreground, with appropriate depth/occlusion and warm golden rim light.
- Left: `DESTINATION 04` eyebrow, huge sophisticated serif `SATURN`, subtitle `THE RINGS RESORT`, 1–2-line description, filled primary gold Explore CTA + outlined Book CTA.
- Right: a restrained rectangular glass/framed resort preview with a **still generated through ChatGPT Images 2.5**; only an optional subtle loop video after I provide it.
- Far left/far right edges: premium circular gold-outline arrow buttons. Bottom center: understated text tabs `LUNA — MARS — EUROPA — SATURN — TITAN`, active gold with tiny indicator.
- Depth, scale, silhouette and deliberate visual hierarchy matter more than decorative particles. The foreground planet must not obscure key copy on normal desktop widths.
- Default selected planet: **SATURN** for the dramatic first impression. Switching to other destinations should truly change 3D position, planet material, related resort still, title, description, gold accent nuance and CTA target.

**Implementation guidance:** use Three.js (or React Three Fiber with Drei if suitable for project) with actual spherical meshes, physically coherent lighting, Saturn ring geometry, planet textures and interpolated 3D orbital positions. Use normalized input state and velocity/easing with safe interrupted-transition handling. Do not implement navigation by swapping static PNG backgrounds or video frames. Use a good still fallback if WebGL is unavailable, with accessible functional arrows/tabs. For mobile show the same destination model with less draw cost and a legible simplified layout; never crop out every control.

### **Navigation**

Include elegant LEFT and RIGHT arrow buttons.

Also support:

* Keyboard left/right arrow keys  
* Mouse drag  
* Trackpad interaction where appropriate  
* Touch/swipe on mobile

When the visitor moves to the next destination, animate the entire planetary carousel.

For example:

Mars moves away from the foreground and travels around the orbital path.

Europa simultaneously travels toward the viewer.

Europa then becomes the enormous foreground planet.

The camera may subtly reposition during the animation to enhance depth.

Use smooth cinematic easing.

Do NOT simply crossfade between planet images.

It should visually feel like the planets are physically rotating around a giant 3D carousel.

### **Destination Information**

When a planet becomes selected, update the content.

Example:

DESTINATION 04

**SATURN**

**THE RINGS RESORT**

Wake above the most extraordinary view in the solar system.

\[ EXPLORE SATURN \]

\[ BOOK YOUR JOURNEY \]

Include destination navigation somewhere subtle:

LUNA — MARS — EUROPA — SATURN — TITAN

Highlight the active destination in champagne gold.

### **Resort Preview**

For the selected destination, display an elegant floating resort preview.

This could be a subtle glass panel containing a cinematic ASTERA resort image generated with ChatGPT Images 2.5.

Example:

THE RINGS RESORT  
Orbital Luxury

\[ VIEW RESORT \]

The resort preview should update as the selected planet changes.

### **Hero Header**

Place the established gold ASTERA logo in the upper-left (reuse the supplied brand asset).

Navigation:

DESTINATIONS  
THE FLEET  
EXPERIENCE  
CREW

And:

\[ BOOK A JOURNEY \]

Keep navigation minimal and sophisticated.

### **Performance**

The hero must remain smooth and responsive.

Optimize 3D assets, textures, images, lighting, animation and loading.

Implement graceful fallbacks for lower-powered devices and mobile devices rather than allowing performance to collapse.

Respect reduced-motion preferences.

---

# **2\. DESTINATIONS**

After the hero, transition smoothly into a cinematic destination section.

Headline:

**Extraordinary Worlds Await.**

Supporting copy should position Astera destinations as the most extraordinary resorts humanity has ever created.

Feature:

### **Luna — Tranquility Resort**

Luxury on the lunar surface with panoramic views of Earth.

### **Mars — Elysium Resort**

A spectacular resort built into the Martian landscape.

### **Europa — Oceanus Resort**

A remote luxury retreat beneath the presence of Jupiter.

This is a fictional future concept. Do not imply a real-world operating resort exists today.

### **Saturn — The Rings Resort**

An orbital resort overlooking Saturn and its rings.

### **Titan — Horizon Resort**

A secluded luxury outpost surrounded by Titan's otherworldly landscape.

Use large original destination still images generated through ChatGPT Images 2.5. Optionally integrate a user-supplied Google Flow/Veo microfilm where it materially improves one destination; request the video from me with a ready-to-use prompt and exact settings first.

Make this section highly visual.

Use sophisticated hover/scroll interactions.

---

# **3\. LUXURY BETWEEN WORLDS**

Headline:

**Getting There Is Half The Experience.**

Introduce the luxury aboard Astera spacecraft.

Create visual experiences for:

### **Celestial Suites**

Private hotel-quality suites with enormous panoramic space windows.

### **Celestial Dining**

Fine dining overlooking planets and stars.

### **Observation Lounge**

A breathtaking panoramic viewing area.

### **Zero-G Spa**

A futuristic luxury wellness experience.

### **The Atrium**

A spectacular central gathering space aboard the spacecraft.

### **Private Cabins**

Private accommodations for couples, families and VIP travelers.

Generate the required **still images with ChatGPT Images 2.5**. If a short ambient cabin flythrough would materially improve the section, request that clip from me through the Google Flow/Veo workflow, with full prompt/settings/upload instructions.

Consider using a cinematic horizontal-scroll or immersive gallery interaction that makes visitors feel as though they are moving through the spacecraft.

---

# **4\. MEET THE ASTERA FLEET**

Headline:

**Designed For The Journey Beyond.**

Create three spacecraft:

### **ASTERA ONE**

Interplanetary Flagship  
120 Guests

### **CELESTE**

Luxury Orbital Transport  
48 Guests

### **AURELIA**

Private Interplanetary Charter  
12 Guests

Generate beautiful **still exterior imagery for each spacecraft using ChatGPT Images 2.5**. For a deliberate ship reveal/flyby, request a **user-made Google Flow/Veo video** with copy-ready prompt, settings and an exact target filename.

Each ship should share the Astera design language:  
pearl white, champagne gold, flowing aerodynamic forms, dark glass, sophisticated lighting.

Allow visitors to interact with or explore the ships through polished cards, subtle motion, parallax, or 3D presentation where appropriate.

---

# **5\. THE ASTERA EXPERIENCE**

Headline:

**Five-Star Hospitality. Zero Earth Required.**

Present four primary pillars:

PRIVATE SUITES  
FINE DINING  
PERSONAL CONCIERGE  
EXTRAORDINARY EXCURSIONS

Keep this section minimal, elegant and editorial.

Use tasteful imagery and subtle motion.

---

# **6\. MEET YOUR CREW**

Headline:

**In Extraordinary Hands.**

Create several believable Astera crew members.

Examples:

**Commander Elena Vale**  
Astera One Captain  
4 Lunar Expeditions · 2 Mars Expeditions

**Commander James Orion**  
Interplanetary Flight Commander  
12 Years Aerospace Experience

**Dr. Maya Chen**  
Chief Flight Physician  
Space Medicine & Human Performance

Create additional crew members if necessary.

Generate consistent cinematic **still portraits using ChatGPT Images 2.5**. Keep uniforms coherent and do not use an animated deepfake portrait.

Uniforms should feel like a sophisticated combination of astronaut flight suits and luxury aviation uniforms.

Avoid bulky NASA-style spacesuits unless contextually appropriate.

Use subtle profile interactions.

---

# **7\. BOOK YOUR JOURNEY**

Headline:

**Where Will You Go Next?**

Create a premium interactive booking interface.

Fields:

FROM  
Earth — Orbital Terminal

DESTINATION  
Choose destination

DEPARTURE DATE

TRAVELERS

CABIN

Then:

\[ SEARCH JOURNEYS \]

Create believable sample journeys and pricing for demonstration purposes, clearly treating them as fictional website content.

Make **DEMO / CONCEPT** status clear in the booking results. Do not charge payments, falsely claim real availability, or submit bookings to a fake endpoint. UI should be fully interactive using honest local/demo data (selection, date, passenger count, cabin, filtering, result states, input validation). Only connect real booking APIs if later explicitly supplied.

The booking experience should feel like booking an ultra-premium airline ticket or luxury resort—not completing a generic web form.

---

# **8\. ASTERA MOBILE APP**

Headline:

**The Universe In Your Pocket.**

Create a beautiful Astera mobile application concept.

Create actual editable HTML/CSS phone UI mockups in the website rather than generating app screen text baked into flat photos; use ChatGPT Images only for supplementary atmospheric phone/lifestyle imagery.

Show phone mockups displaying:

* Destination discovery  
* Journey booking  
* Digital boarding pass  
* Trip countdown  
* Itinerary  
* Excursions  
* Resort information  
* Concierge

Include:

\[ DOWNLOAD ON THE APP STORE \]

\[ GET IT ON GOOGLE PLAY \]

Use subtle scroll animations so the phone interface changes as the visitor moves through the section.

If the App Store / Google Play apps are not published, label the buttons as “COMING SOON” or replace them with a waitlist; do not use false production-store links.

---

# **9\. ASTERA PRIVÉ**

Create an exclusive membership program.

Headline:

**Travel Beyond Ordinary.**

Subheading:

**ASTERA PRIVÉ**

Benefits can include:

* Priority booking  
* Private launches  
* Complimentary upgrades  
* Private planetary excursions  
* Personal travel concierge  
* Exclusive destinations  
* Private spacecraft charter access

Make this section exceptionally elegant and exclusive.

Use minimal copy and one or two extraordinary ASTERA luxury lifestyle **stills generated with ChatGPT Images 2.5**; if a cinematic membership film is beneficial, request it from me through the Google Flow/Veo workflow.

---

# **10\. FINAL CINEMATIC CTA**

Finish the homepage with an emotional cinematic visual.

Show an Astera traveler overlooking an extraordinary planetary environment through enormous panoramic glass.

This is the strongest candidate for a cinematic **Google Flow/Veo** background: you must first give me the exact English video generation prompt, references and Flow settings, then ask me to upload the finished footage. Until then, build the section with the corresponding ChatGPT Images 2.5 still as a finished-looking fallback. Keep text and CTAs as actual HTML.

Headline:

**Your Next World Is Waiting.**

Buttons:

\[ EXPLORE DESTINATIONS \]

\[ BOOK YOUR JOURNEY \]

Then transition into a minimal footer.

Footer navigation:

DESTINATIONS  
SPACECRAFT  
EXPERIENCES  
ASTERA PRIVÉ  
ABOUT  
CONTACT

Include:

ASTERA

**Beyond Ordinary Horizons.**

---

# **DESIGN & INTERACTION PRINCIPLES**

Throughout the entire website:

Use smooth scrolling.

Use tasteful scroll-triggered animations.

Use cinematic transitions.

Use subtle parallax.

Use depth wherever appropriate.

Use large editorial typography.

Use generous negative space.

Use glass effects sparingly.

Use champagne gold only for important accents.

Keep animations sophisticated and restrained.

Buttons should have subtle premium hover interactions.

Images may subtly scale or shift as the visitor scrolls.

Sections should flow naturally into one another rather than feeling like disconnected rectangular blocks.

The website should feel immersive from beginning to end.

Do not overuse cards.

Do not overuse rounded rectangles.

Do not make everything glow.

Do not use excessive gradients.

Do not create a generic SaaS layout.

Do not make it look like a video game interface.

Do not make it look like NASA.

Do not make it look cyberpunk.

The final impression should be:

**Luxury hospitality from the future.**

---

# **RESPONSIVE DESIGN**

Build an exceptional mobile experience rather than simply shrinking the desktop layout.

Desktop should provide the richest 3D experience.

Tablet should retain the planetary carousel with appropriate performance optimizations.

Mobile should maintain the core interaction while simplifying rendering if necessary.

Allow users to swipe between planets.

Make typography, buttons, booking controls, navigation and imagery work beautifully on smaller displays.

Optimize generated visual assets for responsive delivery.

---

# **ACCESSIBILITY & QUALITY**

Use semantic HTML where appropriate.

Provide alt text.

Ensure adequate text contrast.

Support keyboard navigation.

Respect prefers-reduced-motion.

Make interactive elements clearly usable.

Optimize images and assets.

Avoid unnecessary layout shifts.

Lazy-load assets below the fold where appropriate.

Maintain strong performance despite the visual complexity.

---

# **BUILD PROCESS — REQUIRED CODEX BEHAVIOR**

**Language and collaboration:** **Every message addressed to me must be written in Russian, without exceptions for plans, questions, progress updates, video requests, testing reports or final delivery.** UI marketing copy may remain in premium English by default (with internationalization-ready structure); generation prompts for ChatGPT Images and Google Flow/Veo may be in English, always accompanied by Russian instructions. Do not stall over cosmetic decisions; make good design choices yourself.

**Step 0 — project audit:** Inspect the repository, identify current framework, file structure, any existing design assets, actual tool capabilities, installed dependencies and build scripts. Do not replace a working stack for no reason. Use an appropriate production-oriented implementation (e.g. React/Next.js with TypeScript, Three.js / React Three Fiber for WebGL, and restrained GSAP/Framer Motion animations if compatible). The result must run locally with documented setup commands.

**Step 1 — short plan and manifest:** Write `/docs/IMPLEMENTATION_PLAN.md`, `/docs/ASSET_MANIFEST.md`, `/docs/VIDEO_REQUESTS.md`. Include sections, routes, major components, available vs missing stills, desired Flow videos, breakpoints, performance approach and implementation stages.

**Step 2 — existing ASTERA identity:** Use ASTERA — not ASTRAEA — everywhere: content, filenames, logo alt text, metadata, routing, footer, fleet, member names. Use the established gold A/star/orbit mark and specified color codes. Request my existing transparent logo if it is not already in the repository. Never fabricate completed asset availability.

**Step 3 — images, generated within Codex if possible:** Use the **built-in ChatGPT Images 2.5** feature/tool for needed stills, checking that it really exists in this environment. Generate reference anchors and then the coherent full image set. If tool not available, request each missing image with exact prompt and filename rather than claiming generation. Optimize results for the web.

**Step 4 — media handoff for Google Flow/Veo:** Evaluate each planned cinematic clip. Send me the **first 1–3 video briefs** in Russian, with full English copy-ready Veo prompts, Flow generation mode, model/quality recommendation conditional on UI availability, aspect ratio, duration, best available resolution, camera movement, use of uploaded reference still, no-text/artefact constraints, filename, project path, acceptance check and upload instructions. **Wait for me only on those external files**, not on overall coding. As more sections are ready, request the next needed batch. Incorporate each video upon receipt. Never use Higgsfield.

**Step 5 — build complete website:** Implement all ten sections, responsive layouts, functional buttons, navigation, demo booking form, resort/destination detail view or substantial linked sections, fleet exploration, crews, membership and app preview. Do not stop with a screenshot or wireframe.

**Step 6 — real WebGL 3D hero:** Build the orbiting planetary carousel with real 3D perspective, animated planet transforms and rotations, arrows/drag/swipe/keyboard access, Saturn's realistic rings and a full-viewport cinematic composition matching the reference. This must remain interactive, not a video playback trick.

**Step 7 — cinematic but controlled motion:** Use subtle scroll sequences, high-end transitions, gentle hover states, images with parallax, and optional **actual user-provided Flow videos**. Avoid disorienting motion, broken mobile layout and excessive animations.

**Step 8 — integrate media professionally:** Use local assets; preload only critical items, lazy-load below-fold assets, render posters for video loading, offer static reduced-motion alternatives, avoid layout shifts, and never let missing video assets produce blank sections.

**Step 9 — functional quality assurance:** Run the project, lint/typecheck/build, test interactions and routes, verify links and booking demo, test desktop/tablet/mobile widths, verify keyboard/touch/swipe, check failed downloads and missing files, debug WebGL and check low-power fallback. Address visual regressions and performance bottlenecks. Use screenshots to inspect where practical.

**Step 10 — deliver actual implementation:** Give the working preview instructions (and URL when one genuinely exists), summary of completed sections/features, source files, delivered assets and a short explicit list of **remaining external user video requests**. If videos remain pending, say what is pending without suggesting they were automatically created.

### **REQUIRED CHAT RESPONSE FORMAT WHEN ASKING ME FOR EACH VIDEO**

Use a consistent compact structured output like the following, **filled with real scene details**, not a generic template:

```text
🎬 ASTERA — VIDEO REQUEST VID-XX
Раздел сайта: ...
Для чего нужен ролик: ...
Приоритет: Required / Optional
Название файла: VID-XX_descriptive_name.mp4
Куда загрузить: public/media/video/VID-XX_descriptive_name.mp4

GOOGLE FLOW / VEO SETTINGS
Mode: Frames to Video (first frame) / Text to Video / References to Video (as supported)
Model: [recommend based on the models actually available in Flow]
Aspect ratio: 16:9 (or explain another choice)
Duration: 8 s (adjust for supported model/settings)
Resolution: Best available / 1080p if offered
Audio: Off/muted for ambient website loops (unless specifically required)
Loop: seamless / non-looping (say which)
Reference image: IMG-XX_name.webp (if applicable)

PROMPT FOR GOOGLE FLOW (COPY IN ENGLISH):
[Detailed cinematic prompt: exactly what we see, stable unique resort/ship details,
precise composition, camera choreography, lens feeling, movement, lighting,
photorealism, negative space, visual continuity, quality and restrictions.]

AVOID:
[Visual artifacts and explicitly forbidden elements.]

ACCEPTANCE CHECK:
- ...
- ...
- ...

ПОСЛЕ ГЕНЕРАЦИИ:
Скачай видео и отправь мне файл VID-XX_descriptive_name.mp4.
Если Flow не показывает предложенную опцию, пришли список доступных настроек — я адаптирую запрос.
```

**IMPORTANT:** Do not ask me to make a generic video without giving the completed generation prompt and settings. Do not ask for video files without naming them and explaining their placement. Do not confuse the user's Google Flow access with your own tool access.

### **FINAL ACCEPTANCE CRITERIA**

- Site visibly matches the approved **ASTERA Saturn/orbital luxury reference aesthetic**, not a generic space startup website.
- Every page, label, logo, fleet name and CTA uses **ASTERA**, not ASTRAEA.
- Full original sections 1–10 exist and are cohesive, polished and responsive.
- Planet selector uses genuine interactive Three.js/WebGL meshes, working 3D motion and real destination state.
- All images are actual generated or user-provided files; never pretend a missing media file exists.
- Every video used was received from me after a complete Google Flow/Veo request with prompt and settings, and is integrated in its intended location.
- Every important button has an honest functional outcome, including demo-only booking and app availability.
- Motion accessibility, touch/keyboard, performance and mobile layout have been tested.
- Site can be run with documented commands. No dead sections, no broken media, no fake URLs.

**Final direction:** Deliver a visually spectacular, deeply interactive, believable fictional future luxury travel website for **ASTERA**. Preserve the orbital-planet hero seen in my reference and the established brand colors/logo. **Generate still images through ChatGPT Images 2.5 where actually available; let me produce cinematic videos in Google Flow/Veo; proactively give me complete prompts, settings and upload requests for every needed video.**
