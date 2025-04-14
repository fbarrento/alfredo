<?php

namespace App\Enums;

enum ServerStatus: string
{
    /* Created in DB, awaits join-script, then starts provisioning */
    case New = 'new';

    /* Already asked for a Provider to Create the VPS, and we're waiting it provisions */
    case Provisioning = 'provisioning';

    /* Performing (kind of long) initial setup */
    case Setup = 'setup';

    case Running = 'running';

    case Paused = 'paused';

    case Stopped = 'stopped';

    case Deleting = 'deleting';

    case Archived = 'archived';

    case Unknown = 'unknown';
}

