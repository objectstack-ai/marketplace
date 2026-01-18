import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ObjectStack Marketplace - Discover Drivers, Plugins & Modules",
  description: "The official catalog for ObjectStack extensions. Find drivers for PostgreSQL, Redis, Excel, Salesforce, and more. Discover plugins and modules to extend your stack.",
  keywords: ["ObjectStack", "marketplace", "drivers", "plugins", "modules", "database", "integrations"],
  authors: [{ name: "ObjectStack Team" }],
  openGraph: {
    title: "ObjectStack Marketplace",
    description: "Discover extensions for your ObjectStack",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
