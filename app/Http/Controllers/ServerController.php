<?php

namespace App\Http\Controllers;

use App\Models\Server;
use App\Enums\ServerStatus;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ServerController extends Controller
{
    public function index()
    {
        return Inertia::render('servers/index', [
            'servers' => Server::all()
        ]);
    }

    public function create()
    {
        return Inertia::render('servers/create', [
            'statuses' => collect(ServerStatus::cases())->map(fn ($status) => [
                'value' => $status->value,
                'label' => ucfirst($status->value)
            ])
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'public_ipv4' => 'nullable|string|max:20',
            'status' => 'nullable|string|max:255',
            'username' => 'nullable|string|max:255',
            'sudo_password' => 'nullable|string|max:255',
            'ssh_port' => 'nullable|integer',
        ]);

        $server = Server::create($validated);

        return redirect()->route('servers.show', $server)
            ->with('success', 'Server created successfully.');
    }

    public function show(Server $server)
    {
        return Inertia::render('servers/show', [
            'server' => $server
        ]);
    }

    public function edit(Server $server)
    {
        return Inertia::render('servers/edit', [
            'server' => $server,
            'statuses' => collect(ServerStatus::cases())->map(fn ($status) => [
                'value' => $status->value,
                'label' => ucfirst($status->value)
            ])
        ]);
    }

    public function update(Request $request, Server $server)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'public_ipv4' => 'nullable|string|max:20',
            'status' => 'nullable|string|max:255',
            'username' => 'nullable|string|max:255',
            'sudo_password' => 'nullable|string|max:255',
            'ssh_port' => 'nullable|integer',
        ]);

        $server->update($validated);

        return redirect()->route('servers.show', $server)
            ->with('success', 'Server updated successfully.');
    }

    public function destroy(Server $server)
    {
        $server->delete();

        return redirect()->route('servers.index')
            ->with('success', 'Server deleted successfully.');
    }
}
