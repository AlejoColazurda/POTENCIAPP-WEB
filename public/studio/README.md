# Studio kit / Kit de estudio

Locked filenames for curated stills and the hero loop. No runtime generation.
Nombres fijados para stills curados y el loop del hero. Cero generación en runtime.

Commit **only** approved files in place. No `final2`, `take_best`, or stock faces/metrics.
Commitear **solo** archivos aprobados, in-place. Sin caras, cifras ni logos inventados.

If a file is missing, the site keeps its current fallback (Aurora, `/og.png`, `#0A0A0A`).
Si falta el archivo, la web conserva el fallback actual.

Optional: `hero/por-escrito.source.mp4` (archive only — never the `<video>` src).
Opcional: `hero/por-escrito.source.mp4` (archivo; nunca el src del `<video>`).

```text
public/studio/
  hero/
    por-escrito.webm
    por-escrito-poster.jpg
    por-escrito.source.mp4          # optional
  plates/
    plate-precios-16x9.jpg
    plate-equipo-16x9.jpg
    plate-blog-16x9.jpg
  covers/
    cover-seguridad-16x9.jpg
    cover-tiendas-16x9.jpg
    cover-resumen-16x9.jpg
  og/
    og-home-1200x630.jpg
    og-precios-1200x630.jpg
    og-equipo-1200x630.jpg
    og-blog-1200x630.jpg
  frames/
    frame-laptop-empty.png
    frame-phone-empty.png
  portraits/                        # empty until real roster + photos
    {id}-4x5.jpg
```
