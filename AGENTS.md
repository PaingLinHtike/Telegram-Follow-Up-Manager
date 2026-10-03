# Telegram Follow-Up Manager Development Plan

## Current State

- The project is a React 19 and Vite frontend prototype.
- Records and statistics are hardcoded in `src/data.js`.
- Navigation uses component state in `src/App.jsx`, so URLs and refresh persistence do not work.
- Follow-up creation, note editing, status changes, and reminders are currently UI-only.
- There is no backend, database, authentication, API integration, test suite, environment template, or deployment configuration.

## Agreed MVP Scope

- Telegram data is entered manually.
- Contacts use Telegram usernames and link to `https://t.me/<username>`.
- The application does not synchronize private Telegram chats or contacts.
- The application does not detect replies automatically.
- The application does not require a Telegram bot token.
- The first version supports one authenticated user.
- Reminders are stored and displayed in the application only.
- The backend uses Node.js and Express.
- PostgreSQL is the database and Prisma is the ORM.
- Docker Compose provides the local PostgreSQL service.

## Implementation Plan

### 1. Development Foundation

- Keep the React application and add an Express backend under `server/`.
- Add npm scripts for frontend development, backend development, combined development, builds, linting, tests, migrations, and seeding.
- Add `.env.example` and ensure real environment files and credentials are ignored.
- Add Docker Compose for local PostgreSQL.
- Configure Vite to proxy `/api` requests to Express during development.
- Replace the stock README with local setup, database, testing, and production instructions.

### 2. Database

- Add the Prisma schema, migrations, generated client, and seed script.
- Create a `User` model for the authenticated owner.
- Create a `Session` model for revocable, HTTP-only cookie sessions.
- Create a `Contact` model with ownership, name, Telegram username, avatar URL, notes, and timestamps.
- Create a `FollowUp` model with ownership, contact, pasted message, note, priority, status, tags, reminder time, completion time, and timestamps.
- Calculate inbox statistics from follow-up records instead of storing aggregate counters.
- Do not persist fake Telegram online or presence information.
- Keep presentation details such as badge colors in the frontend.

### 3. Authentication and Security

- Seed the initial user from development environment credentials.
- Hash passwords using a suitable password hashing library.
- Use random opaque session tokens and store only their hashes in PostgreSQL.
- Send sessions through `HttpOnly`, `SameSite`, and production-secure cookies.
- Protect every contacts, follow-ups, and statistics endpoint.
- Validate all request bodies, parameters, and query strings.
- Return a consistent API error format.
- Add origin checks and login rate limiting.
- Never commit real passwords, database credentials, session secrets, or API keys.

### 4. REST API

Implement these endpoints:

```text
POST   /api/auth/login
POST   /api/auth/logout
GET    /api/auth/me

GET    /api/contacts
POST   /api/contacts
GET    /api/contacts/:id
PATCH  /api/contacts/:id
DELETE /api/contacts/:id

GET    /api/follow-ups
POST   /api/follow-ups
GET    /api/follow-ups/:id
PATCH  /api/follow-ups/:id
DELETE /api/follow-ups/:id

GET    /api/stats
GET    /api/health
```

- Follow-up listing supports status, priority, tag, search, and reminder filters.
- Contact listing supports search by name and Telegram username.
- Resource access is always scoped to the authenticated user.
- Telegram links are generated only from validated usernames.

### 5. Frontend Integration

- Replace conditional screen state with React Router.
- Use these routes: `/login`, `/`, `/follow-ups/new`, `/follow-ups/:id`, and `/contacts`.
- Add an authenticated API client and a server-state query layer.
- Replace all `src/data.js` reads with API queries.
- Add loading, empty, validation, unauthorized, and retryable error states.
- Persist follow-up creation, note edits, status changes, contact changes, and reminders through the API.
- Load Details by follow-up ID instead of treating a contact as a follow-up.
- Add reminder date and time controls with upcoming and overdue states.
- Make search, filters, statistics, contact creation, and Open in Telegram functional.
- Remove misleading Telegram sync and online-presence indicators.
- Preserve the existing visual language and ensure desktop and mobile layouts continue to work.

### 6. Development Quality

- Add backend tests for authentication, ownership, CRUD operations, filters, statistics, and validation.
- Add frontend tests for login, inbox loading, follow-up creation, editing, status changes, and error states.
- Seed representative contacts and follow-ups for local development.
- Add centralized error handling, structured request logging, database health checks, and graceful server shutdown.
- Keep changes minimal and avoid speculative Telegram integration code.

### 7. Verification

- Start PostgreSQL with Docker Compose.
- Apply Prisma migrations and seed the initial user.
- Run backend and frontend tests.
- Run ESLint.
- Run production builds for the frontend and backend.
- Verify login, refresh-safe sessions, logout, contacts CRUD, follow-ups CRUD, filters, statistics, reminders, and Telegram links manually.
- Verify that one user cannot access another user's records in automated API tests.

## Development Prerequisites

- Node.js 22 LTS and npm.
- Docker Desktop with Docker Compose.
- Git is recommended for tracking implementation changes.
- An initial admin email and password supplied through the local environment file.

Use the following environment shape without committing real values:

```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/telegram_follow_up_manager
SESSION_SECRET=replace-with-a-long-random-secret
ADMIN_EMAIL=admin@example.local
ADMIN_PASSWORD=replace-with-a-strong-password
```

## Security Note

The workspace contains a plaintext Figma credential in `.agents/mcp_config.json`. Revoke or rotate that credential and move secret configuration to an ignored environment file. Do not reproduce the credential in source code, documentation, logs, commits, or chat.

## Out of Scope for This MVP

- Telegram Bot API webhooks.
- Telegram personal-account or MTProto synchronization.
- Automatic contact or message synchronization.
- Automatic reply detection.
- Sending reminders through Telegram or email.
- Multi-user registration and organization management.
- Native mobile applications.

These features should be considered separate phases because they introduce additional product, security, privacy, and infrastructure requirements.
