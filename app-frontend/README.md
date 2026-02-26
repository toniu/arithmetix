# Arithmetix — Frontend

Vue 2 single-page application for the Arithmetix e-learning platform.

## Tech Stack

- **Framework:** Vue 2.7 (Single File Components)
- **Styling:** TailwindCSS 3 (utility-first, mobile-first)
- **Build:** Webpack 5 with CSS extraction, content hashing, and source maps
- **Icons:** Font Awesome 6
- **Charts:** Chart.js (quiz result visualisations)
- **HTTP:** Axios (centralised in `src/plugins/axios.js`)
- **Routing:** vue-router 3 with history mode and navigation guards

## Project Structure

```
src/
├── App.vue                    # Root component
├── main.js                    # Vue instance and plugin registration
├── router/index.js            # Route definitions and auth guards
├── plugins/axios.js           # Axios HTTP client setup
├── css/
│   ├── tailwind.css           # TailwindCSS base imports
│   └── quiz.css               # Custom quiz animations and styling
└── components/
    ├── general/               # Login, Navigation, Sidebar, Alert, Confirm, etc.
    ├── student/               # Dashboard, Quizzes, Quiz, Modules, ExamPapers, Homework
    └── teacher/               # Classes, Assignments, ClassForm, TeacherDB
```

## Scripts

```bash
npm install              # Install dependencies
npm start                # Start dev server with hot reload (localhost:8080)
npm run build:prod       # Production build (output: dist/)
npm run build:dev        # Development build
```

## Environment Variables

Set via `.env` or your hosting platform:

| Variable | Description |
|----------|-------------|
| `VUE_APP_API_URL` | Backend API base URL (e.g. `https://api.example.com`) |
| `VUE_APP_DOMAIN` | API domain (fallback, used with `VUE_APP_API_PORT`) |
| `VUE_APP_API_PORT` | API port (fallback, used with `VUE_APP_DOMAIN`) |