const { chromium } = require('/home/claude/.npm-global/lib/node_modules/playwright');
const { spawn } = require('child_process');
const FPS = +process.env.FPS || 60, DUR = 6, OUT = process.env.OUT || '/home/claude/lt/out/subscribe-lowerthird-4k.mov';
(async () => {
  const ff = spawn('ffmpeg', ['-y','-nostats','-loglevel','error','-f','image2pipe','-framerate',String(FPS),'-c:v','png','-i','-',
    '-vf','scale=out_color_matrix=bt709:out_range=tv,format=yuv420p',
    '-c:v','libx264','-profile:v','high','-level','5.2','-preset','medium',
    '-b:v','56000k','-minrate','56000k','-maxrate','56000k','-bufsize','112000k',
    '-x264-params','nal-hrd=cbr:force-cfr=1',
    '-color_primaries','bt709','-color_trc','bt709','-colorspace','bt709','-color_range','tv',
    '-r',String(FPS),'-movflags','+faststart','-an', OUT], { stdio: ['pipe','inherit','inherit'] });
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
  const p = await b.newPage({ viewport:{width:1920,height:1080}, deviceScaleFactor:2 });
  await p.goto('file:///home/claude/lt/subscribe-overlay.html?export=1');
  await p.waitForFunction('window.__ready===true');
  const N = FPS*DUR, t0 = Date.now();
  for (let i=0;i<N;i++){
    await p.evaluate(t=>window.__setTime(t), i/FPS);
    const buf = await p.screenshot({ type:'png' });
    if(!ff.stdin.write(buf)) await new Promise(r=>ff.stdin.once('drain',r));
    if(i%20===0) console.log('frame',i,'/',N,((Date.now()-t0)/1000).toFixed(1)+'s');
  }
  ff.stdin.end(); await new Promise(r=>ff.on('close',r)); await b.close(); console.log('done');
})();
