"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { TranslationMap } from "@/lib/parsers";

interface TranslationEditorProps {
    data: TranslationMap;
    onChange: (key: string, value: string) => void;
}

export default function TranslationEditor({ data, onChange }: TranslationEditorProps) {
    const [searchQuery, setSearchQuery] = useState("");

    const filteredEntries = useMemo(() => {
        return Object.entries(data).filter(([key, value]) =>
            key.toLowerCase().includes(searchQuery.toLowerCase()) ||
            value.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [data, searchQuery]);

    return (
        <div className="w-full h-full flex flex-col bg-[var(--md-sys-color-surface)] rounded-3xl border border-[var(--md-sys-color-outline-variant)] overflow-hidden shadow-sm">
            {/* Toolbar */}
            <div className="p-4 border-b border-[var(--md-sys-color-outline-variant)] flex items-center gap-4 bg-[var(--md-sys-color-surface)]">
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--md-sys-color-on-surface-variant)] w-5 h-5" />
                    <input
                        type="text"
                        placeholder="検索..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full h-10 pl-12 pr-4 rounded-full bg-[var(--md-sys-color-surface-variant)] text-[var(--md-sys-color-on-surface-variant)] placeholder-[var(--md-sys-color-on-surface-variant)] focus:outline-none focus:ring-2 focus:ring-[var(--md-sys-color-primary)] transition-shadow text-sm"
                    />
                </div>
                <div className="text-sm text-[var(--md-sys-color-on-surface-variant)] ml-auto">
                    {filteredEntries.length} 項目
                </div>
            </div>

            {/* Data Grid Header */}
            <div className="grid grid-cols-2 gap-4 px-6 py-3 bg-[var(--md-sys-color-surface-variant)] text-sm font-medium text-[var(--md-sys-color-on-surface-variant)]">
                <div>キー</div>
                <div>値</div>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto p-2 space-y-1">
                {filteredEntries.length === 0 ? (
                    <div className="text-center py-20 text-[var(--md-sys-color-on-surface-variant)]">
                        見つかりませんでした
                    </div>
                ) : (
                    filteredEntries.map(([key, value]) => (
                        <motion.div
                            key={key}
                            layoutId={key}
                            className="grid grid-cols-2 gap-4 px-4 py-3 rounded-xl hover:bg-[var(--md-sys-color-surface-variant)] transition-colors group items-start"
                        >
                            <div className="text-sm font-mono text-[var(--md-sys-color-primary)] break-all pt-1 select-all">
                                {key}
                            </div>
                            <textarea
                                value={value}
                                onChange={(e) => onChange(key, e.target.value)}
                                className="w-full bg-transparent text-[var(--md-sys-color-on-surface)] border-b border-transparent focus:border-[var(--md-sys-color-primary)] focus:outline-none resize-none min-h-[28px] text-sm leading-relaxed"
                                rows={Math.max(1, Math.ceil(value.length / 40))}
                            />
                        </motion.div>
                    ))
                )}
            </div>
        </div>
    );
}
