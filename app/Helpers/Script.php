<?php

namespace App\Helpers;

class Script
{
    public function wrapCurl(string $url): string
    {
        return "curl -sSL \"{$url}\" | bash";
    }
}
