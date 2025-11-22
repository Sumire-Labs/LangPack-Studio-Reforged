import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LangPack Studio Reforged",
  description: "Minecraft Mod Language File Translator",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>
        {children}
      </body>
    </html>
  );
}
