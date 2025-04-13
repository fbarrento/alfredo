---
title: Development Environment
description: Up and running for development
sidebar:
    order: 3
---

## Up and running

- Clone/fork the repo.
- Install `composer` and `npm` dependencies
  ```bash title="Install dependencies"
  cp .env.example .env
  composer install
  sail up -d
  sail npm ci
  sail npm run build
  ```
- You should now be able to run the PHP tests.
  ```bash title="PHP Tests"
  sail composer test
  ```

