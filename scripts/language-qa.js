async page => {
  const assert=(ok,message)=>{if(!ok)throw Error(message)};
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  const latin=async root=>root.evaluate(element=>{
    const walker=document.createTreeWalker(element,NodeFilter.SHOW_TEXT);const missing=[];let node;
    while(node=walker.nextNode()) {
      if(node.parentElement.closest('script,style,svg,select,[data-no-localize]'))continue;
      const text=node.data.replace(/ASTERA ONE|ASTERA|CELESTE|AURELIA|App Store|Google Play|Privé|EAR|SAT|USD/g,'');
      if(/[A-Za-z]{2,}/.test(text))missing.push(node.data.trim());
    }return missing;
  });
  const noEnglish=async root=>assert(!(await latin(root)).length,JSON.stringify(await latin(root)));
  await page.setViewportSize({width:1440,height:900});
  await page.goto('http://127.0.0.1:5173/');await page.locator('.webgl-ready').waitFor();
  await page.locator('[data-language="en"]').click();
  await page.emulateMedia({reducedMotion:'reduce'});
  await page.locator('[data-planet="4"]').click();
  await page.evaluate(()=>{
    const date=document.querySelector('#departure');date.value='2030-01-21';date.dispatchEvent(new Event('change'));
    for(const [name,value] of [['travelers','3'],['cabin','residence']]){const input=document.querySelector(`select[name="${name}"]`);input.value=value;input.dispatchEvent(new Event('change'))}
    document.querySelector('#planetary canvas').dataset.identity='original';
  });
  const values=()=>page.locator('#booking-form').evaluate(e=>Object.fromEntries(new FormData(e)));
  const before=await values();
  await page.locator('[data-language="ru"]').click();
  assert(await page.locator('html').getAttribute('lang')==='ru','Russian document language');
  assert(await page.locator('h1').textContent()==='ТИТАН','Selected planet translated');
  assert(JSON.stringify(before)===JSON.stringify(await values()),'Form state survives language switch');
  assert(await page.locator('#planetary canvas').getAttribute('data-identity')==='original','WebGL canvas preserved');
  await noEnglish(page.locator('body'));
  await page.locator('#date-trigger').click();
  assert((await page.locator('.calendar-week').textContent()).includes('ПнВтСр'),'Russian calendar weekdays');
  assert((await page.locator('.calendar-heading').textContent()).includes('январь'),'Russian month');
  await page.locator('[data-date="2030-01-22"]').click();
  for(let i=0;i<5;i++) {
    await page.locator(`[data-planet="${i}"]`).click();
    await page.locator('#hero-explore').click();await noEnglish(page.locator('#dialog-content'));
    await page.keyboard.press('Escape');
  }
  for(let i=0;i<6;i++) {
    await page.locator(`[data-experience="${i}"]`).click();await noEnglish(page.locator('#dialog-content'));await page.keyboard.press('Escape');
  }
  for(let i=0;i<3;i++) {
    await page.locator(`[data-ship="${i}"]`).click();await page.locator('#fleet-details').click();
    await noEnglish(page.locator('#dialog-content'));await page.keyboard.press('Escape');
    await page.locator(`[data-crew="${i}"]`).click();await noEnglish(page.locator('#dialog-content'));await page.keyboard.press('Escape');
    await page.locator(`[data-screen="${i}"]`).click();await noEnglish(page.locator('#phone-content'));
  }
  for(const selector of ['#about','#contact','#prive-details','[data-coming="App Store"]','[data-coming="Google Play"]']) {
    await page.locator(selector).click();await noEnglish(page.locator('#dialog-content'));await page.keyboard.press('Escape');
  }
  await page.locator('#destination-trigger').click();await page.getByRole('option',{name:'Сатурн Курорт «Кольца»',exact:true}).click();
  await page.locator('#booking-form button[type="submit"]').click();await noEnglish(page.locator('#booking-results'));
  assert((await page.locator('#booking-results').textContent()).includes('4 752 000'),'Localized currency');
  await page.locator('#view-itinerary').click();await noEnglish(page.locator('#dialog-content'));await page.keyboard.press('Escape');
  await page.locator('[data-language="en"]').click();
  assert(await page.locator('h1').textContent()==='TITAN','English restored');
  assert((await page.locator('#booking-results').textContent()).includes('$4,752,000'),'English currency restored');
  assert(await page.locator('#travelers-value').textContent()==='3 guests','English select restored');
  assert((await page.locator('#date-value').textContent()).includes('January'),'English date restored');
  await page.locator('[data-language="ru"]').click();await page.reload();await page.locator('.webgl-ready').waitFor();
  assert(await page.locator('h1').textContent()==='САТУРН','Saved Russian preference');
  for(const width of [2035,1440,1024,768,390,360]) {
    await page.setViewportSize({width,height:900});
    assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'Russian layout width '+width);
    const bounds=await page.locator('.header-actions').boundingBox();assert(bounds.x>=0 && bounds.x+bounds.width<=width,'Header control fits '+width);
  }
  await page.setViewportSize({width:390,height:844});await page.evaluate(()=>scrollTo(0,0));await page.screenshot({path:'output/playwright/language-ru-mobile.png'});
  await page.locator('#booking').scrollIntoViewIfNeeded();await page.screenshot({path:'output/playwright/language-ru-booking.png'});
  await page.locator('#date-trigger').click();await page.screenshot({path:'output/playwright/language-ru-calendar.png'});await page.keyboard.press('Escape');
  await page.setViewportSize({width:1440,height:900});await page.evaluate(()=>scrollTo(0,0));await page.screenshot({path:'output/playwright/language-ru-desktop.png'});
  await page.emulateMedia({reducedMotion:'no-preference'});await page.locator('[data-language="en"]').click();
  assert(await page.locator('.hero-copy').evaluate(e=>e.getAnimations().length>0),'Language transition animates');
  await page.emulateMedia({reducedMotion:'reduce'});await page.locator('[data-language="ru"]').click();
  assert(await page.locator('.hero-copy').evaluate(e=>e.getAnimations().length===0),'Reduced-motion language transition');
  await page.locator('[data-language="en"]').click();await page.emulateMedia({reducedMotion:'no-preference'});
  const context=await page.context().browser().newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true,locale:'ru-RU',reducedMotion:'reduce'});
  const mobile=await context.newPage();mobile.on('pageerror',e=>errors.push(e.message));
  await mobile.goto('http://127.0.0.1:5173/');await mobile.locator('.webgl-ready').waitFor();
  assert(await mobile.locator('html').getAttribute('lang')==='ru','Browser language selects Russian');
  await mobile.locator('.menu-toggle').click();assert(await mobile.getByRole('link',{name:'Направления',exact:true}).first().isVisible(),'Russian mobile menu');
  await mobile.keyboard.press('Escape');
  for(const width of [390,360]) {
    await mobile.setViewportSize({width,height:844});
    for(let i=0;i<5;i++) {
      await mobile.locator(`[data-planet="${i}"]`).click();
      assert(await mobile.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'Mobile planet width '+width);
    }
  }
  await mobile.locator('[data-language="en"]').click();await mobile.reload();await mobile.locator('.webgl-ready').waitFor();
  assert(await mobile.locator('html').getAttribute('lang')==='en','Saved choice overrides browser locale');
  for(const language of ['ru','en','ru','en'])await mobile.locator(`[data-language="${language}"]`).click();
  assert(await mobile.locator('[data-language][aria-pressed="true"]').count()===1,'Single active language');
  assert(await mobile.locator('h1').textContent()==='SATURN','Rapid language switching is reversible');
  await context.close();
  assert(!errors.length,errors.join('\n'));
  return {result:'PASS',checks:['full Russian copy','all destination/interior/fleet/crew dialogs','form state and canvas preservation','calendar','results and itinerary','English restoration','saved preference','six screen widths','animation and reduced motion'],pageErrors:errors};
}
