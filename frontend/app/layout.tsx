import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import CustomSidebar from "@/components/sidebar/CustomSidebar";
import CustomFileInput from "@/components/fileInput/CustomFileInput";
import Container from "@/components/container/Container";

export const metadata: Metadata = {
  title: "Королева красоты",
  description: "Описание",
  icons: {
    icon: "/bq.jpeg"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <main className="flex">
          <CustomSidebar />
          <div className="mx-6 w-full">
              {children}
          </div>
        </main>
        </Providers>
      </body>
    </html>
  );
}
