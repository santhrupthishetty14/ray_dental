import type { Metadata } from "next";
import { Montserrat, Tajawal, Playfair_Display } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const tajawal = Tajawal({
  variable: "--font-tajawal",
  subsets: ["arabic"],
  weight: ["300", "400", "500", "700", "800", "900"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Ray Dental Clinic | Family & Cosmetic Dentist in Fujairah, UAE",
  description: "Experience exceptional family and cosmetic dental care at Ray Dental Clinic in Fujairah, UAE. Over two decades of clinical trust offering implants, veneers, and general dentistry.",
  keywords: ["Ray Dental Clinic", "Ray Dental Clinic LLC", "Fujairah Dentist", "Dentist UAE", "Dental Implants Fujairah", "Cosmetic Dentistry Fujairah", "Family Dentist Fujairah", "Al Ghurfah Dentist"],
  openGraph: {
    title: "Ray Dental Clinic | Exceptional Family & Cosmetic Dentistry",
    description: "Advanced family, cosmetic, and restorative dentistry delivered with exceptional care and over two decades of clinical heritage in Fujairah, UAE.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${tajawal.variable} ${playfair.variable} h-full scroll-smooth`}
    >
      <body className="font-sans antialiased min-h-full flex flex-col transition-colors duration-300">
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}



