"use client";

import { Download } from "lucide-react";
import { motion } from "framer-motion";
import { TranslationMap, generateLangFile, generateJsonFile } from "@/lib/parsers";

interface DownloadButtonProps {
    data: TranslationMap;
    filename: string;
    format: 'lang' | 'json';
}

export default function DownloadButton({ data, filename, format }: DownloadButtonProps) {
    const handleDownload = () => {
        const content = format === 'lang' ? generateLangFile(data) : generateJsonFile(data);
        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename; // Should probably append _translated or something
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    return (
        <motion.button
            onClick={handleDownload}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="fixed bottom-8 right-8 flex items-center gap-2 px-6 py-4 rounded-full bg-[var(--md-sys-color-primary-container)] text-[var(--md-sys-color-on-primary-container)] shadow-lg hover:shadow-xl transition-shadow font-medium"
        >
            <Download className="w-5 h-5" />
            <span>ダウンロード ({format})</span>
        </motion.button>
    );
}
