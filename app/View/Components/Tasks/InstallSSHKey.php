<?php

namespace App\View\Components\Tasks;

use App\Models\Server;
use App\Services\Tasks\ServerTask;
use Closure;
use Illuminate\Contracts\View\View;
use Illuminate\Support\Facades\URL;

class InstallSSHKey extends ServerTask
{
    public function __construct(
        public ?Server $server
    ){}

    /**
     * Get the view / contents that represent the component.
     */
    public function render(): View|Closure|string
    {
        return view('components.tasks.install-s-s-h-key', $this->data());
    }
}
