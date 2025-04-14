<?php

namespace App\Console\Commands;

use App\Actions\InvitationLinkGenerator;
use Facades\App\Helpers\Script;
use App\Models\Server;
use Illuminate\Console\Command;

class GenerateInvitationLinkCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:generate-invitation-link {id}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle(InvitationLinkGenerator $linkGenerator)
    {
        $id = $this->argument('id');

        $url = $linkGenerator->handle(Server::find($id));

        $command = Script::wrapCurl($url);

        $this->info($command);
    }
}
