<?php

namespace App\Services\Tasks;

use App\Models\Server;
use Illuminate\Support\Str;
use Illuminate\View\Component;

abstract class ServerTask extends Component
{
    public ?Server $server = null;

    public ?string $batch_uuid = null;

    /**
     * Set the target server.
     */
    public function setServer(Server $server): self
    {
        $this->server = $server;

        return $this;
    }

    public function getName(): string
    {
        if (property_exists($this, 'name')) {
            return $this->name;
        }

        return Str::headline(class_basename($this));
    }

    public function getScript(): string
    {
        return view(
            view: $this->getView(),
            data: $this->data(),
        )->render();
    }

    public function getView(): string
    {
        $view = Str::kebab(class_basename($this));

        return 'components.tasks.'.$view;
    }

    /**
     * Set the batch Uuid.
     */
    public function setBatchUuid(?string $batch_uuid): ServerTask
    {
        $this->batch_uuid = $batch_uuid;

        return $this;
    }
}
