# CI/CD with GitHub — Learning Plan

Learn CI/CD using a simple **React + Node.js** Task Tracker app and **GitHub Actions**.

## Use case: Task Tracker

| Piece | Role |
|--------|------|
| **React (Vite)** | UI: list tasks, add, mark done |
| **Node (Express)** | REST API: `GET/POST/PATCH/DELETE /api/tasks` |
| **In-memory store** | Persist tasks during learning (no cloud DB required at first) |
| **GitHub Actions** | Lint → test → build → deploy on every PR/push |

Why this use case works:

- Frontend and backend have separate build/test steps
- You can fail a pipeline on purpose (bad test / broken build)
- You practice PR → checks → merge → deploy
- Secrets (deploy tokens) stay in GitHub, not in code

## Suggested project layout

```text
cicd/   (or task-tracker/)
  frontend/          # React + Vite
  backend/           # Express + Node
  .github/
    workflows/       # CI/CD YAML
  LEARNING-PLAN.md   # this file
```

## Pipeline overview

```text
Push / PR → GitHub Actions CI → Lint + Test + Build
                ↓ fail              ↓ pass
           Block merge         Merge to main → CD Deploy
                                               → Frontend live
                                               → Backend live
```

---

## Phase 0 — Setup

**Goal:** Tools and repo ready.

1. Install **Node.js LTS** from https://nodejs.org (includes npm).
2. Confirm in a new terminal:
   - `node -v`
   - `npm -v`
3. Confirm Git is available: `git --version`.
4. Create folders: `backend/`, `frontend/`.
5. Create a GitHub repository (e.g. `task-tracker-cicd`).
6. Work on feature branches; open PRs into `main`.

**Done when:** Node/npm work and the empty monorepo folders exist.

---

## Phase 1 — Build the application

**Goal:** A working Task Tracker locally.

### Backend

- Express API for tasks
- Endpoints:
  - `GET /api/health` → `{ status: "ok" }`
  - `GET/POST/PATCH/DELETE /api/tasks`
- Optional: 2–3 tests (Vitest/Jest + Supertest)
- Scripts: `npm test`, `npm run build` (or start)

### Frontend

- React (Vite) UI for the task list
- Call the API (env var for API base URL)
- Optional: one simple component/UI test
- Scripts: `npm test`, `npm run build`, `npm run dev`

### Local verification

- Backend: health check OK (e.g. `http://localhost:3000/api/health`)
- Frontend: UI loads and can list/add tasks (e.g. Vite on `:5173`)
- Tests and builds succeed locally in both apps

**Done when:** App runs end-to-end on your machine.

---

## Phase 2 — CI only (most important)

**Goal:** Every PR is validated automatically.

1. Add `.github/workflows/ci.yml` that runs on PRs and pushes to `main`:
   - Checkout code
   - Setup Node
   - Install deps (frontend + backend)
   - Lint (optional)
   - Run tests
   - Build both apps
2. Enable **branch protection** on `main` (GitHub → Settings → Branches):
   - Require a pull request before merging
   - Require the CI status check to pass
3. Practice: open a PR that breaks a test → CI fails → fix → CI green → merge

**Done when:** Broken PRs are blocked; green PRs can merge.

---

## Phase 3 — CD: deploy

**Goal:** Merge to `main` ships the app.

| Option | Best for |
|--------|----------|
| Frontend → GitHub Pages / Vercel / Netlify | Static React build |
| Backend → Render / Railway / Fly.io | Free-tier Node API |
| Both → Docker + one host | Later stretch goal |

Recommended first path:

- **Frontend:** GitHub Pages or Vercel (from `main`)
- **Backend:** Render free web service from `backend/`

Use **GitHub Secrets** for deploy tokens (never commit secrets).

**Done when:** Merging to `main` deploys frontend and backend.

---

## Phase 4 — Stretch (optional)

- Environments: `preview` (PR) vs `production` (`main`)
- Cache npm / `node_modules` in Actions
- Test matrix (e.g. Node 18 and 20)
- Status badge in README
- Manual deploy via `workflow_dispatch`

**Done when:** You understand environments, caching, and manual triggers.

---

## Week checklist

| Day | Focus |
|-----|--------|
| 1 | Scaffold monorepo + Todo API + React UI |
| 2 | Add tests; make CI workflow green on first PR |
| 3 | Branch protection + intentional failing PR |
| 4 | Deploy backend + frontend; wire secrets |
| 5 | End-to-end: feature → PR → CI → merge → live |

---

## Milestone checklist

- [x] Phase 0: Node installed; folders ready; GitHub repo created
- [x] Phase 1: App runs locally (React + API)
- [x] Phase 1: Tests/builds pass locally
- [ ] Phase 2: CI workflow runs on every PR
- [ ] Phase 2: Broken PR blocked by failed checks
- [ ] Phase 3: Merge to `main` deploys frontend + backend
- [ ] Phase 3: Feature change visible live after merge
- [ ] Phase 4 (optional): Environments / cache / badge

---

## What you should understand by the end

- Difference between **CI** (validate) and **CD** (ship)
- Why PRs + required checks matter
- How GitHub Actions YAML maps to install → test → build → deploy
- How secrets and environments keep tokens out of the repo

---

## Current status

- Workspace: `d:\learning\OneDrive\Documents\2026\cicd\github`
- Repo: https://github.com/codesnippetsforall/task-tracker-cicd
- Phase 0–1 done
- Phase 2 in progress: `.github/workflows/ci.yml` added (Backend + Frontend: install → lint/test → build)
- Next: push CI on a PR, enable branch protection, practice a failing then green PR
