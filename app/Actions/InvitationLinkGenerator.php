<?php

namespace App\Actions;

use App\Models\Server;
use Illuminate\Support\Facades\URL;

class InvitationLinkGenerator
{
    public static int $limit = 5;

    public function handle(Server $server): string
    {
        $host = config('app.url');

        return $host.URL::temporarySignedRoute('add-server-script',
                expiration: now()->addMinutes(static::$limit),
                parameters: ['server' => $server,],
                absolute: false
            );
    }
}
