<?php

namespace App\Http\Controllers;

use App\Models\Server;
use App\View\Components\Tasks\InstallSSHKey;
use Illuminate\Http\Request;

class AddServerScriptController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Server $server): string
    {
        $task = resolve(InstallSSHKey::class, [
            'server' => $server,
        ]);

        return $task->getScript();
    }
}
