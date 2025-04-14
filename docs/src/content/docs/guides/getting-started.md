---
title: Getting started
description: Get started with Alfredo
---

Welcome to Alfredo! This guide will help you get started with installing and managing self-hosted applications through our simple dashboard.

Alfredo takes care of setting up Docker Compose apps on your server, so you can focus on using them instead of worrying about infrastructure.

Whether you're using your own computer or a cloud provider, we’ve got you covered. Follow the section that matches where your server will run:

## Alpha version setup options:

- **Local (Development)** — Set up Alfredo on your own computer. Great for testing and trying things out.
- **Hetzner** — Launch a server on Hetzner and connect it to Alfredo.
- **DigitalOcean** — Start a server on DigitalOcean and deploy apps with Alfredo.
- **Laravel Forge** — Connect an existing Laravel Forge server to Alfredo.

Each of these options will walk you through the process step by step, with no technical knowledge required.

Let’s get started!

---

## Local Setup (Development)

This guide will show you how to run Alfredo on your own computer using Docker. This is great if you just want to test things before using a real server.

### What you need:

- A computer with **Docker** and **Docker Compose** installed
- A Ubuntu 24 Virtual Machine. We use Multipass but you can have any other VM
- A terminal (like Terminal/iTerm2 on macOS/Linux or Ubuntu WSL on Windows)

### Step 1: Clone Alfredo

1. Open your terminal.
2. Run this command to download Alfredo:

```bash
git clone https://github.com/getalfredo/alfredo
cd self-hosted
```

### Step 2: Start Alfredo

Follow instructions on `/developer-guide/development-environment`

That’s it! You now have Alfredo running locally.

### Step 3: Start the VM
```

```
