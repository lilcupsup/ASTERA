async page => {
 const assert=(ok,m)=>{if(!ok)throw Error(m)};
 const errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text())});
 await page.setViewportSize({width:1440,height:900});await page.goto('http://localhost:5173/');await page.locator('.webgl-ready').waitFor();
 const title=async name=>page.waitForFunction(n=>document.querySelector('h1').textContent===n,name);
 const positions=()=>page.locator('.orbital-labels span').evaluateAll(es=>es.map(e=>[parseFloat(e.style.left),parseFloat(e.style.top)]));
 const before=await positions();await page.getByRole('button',{name:'Next destination',exact:true}).click();await title('TITAN');
 await page.screenshot({path:'output/playwright/hero-transition.png'});const after=await positions();assert(before.every((p,i)=>Math.hypot(p[0]-after[i][0],p[1]-after[i][1])>.2),'Every overview world must move');
 await page.getByRole('button',{name:'Luna',exact:true}).click();await page.getByRole('button',{name:'Europa',exact:true}).click();await page.getByRole('button',{name:'Mars',exact:true}).click();await title('MARS');
 await page.waitForTimeout(1100);assert((await page.locator('#hero-resort').textContent())==='ELYSIUM RESORT','Synchronized resort');
 await page.keyboard.press('ArrowRight');await title('EUROPA');
 await page.getByRole('button',{name:'Saturn',exact:true}).click();await title('SATURN');await page.waitForTimeout(1200);
 await page.mouse.move(200,170);await page.waitForTimeout(700);const left=await page.locator('#home').evaluate(e=>parseFloat(e.style.getPropertyValue('--scene-x')));
 await page.mouse.move(1240,250);await page.waitForTimeout(700);const right=await page.locator('#home').evaluate(e=>parseFloat(e.style.getPropertyValue('--scene-x')));assert(right-left>2,'Smoothed camera parallax');
 await page.getByRole('button',{name:'Pause planet motion',exact:true}).click();await page.waitForTimeout(600);const paused=await positions();await page.waitForTimeout(300);const still=await positions();assert(paused.every((p,i)=>Math.hypot(p[0]-still[i][0],p[1]-still[i][1])<.2),'Pause stops orbit');
 await page.getByRole('button',{name:'Resume planet motion',exact:true}).click();await page.mouse.move(720,450);await page.waitForTimeout(700);await page.screenshot({path:'output/playwright/hero-desktop-v3.png'});
 // Raycast an actual small world, using the observed projected label anchor.
 const moon=await page.locator('.orbital-labels span').filter({hasText:'Luna'}).evaluate(e=>({x:parseFloat(e.style.left)/100*e.parentElement.clientWidth,y:parseFloat(e.style.top)/100*e.parentElement.clientHeight}));
 await page.mouse.click(moon.x,moon.y);await title('LUNA');
 await page.setViewportSize({width:390,height:844});await page.reload();await page.locator('.webgl-ready').waitFor();await page.waitForTimeout(700);await page.screenshot({path:'output/playwright/hero-mobile-v3.png'});
 await page.locator('#home').dispatchEvent('pointerdown',{clientX:300,clientY:300,pointerType:'touch'});await page.locator('#home').dispatchEvent('pointerup',{clientX:100,clientY:300,pointerType:'touch'});await title('TITAN');
 const overlap=await page.evaluate(()=>{const eyebrow=document.querySelector('#hero-number').getBoundingClientRect();return [...document.querySelectorAll('.orbital-labels span')].some(e=>e.getBoundingClientRect().bottom>eyebrow.top)});assert(!overlap,'Mobile orbit labels clear the copy');
 await page.emulateMedia({reducedMotion:'reduce'});await page.reload();await page.locator('.webgl-ready').waitFor();await page.getByRole('button',{name:'Luna',exact:true}).click();await title('LUNA');await page.waitForTimeout(200);const reducedA=await positions();await page.waitForTimeout(200);assert(JSON.stringify(reducedA)===JSON.stringify(await positions()),'Reduced motion freezes animation');
 await page.emulateMedia({reducedMotion:'no-preference'});
 assert(!errors.length,errors.join('\n'));
 return {result:'PASS',checks:['shared orbit movement','rapid retarget','synchronized copy','keyboard','camera parallax','pause','raycast selection','mobile swipe','mobile labels','reduced motion'],browserErrors:errors};
}
