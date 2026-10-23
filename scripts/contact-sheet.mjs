import sharp from 'sharp';
import {readdir} from 'node:fs/promises';
const names=(await readdir('public/media/images')).filter(x=>x.endsWith('-640.webp'));
const tiles=[];
for(let i=0;i<names.length;i++){const tile=await sharp('public/media/images/'+names[i]).resize(240,150,{fit:'cover'}).toBuffer();tiles.push({input:tile,left:(i%4)*240,top:Math.floor(i/4)*170});const label=Buffer.from(`<svg width="240" height="20"><rect width="240" height="20" fill="#0b1020"/><text x="8" y="14" font-size="11" fill="white">${names[i]}</text></svg>`);tiles.push({input:label,left:(i%4)*240,top:Math.floor(i/4)*170+150});}
await sharp({create:{width:960,height:Math.ceil(names.length/4)*170,channels:3,background:'#0b1020'}}).composite(tiles).png().toFile('output/playwright/asset-contact-sheet.png');
