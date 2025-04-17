import * as React from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

type ServerStatus = 'new' | 'provisioning' | 'setup' | 'running' | 'paused' | 'stopped' | 'deleting' | 'archived' | 'unknown';

interface Server {
    id: number;
    name: string;
    public_ipv4?: string;
    status: ServerStatus;
    username?: string;
    ssh_port?: number;
    created_at: string;
    updated_at: string;
}

interface ShowServerProps {
    server: Server;
}

export default function ShowServer({ server }: ShowServerProps) {
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
    ];

    const getStatusBadgeVariant = (status: ServerStatus) => {
        switch (status) {
            case 'running':
                return 'default';
            case 'paused':
            case 'stopped':
                return 'secondary';
            case 'provisioning':
            case 'setup':
            case 'new':
                return 'outline';
            case 'deleting':
            case 'archived':
            case 'unknown':
                return 'destructive';
            default:
                return 'outline';
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleString();
    };
    
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Server - ${server.name}`} />
            <div className="mx-auto max-w-4xl p-4">
                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle>{server.name}</CardTitle>
                                <CardDescription>
                                    Created on {formatDate(server.created_at)}
                                </CardDescription>
                            </div>
                            <Badge variant={getStatusBadgeVariant(server.status)}>
                                {server.status.charAt(0).toUpperCase() + server.status.slice(1)}
                            </Badge>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-lg font-medium">Server Information</h3>
                                <div className="mt-4 space-y-4">
                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                        <div className="space-y-1">
                                            <p className="text-sm font-medium text-muted-foreground">IP Address</p>
                                            <p>{server.public_ipv4 || 'Not set'}</p>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-sm font-medium text-muted-foreground">SSH Port</p>
                                            <p>{server.ssh_port || 'Not set'}</p>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                        <div className="space-y-1">
                                            <p className="text-sm font-medium text-muted-foreground">Username</p>
                                            <p>{server.username || 'Not set'}</p>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-sm font-medium text-muted-foreground">Last Updated</p>
                                            <p>{formatDate(server.updated_at)}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-lg font-medium">SSH Connection</h3>
                                <div className="mt-2 rounded-md bg-muted p-3">
                                    <code className="text-sm">
                                        {`ssh ${server.username || 'user'}@${server.public_ipv4 || 'your-server-ip'} ${server.ssh_port ? `-p ${server.ssh_port}` : ''}`}
                                    </code>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="flex justify-end space-x-2">
                        <Link 
                            href={route('servers.edit', server.id)} 
                            as="button"
                            preserveState={true}
                            className="bg-primary/10 text-primary hover:bg-primary/20 px-4 py-2 rounded-md text-sm font-medium"
                        >
                            Edit Server
                        </Link>
                        <Button 
                            variant="destructive"
                            onClick={() => {
                                if (confirm('Are you sure you want to delete this server?')) {
                                    // Submit a delete form
                                    const form = document.createElement('form');
                                    form.method = 'POST';
                                    form.action = route('servers.destroy', server.id);
                                    
                                    const methodInput = document.createElement('input');
                                    methodInput.type = 'hidden';
                                    methodInput.name = '_method';
                                    methodInput.value = 'DELETE';
                                    form.appendChild(methodInput);
                                    
                                    const csrfInput = document.createElement('input');
                                    csrfInput.type = 'hidden';
                                    csrfInput.name = '_token';
                                    csrfInput.value = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '';
                                    form.appendChild(csrfInput);
                                    
                                    document.body.appendChild(form);
                                    form.submit();
                                }
                            }}
                        >
                            Delete
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </AppLayout>
    );
}