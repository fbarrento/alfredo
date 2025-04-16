import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { ServerCard } from '@/components/server-card';
import { Link } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

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

interface DashboardProps {
    servers: Server[];
}

export default function Dashboard({ servers = [] }: DashboardProps) {

    console.log(servers)

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold">Servers</h1>
                    <Link
                        href="/servers/create"
                        className="bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md text-sm font-medium"
                        preserveState={true}
                    >
                        Add Server
                    </Link>
                </div>

                {servers.length > 0 ? (
                    <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                        {servers.map((server) => (
                            <ServerCard key={server.id} server={server} />
                        ))}
                    </div>
                ) : (
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[20vh] flex-1 overflow-hidden rounded-xl border flex items-center justify-center">
                        <div className="text-center">
                            <h2 className="text-xl font-semibold mb-2">No servers found</h2>
                            <p className="text-muted-foreground mb-4">Get started by adding your first server</p>
                            <Link
                                href="/servers/create"
                                className="bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md text-sm font-medium"
                                preserveState={true}
                            >
                                Add Server
                            </Link>
                        </div>
                    </div>
                )}

            </div>
        </AppLayout>
    );
}
