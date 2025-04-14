---
title: Local VM
description: Set up Local VM
sidebar:
    order: 4
---

We're using [Multipass (Canonical)](https://canonical.com/multipass) to have local VM's for development. 

This is a lightweight VM that runs on your local machine and is easy to set up and use.

Make sure you have it installed and running. You can find the installation instructions on the [Multipass install website](https://canonical.com/multipass/install).

You may use any other VM solution, but we recommend using Multipass for its simplicity and ease of use.

## Setting up locally

In the `local-vm` folder, there are some scripts to help you set up the VM.

Run

```
cd local-vm

# Display available commands
./run

./run vm:create
./run vm:ssh
# You should be in!

./run vm:info
```

