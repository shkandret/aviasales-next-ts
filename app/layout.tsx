import type { Metadata } from "next";

import "@/styles/none-style.scss";
import "@/styles/globals.scss";

export const metadata: Metadata = {
  title: "Aviasales",
  description: "Aviasales",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}
