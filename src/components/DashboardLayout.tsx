"use client";

import { ReactNode } from "react";

interface DashboardLayoutProps {
    sidebar: ReactNode;
    children: ReactNode;
}

export default function DashboardLayout({ sidebar, children }: DashboardLayoutProps) {
    return (
        <div className="flex min-h-screen bg-[var(--md-sys-color-background)]">
            {sidebar}
            <main className="flex-1 h-screen overflow-y-auto relative">
                <div className="max-w-7xl mx-auto p-6 md:p-12">
                    {children}
                </div>
            </main>
        </div>
    );
}
