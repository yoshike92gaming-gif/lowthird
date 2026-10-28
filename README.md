# YouTube Like – Lower Third Overlay

Glassmorphism / futuristic-UI "Like" button lower third. 6 s, 16:9, 3840×2160, 60 fps, transparent alpha.

- `youtube_like_lowerthird.html` – self-contained source (vanilla HTML/SVG/JS, deterministic timeline). Open it to preview; `?render=1` gives a transparent, control-free page; `window.__seek(t)` sets any time.
- `video/` – rendered **ProRes 4444 with alpha** `.mov`, split into 90 MB parts (GitHub's 100 MB file limit). Rebuild with `./video/reassemble.sh`.
- `src/frames.mjs` – frame capture script (puppeteer-core + @sparticuz/chromium), then encode with ffmpeg:

```
ffmpeg -framerate 60 -i frames/f%04d.png -vf "format=rgba,pad=3840:2160:0:1400:color=black@0,scale=out_color_matrix=bt709:out_range=tv,format=yuva444p10le" \
  -c:v prores_ks -profile:v 4444 -alpha_bits 16 -bits_per_mb 8000 -vendor apl0 -pix_fmt yuva444p10le out.mov
```

Frames are captured as a cropped region (lower-left) and padded with transparency to the full 4K canvas.
