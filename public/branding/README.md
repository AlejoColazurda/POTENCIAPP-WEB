# Branding Potenciapp — Assets (REAL, partiendo del diseño original)

Logos e iconos de Potenciapp en PNG con **fondo transparente real**, derivados de los archivos originales del diseño. Ya no son recreaciones SVG aproximadas — son las imágenes oficiales procesadas.

## Estructura

```
branding/
├── png/                       Logos en varios tamaños
│   ├── mark-{64,128,256,512,1024}.png       (ícono solo, cuadrado)
│   ├── mark-full.png                         (resolución completa, ~373×374)
│   ├── isotipo-light-{256,512,1024}.png      P + ícono, P negra (fondos claros)
│   ├── isotipo-dark-{256,512,1024}.png       P + ícono, P blanca (fondos oscuros)
│   ├── isotipo-{light,dark}-full.png         resolución completa, ~627×492
│   ├── wordmark-light-{400,800,1600}.png     POTENCIAPP, POTENCI negro (fondos claros)
│   ├── wordmark-dark-{400,800,1600}.png      POTENCIAPP, POTENCI blanco (fondos oscuros)
│   └── wordmark-{light,dark}-full.png        resolución completa, ~943×133
│
└── favicons/
    ├── favicon.ico                           multi-size 16/32/48/64
    ├── favicon-{16,32,48,64}.png             tamaños chicos
    └── favicon-180.png                       Apple Touch Icon
```

> Si ves archivos terminados en `-preview.png` o `-on-ink-preview.png`, son verificaciones internas que se pueden ignorar/borrar.

## Cómo usar (URLs públicas en producción)

Una vez subidos a `POTENCIAPP-WEB` y deployado en Vercel, las URLs van a ser:

```
https://www.potenciapp.com/branding/png/mark-512.png
https://www.potenciapp.com/branding/png/wordmark-light-800.png
https://www.potenciapp.com/branding/png/wordmark-dark-800.png
https://www.potenciapp.com/branding/png/isotipo-light-512.png
https://www.potenciapp.com/branding/png/isotipo-dark-512.png
https://www.potenciapp.com/branding/favicons/favicon.ico
https://www.potenciapp.com/branding/favicons/favicon-180.png

# Aliases automáticos de Next.js:
https://www.potenciapp.com/icon.svg       (fallback vectorial)
https://www.potenciapp.com/favicon.ico
https://www.potenciapp.com/apple-icon.png
```

## Paleta oficial

| Token | Hex | Uso |
|---|---|---|
| Verde lime | `#1AFF1A` | Brand color principal — APP del wordmark, anillo del mark, ojo de la P |
| Negro | `#000000` | POTENCI del wordmark, P del isotipo, interior del mark |
| Ink | `#0b1220` | Texto principal en lugar de negro puro cuando se busca menos contraste |
| Paper | `#f7f9f7` | Fondo de página claro |

## Tipografía

- **Logo:** Archivo Black (los wordmarks reales ya tienen las letras embebidas como pixels — no hace falta cargar la fuente solo para el logo)
- **Body / UI:** Inter (400-800) desde Google Fonts

## Cuándo usar qué variante

- **mark.png** — favicon, app icon, avatar de la marca, casos donde no entra el wordmark.
- **isotipo-light/dark.png** — header de app, presentaciones donde querés P + ícono pero no todo el wordmark.
- **wordmark-light/dark.png** — footer, login, contextos comerciales donde el nombre tiene que leerse claro.
- **light vs dark** — `light` es texto negro para fondos claros (paper, blanco). `dark` es texto blanco para fondos oscuros (ink, gradiente, negro).

## En código (HTML / React)

```html
<!-- Favicon -->
<link rel="icon" type="image/x-icon" href="/branding/favicons/favicon.ico">
<link rel="apple-touch-icon" href="/branding/favicons/favicon-180.png">

<!-- Header oscuro (sobre fondo --pp-ink o negro) -->
<img src="/branding/png/wordmark-dark-800.png" alt="Potenciapp" width="200" height="28">

<!-- Header claro (sobre fondo blanco/paper) -->
<img src="/branding/png/wordmark-light-800.png" alt="Potenciapp" width="200" height="28">

<!-- Avatar / ícono compacto -->
<img src="/branding/png/mark-128.png" alt="Potenciapp" width="40" height="40">
```

Si lo usás desde un repo distinto (no `POTENCIAPP-WEB`), referenciá la URL absoluta:

```tsx
<img src="https://www.potenciapp.com/branding/png/wordmark-dark-800.png" alt="Potenciapp" />
```
