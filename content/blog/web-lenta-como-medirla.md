---
title: "Tu web es lenta: cómo medirla gratis y qué arreglar primero"
description: Una página que tarda en cargar pierde clientes antes de que vean lo que vendés. Cómo medir la velocidad con herramientas gratuitas de Google, cómo leer el resultado sin ser técnico y cuáles son las causas más comunes.
date: 2026-11-28
tag: Sitios web
cover: /blog/covers/web-lenta-como-medirla.jpg
category: marketing
author: Equipo PotenciApp
---

Alguien busca lo que vendés, toca tu web desde el celular y... espera. La pantalla en blanco, la imagen que no termina de aparecer, el botón que se mueve justo cuando lo iba a tocar. Muchos no esperan: vuelven atrás y entran al siguiente resultado.

La velocidad importa por dos razones: porque **la gente se va** cuando una página tarda, y porque **Google la tiene en cuenta** como una de las señales de experiencia de la página. La buena noticia es que medirla es gratis y que las causas más comunes se repiten mucho.

## Cómo medirla en cinco minutos

### PageSpeed Insights

Entrá a **pagespeed.web.dev**, pegá la dirección de tu web y tocá "Analizar". Es una herramienta gratuita de Google y no hace falta crear cuenta.

El resultado tiene dos partes, y conviene no confundirlas:

1. **Datos de usuarios reales** (arriba, si tu web tiene suficientes visitas): cómo la vivió la gente que de verdad entró en los últimos 28 días. Esto es lo que más importa.
2. **Diagnóstico de laboratorio** (el puntaje de 0 a 100): una prueba simulada en ese momento. Sirve para encontrar problemas, pero el número cambia de una prueba a otra. No te obsesiones con llegar a 100.

Mirá siempre la pestaña **Celular**: la mayoría de tus visitas llegan desde el teléfono, muchas veces con datos móviles.

### Search Console

Si tenés tu web conectada a **Google Search Console**, el informe de **Métricas web principales** te muestra qué páginas de tu sitio tienen problemas, agrupadas. Es la forma de ver el sitio completo y no página por página.

## Las tres métricas, explicadas sin tecnicismos

Google resume la experiencia en tres medidas, llamadas *Core Web Vitals*:

- **LCP (cuánto tarda en aparecer lo principal).** El tiempo hasta que se ve el elemento más grande de la pantalla, normalmente la foto o el título principal. Lo bueno es **2,5 segundos o menos**.
- **INP (cuánto tarda en responder).** Cuando tocás un botón o un menú, cuánto tarda la página en reaccionar. Lo bueno es **200 milisegundos o menos**.
- **CLS (cuánto se mueve todo).** Si los elementos saltan mientras la página carga (el clásico botón que se corre justo cuando lo ibas a tocar). Lo bueno es **0,1 o menos**.

Si las tres están en verde, tu web está bien. Si alguna está en amarillo o rojo, ahí está el trabajo.

## Las causas más comunes (y qué hacer)

### 1. Imágenes enormes

Es la causa número uno. Una foto sacada con el celular puede pesar varios megas y mostrarse en un recuadro chiquito.

**Qué hacer:** subí las imágenes al tamaño en que se muestran, comprimidas, y en formatos modernos como **WebP** o **AVIF**. Muchas plataformas lo hacen solas, pero no siempre con las imágenes del encabezado o los banners.

### 2. Demasiadas apps, plugins y scripts

Cada app de la tienda, cada plugin de WordPress, cada píxel de seguimiento y cada chat flotante suma código que el celular tiene que descargar y ejecutar. Muchas veces se instalaron para probar algo y quedaron.

**Qué hacer:** hacé una lista de todo lo instalado y desinstalá lo que no uses. Es la mejora más barata que existe.

### 3. Un video o un carrusel arriba de todo

Un video de fondo o un carrusel con cinco fotos grandes en la parte de arriba es lo primero que tiene que cargar, y es pesado.

**Qué hacer:** una sola imagen principal, bien optimizada, suele convertir igual o mejor y carga mucho más rápido.

### 4. Hosting barato o lejano

Si el servidor es lento o está lejos de tus clientes, todo lo demás llega tarde.

**Qué hacer:** si PageSpeed marca que el servidor tarda en responder (aparece como "tiempo de respuesta del servidor"), consultá a tu proveedor de hosting o evaluá mudarte.

### 5. Fuentes y elementos que cargan tarde

Las tipografías personalizadas y los banners que aparecen después son la causa típica de que todo se mueva (el CLS).

**Qué hacer:** reservar el espacio de las imágenes y banners, y limitar la cantidad de tipografías.

## ¿Plataforma o web a medida?

En plataformas como Tiendanube o Shopify, la base la optimiza la plataforma, y lo que más pesa es **lo que agregás vos**: apps, imágenes y banners. En WordPress, el tema y los plugins hacen gran parte de la diferencia. En una web a medida, la velocidad depende de cómo se construyó: conviene pedir en el contrato que se entregue con las métricas en verde, y [revisarlo al recibirla](/blog/como-recibir-proyecto-terminado-checklist).

## Por dónde empezar hoy

1. Medí tu página principal y tu página de producto más visitada en **pagespeed.web.dev**, en celular.
2. Anotá las tres métricas.
3. Empezá por lo más barato: desinstalar lo que no usás y achicar las imágenes de arriba de todo.
4. Volvé a medir en unos días.

¿Mediste tu web y no sabés qué hacer con el resultado? Mandanos el link y te decimos qué está frenándola.
