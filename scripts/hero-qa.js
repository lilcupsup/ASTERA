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
 await page.getByRole('button',{name:'Resume planet motion',exact:true}).click();await page.mouse.move(720,450);await page.waitForTimeout(700);await page.screenshot({path:'output/playwright/hero-unified-desktop.png'});
 // Raycast an actual small world, using the observed projected label anchor.
 const moon=await page.locator('.orbital-labels span').filter({hasText:'Luna'}).evaluate(e=>({x:parseFloat(e.style.left)/100*e.parentElement.clientWidth,y:parseFloat(e.style.top)/100*e.parentElement.clientHeight}));
 await page.mouse.click(moon.x,moon.y);await title('LUNA');
 for(const width of [1024,768]) {
   await page.setViewportSize({width,height:900});await page.getByRole('button',{name:'Saturn',exact:true}).click();await title('SATURN');await page.waitForTimeout(1800);
   const bounds=await page.locator('.orbital-labels span').evaluateAll(es=>es.filter(e=>getComputedStyle(e).visibility!=='hidden').map(e=>({x:e.getBoundingClientRect().x,right:e.getBoundingClientRect().right})));
   assert(bounds.length===4 && bounds.every(r=>r.x>=0 && r.right<=width),'Four distant worlds fit tablet width '+width);
   if(width===768)await page.screenshot({path:'output/playwright/hero-unified-tablet.png'});
 }
 await page.setViewportSize({width:390,height:844});await page.reload();await page.locator('.webgl-ready').waitFor();await page.waitForTimeout(700);await page.screenshot({path:'output/playwright/hero-unified-mobile.png'});
 await page.locator('#home').dispatchEvent('pointerdown',{clientX:300,clientY:300,pointerType:'touch'});await page.locator('#home').dispatchEvent('pointerup',{clientX:100,clientY:300,pointerType:'touch'});await title('TITAN');
 const overlap=await page.evaluate(()=>{const eyebrow=document.querySelector('#hero-title').getBoundingClientRect();return [...document.querySelectorAll('.orbital-labels span')].some(e=>getComputedStyle(e).visibility !== 'hidden' && e.getBoundingClientRect().bottom>eyebrow.top)});assert(!overlap,'Mobile orbit labels clear the copy');
 await page.emulateMedia({reducedMotion:'reduce'});await page.reload();await page.locator('.webgl-ready').waitFor();await page.getByRole('button',{name:'Luna',exact:true}).click();await title('LUNA');await page.waitForTimeout(200);const reducedA=await positions();await page.waitForTimeout(200);assert(JSON.stringify(reducedA)===JSON.stringify(await positions()),'Reduced motion freezes animation');

 const architecture=await page.evaluate(async()=>{
   const {initPlanetary}=await import('/src/planetary.ts');
   const fixture=document.createElement('section');fixture.className='hero';fixture.style.cssText='position:fixed;inset:0;width:1440px;height:900px;opacity:0;pointer-events:none';
   const canvasHost=document.createElement('div');canvasHost.style.cssText='width:100%;height:100%';fixture.append(canvasHost);document.body.append(fixture);
   const scene=initPlanetary(canvasHost,()=>{});scene.pause(true);
   const snapshots=[];
   for(let index=0;index<5;index++){scene.select(index);snapshots.push(scene.inspect())}
   scene.dispose();fixture.remove();return snapshots;
 });
 const ids=architecture[0].worlds.map(w=>w.id);
 architecture.forEach((s,index)=>{
   assert(s.worldCount===5 && s.worlds.length===5,'Exactly five real planets, no overview clones');
   assert(s.worlds.every((w,i)=>w.id===ids[i]),'Planet identity survives every selection');
   assert(s.worlds.every(w=>w.scale===5),'Physical radii stay constant');
   assert(Math.abs(s.worlds[index].position[2]-1)<.0001,'Selected original reaches the near bend');
   assert(s.worlds.filter(w=>w.position[2]<-100).length===4,'Exactly four original worlds remain distant');
 });
 await page.emulateMedia({reducedMotion:'no-preference'});
 assert(!errors.length,errors.join('\n'));
 return {result:'PASS',checks:['five unique persistent planet meshes','same near bend for every original','constant physical radius','shared orbit movement','rapid retarget','synchronized copy','keyboard','camera parallax','pause','raycast selection','mobile swipe','mobile labels','reduced motion'],browserErrors:errors};
}
