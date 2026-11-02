# Subscribe Button — Lower Third (YouTube, Futuristic Gaming)

Animated 6-second subscribe overlay on pure chroma-key green (#00FF00).

## Files

| File | What |
|---|---|
| `subscribe-overlay.html` | Self-contained source (HTML + SVG + JS, font embedded). No libraries. |
| `subscribe-lowerthird-4k.mov` | Rendered video: 3840×2160, 60 fps, H.264 High, yuv420p, BT.709, CBR ~54 Mbps, 6.000 s |
| `render.js` | Deterministic frame capture + encode script (Playwright + ffmpeg) |

## Preview

Open `subscribe-overlay.html` in Chrome / Edge / Firefox.

- **Replay** button or `R` key: restart
- **Space**: play / pause
- Scrubber: drag to any frame
- **Loop** checkbox

`?export=1` in the URL gives a bare 1920×1080 stage with no controls.

## Config (top of the script)

`CONFIG.duration` (seconds, timeline scales to fit), `CONFIG.aspect` (16/9), `CONFIG.safe`, `CONFIG.anchor`, `CONFIG.fontSize`, `CONFIG.letterSpacing`.

## Timeline (6.00 s, authored times)

| Time (s) | Event |
|---|---|
| 0.00–0.15 | Empty key green |
| 0.12–0.70 | Neon streak runs along base edge |
| 0.15–0.85 | Plate slides in from left (outExpo) with left→right mask wipe |
| 0.55–1.00 | Play badge pops in (small overshoot) |
| 0.75–1.50 | SUBSCRIBE letters rise through a mask, 35 ms stagger |
| 1.45–1.95 | Light sweep across plate |
| 1.75–2.55 | Cursor fades in, curves to button (inOutCubic) |
| 2.35–2.55 | Hover: neon edge thickens, glow rises |
| 2.60–2.72 | Press: plate squeezes to 96.5% |
| 2.72–3.15 | Release spring, red flood from click point, ripple, badge inverts to white |
| 3.00–3.40 | Cursor drifts away and fades |
| 3.05–3.45 | Bell button slides out of plate end |
| 3.40–4.30 | Bell rings (damped swing), ring waves, notification dot pops |
| 3.85–4.35 | Second light sweep |
| 4.30–4.85 | Soft glow pulse |
| 4.30–5.30 | Hold: CTA fully readable |
| 5.30–5.55 | Bell collapses back into plate |
| 5.45–5.92 | Plate wipes out to the left (inCubic) |
| 5.95–6.00 | Empty key green, zero residue |

## Palette

Graphite `#2D3449 → #0B0E16`, crimson `#FF2D3F / #E41B31 / #9C081C`, hot pink `#FF4F9A`, violet `#8C6BFF`, white `#FFFFFF`. No green in artwork.

## Chroma key notes

- Background is `rgb(0,255,0)`. After H.264 4:2:0 + limited-range round trip, decoders return about `(0,254,0)`. Key on the colour picked from the frame, not the number.
- Soft shadows and glow are semi-transparent over green, so they key out partly. Use a small shadow/edge softness setting in your keyer.
- 4:2:0 subsampling softens colour at hard edges. Choke 1–2 px if you see a fringe.

## Export workflow (re-render)

```bash
npm i playwright
node render.js          # 60 fps
FPS=30 node render.js   # 30 fps
```

`render.js` steps the page with `window.__setTime(t)`, captures each frame as PNG at 2× device scale (3840×2160), and pipes to ffmpeg (libx264, CBR 56 Mbps, BT.709).

## Alpha version (not generated here)

For true transparency: set the stage background to transparent, capture with `omit_background: true`, and encode ProRes 4444:

```bash
ffmpeg -framerate 60 -i frame_%04d.png -c:v prores_ks -profile:v 4444 -pix_fmt yuva444p10le out.mov
```
