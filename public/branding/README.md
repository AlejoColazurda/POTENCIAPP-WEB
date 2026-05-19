# Branding Potenciapp — Assets

Logos e iconos de Potenciapp en SVG (vector, escalables) y PNG (varios tamaños) + favicon multi-size.

## Estructura

```
branding/
├── svg/                       Vectores (preferidos para web)
│   ├── mark.svg               Solo el ícono (círculo verde con cohete)
│   ├── favicon.svg            Igual al mark; usar en <link rel="icon">
│   ├── isotipo-light.svg      P + ícono (texto NEGRO, para fondos claros)
│   ├── isotipo-dark.svg       P + ícono (texto BLANCO, para fondos oscuros)
│   ├── wordmark-light.svg     POTENCIAPP horizontal (texto NEGRO)
│   └── wordmark-dark.svg      POTENCIAPP horizontal (texto BLANCO)
│
├── png/                       Rasterizados (para casos donde no se pueda SVG)
│   ├── mark-{64,128,256,512,1024}.png
│   ├── isotipo-{light,dark}-{512,1024,2048}.png
│   └── wordmark-{light,dark}-{800,1600,3200}.png
│
└── favicons/                  Para <head>
    ├── favicon.ico            multi-size (16/32/48/64) — clásico
    ├── favicon-{16,32,48,64}.png
    └── favicon-180.png        Apple Touch Icon
```

Los archivos con sufijo `-preview` son verificaciones visuales que generé al armar los assets. Podés borrarlos a mano si querés limpieza, no se usan en producción.

## Paleta oficial

| Token | Hex | Uso |
|---|---|---|
| Verde principal | `#1AFF1A` | Acentos, "APP" del wordmark, anillo del mark, el cohete |
| Negro | `#000000` | "POTENCI" del wordmark, fondo del disco interior del mark |
| Ink (sobre claro) | `#0b1220` | Texto principal cuando se evita el negro puro |
| Paper | `#f7f9f7` | Fondo de página |

> **Importante:** El verde es lime/neón puro. No confundir con verdes corporativos más oscuros (ej. `#1f7a3e`) que aparecen en algunas variantes históricas del portal. El verde del logo es el verde de marca.

## Tipografía

**Archivo Black** (Google Fonts) — los wordmarks fueron renderizados con esta fuente. Si tu app no la carga, los SVG tienen fallback a Impact / Inter / system-ui, pero el resultado solo será 100% fiel con Archivo Black cargada:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Archivo+Black&family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
```

Para body usar **Inter** (400-800). Archivo Black SOLO para el logo y eventualmente para headlines grandes; no usar para body porque es muy pesada.

## Cómo usar los assets

### En código (HTML / React / etc.)

Una vez subidos al repo y desplegados, las URLs públicas van a ser:

```
https://gisbert.potenciapp.com/branding/svg/wordmark-light.svg
https://gisbert.potenciapp.com/branding/svg/mark.svg
https://gisbert.potenciapp.com/branding/png/wordmark-light-1600.png
https://potenciapp.com/branding/favicons/favicon.ico
... etc
```

(Las URLs son las mismas sobre cualquier subdominio del proyecto, porque están en `public/branding/`.)

### En el `<head>` para favicon

```html
<link rel="icon" type="image/svg+xml" href="/branding/svg/favicon.svg">
<link rel="icon" type="image/png" sizes="32x32" href="/branding/favicons/favicon-32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/branding/favicons/favicon-16.png">
<link rel="apple-touch-icon" sizes="180x180" href="/branding/favicons/favicon-180.png">
<link rel="shortcut icon" href="/branding/favicons/favicon.ico">
```

### En componentes React (project-tracker)

Reemplazar el cuadrado con la letra "P" hardcodeada por el SVG real:

```tsx
// Antes (placeholder):
<div className="w-10 h-10 rounded-lg bg-white/10 border border-white/20
                flex items-center justify-center font-extrabold text-white">
  P
</div>

// Después (logo real):
<img src="/branding/svg/mark.svg" alt="Potenciapp" className="w-10 h-10" />
```

Para el header con texto:

```tsx
<img src="/branding/svg/wordmark-light.svg" alt="Potenciapp" className="h-8" />
// o, sobre fondo oscuro:
<img src="/branding/svg/wordmark-dark.svg" alt="Potenciapp" className="h-8" />
```

## Cuándo usar qué variante

- **mark.svg** — favicon, app icon, avatares de la marca, casos donde no entra el wordmark.
- **isotipo-light/dark.svg** — header de la app, presentaciones, contextos donde querés P + ícono sin todo el wordmark.
- **wordmark-light/dark.svg** — footer, página de login, contextos comerciales donde el nombre debe leerse claro.
- **light vs dark** — light = texto negro para fondos claros (paper, blanco). dark = texto blanco para fondos oscuros (ink, gradiente hero, negro).

## Subir al repo

Hay un script `subir_branding_a_project_tracker.bat` en la carpeta padre del workspace que hace `git pull` + copia los assets a `project-tracker/public/branding/` + commit + push. Ejecutalo después de que estés conforme con los logos.
