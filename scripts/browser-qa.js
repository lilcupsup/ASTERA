async (page) => {
  const assert = (ok, message) => {
    if (!ok) throw new Error(message);
  };
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("http://127.0.0.1:5173/");
  await page.locator(".webgl-ready").waitFor();
  await page.getByRole("button", { name: "Mars", exact: true }).click();
  await page.waitForFunction(() => document.querySelector('h1').textContent === 'MARS');
  assert((await page.locator("h1").textContent()) === "MARS", "Mars selection");
  await page.keyboard.press("ArrowRight");
  await page.waitForFunction(() => document.querySelector('h1').textContent === 'EUROPA');
  assert(
    (await page.locator("h1").textContent()) === "EUROPA",
    "Keyboard navigation",
  );
  await page
    .getByRole("button", { name: "Next destination", exact: true })
    .click();
  await page.waitForFunction(() => document.querySelector('h1').textContent === 'SATURN');
  assert(
    (await page.locator("h1").textContent()) === "SATURN",
    "Arrow navigation",
  );
  await page
    .getByRole("button", { name: "Explore Saturn", exact: true })
    .click();
  assert(await page.locator("dialog").isVisible(), "Destination details");
  await page.keyboard.press("Escape");
  assert(!(await page.locator("dialog").isVisible()), "Escape closes dialog");
  await page.getByRole("button", { name: "CELESTE", exact: true }).click();
  assert(
    (await page.locator("#fleet-name").textContent()) === "CELESTE",
    "Fleet selection",
  );
  await page.getByRole("button", { name: "Explore the spacecraft" }).click();
  assert(
    (await page.locator("#dialog-content").textContent()).includes("48 guests"),
    "Fleet details",
  );
  await page.keyboard.press("Escape");
  await page.locator("#destination-trigger").click();
  await page.getByRole("option", {name: "Saturn The Rings Resort"}).click();
  await page.locator("#travelers-trigger").click();
  await page.getByRole("option", {name: "2 guests", exact: true}).click();
  await page.locator("#cabin-trigger").click();
  await page.getByRole("option", {name: "Private Residence", exact: true}).click();
  await page.getByRole("button", { name: "Search journeys" }).click();
  assert(
    (await page.locator("#booking-results").textContent()).includes(
      "$3,168,000",
    ),
    "Booking total",
  );
  await page.getByRole("button", { name: "View itinerary" }).click();
  assert(
    (await page.locator("dialog").textContent()).includes(
      "No booking has been made",
    ),
    "Honest demo itinerary",
  );
  await page.keyboard.press("Escape");
  await page.locator("#destination-trigger").click();
  await page.getByRole("option", {name: "Europa Oceanus Resort"}).click();
  await page.locator("#cabin-trigger").click();
  await page.getByRole("option", {name: "Private Charter", exact: true}).click();
  await page.getByRole("button", { name: "Search journeys" }).click();
  assert(
    (await page.locator("#booking-results").textContent()).includes(
      "No matching demo journeys",
    ),
    "Empty results",
  );
  await page.getByRole("button", { name: "Your journey", exact: true }).click();
  assert(
    (await page.locator("#phone-content").textContent()).includes(
      "CONCEPT BOARDING PASS",
    ),
    "Phone UI switching",
  );
  await page.getByRole("button", { name: "Discover Privé" }).click();
  assert(
    (await page.locator("dialog").textContent()).includes(
      "Memberships are not currently offered",
    ),
    "Prive details",
  );
  await page.keyboard.press("Escape");
  for (const width of [1440, 1024, 768, 390, 360]) {
    await page.setViewportSize({ width, height: 900 });
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth > innerWidth + 1,
    );
    assert(!overflow, `Horizontal overflow at ${width}`);
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("http://127.0.0.1:5173/");
  await page.locator(".webgl-ready").waitFor();
  await page.getByRole("button", { name: "Open navigation" }).click();
  assert(await page.locator(".header nav").isVisible(), "Mobile menu");
  await page.keyboard.press("Escape");
  await page
    .locator("#home")
    .dispatchEvent("pointerdown", {
      clientX: 300,
      clientY: 250,
      pointerId: 1,
      pointerType: "touch",
    });
  await page
    .locator("#home")
    .dispatchEvent("pointerup", {
      clientX: 100,
      clientY: 250,
      pointerId: 1,
      pointerType: "touch",
    });
  await page.waitForFunction(() => document.querySelector('h1').textContent === 'TITAN');
  assert((await page.locator("h1").textContent()) === "TITAN", "Touch swipe");
  await page.getByRole("button", { name: "Saturn", exact: true }).click();
  await page.waitForTimeout(1500);
  await page.screenshot({ path: "output/playwright/mobile.png" });
  await page.setViewportSize({ width: 1440, height: 900 });
  for (const section of await page.locator("main>section").all()) {
    await section.scrollIntoViewIfNeeded();
    await page.waitForTimeout(120);
  }
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(1000);
  await page.screenshot({ path: "output/playwright/desktop.png" });
  await page.screenshot({
    path: "output/playwright/full-page.png",
    fullPage: true,
  });
  const broken = await page.evaluate(() =>
    [...document.images]
      .filter((i) => i.complete && !i.naturalWidth)
      .map((i) => i.src),
  );
  assert(!broken.length, "Broken images: " + broken.join(","));
  const missingAnchors = await page.evaluate(() =>
    [...document.querySelectorAll('a[href^="#"]')]
      .map((a) => a.getAttribute("href"))
      .filter((h) => !document.querySelector(h)),
  );
  assert(!missingAnchors.length, "Missing anchors");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.reload();
  await page.locator(".webgl-ready").waitFor();
  assert(
    await page
      .getByRole("button", { name: "Resume planet motion" })
      .isVisible(),
    "Reduced motion",
  );
  await page.getByRole("button", { name: "Luna", exact: true }).click();
  assert(
    (await page.locator("h1").textContent()) === "LUNA",
    "Reduced motion selection",
  );
  await page.emulateMedia({ reducedMotion: "no-preference" });
  console.log(
    JSON.stringify({
      result: "PASS",
      checks: 19,
      widths: [1440, 1024, 768, 390, 360],
      pageErrors: errors,
      brokenImages: broken,
    }),
  );
  assert(!errors.length, "Browser errors: " + errors.join(",")); return {result:"PASS", widths:[1440,1024,768,390,360], pageErrors:errors, brokenImages:broken};
}
