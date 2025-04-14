<?php

namespace App\Services;

use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;

class TempDir
{
    protected string $opCode;
    protected string $baseDir;

    public static function tmpPathForOpCode($opCode)
    {
        return "/var/www/tmp/{$opCode}";
    }

    public static function make($auto_cleanup = true)
    {
        $instance = new static();

        $instance->opCode = Str::ulid();

        $instance->baseDir = static::tmpPathForOpCode($instance->opCode);

        File::ensureDirectoryExists($instance->baseDir);

        if ($auto_cleanup) {
            register_shutdown_function(
                fn() => static::cleanup($instance->opCode)
            );
        }

        return $instance;
    }

    public static function cleanup($opCode)
    {
        $dir = static::tmpPathForOpCode($opCode);

        if (File::isDirectory($dir)) {
            File::deleteDirectory($dir);
        }
    }

    public static function makeWithoutCleanup()
    {
        return static::make(auto_cleanup: false);
    }

    public function __invoke($path = null)
    {
        return $this->path($path);
    }

    public function path($path = null)
    {
        return $path
            ? $this->baseDir . "/" . $path
            : $this->baseDir;
    }

    /**
     * @return string
     */
    public function opCode(): string
    {
        return $this->opCode;
    }
}


