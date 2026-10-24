/**
 * Local landing pages for the towns PotenciApp actually serves in person
 * from its Baradero office (zona norte of Buenos Aires province).
 *
 * Rules, so these never become doorway pages (Google spam policy: many
 * near-identical pages that only swap the city name):
 * - Only towns the team really travels to. Far cities are covered by the
 *   national page (/argentina), not by one page each.
 * - Every town gets its own angle (what local businesses there need), its
 *   own use cases and its own FAQ. Shared blocks (process, live projects)
 *   are the minority of each page.
 * - No invented facts: no client counts, no distances in km, no "clients in
 *   X" unless the founder confirms them.
 *
 * Spanish only: these towns are searched in Spanish.
 */

export type UseCase = { title: string; desc: string }
export type Faq = { q: string; a: string }

export type Zona = {
  slug: string
  name: string
  /** Partido the town belongs to, for schema and copy. */
  partido: string
  /** How to get there from Baradero, as a sentence fragment. */
  route: string
  /** One-line angle shown under the H1. */
  angle: string
  metaTitle: string
  metaDescription: string
  intro: string
  useCasesTitle: string
  useCases: UseCase[]
  faq: Faq[]
  /** Prefilled WhatsApp message. */
  waGreeting: string
}

export const ZONAS: Zona[] = [
  {
    slug: "san-pedro",
    name: "San Pedro",
    partido: "San Pedro",
    route: "por la Ruta 9, el partido vecino de Baradero hacia el norte",
    angle: "Turismo de río, producción frutícola y comercio local.",
    metaTitle: "Diseño web y software en San Pedro, Buenos Aires | PotenciApp",
    metaDescription:
      "Páginas web, tiendas online, reservas y sistemas para negocios de San Pedro. Estudio de Baradero, partido vecino: reunión en tu negocio, contrato, precio cerrado, factura y 2 años de garantía.",
    intro:
      "San Pedro vive del río, del turismo y de la producción frutícola, y buena parte de sus clientes llega desde afuera: gente que busca dónde alojarse, dónde comer o qué comprar antes de salir de casa. Si tu negocio no aparece en Google o no responde rápido por WhatsApp, esa venta se va al de al lado. Desde nuestra oficina en Baradero, el partido vecino, armamos la web, la tienda o el sistema que necesitás y nos juntamos en tu negocio para entenderlo.",
    useCasesTitle: "Lo que más nos piden en San Pedro",
    useCases: [
      {
        title: "Reservas para alojamiento y turismo",
        desc: "Cabañas, campings, guarderías náuticas y excursiones con disponibilidad en línea, seña con Mercado Pago y confirmación por WhatsApp, sin depender de una plataforma que te cobra comisión por cada reserva.",
      },
      {
        title: "Venta online de producción regional",
        desc: "Tienda con catálogo, pagos y envíos para productores y almacenes que venden fruta, dulces y conservas fuera de temporada o a clientes de otras ciudades.",
      },
      {
        title: "Web y Google para gastronomía y comercio",
        desc: "Menú siempre actualizado, horarios, ubicación y pedidos por WhatsApp, más la ficha de Google bien cargada para aparecer cuando el turista busca desde el celular.",
      },
    ],
    faq: [
      {
        q: "¿Vienen a San Pedro o tengo que ir a Baradero?",
        a: "Como prefieras. Vamos a tu negocio en San Pedro para el diagnóstico y las entregas, o te recibimos en nuestra oficina de Anchorena 1294, Baradero. Coordinamos día y hora por WhatsApp.",
      },
      {
        q: "Tengo cabañas: ¿me conviene un sistema de reservas propio?",
        a: "Si hoy recibís la mayoría de las reservas por portales que cobran comisión, una web con reservas propias te permite captar al cliente que vuelve y al que te encuentra en Google sin pagar ese porcentaje. Lo evaluamos con tus números en el diagnóstico, sin costo.",
      },
      {
        q: "¿Cuánto tarda una página web para un negocio de San Pedro?",
        a: "Depende del alcance. Una web de presentación con WhatsApp y Google lleva menos que una tienda o un sistema de reservas. Las fechas de cada etapa quedan escritas en el contrato antes de empezar.",
      },
    ],
    waGreeting: "Hola PotenciApp, tengo un negocio en San Pedro y quiero una propuesta.",
  },
  {
    slug: "zarate",
    name: "Zárate",
    partido: "Zárate",
    route: "por la Ruta 9, camino a Buenos Aires",
    angle: "Polo industrial y portuario, con proveedores y servicios que venden a empresas.",
    metaTitle: "Desarrollo de software y páginas web en Zárate | PotenciApp",
    metaDescription:
      "Sistemas a medida, webs industriales con cotizador y tiendas online para empresas y comercios de Zárate. Estudio de la zona norte: contrato, precio cerrado, factura y 2 años de garantía.",
    intro:
      "Zárate es uno de los polos industriales y portuarios de la provincia, y alrededor de las plantas y las terminales trabaja una red de proveedores, talleres, logística y servicios que le venden a otras empresas. En ese mundo la web no es una vidriera: es donde el comprador de una planta confirma que sos serio antes de pedirte una cotización. Hacemos sitios técnicos, cotizadores y sistemas internos para esas empresas, y también la web o la tienda del comercio de la ciudad.",
    useCasesTitle: "Lo que más nos piden en Zárate",
    useCases: [
      {
        title: "Web industrial con cotizador",
        desc: "Catálogo técnico de productos o servicios, fichas descargables y un formulario de cotización que llega ordenado, como el que hicimos para Gisbert Refrigeración.",
      },
      {
        title: "Sistemas internos a medida",
        desc: "Órdenes de trabajo, mantenimiento, stock de repuestos o turnos de taller en un sistema propio con usuarios y permisos, en lugar de planillas sueltas.",
      },
      {
        title: "Presencia seria para proveedores",
        desc: "Sitio institucional rápido, con datos fiscales visibles, certificaciones y referencias, que es lo primero que revisa un área de compras antes de darte de alta.",
      },
    ],
    faq: [
      {
        q: "¿Trabajan con empresas industriales o solo con comercios?",
        a: "Con los dos. Para empresas hacemos sistemas internos, cotizadores y sitios técnicos; para comercios, webs y tiendas online. Todo con contrato, precio cerrado y factura por cada pago.",
      },
      {
        q: "¿Pueden integrar el sistema con lo que ya usamos?",
        a: "En la mayoría de los casos sí: planillas, sistemas de facturación, WhatsApp o APIs de terceros. Lo confirmamos en el diagnóstico, antes de cotizar, para que el alcance quede escrito.",
      },
      {
        q: "¿Se reúnen en Zárate?",
        a: "Sí. Coordinamos reuniones en tu empresa en Zárate o en nuestra oficina de Baradero, y el seguimiento del día a día lo hacemos por WhatsApp y videollamada.",
      },
    ],
    waGreeting: "Hola PotenciApp, escribo desde Zárate y quiero una propuesta.",
  },
  {
    slug: "campana",
    name: "Campana",
    partido: "Campana",
    route: "por la Ruta 9, pasando Zárate",
    angle: "Industria siderúrgica y petroquímica, contratistas y un comercio que crece con ellas.",
    metaTitle: "Páginas web, sistemas y apps en Campana | PotenciApp",
    metaDescription:
      "Webs, sistemas de gestión y apps para contratistas, pymes y comercios de Campana. Estudio de la zona norte con oficina en Baradero: contrato, precio cerrado, factura y 2 años de garantía.",
    intro:
      "En Campana conviven grandes plantas siderúrgicas y petroquímicas con cientos de contratistas, pymes de servicios y comercios que crecen a su alrededor. Muchas de esas empresas siguen gestionando personal, órdenes y stock en planillas, y presentándose con una web vieja o sin web. Construimos el sistema que ordena la operación y el sitio que te representa bien frente a un cliente grande, con alguien de la zona que se sienta con vos a entenderlo.",
    useCasesTitle: "Lo que más nos piden en Campana",
    useCases: [
      {
        title: "Gestión para contratistas",
        desc: "Control de personal, partes diarios, órdenes de trabajo y documentación en un sistema propio al que tu equipo entra desde el celular.",
      },
      {
        title: "App móvil para tu operación",
        desc: "Una app para iOS y Android para que el personal en planta cargue datos, fotos y firmas sin papeles, publicada con cuentas verificadas.",
      },
      {
        title: "Web y tienda para el comercio local",
        desc: "Página con WhatsApp y Google, o tienda online con Mercado Pago y envíos, para comercios que quieren vender también fuera del horario del local.",
      },
    ],
    faq: [
      {
        q: "¿Hacen apps para el personal que trabaja en planta?",
        a: "Sí. Desarrollamos apps para iOS y Android y las publicamos en App Store y Google Play, o como aplicación web si no hace falta estar en las tiendas. Lo definimos según cómo trabaja tu equipo.",
      },
      {
        q: "¿Qué pasa si después quiero cambiar de proveedor?",
        a: "Al completar el pago el código es tuyo y las cuentas, el dominio y el hosting quedan a tu nombre. Podés seguir con nosotros o llevarlo a otro proveedor sin pedir permiso.",
      },
      {
        q: "¿Atienden en Campana?",
        a: "Sí. Nos reunimos en tu empresa en Campana o en nuestra oficina de Baradero, y el seguimiento lo hacemos por WhatsApp y videollamada.",
      },
    ],
    waGreeting: "Hola PotenciApp, escribo desde Campana y quiero una propuesta.",
  },
  {
    slug: "san-antonio-de-areco",
    name: "San Antonio de Areco",
    partido: "San Antonio de Areco",
    route: "por la Ruta Provincial 41",
    angle: "Turismo tradicionalista, artesanos y plateros, gastronomía y hospedaje.",
    metaTitle: "Diseño web y tiendas online en San Antonio de Areco | PotenciApp",
    metaDescription:
      "Tiendas online para artesanos y plateros, webs con reservas para hospedaje y gastronomía de San Antonio de Areco. Estudio con oficina en Baradero: contrato, precio cerrado y 2 años de garantía.",
    intro:
      "San Antonio de Areco es un destino turístico conocido por su tradición, sus plateros y artesanos, y su oferta de estancias, hospedaje y gastronomía. El visitante descubre la ciudad en persona, pero después quiere volver a comprar desde su casa, y el turista nuevo decide dónde dormir y comer desde el celular. Hacemos la tienda que te permite vender a todo el país y la web que convierte esa búsqueda en una reserva.",
    useCasesTitle: "Lo que más nos piden en San Antonio de Areco",
    useCases: [
      {
        title: "Tienda online para artesanos y plateros",
        desc: "Catálogo con buenas fotos, pagos con Mercado Pago y envíos a todo el país, para que el cliente que te conoció en el taller pueda volver a comprarte desde donde esté.",
      },
      {
        title: "Reservas para estancias y hospedaje",
        desc: "Disponibilidad, seña y confirmación en tu propia web, sin pagar comisión por cada reserva a un portal.",
      },
      {
        title: "Web en varios idiomas",
        desc: "Para negocios que reciben turismo extranjero: la misma web en español, inglés y portugués, como la nuestra.",
      },
    ],
    faq: [
      {
        q: "Vendo piezas únicas: ¿sirve una tienda online?",
        a: "Sí. Se puede publicar cada pieza con su stock de una unidad, o mostrarla como encargo con seña. La tienda se arma a medida o en Tiendanube o Empretienda, según lo que te convenga administrar.",
      },
      {
        q: "¿Pueden hacer la web en inglés para turistas extranjeros?",
        a: "Sí. Hacemos sitios en varios idiomas; el nuestro está en español, inglés, portugués y francés. El alcance de idiomas queda definido en la propuesta.",
      },
      {
        q: "¿Se reúnen en San Antonio de Areco?",
        a: "Sí. Vamos a tu negocio en Areco o te recibimos en nuestra oficina de Baradero, y coordinamos todo por WhatsApp.",
      },
    ],
    waGreeting: "Hola PotenciApp, tengo un negocio en San Antonio de Areco y quiero una propuesta.",
  },
  {
    slug: "ramallo",
    name: "Ramallo",
    partido: "Ramallo",
    route: "por la Ruta 9, pasando San Pedro",
    angle: "Agro, industria y comercio entre San Pedro y San Nicolás.",
    metaTitle: "Páginas web y sistemas en Ramallo y Villa Ramallo | PotenciApp",
    metaDescription:
      "Webs, tiendas online y sistemas de gestión para comercios, agro y pymes de Ramallo y Villa Ramallo. Estudio de la zona norte: contrato, precio cerrado, factura y 2 años de garantía.",
    intro:
      "El partido de Ramallo combina producción agropecuaria, industria y un comercio que atiende a toda la zona entre San Pedro y San Nicolás. Muchos negocios ya venden por WhatsApp e Instagram pero sin orden: pedidos que se pierden, stock que no cierra y clientes que no te encuentran en Google. Te ayudamos a pasar a una web, una tienda o un sistema propio, con un equipo de la zona que va a tu negocio.",
    useCasesTitle: "Lo que más nos piden en Ramallo",
    useCases: [
      {
        title: "Pedidos y stock ordenados",
        desc: "Un sistema simple para cargar pedidos, controlar stock y ver qué se vendió, conectado con WhatsApp para avisar al cliente.",
      },
      {
        title: "Catálogo para agro y corralones",
        desc: "Productos, precios y consultas por WhatsApp en una web rápida, para que el cliente pregunte con el producto elegido y no por foto.",
      },
      {
        title: "Venta en Mercado Libre y tienda propia",
        desc: "Publicaciones optimizadas en Mercado Libre y, cuando conviene, una tienda propia para no depender solo de la comisión del marketplace.",
      },
    ],
    faq: [
      {
        q: "¿Atienden en Ramallo y Villa Ramallo?",
        a: "Sí. Coordinamos reuniones en tu negocio o en nuestra oficina de Baradero, y el seguimiento lo hacemos por WhatsApp y videollamada.",
      },
      {
        q: "Ya vendo en Mercado Libre, ¿me sirve una tienda propia?",
        a: "Suelen complementarse: Mercado Libre trae volumen y la tienda propia te deja vender a tus clientes recurrentes sin comisión. Te mostramos los números en el diagnóstico antes de recomendarte una u otra.",
      },
      {
        q: "¿Puedo empezar con algo chico y crecer después?",
        a: "Sí. Muchas veces conviene una primera etapa acotada y sumar funciones después. Cada etapa tiene su propio alcance, fecha y precio en el contrato.",
      },
    ],
    waGreeting: "Hola PotenciApp, tengo un negocio en Ramallo y quiero una propuesta.",
  },
]

export const ZONAS_PATH = "/zonas"
export const ARGENTINA_PATH = "/argentina"

export function zonaPath(slug: string) {
  return `${ZONAS_PATH}/${slug}`
}

export function getZona(slug: string) {
  return ZONAS.find((z) => z.slug === slug) ?? null
}
