<?php

namespace App\Models;

use App\Actions\KeyPairGenerator;
use App\Enums\ServerStatus;
use App\Services\KeyPair;
use App\Tasks\DispatchesServerTasks;
use Illuminate\Database\Eloquent\Model;
use Sammyjo20\LaravelHaystack\Models\Haystack;
use Spatie\Activitylog\Models\Activity;

class Server extends Model
{
    use DispatchesServerTasks;

    public $hidden = [
        'private_key',
        'public_key',
        'sudo_password',
    ];

    protected $guarded = ['id'];

    public $casts = [
        'status' => ServerStatus::class,
        'private_key' => 'encrypted',
        'public_key' => 'encrypted',
        'sudo_password' => 'encrypted',
    ];

    protected static function booted()
    {
        static::creating(function (Server $server) {
            /** @var KeyPair $keyPair */
            $keyPair = (app(KeyPairGenerator::class))->ed25519();
            $server->private_key ??= $keyPair->privateKey;
            $server->public_key ??= $keyPair->publicKey;
        });
    }

    public function activity_log()
    {
        return $this->morphMany(Activity::class, 'subject');
    }

    public function spaces()
    {
        return $this->hasMany(Space::class);
    }

    public function run(string|array $tasks): Haystack
    {
        return $this->runServerTasks($tasks);
    }
}
