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
            animate={{ width: isCollapsed ? 80 : 280 }}
            className="h-screen bg-[var(--md-sys-color-surface)] border-r border-[var(--md-sys-color-outline-variant)] flex flex-col relative z-20"
        >
            <div className="p-4 flex items-center justify-between">
                {!isCollapsed && (
                    <motion.h1
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-xl font-bold bg-gradient-to-r from-[var(--md-sys-color-primary)] to-[var(--md-sys-color-tertiary)] bg-clip-text text-transparent truncate"
                    >
                        LangPack Studio
                    </motion.h1>
                )}
                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="p-2 rounded-full hover:bg-[var(--md-sys-color-surface-variant)] text-[var(--md-sys-color-on-surface)]"
                >
                    <Menu className="w-6 h-6" />
                </button>
            </div>

            <nav className="flex-1 px-3 py-4 space-y-2">
                {menuItems.map((item) => {
                    const isActive = activeTab === item.id;
                    return (
                        <button
                            key={item.id}
                            onClick={() => onTabChange(item.id)}
                            className={clsx(
                                "w-full flex items-center gap-4 p-4 rounded-full transition-colors relative overflow-hidden",
                                isActive
                                    ? "bg-[var(--md-sys-color-secondary-container)] text-[var(--md-sys-color-on-secondary-container)]"
                                    : "text-[var(--md-sys-color-on-surface-variant)] hover:bg-[var(--md-sys-color-surface-variant)] hover:text-[var(--md-sys-color-on-surface)]"
                            )}
                        >
                            <item.icon className="w-6 h-6 flex-shrink-0" />
                            {!isCollapsed && (
                                <motion.span
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="font-medium whitespace-nowrap"
                                >
                                    {item.label}
                                </motion.span>
                            )}
                            {isActive && (
                                <motion.div
                                    layoutId="activeTab"
                                    className="absolute inset-0 bg-[var(--md-sys-color-on-secondary-container)] opacity-[0.08]"
                                />
                            )}
                        </button>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-[var(--md-sys-color-outline-variant)]">
                <button className="w-full flex items-center gap-4 p-4 rounded-full text-[var(--md-sys-color-on-surface-variant)] hover:bg-[var(--md-sys-color-surface-variant)] hover:text-[var(--md-sys-color-on-surface)] transition-colors">
                    <Settings className="w-6 h-6 flex-shrink-0" />
                    {!isCollapsed && (
                        <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="font-medium whitespace-nowrap"
                        >
                            設定
                        </motion.span>
                    )}
                </button>
            </div>
        </motion.aside>
    );
}
