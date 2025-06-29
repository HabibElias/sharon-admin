import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/components/auth-provider";

export const metadata: Metadata = {
  title: "Sharon Admin Panel",
  description: "Powered by Sabih Software Systems",
  generator: "Sabih Software Systems",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-[poppins]">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
