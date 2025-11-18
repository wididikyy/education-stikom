import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Education Stikom API",
  description: "API for supporting Education Stikom website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
