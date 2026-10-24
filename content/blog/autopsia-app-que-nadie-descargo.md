---
title: "Autopsia de una app que nadie descargó"
description: Un corralón pagó una app para recibir pedidos. Un año después tenía 9 usuarios activos y había desaparecido de la App Store. Reconstruimos qué salió mal y qué funcionó en su lugar.
date: 2026-10-24
tag: Contratar software
category: software
author: Equipo PotenciApp
---

*Serie "Contratar software sin quemarte" · Capítulo 6*

> **Sobre este caso.** Es un caso armado con situaciones reales que nos cuentan negocios que llegan después de una mala experiencia. Los nombres no existen y los números son ilustrativos. Cada error, por separado, lo vimos de verdad.

Raúl tiene un corralón de materiales en una ciudad de 40.000 habitantes. Sus clientes son albañiles, maestros mayores de obra y algún particular que está construyendo. Los pedidos le llegan por WhatsApp, por teléfono y en el mostrador, y muchas veces se pierden entre mensajes.

Un sobrino le dice que lo que necesita es una app. Raúl contrata a un estudio que la hace para iOS y Android, con catálogo, carrito y seguimiento del pedido. La app sale bien hecha y funciona.

Un año después, la cuenta es esta:

| Métrica | Número |
| --- | --- |
| Descargas totales | 140 |
| Usuarios que hicieron al menos un pedido | 31 |
| Usuarios activos el último mes | 9 |
| Pedidos por WhatsApp en el mismo mes | más de 300 |

Y un día, la app desapareció de la App Store. Esta es la autopsia.

## Error 1: nadie preguntó "¿para qué?"

**Qué pasó.** El pedido fue "una app". Nadie preguntó qué problema tenía que resolver. El problema real de Raúl no era que sus clientes no pudieran pedir: era que los pedidos de WhatsApp **se le perdían**.

**Cómo se evitaba.** Empezando por el problema y no por la solución. "Se me pierden pedidos" tiene muchas respuestas posibles, y una app para clientes es una de las más caras.

## Error 2: pedirle al cliente que cambie de hábito

**Qué pasó.** Los albañiles ya le pedían a Raúl por WhatsApp, desde la obra, con una foto de la lista escrita a mano. La app les pedía descargar algo nuevo, registrarse, buscar cada producto en un catálogo de 2.000 ítems y armar un carrito. Para ellos era más trabajo, no menos.

**Cómo se evitaba.** Mirando cómo compra el cliente **hoy**. Si ya hay un canal que usan sin esfuerzo, lo más fácil es ordenar ese canal, no reemplazarlo. Es lo que vimos en el [capítulo 3](/blog/no-necesitas-una-app): para un cliente que compra cada tanto, la descarga es la barrera más alta.

## Error 3: no definir qué era "funcionar"

**Qué pasó.** Nadie dijo antes de arrancar cuántos pedidos por la app harían que valiera la pena. Durante meses, "la app anda" se confundió con "la app funciona para el negocio".

**Cómo se evitaba.** Con un número antes de empezar: "si en tres meses el 20% de los pedidos entra por acá, seguimos; si no, cambiamos de plan". Sin ese número, nadie se anima a decir que algo no está funcionando.

## Error 4: el mantenimiento que nadie presupuestó

**Qué pasó.** La membresía de Apple Developer se renueva todos los años. Estaba a nombre del estudio, que había dejado de trabajar con Raúl. Nadie la renovó, y la app salió de la App Store. En Android seguía, pero sin actualizaciones.

**Cómo se evitaba.** Con las cuentas a nombre del negocio desde el principio ([capítulo 1](/blog/quien-es-dueno-del-codigo)) y con el costo anual de mantenimiento escrito en el presupuesto ([capítulo 4](/blog/clausulas-contrato-programador)).

## Lo que sí funcionó

Cuando Raúl volvió a empezar, el planteo fue otro: *¿cómo hacemos para que no se pierda ningún pedido de WhatsApp?*

La solución tuvo tres partes, y ninguna fue una app para clientes:

1. **Un catálogo web simple**, con precios actualizados, que se comparte por WhatsApp con un link. El cliente arma su lista y la manda **por WhatsApp**, ya ordenada, sin descargar ni registrarse.
2. **Un panel interno** donde cada pedido que entra queda cargado, con estado (recibido, preparado, entregado) y a quién se le asignó.
3. **Un aviso automático** al cliente cuando el pedido sale.

Los clientes siguieron usando el canal que ya usaban. Lo que cambió fue lo que pasaba **adentro** del corralón.

## Lo que muestra la autopsia

La app no falló por estar mal hecha. Falló porque resolvía un problema que Raúl no tenía, y no el que sí tenía. Antes de pagar por cualquier desarrollo, hacete estas tres preguntas:

1. **¿Cuál es el problema, en una frase y sin nombrar la tecnología?**
2. **¿Cómo lo resuelven hoy mis clientes o mi equipo, y qué les cuesta?**
3. **¿Qué número me va a decir, en tres meses, si funcionó?**

Si el proveedor no te hace estas preguntas antes de presupuestar, hacéselas vos. Y si querés que las pensemos juntos, contanos tu caso: [así trabajamos](/antes-de-contratarnos).

**Volvé al principio de la serie:** [¿De quién es el código de tu app?](/blog/quien-es-dueno-del-codigo)
