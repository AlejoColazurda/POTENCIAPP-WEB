---
title: "Autopsia de una tienda online que costó el triple de lo presupuestado"
description: Un presupuesto por WhatsApp, cuatro "eso no estaba incluido" y un programador que dejó de contestar. Reconstruimos el caso paso a paso, y cómo se evitaba cada herida.
date: 2026-10-24
tag: Contratar software
category: software
author: Equipo PotenciApp
---

*Serie "Contratar software sin quemarte" · Capítulo 2*

> **Sobre este caso.** Es un caso armado con situaciones que escuchamos seguido de comercios que llegan después de una mala experiencia. Los nombres no existen y los montos están expresados como porcentaje del presupuesto inicial, para que sirvan sin importar la inflación. Cada herida, por separado, la vimos de verdad.

Marina tiene una dietética con local a la calle y quiere vender online. Le pasan el contacto de un programador "que hace tiendas". Le escribe por WhatsApp, él le pregunta qué vende y cuántos productos tiene, y al rato le responde con un número: **la tienda completa**, lista en tres semanas.

Marina acepta. Llamemos a ese número **100**.

Seis meses después, la tienda le costó **310** y todavía no vendió nada. Esta es la autopsia.

## Herida 1: "La tienda completa" (semana 1)

**Qué pasó.** El presupuesto era un solo mensaje: "Tienda completa, con carrito y Mercado Pago". No decía cuántas páginas, quién cargaba los productos, qué pasaba con los envíos ni cuántas rondas de cambios había.

**Por qué duele.** "Completa" no es un alcance: es una expectativa. Cada uno de los dos tenía una idea distinta de "completa", y las dos eran razonables.

**Cómo se evitaba.** Un alcance escrito con una lista de lo que **sí** incluye y, tan importante como eso, de lo que **no**. Si un ítem no está en la lista, no está.

## Herida 2: "La carga de productos no estaba incluida" (semana 3)

**Qué pasó.** La tienda estaba lista, pero vacía. Marina tenía 420 productos con variantes de peso. "Yo te armo la tienda; los productos los cargás vos, o te los cargo aparte." Cargarlos aparte: **+35**.

**Cómo se evitaba.** Preguntar antes: *¿quién carga el catálogo, cuántos productos incluye y con qué fotos?* Es la pregunta más barata de todo el proyecto.

## Herida 3: "Los envíos son otra integración" (semana 5)

**Qué pasó.** Marina quería calcular el envío según el código postal. Eso requería conectar con una empresa de envíos: **+40**. El hosting que el programador había elegido, además, empezó a cobrarse en dólares y a llegarle a ella sin aviso: **+15** en el primer semestre.

**Cómo se evitaba.** Que el presupuesto liste los **costos recurrentes** (hosting, dominio, apps, plugins pagos) con su monto aproximado y a nombre de quién se pagan. Un presupuesto que solo muestra el costo de hacer la tienda, y no el de mantenerla, está incompleto.

## Herida 4: los cambios que nunca terminan (semanas 6 a 10)

**Qué pasó.** Marina pidió cambios de diseño. Algunos se hicieron gratis, otros se cobraron "por hora", sin que nadie supiera cuántas horas eran. Total: **+60**, pagado de a poco en transferencias sueltas, sin factura.

**Cómo se evitaba.** Un número de rondas de revisión incluidas y una regla clara: lo que queda fuera del alcance **se cotiza por escrito antes de tocarlo**. Y factura por cada pago: sin factura no hay comprobante de nada.

## Herida 5: el silencio (semana 12)

**Qué pasó.** El programador consiguió un trabajo en relación de dependencia y empezó a contestar cada vez menos. Un día, un plugin dejó de funcionar y el carrito se rompió. Marina descubrió que el dominio, el hosting y la cuenta de Mercado Pago conectada estaban a nombre de él.

Recuperar el dominio, migrar la tienda a una cuenta propia y arreglar el carrito con otro proveedor: **+60**.

**Cómo se evitaba.** Con todos los accesos a su nombre desde el día uno (lo explicamos en el [capítulo 1](/blog/quien-es-dueno-del-codigo)) y con una garantía por escrito: un período en el que las fallas de lo entregado se corrigen sin cargo.

## La cuenta final

| Concepto | Costo (presupuesto = 100) |
| --- | --- |
| Presupuesto inicial | 100 |
| Carga de productos | +35 |
| Integración de envíos | +40 |
| Hosting no previsto (6 meses) | +15 |
| Cambios "por hora" | +60 |
| Rescate y migración | +60 |
| **Total** | **310** |

Y lo que no entra en la tabla: seis meses sin vender online, y una dueña que ahora desconfía de cualquier proveedor.

## Lo que muestra la autopsia

Ninguna de las heridas fue mala suerte. Todas tienen el mismo origen: **un acuerdo que no estaba por escrito**. El programador no era necesariamente un estafador: probablemente era alguien con buenas intenciones y sin proceso. Para Marina, el resultado fue el mismo.

Antes de aceptar un presupuesto, hacete estas cinco preguntas:

1. ¿Tengo una lista escrita de lo que incluye y lo que no?
2. ¿Sé quién carga el contenido y cuánto incluye?
3. ¿Sé cuánto voy a pagar por mes para mantenerlo, y a nombre de quién?
4. ¿Sé cuántos cambios incluye y cómo se cotiza lo que queda afuera?
5. ¿Hay garantía por escrito, y todos los accesos están a mi nombre?

Si alguna respuesta es "no", todavía estás a tiempo de pedirlo. En PotenciApp cada proyecto arranca con alcance, hitos, fechas y precio cerrado por escrito: [así trabajamos](/antes-de-contratarnos).

**Sigue en el capítulo 3:** [No necesitás una app (todavía)](/blog/no-necesitas-una-app).
