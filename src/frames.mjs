import chromium from '@sparticuz/chromium';
import puppeteer from 'puppeteer-core';
import fs from 'fs';
const [A,B]=[+process.argv[2],+process.argv[3]]; const FPS=60;
const CLIP={x:0,y:700,width:1040,height:380};
fs.mkdirSync('frames',{recursive:true});
const b = await puppeteer.launch({args:chromium.args,executablePath:await chromium.executablePath(),headless:'shell'});
const p = await b.newPage();
await p.setViewport({width:1920,height:1080,deviceScaleFactor:2});
await p.goto('file://'+process.cwd()+'/youtube_like_lowerthird.html?render=1');
await p.waitForFunction('window.__ready===true');
const t0=Date.now();
for(let i=A;i<B;i++){
  const f=`frames/f${String(i).padStart(4,'0')}.png`;
  if(fs.existsSync(f)) continue;
  await p.evaluate(t=>window.__seek(t),i/FPS);
  fs.writeFileSync(f,await p.screenshot({type:'png',omitBackground:true,clip:CLIP}));
}
console.log('chunk',A,B,((Date.now()-t0)/1000).toFixed(0)+'s');
await b.close();
