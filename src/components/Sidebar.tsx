"use client";

import { motion } from "framer-motion";
import { Home, FileText, Download, Settings, Menu } from "lucide-react";
import clsx from "clsx";
import { useState } from "react";

interface SidebarProps {
    activeTab: 'home' | 'editor' | 'export';
    onTabChange: (tab: 'home' | 'editor' | 'export') => void;
}

export default function Sidebar({ activeTab, onTabChange }: SidebarProps) {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const menuItems = [
        { id: 'home', label: 'ホーム', icon: Home },
        { id: 'editor', label: 'エディタ', icon: FileText },
        { id: 'export', label: 'エクスポート', icon: Download },
    ] as const;

    return (
        <motion.aside
            initial={{ width: 280 }}
            animate={{ width: isCollapsed ? 88 : 280 }}
            className="h-screen glass-panel border-r-0 flex flex-col relative z-20 transition-all duration-300"
        >
            <div className="p-6 flex items-center justify-between">
                {!isCollapsed && (
                    <motion.h1
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-xl font-bold bg-gradient-to-r from-[var(--md-sys-color-primary)] to-[var(--md-sys-color-secondary)] bg-clip-text text-transparent truncate tracking-tight"
                    >
                        LangPack Studio
                    </motion.h1>
                )}
                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="p-2 rounded-xl hover:bg-[var(--md-sys-color-surface-variant)] text-[var(--md-sys-color-on-surface)] transition-colors"
                >
                    <Menu className="w-5 h-5" />
                </button>
            </div>

            <nav className="flex-1 px-4 py-6 space-y-3">
                {menuItems.map((item) => {
                    const isActive = activeTab === item.id;
                    return (
                        <button
                            key={item.id}
                            onClick={() => onTabChange(item.id)}
                            className={clsx(
                                "w-full flex items-center gap-4 p-3.5 rounded-xl transition-all duration-200 relative group",
                                isCollapsed ? "justify-center aspect-square" : "",
                                isActive
                                    ? "bg-[var(--md-sys-color-primary-container)] text-[var(--md-sys-color-on-primary-container)] shadow-lg shadow-indigo-500/10"
                                    : "text-[var(--md-sys-color-on-surface-variant)] hover:bg-[var(--md-sys-color-surface-variant)] hover:text-[var(--md-sys-color-on-surface)]"
                            )}
                        >
                            <item.icon className={clsx("w-5 h-5 flex-shrink-0 transition-colors", isActive ? "text-[var(--md-sys-color-primary)]" : "")} />
                            {!isCollapsed && (
                                <motion.span
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="font-medium whitespace-nowrap text-sm"
                                >
                                    {item.label}
                                </motion.span>
                            )}
                            {isActive && (
                                <motion.div
                                    layoutId="activeTab"
                                    className="absolute inset-0 rounded-xl border border-[var(--md-sys-color-primary)] opacity-20"
                                />
                            )}
                        </button>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-[var(--md-sys-color-outline)]">
                <button className={clsx(
                    "w-full flex items-center gap-4 p-3.5 rounded-xl text-[var(--md-sys-color-on-surface-variant)] hover:bg-[var(--md-sys-color-surface-variant)] hover:text-[var(--md-sys-color-on-surface)] transition-colors",
                    isCollapsed ? "justify-center aspect-square" : ""
                )}>
                    <Settings className="w-5 h-5 flex-shrink-0" />
                    {!isCollapsed && (
                        <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="font-medium whitespace-nowrap text-sm"
                        >
                            設定
                        </motion.span>
                    )}
                </button>
            </div>
        </motion.aside>
    );
}
