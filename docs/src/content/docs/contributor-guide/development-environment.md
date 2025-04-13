---
title: Development Environment
description: Up and running for development
sidebar:
    order: 3
---

## Up and running

We use Docker for the development, make sure you have it installed and running.

- Clone/fork the repo.
- Install `composer` and `npm` dependencies
  ```bash title="Install dependencies"
  cp .env.example .env
  ./run compose:use dev
  ./run composerInstallInsideAnEphemeralContainer
  ./run compose:build-with-ids
  docker compose up -d
  ./run bash # Enter the container
  php artisan key:generate
  php artisan migrate:fresh --seed
  ```
- Run Vite
  ```bash title="Run Vite development server"
  ./run bash # Enter the container
  npm ci
  npm run build
  ```
- You should now be able to run the PHP tests.
  ```bash title="PHP Tests"
  ./run bash # Enter the container
  composer test
  ```

