---
title: "Tu programador desapareció: qué hacer en las primeras 48 horas"
description: No contesta, el sistema sigue andando (por ahora) y no sabés qué tenés. Un plan en orden para inventariar, proteger lo que es tuyo, pedir lo que falta y no empeorar las cosas.
date: 2026-10-24
tag: Contratar software
category: software
author: Equipo PotenciApp
---

*Serie "Contratar software sin quemarte" · Capítulo 5*

Pasa más de lo que se cuenta. El programador que hizo tu tienda, tu app o tu sistema deja de contestar. A veces consiguió otro trabajo, a veces se mudó, a veces hubo un problema de pagos o simplemente se cansó. El sistema sigue funcionando, pero sabés que el día que algo se rompa no vas a tener a quién llamar.

Lo peor que podés hacer es entrar en pánico o amenazar. Lo mejor es seguir un orden.

## Hora 0 a 4: inventario

Antes de pedir nada, necesitás saber qué tenés. Armá una tabla con esto:

| Pieza | ¿Está a mi nombre? | ¿Tengo acceso? |
| --- | --- | --- |
| Dominio | | |
| Hosting o servidor | | |
| Repositorio de código | | |
| Base de datos | | |
| Cuenta de Apple Developer | | |
| Cuenta de Google Play | | |
| Mercado Pago y otras pasarelas | | |
| Email del negocio | | |

Cómo averiguarlo sin saber programar:

- **Dominio:** buscalo en NIC Argentina (si es .com.ar) o en un buscador de "whois" (si es .com) y mirá el titular y la **fecha de vencimiento**.
- **Hosting:** buscá en tu email facturas de Vercel, AWS, Hostinger, DonWeb o similares. Si nunca te llegó ninguna, la cuenta no es tuya.
- **Apps:** abrí tu app en la App Store y en Google Play y mirá el nombre del desarrollador que figura debajo del título.
- **Mercado Pago:** entrá a tu cuenta y buscá la sección de credenciales o de integraciones para ver qué aplicaciones están conectadas.

## Hora 4 a 12: proteger lo que sí es tuyo

Todo lo que esté a tu nombre, aseguralo **ahora**, mientras el sistema funciona:

1. **Cambiá las contraseñas** de las cuentas que son tuyas y activá la verificación en dos pasos.
2. **Revisá quién más tiene acceso** a cada cuenta y quitá los usuarios que no reconozcas o que ya no deberían estar. Si el programador sigue figurando en una cuenta tuya, decidí con calma si sacarlo ya o después de recuperar lo que falta: si todavía necesitás que te pase algo, cortarle el acceso de golpe puede trabar la conversación.
3. **Descargá todo lo que puedas desde tu panel:** listado de productos, clientes, pedidos, ventas. La mayoría de los paneles tiene un botón de exportar a Excel o CSV. Si el sistema se cae mañana, esa planilla es tu negocio.
4. **Anotá cuándo vence el dominio.** Si vence pronto y está a nombre de otro, es lo primero que hay que resolver: si nadie lo renueva, tu web y tu email dejan de funcionar.

## Hora 12 a 24: el pedido, por escrito

Ahora sí, escribile. No por audio de WhatsApp: por escrito, en un mensaje claro y sin agresión, que después puedas mostrar.

> Hola, [nombre]. Como no vamos a seguir trabajando juntos, necesito que me pases el acceso a lo siguiente: el código fuente del sistema, el dominio [dominio] a mi nombre, la cuenta de hosting, un backup de la base de datos y las cuentas donde están publicadas las apps. ¿Podemos coordinarlo esta semana? Si hay algo pendiente de pago entre nosotros, lo hablamos.

La última línea importa. Muchas veces la desaparición tiene detrás un pago pendiente o un malentendido, y ofrecer resolverlo destraba todo.

Si no hay respuesta en unos días, el paso siguiente en Argentina suele ser una **carta documento** con el mismo pedido. Para eso, y si hay un contrato de por medio, conviene que te asesore un abogado.

## Hora 24 a 48: el plan B

Mientras esperás, prepará la alternativa. Depende de qué te falte:

- **Si no tenés el código pero el sitio funciona:** un desarrollador nuevo puede evaluar si conviene rescatarlo o rehacerlo. A veces rehacer una tienda chica sale más barato que pelear por el código viejo.
- **Si la app está en la cuenta de Apple o Google del programador:** Apple y Google permiten transferir una app de una cuenta a otra, pero lo tiene que iniciar el dueño de la cuenta original. Si no colabora, la salida es publicar la app de nuevo en una cuenta tuya, como app nueva: se pierden las reseñas y los usuarios tienen que descargarla otra vez.
- **Si el dominio está a nombre de otro:** NIC Argentina tiene trámites de transferencia de titularidad y de reclamo. Sin la colaboración del titular es más lento, así que empezá cuanto antes.
- **Si el hosting es de él:** aunque no tengas el código, con la planilla de productos y clientes que exportaste podés volver a armar la tienda en otra plataforma en pocos días.

## Lo que no tenés que hacer

- **No amenaces por redes sociales.** Te cierra la puerta a una salida acordada y te puede traer problemas a vos.
- **No le pidas a "un conocido que sabe" que entre al servidor del programador.** Entrar a una cuenta ajena sin permiso es un delito, aunque el sistema sea tuyo.
- **No pagues a cualquiera que promete "recuperar todo en una hora".** Es la misma lógica de las estafas de recuperación de cuentas.

## Y para la próxima

Casi todo lo de este capítulo se evita con lo que vimos en el [capítulo 4](/blog/clausulas-contrato-programador): cuentas a tu nombre desde el primer día y una cláusula de salida que diga qué te llevás si cortan. Si estás en esta situación ahora, escribinos: hacemos un diagnóstico de qué tenés y qué falta, y te decimos el camino más corto, aunque no termine en contratarnos.

**Sigue en el capítulo 6:** [Autopsia de una app que nadie descargó](/blog/autopsia-app-que-nadie-descargo).
