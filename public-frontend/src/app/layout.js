import { Inter, Fraunces } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["italic", "normal"],
  weight: ["500", "600"],
});

export const metadata = {
  title: "RenewCred",
  description: "RenewCred — pure climate intelligence.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <a
          href="#main-content"
          className="sr-only fixed left-4 top-4 z-50 rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white focus:not-sr-only"
        >
          Skip to main content
        </a>
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
