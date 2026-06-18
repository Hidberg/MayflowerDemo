[![TypeScript Check](https://github.com/Hidberg/MayflowerDemo/actions/workflows/typecheck.yml/badge.svg?branch=main)](https://github.com/Hidberg/MayflowerDemo/actions/workflows/typecheck.yml)

# Mayflower Demo

## Description
Playwright + TypeScript autotest for Mayflower.

The test verifies that the analytics report registers a new click after a default referral
link is opened:
1. Log in.
2. Read the user's default referral link.
3. Open the link in a separate browser context to generate a click.
4. Open `/analytics/statistics` and run the standard report.
5. Assert the report reflects the new click.

## Requirements
- **Node.js** version 22+ (for local runs), or **Docker** (for containerized runs).

## Configuration
The test reads credentials and the target URL from environment variables.
Copy the example file and fill in your values:

```bash
cp .env.example .env
```

`.env` variables:

| Variable          | Description                                                |
|-------------------|------------------------------------------------------------|
| `BASE_URL`        | Base URL of the site under test                            |
| `LOGIN`           | Account login                                              |
| `PASSWORD`        | Account password                                           |
| `SERVER_TIMEZONE` | Server timezone used for date in reports, e.g. `UTC`       |

## npm scripts
The following commands are defined in `package.json`:

| Command              | Description                                                                 |
|----------------------|-----------------------------------------------------------------------------|
| `npm test`           | Run all Playwright tests (headless).                                        |
| `npm run test:headed`| Run the tests in headed mode (visible browser).                             |
| `npm run report`     | Open the generated HTML report from `playwright-report`.                    |
| `npm run docker`     | Build the Docker image and run the tests in a container using `.env`.<br>The HTML report is written to `playwright-report-docker` on the host. |

## Run tests locally
```bash
npm install
npx playwright install
npm test
```

## Run tests in Docker
```bash
npm run docker
```
