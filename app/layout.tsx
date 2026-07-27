import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://pranav2258.github.io/medium-voltage-project-execution-simulator/"),
  title: "MV-24 Project Control Simulator",
  description: "An end-to-end medium-voltage power distribution project execution and commissioning simulator.",
  openGraph: {
    title: "MV-24 Project Control Simulator",
    description: "End-to-end medium-voltage project execution, commissioning, acceptance, and closeout.",
    type: "website",
    images: [{ url: "/og.png", width: 1728, height: 900, alt: "MV-24 Project Control Simulator" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "MV-24 Project Control Simulator",
    description: "End-to-end medium-voltage project execution, commissioning, acceptance, and closeout.",
    images: ["/og.png"],
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
