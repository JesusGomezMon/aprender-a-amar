# Aprender a Amar — Landing de venta

Landing en React (Next.js) con pagos Stripe, base de datos de compradores, comprobante por correo y WhatsApp, SEO optimizado y despliegue en Vercel.

## Inicio rápido

```bash
cd aprender-a-amar
cp .env.example .env.local
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

## Despliegue en Vercel

1. Sube el repo a GitHub.
2. En [vercel.com](https://vercel.com) → **Add New Project** → importa el repo.
3. **Root Directory**: `aprender-a-amar` (si el repo incluye la carpeta padre).
4. En **Storage**, crea una base **Postgres** (Neon). Vercel inyecta `POSTGRES_URL` automáticamente.
5. En **Settings → Environment Variables**, añade las variables de `.env.example`.
6. Deploy.

### Webhook de Stripe

Tras el primer deploy:

1. Stripe Dashboard → **Developers → Webhooks → Add endpoint**
2. URL: `https://tu-dominio.vercel.app/api/webhooks/stripe`
3. Evento: `checkout.session.completed`
4. Copia el **Signing secret** a `STRIPE_WEBHOOK_SECRET` en Vercel y redeploy.

## Servicios

| Servicio | Uso |
|----------|-----|
| **Stripe** | Checkout con tarjeta ($400 MXN) |
| **Vercel Postgres** | Registro de compradores |
| **Resend** | Comprobante por correo |
| **Twilio WhatsApp** | Comprobante por WhatsApp (opcional) |

La tabla `buyers` se crea sola en el primer pago.

## SEO incluido

- Metadata Open Graph y Twitter
- `sitemap.xml` y `robots.txt`
- JSON-LD tipo `Course` para Google
- `lang="es"` y URLs canónicas

## Estructura

```
src/
  app/           # Páginas y API routes
  components/    # Landing y checkout
  config/        # Datos del curso
  lib/           # DB, Stripe, notificaciones
```

## Git

El repositorio ya está inicializado en esta carpeta. Para conectar con GitHub:

```bash
git remote add origin https://github.com/TU_USUARIO/aprender-a-amar.git
git push -u origin master
```
