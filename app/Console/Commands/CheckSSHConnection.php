<?php

namespace App\Console\Commands;

use App\Models\Server;
use Illuminate\Console\Command;
use phpseclib3\Net\SSH2;

class CheckSSHConnection extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:test-ssh';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->ping();
    }

    public function ping()
    {
        $server = Server::find(1);

        $user = $server->username;
        $hostname = $server->public_ipv4;
        $port = $server->ssh_port;
        $key = $server->private_key;

        // Load the key properly
        $keyObject = \phpseclib3\Crypt\PublicKeyLoader::load($key);

        $ssh = new SSH2($hostname, $port);

        $ssh->isConnected();

        if (! $ssh->login($user, $keyObject)) {
            throw new \Exception('Login failed using key');
        }

        // Store the output in a variable
        $output = $ssh->exec('pwd');

        // Display the output
        $this->line("Command output: " . $output);

        // You can also still check logs and errors
        $this->line("SSH Log: " . $ssh->getLog());
        $this->line("SSH Errors: " . $ssh->getStdError());

        dd('OK!');
    }

}
