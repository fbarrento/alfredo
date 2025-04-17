import * as React from 'react';
import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { ServerForm } from '@/components/server-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

type ServerStatus = 'new' | 'provisioning' | 'setup' | 'running' | 'paused' | 'stopped' | 'deleting' | 'archived' | 'unknown';

interface Server {
    id: number;
    name: string;
    public_ipv4?: string;
    status: ServerStatus;
    username?: string;
    sudo_password?: string;
    ssh_port?: number;
    created_at: string;
    updated_at: string;
}

interface EditServerProps {
    server: Server;
    statuses: Array<{
        value: string;
        label: string;
    }>;
}

export default function EditServer({ server, statuses }: EditServerProps) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Dashboard',
            href: '/dashboard',
        },
        {
            title: 'Servers',
            href: '/servers',
        },
        {
            title: server.name,
            href: `/servers/${server.id}`,
        },
        {
            title: 'Edit',
            href: `/servers/${server.id}/edit`,
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit Server - ${server.name}`} />
            <div className="mx-auto max-w-4xl p-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Edit Server</CardTitle>
                        <CardDescription>
                            Update your server details below.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ServerForm server={server} statuses={statuses} isEdit={true} />
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
