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
                    "relative w-full max-w-xl aspect-[4/3] rounded-[2.5rem] border-2 border-dashed flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-300 group",
                    isDragging
                        ? "border-[var(--md-sys-color-primary)] bg-[var(--md-sys-color-primary-container)]"
                        : "border-[var(--md-sys-color-outline-variant)] hover:border-[var(--md-sys-color-primary)] hover:bg-[var(--md-sys-color-surface-variant)]"
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

                <div className="flex flex-col items-center gap-6 p-8">
                    <div className={clsx(
                        "p-8 rounded-[2rem] transition-colors duration-300",
                        isDragging
                            ? "bg-[var(--md-sys-color-on-primary-container)]"
                            : "bg-[var(--md-sys-color-secondary-container)] group-hover:bg-[var(--md-sys-color-primary-container)]"
                    )}>
                        <Upload
                            className={clsx(
                                "w-12 h-12 transition-colors duration-300",
                                isDragging
                                    ? "text-[var(--md-sys-color-primary-container)]"
                                    : "text-[var(--md-sys-color-on-secondary-container)] group-hover:text-[var(--md-sys-color-on-primary-container)]"
                            )}
                        />
                    </div>
                    <div className="space-y-2">
                        <h3 className="text-3xl font-bold text-[var(--md-sys-color-on-surface)]">
                            ファイルを開く
                        </h3>
                        <p className="text-lg text-[var(--md-sys-color-on-surface-variant)]">
                            ドラッグ＆ドロップ または クリック
                        </p>
                    </div>
                    <div className="flex gap-2 mt-4">
                        <span className="px-3 py-1 rounded-full bg-[var(--md-sys-color-surface)] text-xs font-mono text-[var(--md-sys-color-on-surface-variant)] border border-[var(--md-sys-color-outline-variant)]">
                            .lang
                        </span>
                        <span className="px-3 py-1 rounded-full bg-[var(--md-sys-color-surface)] text-xs font-mono text-[var(--md-sys-color-on-surface-variant)] border border-[var(--md-sys-color-outline-variant)]">
                            .json
                        </span>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
