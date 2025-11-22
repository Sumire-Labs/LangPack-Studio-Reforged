"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import FileUploader from "@/components/FileUploader";
import TranslationEditor from "@/components/TranslationEditor";
import DownloadButton from "@/components/DownloadButton";
import Sidebar from "@/components/Sidebar";
import DashboardLayout from "@/components/DashboardLayout";
import { parseLangFile, parseJsonFile, TranslationMap } from "@/lib/parsers";
import { Download } from "lucide-react";

export default function Home() {
  const [data, setData] = useState<TranslationMap | null>(null);
  const [filename, setFilename] = useState("");
  const [format, setFormat] = useState<'lang' | 'json'>('lang');
  const [activeTab, setActiveTab] = useState<'home' | 'editor' | 'export'>('home');

  const handleFileUpload = async (file: File) => {
    const text = await file.text();
    const ext = file.name.split('.').pop()?.toLowerCase();

    if (ext === 'json') {
      setData(parseJsonFile(text));
      setFormat('json');
    } else {
      setData(parseLangFile(text));
      setFormat('lang');
    }
    setFilename(file.name);
    setActiveTab('editor');
  };

  const handleTranslationChange = (key: string, value: string) => {
    setData(prev => prev ? ({ ...prev, [key]: value }) : null);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="h-full"
          >
            <h2 className="text-3xl font-bold mb-8 text-[var(--md-sys-color-on-surface)]">ホーム</h2>
            <div className="h-[calc(100vh-200px)]">
              <FileUploader onFileUpload={handleFileUpload} />
            </div>
          </motion.div>
        );
      case 'editor':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="h-full flex flex-col"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold text-[var(--md-sys-color-on-surface)]">エディタ</h2>
              {filename && (
                <span className="px-4 py-2 rounded-full bg-[var(--md-sys-color-secondary-container)] text-[var(--md-sys-color-on-secondary-container)] text-sm font-medium">
                  {filename}
                </span>
              )}
            </div>
            {data ? (
              <div className="flex-1 min-h-0">
                <TranslationEditor data={data} onChange={handleTranslationChange} />
              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-[var(--md-sys-color-on-surface-variant)]">
                ファイルが開かれていません
              </div>
            )}
          </motion.div>
        );
      case 'export':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="h-full"
          >
            <h2 className="text-3xl font-bold mb-8 text-[var(--md-sys-color-on-surface)]">エクスポート</h2>
            <div className="flex items-center justify-center h-[calc(100vh-200px)]">
              {data ? (
                <div className="text-center">
                  <DownloadButton data={data} filename={filename} format={format} />
                  <p className="mt-4 text-[var(--md-sys-color-on-surface-variant)]">
                    現在の変更内容をダウンロードします
                  </p>
                </div>
              ) : (
                <div className="text-[var(--md-sys-color-on-surface-variant)]">
                  エクスポートするデータがありません
                </div>
              )}
            </div>
          </motion.div>
        );
    }
  };

  return (
    <DashboardLayout
      sidebar={
        <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      }
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          className="h-full"
        >
          {renderContent()}
        </motion.div>
      </AnimatePresence>
    </DashboardLayout>
  );
}
