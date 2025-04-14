<?php

namespace App\View\Components\Tasks;

use Closure;
use Illuminate\Contracts\View\View;
use Illuminate\View\Component;

class ShellDefaults extends Component
{
    /**
     * Create a new component instance.
     */
    public function __construct(public bool $exitImmediately = true)
    {
        //
    }

    public function setOptions()
    {
        $setOptions = array_filter([
            $this->exitImmediately ? 'e' : null,
            'u',
            config('services.ssh.print_shell_commands') ? 'x' : null,
        ]);

        return implode($setOptions);
    }

    /**
     * Get the view / contents that represent the component.
     */
    public function render(): View|Closure|string
    {
        return view('components.tasks.shell-defaults');
    }
}
