<?php

namespace App\View\Components\Tasks;

use App\Tasks\ServerTask;

class GenerateEd25519KeyPair extends ServerTask
{
    public function __construct(
        public string $privatePath
    ){}

    public function comment()
    {
        return config('services.ssh.key_comment');
    }

    public function render()
    {
        return view('components.tasks.generate-ed25519-key-pair');
    }
}
