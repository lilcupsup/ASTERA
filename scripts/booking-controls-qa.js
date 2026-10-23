async page => {
  const assert=(ok,msg)=>{if(!ok)throw Error(msg)};
  await page.setViewportSize({width:1440,height:1000});await page.goto('http://localhost:5173/');
  await page.locator('#booking').evaluate(e=>e.scrollIntoView({behavior:'instant',block:'start'}));
  await page.locator('#destination-trigger').click();await page.waitForTimeout(250);await page.screenshot({path:'output/playwright/booking-destination.png'});
  await page.getByRole('option',{name:'Mars Elysium Resort'}).click();
  assert(await page.locator('#booking-destination').inputValue()==='mars','Destination sync');
  await page.locator('#travelers-trigger').click();await page.getByRole('option',{name:'2 guests',exact:true}).click();
  await page.locator('#cabin-trigger').click();await page.getByRole('option',{name:'Private Residence',exact:true}).click();
  await page.locator('#date-trigger').click();await page.getByRole('button',{name:'Next month',exact:true}).click();await page.getByRole('button',{name:'15 December 2026',exact:true}).click();
  await page.getByRole('button',{name:'Search journeys'}).click();
  const result=await page.locator('#booking-results').textContent();assert(result.includes('$1,584,000')&&result.includes('2026-12-15'),'Form values and price');
  await page.locator('#booking').evaluate(e=>e.scrollIntoView({behavior:'instant',block:'start'}));await page.locator('#date-trigger').click();await page.waitForTimeout(250);await page.screenshot({path:'output/playwright/booking-calendar.png'});
  await page.keyboard.press('ArrowRight');await page.keyboard.press('Enter');assert(await page.locator('#departure').inputValue()==='2026-12-16','Calendar keyboard');
  await page.locator('#destination-trigger').focus();await page.keyboard.press('ArrowDown');await page.keyboard.press('ArrowDown');await page.keyboard.press('Enter');assert(await page.locator('#booking-destination').inputValue()==='europa','Select keyboard');
  await page.locator('#destination-trigger').click();await page.keyboard.press('Tab');assert(await page.locator('#date-trigger').evaluate(e=>e===document.activeElement),'Tab returns to form');
  for(const width of [390,360]){
    await page.setViewportSize({width,height:844});await page.locator('#date-trigger').click();await page.waitForTimeout(250);
    const bounds=await page.locator('#date-panel').boundingBox();assert(bounds.x>=0&&bounds.x+bounds.width<=width&&bounds.y>=0&&bounds.y+bounds.height<=845,'Mobile calendar fits');
    await page.screenshot({path:`output/playwright/booking-mobile-${width}.png`});await page.keyboard.press('Escape');
    await page.locator('#destination-trigger').click();await page.keyboard.press('Escape');
    assert(!await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),'No overflow');
  }
  await page.emulateMedia({reducedMotion:'reduce'});await page.locator('#cabin-trigger').click();assert(await page.locator('#cabin-panel').evaluate(e=>getComputedStyle(e).opacity)==='1','Reduced motion');await page.keyboard.press('Escape');await page.emulateMedia({reducedMotion:'no-preference'});
  return 'PASS: custom controls, form values, price, keyboard, mobile bounds, reduced motion';
}

