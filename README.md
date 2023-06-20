# accionlabs-coding
## Repo for coding assessment with Accionlabs

The purpose of this project is to have a working test framework for both UI and API testing based on the requirements that were provided. Playwright with Javascript has been used to design the develop this framework. 

# Project Structure

```
accionlabs-coding
    |-- src
         |-- api
              |-- helper.js     (api helper module)
         |-- pages
              |-- landing.js    (ui landing page module)
              |-- boards.js     (ui board module)
         |-- resources
              |-- constants.js  (shared constants)
    |-- tests
          |-- card_game
                  |-- request_api.spec.ts
          |-- checkers-game
                  |-- game_ui.spec.ts
    package.json
    playwright.config.ts        (test configurations)
```

# Prerequisites

- Node version 18.16.0

# Setup Instructions

- Clone the repository
- Navigate to project directory: `accionlabs-coding`
- Run 'npm install`

# Running Tests

- For UI tests, run: `npx playwright test --project=checkers-ui`
- For API tests, run: `npx playwright test --project=cards-api`
- For all tests, run: `npx playwright test`

# Future enhancements

- Enable CI/CD with Github Actions or Jenkins
- Dockerize and containerize for CI/CD
- Enable logging mechanism
- Enable report generation
- Enable multi-environment support

### Author: Md Mahbubur Rahman


