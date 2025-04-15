<?php

it('cleans up TMP dirs', function () {})->todo("
    When we create a TMP_dir, we can create a `.meta` file inside
    it has TmpMeta DTO json encoded
    It has the creation time, opCode, timeout, etc
    We can then have a purge function
");

it('performs more checks on the install key script', function () {})->todo("
    it can check for ubuntu OS >= 22.04
    it can check user is sudoer
    validates that public key is already added or not
");

it('needs a way to create a server with the default commited key', function () {})->todo("");
