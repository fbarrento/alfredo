import * as React from 'react';
import { useForm } from '@inertiajs/react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

type ServerStatus = 'new' | 'provisioning' | 'setup' | 'running' | 'paused' | 'stopped' | 'deleting' | 'archived' | 'unknown';

interface StatusOption {
    value: string;
    label: string;
}

interface ServerFormProps {
    server?: {
        id?: number;
        name: string;
        public_ipv4?: string;
        status: ServerStatus;
        username?: string;
        sudo_password?: string;
        ssh_port?: number;
    };
    statuses: StatusOption[];
    isEdit?: boolean;
}

export function ServerForm({ server, statuses, isEdit = false }: ServerFormProps) {
    const { data, setData, post, put, processing, errors } = useForm({
        name: server?.name || '',
        public_ipv4: server?.public_ipv4 || '',
        status: server?.status || 'new',
        username: server?.username || '',
        sudo_password: server?.sudo_password || '',
        ssh_port: server?.ssh_port || 22,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (isEdit && server?.id) {
            put(route('servers.update', server.id));
        } else {
            post(route('servers.store'));
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                        <Label htmlFor="name">Server Name <span className="text-destructive">*</span></Label>
                        <Input
                            id="name"
                            value={data.name}
                            onChange={e => setData('name', e.target.value)}
                            placeholder="My Web Server"
                            required
                        />
                        {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="public_ipv4">IP Address</Label>
                        <Input
                            id="public_ipv4"
                            value={data.public_ipv4}
                            onChange={e => setData('public_ipv4', e.target.value)}
                            placeholder="192.168.1.1"
                        />
                        {errors.public_ipv4 && <p className="text-sm text-destructive">{errors.public_ipv4}</p>}
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                        <Label htmlFor="username">Username</Label>
                        <Input
                            id="username"
                            value={data.username}
                            onChange={e => setData('username', e.target.value)}
                            placeholder="root"
                        />
                        {errors.username && <p className="text-sm text-destructive">{errors.username}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="ssh_port">SSH Port</Label>
                        <Input
                            id="ssh_port"
                            type="number"
                            value={data.ssh_port}
                            onChange={e => setData('ssh_port', parseInt(e.target.value) || 22)}
                            placeholder="22"
                        />
                        {errors.ssh_port && <p className="text-sm text-destructive">{errors.ssh_port}</p>}
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                        <Label htmlFor="sudo_password">Sudo Password</Label>
                        <Input
                            id="sudo_password"
                            type="password"
                            value={data.sudo_password}
                            onChange={e => setData('sudo_password', e.target.value)}
                            placeholder="••••••••"
                        />
                        {errors.sudo_password && <p className="text-sm text-destructive">{errors.sudo_password}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="status">Status</Label>
                        <Select
                            value={data.status}
                            onValueChange={(value) => setData('status', value as ServerStatus)}
                        >
                            <SelectTrigger id="status">
                                <SelectValue placeholder="Select Status" />
                            </SelectTrigger>
                            <SelectContent>
                                {statuses.map((status) => (
                                    <SelectItem key={status.value} value={status.value}>
                                        {status.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {errors.status && <p className="text-sm text-destructive">{errors.status}</p>}
                    </div>
                </div>
            </div>

            <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => window.history.back()}>
                    Cancel
                </Button>
                <Button type="submit" disabled={processing}>
                    {isEdit ? 'Update Server' : 'Create Server'}
                </Button>
            </div>
        </form>
    );
}
