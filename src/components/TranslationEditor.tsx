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
        <div className="w-full h-full flex flex-col glass-card rounded-3xl overflow-hidden">
            {/* Toolbar */}
            <div className="p-4 border-b border-[var(--md-sys-color-outline)] flex items-center gap-4 bg-[var(--md-sys-color-surface)]/50 backdrop-blur-md">
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--md-sys-color-on-surface-variant)] w-4 h-4" />
                    <input
                        type="text"
                        placeholder="検索..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full h-10 pl-10 pr-4 rounded-full bg-[var(--md-sys-color-surface-variant)] text-[var(--md-sys-color-on-surface)] placeholder-[var(--md-sys-color-on-surface-variant)] focus:outline-none focus:ring-2 focus:ring-[var(--md-sys-color-primary)] transition-all text-sm border border-transparent focus:border-[var(--md-sys-color-primary)]"
                    />
                </div>
                <div className="text-xs font-medium text-[var(--md-sys-color-on-surface-variant)] ml-auto px-3 py-1 rounded-full bg-[var(--md-sys-color-surface-variant)]">
                    {filteredEntries.length} 項目
                </div>
            </div>

            {/* Data Grid Header */}
            <div className="grid grid-cols-2 gap-4 px-6 py-3 bg-[var(--md-sys-color-surface-variant)]/30 text-xs font-semibold text-[var(--md-sys-color-on-surface-variant)] uppercase tracking-wider">
                <div>キー</div>
                <div>値</div>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto p-2 space-y-1">
                {filteredEntries.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-[var(--md-sys-color-on-surface-variant)] opacity-60">
                        <Search className="w-12 h-12 mb-4 opacity-20" />
                        <p>見つかりませんでした</p>
                    </div>
                ) : (
                    filteredEntries.map(([key, value]) => (
                        <motion.div
                            key={key}
                            layoutId={key}
                            className="grid grid-cols-2 gap-4 px-4 py-3 rounded-xl hover:bg-[var(--md-sys-color-surface-variant)] transition-colors group items-start border border-transparent hover:border-[var(--md-sys-color-outline-variant)]"
                        >
                            <div className="text-sm font-mono text-[var(--md-sys-color-primary)] break-all pt-1 select-all opacity-90">
                                {key}
                            </div>
                            <textarea
                                value={value}
                                onChange={(e) => onChange(key, e.target.value)}
                                className="w-full bg-transparent text-[var(--md-sys-color-on-surface)] border-b border-transparent focus:border-[var(--md-sys-color-primary)] focus:outline-none resize-none min-h-[24px] text-sm leading-relaxed transition-colors placeholder-opacity-50"
                                rows={Math.max(1, Math.ceil(value.length / 40))}
                                placeholder="翻訳を入力..."
                            />
                        </motion.div>
                    ))
                )}
            </div>
        </div>
    );
}
