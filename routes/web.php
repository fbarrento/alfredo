<?php

use App\Http\Controllers\AddServerScriptController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ServerController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', DashboardController::class)->name('dashboard');

    // Server routes
    Route::resource('servers', ServerController::class);
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';

Route::middleware('signed:relative')->group(function () {
    Route::get('/add-server-script/{server}', AddServerScriptController::class)->name('add-server-script');
});
