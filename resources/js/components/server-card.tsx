import * as React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from '@inertiajs/react';

type ServerStatus = 'new' | 'provisioning' | 'setup' | 'running' | 'paused' | 'stopped' | 'deleting' | 'archived' | 'unknown';

interface ServerProps {
    id: number;
    name: string;
    public_ipv4?: string;
    status: ServerStatus;
    username?: string;
    ssh_port?: number;
    created_at: string;
    updated_at: string;
}

export function ServerCard({ server }: { server: ServerProps }) {
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
        return new Date(dateString).toLocaleDateString();
    };

    return (
        <Card className="h-full">
            <CardHeader>
                <div className="flex items-start justify-between">
                    <CardTitle>{server.name}</CardTitle>
                    <Badge variant={getStatusBadgeVariant(server.status)}>
                        {server.status.charAt(0).toUpperCase() + server.status.slice(1)}
                    </Badge>
                </div>
                <CardDescription>
                    Created on {formatDate(server.created_at)}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-2">
                    {server.public_ipv4 && (
                        <div className="flex justify-between">
                            <span className="text-sm font-medium">IP Address:</span>
                            <span className="text-sm">{server.public_ipv4}</span>
                        </div>
                    )}
                    {server.username && (
                        <div className="flex justify-between">
                            <span className="text-sm font-medium">Username:</span>
                            <span className="text-sm">{server.username}</span>
                        </div>
                    )}
                    {server.ssh_port && (
                        <div className="flex justify-between">
                            <span className="text-sm font-medium">SSH Port:</span>
                            <span className="text-sm">{server.ssh_port}</span>
                        </div>
                    )}
                </div>
            </CardContent>
            <CardFooter className="justify-end">
                <Link 
                    href={route('servers.show', server.id)} 
                    className="text-primary hover:underline text-sm font-medium"
                    preserveState={true}
                >
                    View details →
                </Link>
            </CardFooter>
        </Card>
    );
}
