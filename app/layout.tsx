import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { ConvexClientProvider } from "@/components/convex/ConvexClientProvider";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import Header from "@/components/global/Header";
import Footer from "@/components/global/Footer";

export const metadata: Metadata = {
  title: "Event Pilot",
  description:
    "Full Stack AI Event Management Platform built with React 19 & Next.js 16",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ClerkProvider
            appearance={{
              theme: [dark],
            }}
          >
            <ConvexClientProvider>
              <div className="min-h-screen flex flex-col">
                {/* Header Component */}
                <Header />

                {/* Main Children */}
                <main className="relative flex-1">
                  {/* Glow Effects */}
                  <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
                    <div className="absolute top-0 left-1/4 w-72 h-72 bg-pink-600/20 rounded-full blur-3xl" />
                    <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-blue-600/20 rounded-full blur-3xl" />
                  </div>

                  <div className="relative container mx-auto px-4 pt-10">
                    {children}
                  </div>
                </main>

                {/* Footer Component */}
                <Footer />
              </div>
            </ConvexClientProvider>
          </ClerkProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
