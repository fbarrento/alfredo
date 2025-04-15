<?php

namespace Database\Seeders;

use App\Enums\ServerStatus;
use App\Models\Server;
use Illuminate\Database\Seeder;

class LocalServerTableSeeder extends Seeder
{

    /**
     * Auto generated seed file
     *
     * @return void
     */
    public function run()
    {
        \DB::table('servers')->delete();

        Server::create([
            'name' => 'alfredo-test-server',
            'status' => ServerStatus::New->value,
            'public_ipv4' => env('LOCAL_SERVER_IP', 'LOCAL_SERVER_IP'),
            'ssh_port' => 22,
            'username' => 'alfredo',
            'sudo_password' => null,
        ]);
    }
}
