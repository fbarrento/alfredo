<?php

namespace App\Http\Controllers;

use App\Models\Server;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function __invoke()
    {
        return Inertia::render('dashboard', [
            'servers' => Server::all()
        ]);
    }
}
