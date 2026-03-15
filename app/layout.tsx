import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Navbar } from "./components/Navbar";
import { SmoothScrollProvider } from "./components/SmoothScrollProvider";
import "./styles/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nguyen Huu Huy | Data Science Student",
  description: "Portfolio of Nguyen Huu Huy, Data Science Student focused on AI and ML.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} bg-background text-foreground antialiased`}>
        <SmoothScrollProvider>
          <div className="relative min-h-screen">
            <div className="relative z-10">
              <Navbar />
              {children}
            </div>
          </div>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
