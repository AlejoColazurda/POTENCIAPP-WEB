# Panel de administración del blog: puesta en marcha

El panel vive en `https://www.potenciapp.com/admin`. Hasta completar estos pasos, el sitio sigue funcionando igual: el blog muestra los artículos de `content/blog/` y `/admin` avisa que falta configurar.

## 1. Crear el proyecto de Supabase (una vez)

1. Entrá a [supabase.com](https://supabase.com) y creá una cuenta y un proyecto a nombre de PotenciApp. Elegí la región **São Paulo** (la más cercana a Argentina).
2. En **SQL Editor**, pegá el contenido de `supabase/migrations/001_blog_posts.sql` y apretá **Run**. Crea la tabla de artículos, sus permisos y el espacio para imágenes.
3. En **Authentication → Sign In / Providers**, desactivá **Allow new users to sign up**. Nadie se puede registrar solo.
4. En **Authentication → Users → Add user**, creá el usuario de cada persona que va a entrar al panel (email + contraseña).
5. En **Project Settings → API**, copiá:
   - Project URL
   - `anon` public key
   - `service_role` key (secreta: no se comparte ni se pega en chats)

## 2. Variables en Vercel

En el proyecto de Vercel de potenciapp.com → **Settings → Environment Variables** (Production), agregá:

| Variable | Valor |
| --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Project URL de Supabase |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | anon public key |
| `SUPABASE_SERVICE_ROLE_KEY` | service_role key |
| `ADMIN_EMAILS` | emails autorizados, separados por coma |
| `CRON_SECRET` | una contraseña larga al azar (ej. generada con un gestor de contraseñas) |
| `GEMINI_API_KEY` | ya existe (la usa el chat) |

Después de guardarlas, hacé **Redeploy** del último deploy.

## 3. Borradores automáticos

`vercel.json` programa `/api/cron/blog-drafts` los lunes, miércoles y viernes a las 9:00 (hora de Argentina). Cada vez deja **un borrador** en el panel. Nunca publica solo.

Para generar uno en el momento: botón **Generar borrador con IA** en el panel.

Fuentes que lee (se editan en `lib/blog-drafts.ts`, constante `FEEDS`): ESET WeLiveSecurity en español y búsquedas de Google Noticias Argentina sobre estafas a comercios, ciberseguridad para pymes, Mercado Libre y Mercado Pago.

## 4. Uso diario

1. Entrá a `/admin` con tu email y contraseña.
2. Pestaña **Borradores**: abrí el borrador, leelo entero, corregí lo que haga falta y verificá los datos contra las fuentes listadas.
3. **Guardar cambios** y después **Publicar**. Sale en `/blog`, en el sitemap y en `/llms.txt` en el momento.
4. **Descartar** lo que no sirva; **Eliminar** lo borra para siempre.
5. **Nuevo artículo** para escribir uno propio o subir un archivo `.md`. **Subir imagen** inserta la imagen en el texto.
