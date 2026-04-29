import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FachkundePilot",
  description: "Verstehen in deiner Sprache. Bestehen auf Deutsch.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="de">
      <body>{children}</body>
    </html>
  );
}
