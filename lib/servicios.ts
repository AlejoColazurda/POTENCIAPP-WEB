import type { ProjectKey } from "@/lib/projects"

/**
 * National service pages (/servicios/[slug]), Spanish only: one page per
 * service for all of Argentina, never one per service × town (that would be
 * the doorway pattern the zonas pages avoid).
 *
 * Copy rules: only claims the home page already makes or the founder has
 * confirmed. No prices, no delivery times in days, no partner badges (ad
 * accounts are "verificadas", not Meta/Google Partner), no client counts.
 */

export type Item = { title: string; desc: string }
export type Faq = { q: string; a: string }

export type Servicio = {
  slug: string
  /** Short name for chips and nav. */
  name: string
  /** schema.org serviceType. */
  serviceType: string
  metaTitle: string
  metaDescription: string
  h1: string
  accent: string
  intro: string
  includes: Item[]
  forWho: Item[]
  /** Live portfolio projects that show this service. */
  projects: ProjectKey[]
  faq: Faq[]
  waGreeting: string
  /** Whether the 2-year written warranty applies (software deliverables). */
  warranty: boolean
}

export const SERVICIOS: Servicio[] = [
  {
    slug: "paginas-web",
    name: "Páginas web",
    serviceType: "Diseño y desarrollo de páginas web",
    metaTitle: "Diseño de páginas web en Argentina, a medida | PotenciApp",
    metaDescription:
      "Páginas web a medida o renovación de tu sitio actual (WordPress, Wix): diseño, velocidad, SEO, textos y WhatsApp. Contrato, precio cerrado, factura, dominio a tu nombre y 2 años de garantía.",
    h1: "Páginas web que te consiguen clientes.",
    accent: "No solo una tarjeta de presentación.",
    intro:
      "Diseñamos tu sitio desde cero o renovamos el que ya tenés, esté en WordPress, Wix o hecho a medida. Una buena web carga rápido en el celular, aparece en Google cuando te buscan, explica en segundos qué hacés y lleva a un WhatsApp o a un formulario. Todo lo demás es decoración.",
    includes: [
      { title: "Diseño a medida", desc: "Pensado para tu negocio y tu cliente, no una plantilla con tu logo encima." },
      { title: "Velocidad y celular primero", desc: "La mayoría de tus visitas llega desde el teléfono: diseñamos para esa pantalla primero." },
      { title: "SEO desde la base", desc: "Estructura, títulos, datos estructurados y ficha de Google conectada para que te encuentren." },
      { title: "Textos y contacto directo", desc: "Te ayudamos con los textos y dejamos WhatsApp, formulario y agenda a un toque." },
      { title: "Dominio y accesos a tu nombre", desc: "El dominio, el hosting y el código quedan a tu nombre al completar el pago." },
    ],
    forWho: [
      { title: "Comercios y servicios locales", desc: "Que necesitan aparecer en Google y recibir consultas por WhatsApp." },
      { title: "Empresas que venden a empresas", desc: "Que necesitan un sitio serio, con catálogo o cotizador, para pasar el filtro de un área de compras." },
      { title: "Negocios con una web vieja", desc: "Que tienen un sitio lento, desactualizado o que no pueden editar." },
    ],
    projects: ["castro", "gisbert", "entrecanes"],
    faq: [
      {
        q: "¿Cuánto cuesta una página web?",
        a: "Depende del alcance: no es lo mismo una web de presentación que un sitio con catálogo, cotizador o varios idiomas. El diagnóstico es sin costo y la propuesta llega por escrito con precio cerrado, que no cambia durante el proyecto.",
      },
      {
        q: "¿Pueden renovar mi web actual en WordPress o Wix?",
        a: "Sí. Podemos mejorarla en la misma plataforma o rehacerla a medida. Te explicamos qué conviene en tu caso antes de cotizar.",
      },
      {
        q: "¿Voy a poder modificar la web yo mismo?",
        a: "Si lo necesitás, sí: incluimos un panel para editar textos, imágenes o productos y te capacitamos al entregar. Queda definido en la propuesta.",
      },
      {
        q: "¿Trabajan con clientes de cualquier provincia?",
        a: "Sí. Trabajamos a distancia con todo el país por WhatsApp y videollamada, y en persona en Baradero y la zona norte de Buenos Aires.",
      },
    ],
    waGreeting: "Hola PotenciApp, quiero una propuesta para una página web.",
    warranty: true,
  },
  {
    slug: "tiendas-online",
    name: "Tiendas online",
    serviceType: "Desarrollo de tiendas online y e-commerce",
    metaTitle: "Tiendas online a medida, Tiendanube y Empretienda | PotenciApp",
    metaDescription:
      "Tiendas online a medida o en Tiendanube, Empretienda, Shopify y WooCommerce: catálogo, Mercado Pago, envíos y dominio propio. Contrato, precio cerrado, factura y 2 años de garantía.",
    h1: "Tiendas online que venden mientras dormís.",
    accent: "A medida o en la plataforma que ya usás.",
    intro:
      "Desarrollamos tu tienda desde cero, sin límites de plataforma ni comisiones por venta del proveedor, o la armamos en Tiendanube, Empretienda, Shopify o WooCommerce si te conviene administrarla ahí. En los dos casos: catálogo claro, cobro con Mercado Pago, envíos configurados y un checkout que no hace perder ventas.",
    includes: [
      { title: "Catálogo y stock", desc: "Productos, variantes, fotos y stock que podés administrar vos." },
      { title: "Mercado Pago y envíos", desc: "Cobro con tarjeta, transferencia y efectivo, y envíos o retiro configurados." },
      { title: "Checkout que convierte", desc: "Menos pasos, carga rápida en el celular y aviso por WhatsApp de cada pedido." },
      { title: "Plataforma a elección", desc: "A medida, o Tiendanube, Empretienda, Shopify y WooCommerce. Te decimos cuál conviene y por qué." },
      { title: "Medición de ventas", desc: "Eventos de compra conectados para saber qué vende y de dónde vienen los clientes." },
    ],
    forWho: [
      { title: "Comercios que ya venden por Instagram o WhatsApp", desc: "Y quieren ordenar pedidos y cobrar sin intercambiar diez mensajes." },
      { title: "Marcas de indumentaria, deco y regionales", desc: "Que necesitan buenas fotos, talles y variantes, y envíos a todo el país." },
      { title: "Negocios con local físico", desc: "Que quieren vender también fuera del horario del local." },
    ],
    projects: ["maxikiosco", "lachola", "newbaby", "mistersandwich"],
    faq: [
      {
        q: "¿Me conviene una tienda a medida o Tiendanube?",
        a: "Tiendanube o Empretienda son rápidas de lanzar y fáciles de administrar; una tienda a medida no tiene límites de diseño ni de funciones y no depende del plan de una plataforma. Lo definimos con tu volumen y tus necesidades en el diagnóstico.",
      },
      {
        q: "¿La tienda funciona con Mercado Pago?",
        a: "Sí. Integramos Mercado Pago para tarjetas, transferencia y efectivo, y configuramos envíos o retiro en el local.",
      },
      {
        q: "¿Puedo ver tiendas que hayan hecho?",
        a: "Sí. Maxikiosco 24/7, La Chola, New Baby y Mister Sandwich están en vivo y vendiendo. Podés abrirlas y comprar como cualquier cliente.",
      },
      {
        q: "¿También pueden publicar mis productos en Mercado Libre?",
        a: "Sí. Armamos y ordenamos la cuenta de vendedor y optimizamos las publicaciones, y si conviene sincronizamos stock con tu tienda.",
      },
    ],
    waGreeting: "Hola PotenciApp, quiero una propuesta para una tienda online.",
    warranty: true,
  },
  {
    slug: "sistemas-a-medida",
    name: "Sistemas a medida",
    serviceType: "Desarrollo de software y sistemas de gestión a medida",
    metaTitle: "Sistemas de gestión y software a medida en Argentina | PotenciApp",
    metaDescription:
      "ERPs, CRMs, puntos de venta, turnos y dashboards a medida para pymes y empresas. Reemplazá planillas por un sistema propio. Contrato, precio cerrado, factura, código tuyo y 2 años de garantía.",
    h1: "Un sistema hecho para tu operación.",
    accent: "No tu operación adaptada a un sistema.",
    intro:
      "Cuando el negocio crece, las planillas, los cuadernos y los cinco servicios que no se hablan entre sí empiezan a costar plata. Desarrollamos el sistema que tu empresa necesita, desde cero: ventas, stock, órdenes de trabajo, turnos, clientes o reportes, con usuarios y permisos, y conectado con lo que ya usás.",
    includes: [
      { title: "Relevamiento de tu proceso", desc: "Antes de escribir código entendemos cómo trabajás y qué duele." },
      { title: "Usuarios, roles y permisos", desc: "Cada persona ve y hace solo lo que le corresponde." },
      { title: "Integraciones", desc: "Con planillas, facturación, Mercado Pago, WhatsApp o APIs de terceros." },
      { title: "Web y celular", desc: "Funciona en la computadora y en el teléfono, y si hace falta, como app instalable." },
      { title: "Código y datos tuyos", desc: "Al completar el pago el código es tuyo y los datos quedan en cuentas a tu nombre." },
    ],
    forWho: [
      { title: "Pymes que viven en planillas", desc: "Y pierden tiempo copiando datos de un lado a otro." },
      { title: "Empresas con procesos propios", desc: "Que ningún software enlatado resuelve sin parches." },
      { title: "Comercios con varias sucursales o vendedores", desc: "Que necesitan stock, caja y ventas en un solo lugar." },
    ],
    projects: ["losincreibles", "gisbert"],
    faq: [
      {
        q: "¿Por qué un sistema a medida y no uno enlatado?",
        a: "Si un software existente resuelve tu proceso, te lo vamos a decir. El sistema a medida conviene cuando tu forma de trabajar es tu ventaja, o cuando estás pagando varias suscripciones y parches para lograr algo que un sistema propio hace solo.",
      },
      {
        q: "¿Qué pasa con mis datos?",
        a: "Quedan en servidores y cuentas a tu nombre. Configuramos backups y accesos, y si algún día querés llevarte el sistema a otro proveedor, podés.",
      },
      {
        q: "¿Se puede hacer por etapas?",
        a: "Sí, y suele ser lo mejor: una primera etapa con lo esencial funcionando y después se suman módulos. Cada etapa tiene alcance, fecha y precio propios en el contrato.",
      },
    ],
    waGreeting: "Hola PotenciApp, quiero una propuesta para un sistema a medida.",
    warranty: true,
  },
  {
    slug: "apps-moviles",
    name: "Apps para iOS y Android",
    serviceType: "Desarrollo de aplicaciones móviles",
    metaTitle: "Desarrollo de apps para iOS y Android en Argentina | PotenciApp",
    metaDescription:
      "Apps móviles y web apps a medida, publicadas en App Store y Google Play con cuentas verificadas. Contrato, precio cerrado, factura, código tuyo y 2 años de garantía por escrito.",
    h1: "Tu app en App Store y Google Play.",
    accent: "Nosotros nos ocupamos de la publicación.",
    intro:
      "Desarrollamos apps para iOS y Android y web apps instalables, pensadas para tu operación real: clientes que piden y pagan, personal que carga datos en la calle o en planta, socios que reservan. Nos ocupamos también de la parte que más traba: las cuentas de desarrollador, la revisión de las tiendas y las publicaciones de cada versión.",
    includes: [
      { title: "iOS y Android con un solo código", desc: "Menos costo y mantenimiento que dos apps separadas." },
      { title: "Publicación en las tiendas", desc: "Apple Developer Program y Google Play Console a tu nombre o al nuestro, con la revisión gestionada por nosotros." },
      { title: "Web app cuando alcanza", desc: "Si no necesitás estar en las tiendas, una app web instalable es más rápida y barata." },
      { title: "Panel de administración", desc: "Para gestionar usuarios, contenidos y pedidos desde la computadora." },
      { title: "Notificaciones y pagos", desc: "Avisos push, Mercado Pago y login con cuentas existentes cuando hace falta." },
    ],
    forWho: [
      { title: "Comercios con clientes recurrentes", desc: "Que quieren que pidan y paguen desde el celular." },
      { title: "Empresas con personal en la calle", desc: "Que cargan datos, fotos y firmas sin papel." },
      { title: "Emprendedores con una idea de producto", desc: "Que necesitan una primera versión funcionando para validar." },
    ],
    projects: ["maxikiosco", "losincreibles"],
    faq: [
      {
        q: "¿La app queda a mi nombre en las tiendas?",
        a: "Puede publicarse con tu cuenta de desarrollador o con la nuestra; lo definimos en la propuesta. En cualquier caso el código es tuyo al completar el pago.",
      },
      {
        q: "¿Necesito sí o sí estar en App Store y Google Play?",
        a: "No siempre. Una app web instalable funciona en cualquier celular sin pasar por las tiendas y cuesta menos. Te recomendamos la opción que tenga sentido para tu caso.",
      },
      {
        q: "¿Quién se encarga de las actualizaciones?",
        a: "Durante la garantía corregimos sin cargo cualquier falla de lo entregado. Las funciones nuevas y el mantenimiento continuo se cotizan aparte, y son opcionales.",
      },
    ],
    waGreeting: "Hola PotenciApp, quiero una propuesta para una app.",
    warranty: true,
  },
  {
    slug: "marketing-digital",
    name: "Meta Ads y Google Ads",
    serviceType: "Gestión de publicidad digital en Meta Ads, Google Ads y Mercado Libre Ads",
    metaTitle: "Agencia de Meta Ads y Google Ads en Argentina | PotenciApp",
    metaDescription:
      "Gestión de anuncios en Meta Ads (Facebook e Instagram), Google Ads y Mercado Libre Ads desde cuentas publicitarias verificadas. Medición de conversiones y reportes claros de cada peso invertido.",
    h1: "Anuncios que venden, medidos peso por peso.",
    accent: "Meta Ads, Google Ads y Mercado Libre Ads.",
    intro:
      "Gestionamos tus campañas en Meta Ads (Facebook e Instagram), Google Ads y Mercado Libre Ads desde cuentas publicitarias verificadas. La diferencia es que también hacemos la web y la tienda: medimos la venta real, no solo los clics, y si el problema está en la página y no en el anuncio, lo podemos arreglar.",
    includes: [
      { title: "Estrategia y estructura", desc: "Objetivos, públicos y presupuesto definidos con tus números, antes de gastar." },
      { title: "Medición de conversiones", desc: "Píxel, API de conversiones y eventos de compra configurados para saber qué vende." },
      { title: "Creatividades y textos", desc: "Anuncios pensados para cada plataforma y probados con variantes." },
      { title: "Gestión mensual", desc: "Optimización continua, con ajustes de presupuesto según resultados." },
      { title: "Reportes claros", desc: "Cuánto invertiste, cuánto vendiste y qué vamos a cambiar, en lenguaje simple." },
    ],
    forWho: [
      { title: "Tiendas online", desc: "Que quieren más ventas con la misma inversión, medida hasta la compra." },
      { title: "Negocios de servicios", desc: "Que necesitan consultas por WhatsApp de gente de su zona." },
      { title: "Vendedores de Mercado Libre", desc: "Que quieren escalar con Mercado Libre Ads sin quemar margen." },
    ],
    projects: [],
    faq: [
      {
        q: "¿La inversión en anuncios está incluida en el precio?",
        a: "No. El presupuesto de anuncios lo pagás directamente a Meta, Google o Mercado Libre desde tu cuenta; nosotros cobramos la gestión. Así siempre ves en qué se gasta cada peso.",
      },
      {
        q: "¿Las cuentas publicitarias quedan a mi nombre?",
        a: "Sí. Trabajamos sobre cuentas a nombre de tu negocio, con acceso nuestro como administradores. Si dejamos de trabajar juntos, todo queda en tu cuenta.",
      },
      {
        q: "¿Pueden prometer un resultado?",
        a: "No prometemos ventas: nadie puede hacerlo honestamente. Lo que sí garantizamos es medición correcta, gestión activa y reportes claros para decidir con datos.",
      },
    ],
    waGreeting: "Hola PotenciApp, quiero una propuesta para anuncios en Meta Ads o Google Ads.",
    warranty: false,
  },
  {
    slug: "mercado-libre",
    name: "Mercado Libre",
    serviceType: "Gestión de cuentas de vendedor y publicaciones en Mercado Libre",
    metaTitle: "Gestión de Mercado Libre para vendedores y marcas | PotenciApp",
    metaDescription:
      "Armamos y ordenamos tu cuenta de vendedor en Mercado Libre, optimizamos publicaciones y gestionamos Mercado Libre Ads. Integración con tu tienda propia y tu stock.",
    h1: "Vendé más en Mercado Libre.",
    accent: "Con publicaciones y campañas bien hechas.",
    intro:
      "Mercado Libre es donde busca la mayoría de los compradores en Argentina, pero competir ahí exige publicaciones bien armadas, precios y envíos competitivos, reputación cuidada y campañas que no se coman el margen. Armamos y ordenamos tu cuenta de vendedor, optimizamos las publicaciones y gestionamos Mercado Libre Ads.",
    includes: [
      { title: "Cuenta de vendedor", desc: "Configuración, datos fiscales, envíos y políticas en orden." },
      { title: "Publicaciones optimizadas", desc: "Títulos, fichas técnicas, fotos y variantes pensadas para el buscador de Mercado Libre." },
      { title: "Mercado Libre Ads", desc: "Campañas de producto con presupuesto controlado y seguimiento de rentabilidad." },
      { title: "Reputación", desc: "Procesos para responder preguntas, despachar a tiempo y cuidar las calificaciones." },
      { title: "Integración con tu tienda", desc: "Stock y pedidos sincronizados con tu tienda propia cuando conviene." },
    ],
    forWho: [
      { title: "Comercios que empiezan a vender online", desc: "Y quieren aprovechar el tráfico que ya tiene Mercado Libre." },
      { title: "Vendedores estancados", desc: "Con publicaciones que no aparecen o campañas que no rinden." },
      { title: "Marcas con tienda propia", desc: "Que quieren sumar Mercado Libre sin desordenar el stock." },
    ],
    projects: [],
    faq: [
      {
        q: "¿Mercado Libre o tienda propia?",
        a: "Suelen complementarse: Mercado Libre trae volumen y la tienda propia te deja vender sin comisión a tus clientes recurrentes. Te mostramos los números antes de recomendar.",
      },
      {
        q: "¿Pueden publicar y responder por mí?",
        a: "Armamos y optimizamos las publicaciones y dejamos procesos y respuestas tipo para tu equipo. La operación diaria, como responder y despachar, la definimos según lo que necesites.",
      },
      {
        q: "¿Cómo cobran?",
        a: "La puesta en marcha tiene precio cerrado y la gestión de Mercado Libre Ads es mensual. La inversión en anuncios la pagás directo a Mercado Libre.",
      },
    ],
    waGreeting: "Hola PotenciApp, quiero vender más en Mercado Libre.",
    warranty: false,
  },
  {
    slug: "ia-y-automatizaciones",
    name: "IA y automatizaciones",
    serviceType: "Inteligencia artificial aplicada y automatización de procesos",
    metaTitle: "IA aplicada y automatización de procesos para empresas | PotenciApp",
    metaDescription:
      "Asistentes con IA para atención y ventas, y automatizaciones que conectan lo que ya usás (WhatsApp, planillas, CRM, e-commerce). Para pymes y empresas de Argentina.",
    h1: "IA y automatizaciones que ahorran horas reales.",
    accent: "Sin cambiar todo lo que ya usás.",
    intro:
      "La inteligencia artificial sirve cuando resuelve una tarea concreta: responder consultas frecuentes, calificar clientes, resumir documentos, cargar datos. Diseñamos asistentes y automatizaciones que se conectan con tus herramientas actuales, como WhatsApp, planillas, tu CRM o tu tienda, para que el equipo deje de hacer a mano lo que una máquina hace mejor.",
    includes: [
      { title: "Asistentes de atención y ventas", desc: "Responden consultas frecuentes y derivan a una persona cuando hace falta. El de nuestro sitio es un ejemplo." },
      { title: "Automatización de procesos", desc: "Flujos que conectan formularios, planillas, correo, WhatsApp y sistemas." },
      { title: "Procesamiento de documentos", desc: "Extraer datos de facturas, remitos o pedidos y cargarlos donde corresponde." },
      { title: "Reportes automáticos", desc: "El resumen semanal de ventas o stock, sin que nadie lo arme a mano." },
      { title: "Privacidad primero", desc: "Definimos qué datos ve la IA y cuáles nunca salen de tus sistemas." },
    ],
    forWho: [
      { title: "Negocios con muchas consultas repetidas", desc: "Que saturan el WhatsApp con las mismas preguntas." },
      { title: "Equipos administrativos", desc: "Que copian datos entre sistemas todos los días." },
      { title: "Empresas que quieren empezar con IA", desc: "Con un caso concreto y medible, no con una promesa." },
    ],
    projects: [],
    faq: [
      {
        q: "¿La IA va a responder cualquier cosa a mis clientes?",
        a: "No. La configuramos para responder solo sobre tu negocio, con límites claros, y para derivar a una persona cuando la consulta lo requiere.",
      },
      {
        q: "¿Qué pasa con la privacidad de los datos?",
        a: "Definimos con vos qué información puede procesar el modelo y cuál no, y lo informamos en tu política de privacidad, como hacemos en nuestro propio sitio.",
      },
      {
        q: "¿Por dónde conviene empezar?",
        a: "Por la tarea más repetitiva y medible. Una primera automatización acotada muestra el ahorro real antes de invertir en algo más grande.",
      },
    ],
    waGreeting: "Hola PotenciApp, quiero automatizar procesos con IA.",
    warranty: true,
  },
  {
    slug: "ciberseguridad",
    name: "Ciberseguridad",
    serviceType: "Ciberseguridad y auditorías para pymes y comercios",
    metaTitle: "Ciberseguridad para pymes y comercios en Argentina | PotenciApp",
    metaDescription:
      "Auditorías de seguridad, hardening, backups, certificados SSL y protección de accesos para webs, tiendas y sistemas de pymes y comercios.",
    h1: "Ciberseguridad para negocios que no tienen un área de sistemas.",
    accent: "Antes de que pase algo.",
    intro:
      "Un ataque a una pyme rara vez es sofisticado: una contraseña repetida, un plugin sin actualizar, un backup que no existía. Auditamos lo que tenés online, cerramos los agujeros más probables y dejamos backups y accesos en orden, explicado en lenguaje simple para que sepas qué se hizo y por qué.",
    includes: [
      { title: "Auditoría", desc: "Revisión de tu web, tienda, servidores y accesos, con un informe priorizado." },
      { title: "Hardening", desc: "Configuración segura de servidores, paneles y aplicaciones." },
      { title: "Accesos y contraseñas", desc: "Doble factor, usuarios con permisos mínimos y bajas de ex empleados." },
      { title: "Backups probados", desc: "Copias automáticas y una restauración de prueba para saber que funcionan." },
      { title: "Certificados y correo", desc: "SSL, SPF, DKIM y DMARC para que tu dominio no se use para estafas." },
    ],
    forWho: [
      { title: "Comercios con tienda online", desc: "Que manejan datos de clientes y pagos." },
      { title: "Pymes sin área de sistemas", desc: "Que dependen de un sobrino o de un proveedor que ya no responde." },
      { title: "Empresas que sufrieron un incidente", desc: "Y necesitan ordenar todo para que no se repita." },
    ],
    projects: [],
    faq: [
      {
        q: "¿Mi negocio es demasiado chico para que lo ataquen?",
        a: "La mayoría de los ataques son automáticos y no eligen víctima: buscan cualquier sistema vulnerable. Por eso los negocios chicos son blanco frecuente.",
      },
      {
        q: "¿Qué recibo después de la auditoría?",
        a: "Un informe con los problemas ordenados por riesgo y qué hacer con cada uno. Podés resolverlos con tu equipo o encargárnoslo a nosotros.",
      },
      {
        q: "¿Escriben sobre esto en algún lado?",
        a: "Sí. En nuestro blog publicamos guías de ciberseguridad para comercios, en lenguaje simple.",
      },
    ],
    waGreeting: "Hola PotenciApp, quiero revisar la seguridad de mi negocio.",
    warranty: false,
  },
  {
    slug: "infraestructura-cloud",
    name: "Infraestructura y cloud",
    serviceType: "Infraestructura, servidores y cloud",
    metaTitle: "Servidores, cloud, Docker y AWS para empresas | PotenciApp",
    metaDescription:
      "Arquitectura de software, servidores VPS, AWS, Docker, redes, CI/CD, monitoreo y mantenimiento. Montamos y mantenemos tu infraestructura o convivimos con tu proveedor actual.",
    h1: "Infraestructura que no se cae un viernes a la noche.",
    accent: "Montada, monitoreada y mantenida.",
    intro:
      "Diseñamos y mantenemos la infraestructura donde corren tus sistemas: servidores, contenedores, bases de datos, redes y despliegues automáticos. Podemos hacernos cargo de todo o trabajar junto a tu proveedor actual, con documentación para que nunca dependas de una sola persona.",
    includes: [
      { title: "Arquitectura", desc: "Qué va dónde, cuánto cuesta y cómo crece, antes de contratar servidores." },
      { title: "Servidores y cloud", desc: "VPS, AWS y Docker configurados con buenas prácticas de seguridad." },
      { title: "Despliegues automáticos", desc: "CI/CD para publicar cambios sin cortes ni pasos manuales." },
      { title: "Monitoreo y alertas", desc: "Saber que algo falla antes de que te avise un cliente." },
      { title: "Mantenimiento y documentación", desc: "Actualizaciones, backups y todo documentado a tu nombre." },
    ],
    forWho: [
      { title: "Empresas con sistemas propios", desc: "Que necesitan dónde correrlos de forma confiable." },
      { title: "Negocios que pagan de más en la nube", desc: "Y quieren ordenar costos sin perder estabilidad." },
      { title: "Equipos sin especialista en infraestructura", desc: "Que hoy dependen de una persona para todo." },
    ],
    projects: [],
    faq: [
      {
        q: "¿Pueden trabajar con mi proveedor de hosting actual?",
        a: "Sí. Podemos convivir con tu proveedor, migrar solo una parte o hacernos cargo de toda la infraestructura. Lo definimos según tu situación.",
      },
      {
        q: "¿Las cuentas de AWS o del servidor quedan a mi nombre?",
        a: "Sí. Las cuentas y la facturación de la nube quedan a nombre de tu empresa, con acceso nuestro para administrarlas.",
      },
      {
        q: "¿Ofrecen mantenimiento mensual?",
        a: "Sí, como servicio opcional con alcance definido por escrito: monitoreo, actualizaciones, backups y soporte ante incidentes.",
      },
    ],
    waGreeting: "Hola PotenciApp, quiero una propuesta de infraestructura y servidores.",
    warranty: false,
  },
]

export const SERVICIOS_PATH = "/servicios"

export function servicioPath(slug: string) {
  return `${SERVICIOS_PATH}/${slug}`
}

export function getServicio(slug: string) {
  return SERVICIOS.find((s) => s.slug === slug) ?? null
}
