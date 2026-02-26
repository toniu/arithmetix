# Arithmetix — Backend API

Node.js/Express REST API for the Arithmetix e-learning platform.

## Tech Stack

- **Runtime:** Node.js (v18+)
- **Framework:** Express 4
- **Database:** PostgreSQL (via `pg` connection pool)
- **Auth:** JWT (`jsonwebtoken`) with bcrypt password hashing (`pgcrypto`)
- **Validation:** express-validator
- **Testing:** Jest 29

## Project Structure

```
src/
├── app.js              # Express server, CORS middleware, and all route definitions
├── db.js               # PostgreSQL data-access layer (parameterised queries)
├── eps.js              # Exam paper resource loader (Singleton)
├── rn.js               # Revision notes resource loader (Singleton)
├── ws.js               # Worksheet resource loader (Singleton)
├── quiz.js             # Quiz engine — CSV parsing, shuffle, question selection
├── mail.js             # Email utility (placeholder)
└── config/index.js     # Environment variable configuration
```

## Getting Started

```bash
npm install              # Install dependencies
cp .env.example .env     # Create environment config
npm start                # Start server (default: port 3000)
npm run dev              # Start with nodemon (auto-restart on changes)
npm test                 # Run Jest test suite
```

## Environment Variables

Copy `.env.example` to `.env` and fill in your values:

| Variable | Description | Default |
|----------|-------------|---------|
| `API_PORT` | Server port | `3000` |
| `SECRET` | JWT signing secret | `supersecret` |
| `DOMAIN` | Allowed CORS origin (frontend URL) | `http://localhost:8080` |
| `DATABASE_URL` | Full PostgreSQL connection string (cloud) | — |
| `DB_USER` | PostgreSQL user (local) | `arithmetix_admin` |
| `DB_HOST` | PostgreSQL host (local) | `localhost` |
| `DB_NAME` | Database name (local) | `arithmetix_db` |
| `DB_PASSWORD` | PostgreSQL password (local) | `admin` |
| `DB_PORT` | PostgreSQL port (local) | `5432` |
| `EMAIL_SERVER` | SMTP server | `smtp.office365.com` |
| `EMAIL_PORT` | SMTP port | `587` |
| `EMAIL_ADDRESS` | Sender email | — |
| `EMAIL_PASSWORD` | Sender email password | — |

When `DATABASE_URL` is set (typical for cloud deployments), it takes priority over the individual `DB_*` variables.