import * as React from 'react';
import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { ServerForm } from '@/components/server-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface CreateServerProps {
    statuses: Array<{
        value: string;
        label: string;
    }>;
}

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
        title: 'Create',
        href: '/servers/create',
    },
];

export default function CreateServer({ statuses }: CreateServerProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Server" />
            <div className="mx-auto max-w-4xl p-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Create Server</CardTitle>
                        <CardDescription>
                            Add a new server to your dashboard. Fill in the details below.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ServerForm statuses={statuses} />
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
