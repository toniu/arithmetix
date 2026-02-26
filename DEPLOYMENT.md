# Deployment Guide

This guide covers deploying Arithmetix to cloud platforms.

## Tech Stack

- **Frontend:** Vue 2, TailwindCSS 3, Webpack 5
- **Backend:** Node.js, Express 4, PostgreSQL
- **Node Version:** 20.x LTS

---

## Render + Netlify (Recommended)

Render handles the backend API and PostgreSQL database. Netlify (or Vercel) serves the static frontend build.

### Backend + Database (Render)

1. Sign up at [render.com](https://render.com)
2. Go to Dashboard, click New, then Blueprint
3. Connect your GitHub repository — Render will detect `render.yaml` automatically
4. Once the deployment initialises, set the following environment variables in the Render dashboard:
   - `DOMAIN` — your frontend URL (e.g. `https://arithmetix.netlify.app`)
   - `EMAIL_ADDRESS`, `EMAIL_USERNAME`, `EMAIL_PASSWORD` — for notification emails
   - `EMAIL_OFFICE_RECIPIENTS` — admin email address(es)
5. Initialise the database via Render's shell:
   ```bash
   psql $DATABASE_URL -f app-backend/sql/1-tables.sql
   psql $DATABASE_URL -f app-backend/sql/2-user.sql
   psql $DATABASE_URL -f app-backend/sql/3-populate.sql
   ```
6. Note your backend URL (e.g. `https://arithmetix-api.onrender.com`)

### Frontend (Netlify)

1. Sign up at [netlify.com](https://netlify.com)
2. Add a new site and connect to your GitHub repository
3. Netlify will detect the `netlify.toml` configuration. If not, set manually:
   - **Base directory:** `app-frontend`
   - **Build command:** `npm run build:prod`
   - **Publish directory:** `app-frontend/dist`
4. Add the environment variable `VUE_APP_API_URL` with your Render backend URL
5. Deploy
6. Go back to Render and update the `DOMAIN` variable to match your new Netlify URL, then redeploy the backend

### Frontend (Vercel — Alternative)

1. Sign up at [vercel.com](https://vercel.com)
2. Import your repository
3. Set root directory to `app-frontend`, build command to `npm run build:prod`, output to `dist`
4. Add the environment variable `VUE_APP_API_URL` with your Render backend URL
5. Deploy

---

## Other Platform Options

**Railway** — similar to Render. Create a project from GitHub, add a PostgreSQL database from the marketplace, and configure the same environment variables.

**Fly.io** — install the CLI (`brew install flyctl` on macOS), create a `Fly.toml` in the backend directory, and deploy with `fly deploy`. Add PostgreSQL with `fly postgres create`.

---

## Environment Variables Reference

### Backend (.env)

```bash
# Server
DOMAIN="https://your-frontend-url.netlify.app"
API_PORT=3000

# Database (provided automatically by Render/Railway)
DATABASE_URL=postgres://...

# Auth
SECRET=your-jwt-secret-here

# Email (Office 365)
EMAIL_SERVER=smtp.office365.com
EMAIL_PORT=587
EMAIL_ADDRESS=your-email@domain.com
EMAIL_USERNAME=your-email@domain.com
EMAIL_PASSWORD=your-password
EMAIL_OFFICE_RECIPIENTS=admin@domain.com
```

### Frontend

```bash
VUE_APP_API_URL=https://your-backend-url.onrender.com
```

---

## Post-Deployment Checklist

- [ ] Backend health check passes
- [ ] Database tables created and seeded
- [ ] Login works with test credentials
- [ ] Frontend connects to backend API (no CORS errors)
- [ ] PDF downloads work (exam papers, worksheets)
- [ ] Quiz generation and scoring work
- [ ] HTTPS active on both services

---

## Troubleshooting

**Database connection fails**
- Check that `DATABASE_URL` is set correctly in the platform's environment variables
- Confirm PostgreSQL is running and the SQL scripts have been executed

**CORS errors in the browser**
- Ensure the `DOMAIN` variable in the backend matches your frontend URL exactly (including `https://`)
- Redeploy the backend after changing `DOMAIN`

**Build failures**
- Verify Node.js 20.x is being used: `node --version`
- Clear caches: `rm -rf node_modules package-lock.json && npm install`

**Render free tier spin-down**
- Free-tier services sleep after 15 minutes of inactivity. The first request after sleeping takes 30–60 seconds to respond.
