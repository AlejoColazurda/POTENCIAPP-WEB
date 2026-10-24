---
title: ¿De quién es el código de tu app? El detalle que te puede dejar rehén de tu programador
description: Pagaste el desarrollo, pero eso no te hace dueño. Qué dice la ley argentina, qué tiene que decir tu contrato y los siete accesos que tienen que estar a tu nombre.
date: 2026-10-24
tag: Contratar software
category: software
author: Equipo PotenciApp
---

*Serie "Contratar software sin quemarte" · Capítulo 1*

Hay una escena que se repite. Un negocio paga una app, una tienda o un sistema. Funciona bien un año. Un día se pelean con el programador, o el programador cambia de trabajo, o simplemente deja de contestar. Y el dueño descubre que no tiene nada: ni el código, ni la cuenta donde está publicada la app, ni la clave del servidor, ni el dominio.

Pagó por algo que nunca fue suyo.

## Pagar no es lo mismo que ser dueño

En Argentina, el software está protegido por la ley de propiedad intelectual (Ley 11.723, que lo incluye expresamente desde la reforma de la Ley 25.036). La regla general es simple: **el autor es quien lo escribe**.

La ley trae una excepción para los empleados: lo que un empleado en relación de dependencia programa como parte de su trabajo es del empleador, salvo que se acuerde otra cosa. Pero la mayoría de los negocios no contrata empleados para hacer su software: contrata a un freelancer o a una agencia. Y para ese caso **no hay ninguna presunción a tu favor**. Si el contrato no dice que los derechos se te ceden, lo más probable es que sigan siendo de quien lo programó.

En la práctica, eso significa que podés tener permiso para *usar* el sistema, pero no para llevártelo a otro proveedor, modificarlo o venderlo junto con tu negocio.

> No es asesoramiento legal: si el proyecto es grande, que un abogado lea el contrato antes de firmar. Pero que el tema esté en el contrato depende de vos.

## Qué tiene que decir el contrato

Tres cosas, por escrito y sin vueltas:

1. **Cesión de derechos.** Que los derechos patrimoniales sobre el código desarrollado para vos te pertenecen (o se te ceden) una vez pagado. Si el proveedor usa piezas propias que reutiliza en otros proyectos, que diga que tenés una licencia de uso perpetua sobre esas piezas.
2. **Entrega del código fuente.** No alcanza con "la app instalada". Tiene que decir que te entregan el código fuente completo, en un repositorio al que tenés acceso, en cada etapa y al final.
3. **Accesos a tu nombre.** Que todas las cuentas que necesita el sistema para funcionar se crean a tu nombre o a nombre de tu empresa, y que el proveedor trabaja con un usuario invitado.

Si te presupuestan por WhatsApp y no hay contrato, ninguna de estas tres cosas existe.

## Los siete accesos que tienen que estar a tu nombre

El código es solo una parte. Un sistema vive repartido en varias cuentas, y cualquiera de ellas sirve para tenerte agarrado:

| Acceso | Por qué importa |
| --- | --- |
| **Dominio** (NIC Argentina o el registrador que sea) | Si está a nombre del programador, tu web y tu email dependen de él. En NIC Argentina, que figure tu CUIT como titular. |
| **Repositorio de código** (GitHub, GitLab) | Ahí está el código y su historia. Una organización tuya, con el proveedor como miembro invitado. |
| **Hosting o servidor** (Vercel, AWS, un VPS) | Si la cuenta es de él, puede apagar todo. Y la factura tiene que llegarte a vos. |
| **Cuenta de Apple Developer** | La app se publica a nombre de una cuenta. Si es la del programador, la app "es" de él ante Apple. |
| **Cuenta de Google Play Console** | Lo mismo para Android. |
| **Base de datos y backups** | Tus clientes, pedidos y ventas. Tenés que poder descargar una copia sin pedirle permiso a nadie. |
| **Pasarelas y APIs** (Mercado Pago, envíos, WhatsApp, IA) | Las credenciales tienen que ser de tu cuenta. Si cobrás con las credenciales de otro, la plata pasa por otro. |

Transferir una app de una cuenta de Apple o Google a otra se puede, pero hace falta la colaboración de las dos partes. Si la relación ya se rompió, ese trámite se vuelve una negociación. Mejor arrancar con todo a tu nombre.

## Cómo chequearlo hoy, aunque ya tengas el sistema

No hace falta saber programar. Con esto alcanza:

1. **Pedí el link del repositorio** y comprobá que podés entrar con tu propio usuario.
2. **Buscá tu dominio en NIC Argentina** (o en el registrador) y mirá quién figura como titular.
3. **Preguntá a nombre de quién está la cuenta de Apple y la de Google** donde se publica la app. Si dice el nombre del programador en la tienda, ya tenés la respuesta.
4. **Fijate a quién le llega la factura del hosting.** Si no te llega a vos, no es tuyo.
5. **Pedí un backup de la base de datos** y guardalo. Si te lo niegan o te dicen que "no se puede", es una señal.

Si alguna de estas respuestas te incomoda, no hace falta pelearse: la mayoría de los proveedores serios pasa los accesos sin problema cuando se los pedís con claridad. El momento para hacerlo es **ahora**, mientras la relación es buena.

## La pregunta que separa a un proveedor serio

Antes de contratar, preguntá: *"Si mañana dejamos de trabajar juntos, ¿qué me llevo?"*

La respuesta correcta es corta: el código, los accesos, la base de datos y la documentación para que otro pueda seguir. Si la respuesta es larga, vaga o empieza con "bueno, depende", ya sabés lo que tenés que poner en el contrato.

En PotenciApp todo esto va por escrito antes de arrancar. Si querés ver cómo lo hacemos, está en [Antes de contratarnos](/antes-de-contratarnos).

**Sigue en el capítulo 2:** [Autopsia de una tienda online que costó el triple de lo presupuestado](/blog/autopsia-tienda-online-costo-el-triple).
