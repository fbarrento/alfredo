---
title: Test commands
description: Test commands
sidebar:
    order: 5
---

### Test the SSH connection to the server
```bash
php artisan app:test-ssh
```

### Test the Invitation Link

When connecting to the server, let's create a tunnel, so that we can access our host easily.
The 8080 port on the server will be mapped to 8080 on our local machine.

```bash
cd local-vm
run tunnel
# Paste the invitation command now
```
