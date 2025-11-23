"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Upload } from "lucide-react";
import clsx from "clsx";

interface FileUploaderProps {
    onFileUpload: (file: File) => void;
}

export default function FileUploader({ onFileUpload }: FileUploaderProps) {
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            onFileUpload(files[0]);
        }
    };

    const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            onFileUpload(e.target.files[0]);
        }
    };

    return (
        <div className="w-full h-full flex items-center justify-center p-8">
            <motion.div
                className={clsx(
                    "relative w-full max-w-xl aspect-[4/3] rounded-[2.5rem] border-2 border-dashed flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-500 group overflow-hidden",
                    isDragging
                        ? "border-[var(--md-sys-color-primary)] bg-[var(--md-sys-color-primary-container)] shadow-[0_0_40px_rgba(99,102,241,0.3)]"
                        : "border-[var(--md-sys-color-outline)] hover:border-[var(--md-sys-color-primary)] glass-card hover:shadow-[0_0_30px_rgba(99,102,241,0.15)]"
                )}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
            >
                <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept=".lang,.json"
                    onChange={handleFileInput}
                />

                {/* Background Glow Effect */}
                <div className="absolute inset-0 bg-[var(--gradient-glow)] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                <div className="relative z-10 flex flex-col items-center gap-8 p-8">
                    <div className={clsx(
                        "p-8 rounded-[2rem] transition-all duration-500 shadow-xl",
                        isDragging
                            ? "bg-[var(--md-sys-color-on-primary-container)] scale-110"
                            : "bg-[var(--md-sys-color-surface)] group-hover:bg-[var(--md-sys-color-primary)] group-hover:scale-110"
                    )}>
                        <Upload
                            className={clsx(
                                "w-12 h-12 transition-colors duration-500",
                                isDragging
                                    ? "text-[var(--md-sys-color-primary-container)]"
                                    : "text-[var(--md-sys-color-primary)] group-hover:text-[var(--md-sys-color-on-primary)]"
                            )}
                        />
                    </div>
                    <div className="space-y-3">
                        <h3 className="text-4xl font-bold text-[var(--md-sys-color-on-surface)] tracking-tight">
                            ファイルを開く
                        </h3>
                        <p className="text-lg text-[var(--md-sys-color-on-surface-variant)] font-light">
                            ドラッグ＆ドロップ または クリック
                        </p>
                    </div>
                    <div className="flex gap-3 mt-2">
                        <span className="px-4 py-1.5 rounded-full bg-[var(--md-sys-color-surface-variant)] text-xs font-mono text-[var(--md-sys-color-on-surface)] border border-[var(--md-sys-color-outline)] backdrop-blur-sm">
                            .lang
                        </span>
                        <span className="px-4 py-1.5 rounded-full bg-[var(--md-sys-color-surface-variant)] text-xs font-mono text-[var(--md-sys-color-on-surface)] border border-[var(--md-sys-color-outline)] backdrop-blur-sm">
                            .json
                        </span>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
