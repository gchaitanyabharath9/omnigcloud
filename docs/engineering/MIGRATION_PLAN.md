# Migration Plan: Future Dev/SIT Pipeline

## 1. Current State (Untouched)

- **Branch:** `main`
- **Trigger:** Push to `main`
- **Deploy:** Automatic to Production (Vercel/AWS)
- **Config:** Uses `src/config/prod/app.json` (default) or ENV vars.

## 2. Future Pipeline (Scaffolding Ready)

We have added a new workflow: `.github/workflows/future-dev-sit-pipeline.yml`

This workflow is **INERT** (does not run) because:

1. It listens to `dev` branch (which doesn't exist yet).
2. It has a guard variable `ENABLE_SIT_PIPELINE` which defaults to `false`.

### Configuration Strategy

- **Local:** `src/config/local/app.json`
- **Dev:** `src/config/dev/app.json`
- **SIT:** `src/config/sit/app.json`
- **Prod:** `src/config/prod/app.json`

The application loads these based on `APP_ENV` (dev|sit|prod).

## 3. How to Enable (When Ready)

### Step A: Create Dev Branch

```bash
git checkout -b dev
git push -u origin dev
```

### Step B: Configure GitHub

1. Go to Settings -> Secrets and variables -> Actions -> Variables.
2. Create `ENABLE_SIT_PIPELINE` = `true`.
3. Create Environment `sit` in GitHub Settings -> Environments.

### Step C: Test Flow

1. Create a `feature/new-button` branch.
2. PR into `dev`.
3. **Result:** `future-dev-sit-pipeline` runs Quality Gates.
4. Merge to `dev`.
5. **Result:** Deploy to SIT job runs (mocked currently, add real deploy steps later).

### Step D: Promote to Prod

Once SIT is verified, merge `dev` -> `main` via PR to trigger the classic Prod deployment.

## How to enable SIT pipeline later (manual step)

Because `ENABLE_SIT_PIPELINE` is treated as a repository variable, it likely does not exist yet. The pipeline assumes it is `false` if missing.

To safe-guard against accidental deployments, follow these exact steps when you are ready:

1.  **Locate Settings**:
    - Go to your GitHub Repository -> `Settings` -> `Secrets and variables` -> `Actions`.
2.  **Create Variable**:
    - Switch to the `Variables` tab (NOT Secrets).
    - Click `New repository variable`.
    - Name: `ENABLE_SIT_PIPELINE`
    - Value: `false` (Recommended initially to verify CI passes first) or `true` (To enable deployment).
3.  **Create Environment**:
    - Go to `Settings` -> `Environments`.
    - Create a new environment named `sit`.
    - (Optional) Add deployment protection rules here if requested.
4.  **Activate**:
    - Change `ENABLE_SIT_PIPELINE` to `true`.
    - Push to `dev` branch.
    - The `Deploy to SIT` job will now execute.
