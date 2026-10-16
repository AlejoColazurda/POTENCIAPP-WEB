# Panel de administración del blog: puesta en marcha

El panel vive en `https://www.potenciapp.com/admin`. Hasta completar estos pasos, el sitio sigue funcionando igual: el blog muestra los artículos de `content/blog/` y `/admin` avisa que falta configurar.

## Cómo se entra

Sin contraseña. En `/admin/login` se escribe el email y llega un **link de un solo uso** que vence en 1 hora. Al abrirlo hay que apretar **Entrar** (así los antivirus del correo, que abren los links solos, no lo gastan).

Solo reciben link:

- **Dueños**: los emails de la variable `ADMIN_EMAILS`. Siempre tienen acceso y no se pueden quitar desde el panel.
- **Editores** (o dueños extra) que un dueño invita desde **Equipo** (`/admin/equipo`).

Si alguien que no tiene acceso pide un link, la pantalla dice lo mismo que a todos, pero no se envía nada.

| Puede | Dueño | Editor |
| --- | --- | --- |
| Escribir, editar y publicar artículos | ✓ | ✓ |
| Generar borradores y el resumen del mes con IA | ✓ | ✓ |
| Eliminar artículos para siempre | ✓ | |
| Invitar, quitar acceso y copiar links de acceso | ✓ | |

Cada artículo guarda quién lo creó y quién lo tocó por última vez (`created_by`, `updated_by`).

## 1. Supabase (una vez)

1. Entrá a [supabase.com](https://supabase.com) y creá una cuenta y un proyecto a nombre de PotenciApp. Región **São Paulo**.
2. En **SQL Editor**, ejecutá en orden `001_blog_posts.sql`, `002_blog_members.sql` y `003_blog_post_fields.sql` (carpeta `supabase/migrations/`).
3. **Authentication → Sign In / Providers**: dejá **Email** activado y **desactivá "Allow new users to sign up"**. Los usuarios los crea el sitio solo para los emails autorizados.
4. **Authentication → URL Configuration**:
   - Site URL: `https://www.potenciapp.com`
   - Redirect URLs: agregá `https://www.potenciapp.com/admin/auth/confirm` (y `http://localhost:3000/admin/auth/confirm` para desarrollo).
5. **Authentication → Emails → Magic Link**: reemplazá el link del template por este, para que funcione aunque se abra en otro dispositivo o navegador:

   ```html
   <h2>Entrar al panel de PotenciApp</h2>
   <p><a href="{{ .RedirectTo }}?token_hash={{ .TokenHash }}&type=email">Entrar al panel</a></p>
   <p>El link sirve una sola vez y vence en 1 hora. Si no lo pediste, ignorá este mail.</p>
   ```

   Con el template por defecto también funciona, pero solo si se abre en el mismo navegador donde se pidió.
6. **Envío de mails (importante)**: el correo que trae Supabase de fábrica manda muy pocos mails por hora y es solo para pruebas. En **Project Settings → Authentication → SMTP Settings** configurá un SMTP propio (por ejemplo Resend o el de Google Workspace, remitente `no-reply@potenciapp.com`). Mientras tanto, un dueño puede copiar el link de acceso de un editor desde **Equipo** y mandárselo por WhatsApp.
7. **Project Settings → API**: copiá Project URL, `anon` key y `service_role` key (secreta: no se pega en chats).

## 2. Variables en Vercel

En el proyecto de Vercel de potenciapp.com → **Settings → Environment Variables** (Production):

| Variable | Valor |
| --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Project URL de Supabase |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | anon public key |
| `SUPABASE_SERVICE_ROLE_KEY` | service_role key |
| `ADMIN_EMAILS` | emails de los dueños, separados por coma |
| `CRON_SECRET` | una contraseña larga al azar |
| `GEMINI_API_KEY` | ya existe (la usa el chat) |
| `AGENT_API_SECRET` | opcional: solo si un agente externo va a mandar borradores por API. Mínimo 24 caracteres al azar |

Después de guardarlas, **Redeploy** del último deploy.

## 3. Automatizaciones (nunca publican solas)

`vercel.json` programa dos tareas. Las dos dejan **borradores** en el panel:

- `/api/cron/blog-drafts`: lunes, miércoles y viernes a las 9:00 (Argentina). Un artículo sobre la noticia más útil de los últimos 14 días.
- `/api/cron/blog-monthly`: el día 1 de cada mes a las 9:00. **Resumen del mes anterior**: 4 a 6 noticias, cada una con qué hacer y su fuente. URL fija `resumen-<mes>-<año>`, así no se duplica si se genera dos veces.

Las dos también tienen botón en el panel para generarlas en el momento.

Fuentes (se editan en `lib/blog-drafts.ts`, constante `FEEDS`): ESET WeLiveSecurity en español y búsquedas de Google Noticias Argentina sobre estafas a comercios, ciberseguridad para pymes, Mercado Libre y Mercado Pago.

### API para agentes externos

`POST /api/blog/publish` con `Authorization: Bearer <AGENT_API_SECRET>` y un JSON `{ slug, title, summary, content, category, tag, coverImage?, sources? }`. **Crea un borrador**, no publica. Sin la variable configurada, la API está cerrada. `GET /api/blog` devuelve los artículos publicados en JSON.

## 4. Uso diario

1. Entrá a `/admin/login` y pedí tu link.
2. Pestaña **Borradores**: abrí el borrador, leelo entero, corregí y verificá los datos contra las fuentes listadas.
3. Elegí **categoría**, **portada** (o dejá la de la categoría) y **autor**. **Guardar cambios** y después **Publicar**. Sale en `/blog`, en el sitemap y en `/llms.txt` en el momento.
4. **Descartar** lo que no sirva.

## 5. Sumar a alguien para que lleve el blog

1. Dueño → **Equipo** → email + rol **Editor** → **Dar acceso**.
2. Esa persona entra a `/admin/login` con su email. Si el mail no llega, el dueño apreta **Copiar link de acceso** y se lo manda por un canal privado.
3. Para cortar el acceso: **Quitar acceso**. Se cierra su sesión en el momento.
