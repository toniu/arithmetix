Project: Non-CMS A-level revision webapp — concise STARs for interviews

Patterns observed: proactive planning, vertical-slice delivery, risk mitigation (dependencies), iterative refactor for reuse, test-driven fixes, pragmatic scope trimming.

Behavioral — 4 concise STARs

1) Prioritising scope under time pressure
S: Project deadline and over-ambitious Gantt tasks.
T: Deliver a working vertical slice and strong report rather than every optional feature.
A: Re-evaluated requirements, classified use cases (mandatory vs optional), focused on core flows (auth, dashboard, content browsing), communicated plan with supervisor.
R: Prototype and interim report completed; core functionality robust and presentable.

2) Learning and applying new technologies quickly
S: Needed backend and frontend skills (Node.js, Vue, Webpack, Tailwind) within term.
T: Become productive and deliver integrated full-stack features fast.
A: Self-led learning, set up dev environment, iterated webpack configs, rebuilt front-end setup when vulnerabilities appeared.
R: Stable build and working UI; able to implement features end-to-end.

3) Handling setbacks and risk mitigation
S: Vulnerable/outdated frontend dependencies blocked progress.
T: Restore a working frontend while keeping schedule.
A: Investigated cause, rebuilt setup using a split Webpack config, validated by testing dev & prod builds.
R: Frontend recovered; risk documented and future mitigation noted in project report.

4) Refactoring for collaboration and reuse
S: Repeated UI code across pages (header, sidebar, routing).
T: Reduce duplication and ease maintenance.
A: Refactored header/sidebar into reusable Vue components and centralized route logic by role.
R: Cleaner codebase, faster feature additions (conditional routes, role-based UI).

Technical — 4 concise STARs

1) Fixing frontend dependency issues (Webpack rebuild)
S: Dev blocked by vulnerable/outdated packages and broken build.
T: Restore secure, reliable frontend build pipeline.
A: Audited dependencies, reinstalled and restructured webpack into common/dev/prod files, tested both environments.
R: Working build, vulnerabilities mitigated or documented, development resumed.

2) Building recursive content loaders
S: Large content tree for exam papers, modules, and revision notes stored in resources.
T: Load and render files dynamically without manual manifests.
A: Implemented recursive functions to traverse directories and produce UI lists; unit-tested loader classes.
R: Scalable content discovery with minimal manual maintenance.

3) Authentication and session handling
S: Need for secure login and role-based content (student/teacher).
T: Provide reliable auth and state across frontend and backend.
A: Implemented Express auth endpoints, cookie sessions, and propagated user info into frontend state (local storage used sparingly with notes on security trade-offs).
R: Users can login, see role-specific routes, and the system supports teacher/student views.

4) CSV-driven quiz engine with TDD
S: Quizzes provided as CSV pools; need repeatable quiz generation and analytics.
T: Load CSVs, generate quizzes, display results and per-category analytics.
A: Parsed CSVs into quiz pools; built quiz component to render questions and charts; wrote unit tests for parsing and generation; fixed refresh and PDF opening bugs.
R: Functional quiz system with review analytics and reliable behaviour under refresh.

Notes for interview use
- Keep each STAR to ~2–4 sentences in conversation: set context, state objective, explain actions clearly, quantify result where possible.
- Emphasise non-CMS constraints: raw file-system content, custom loaders, no external CMS APIs — this demonstrates backend/frontend integration skill and pragmatic engineering.
- Use the Patterns line to open with a synopsis: shows you spot repeating strengths (planning, risk response, refactor, testing).

End of document.
