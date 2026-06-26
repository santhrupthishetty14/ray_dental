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
  title: "Ray Dental Clinic | Family Dentist in Rapid City, SD",
  description: "Experience exceptional family and cosmetic dental care at Ray Dental Clinic in Rapid City, South Dakota. Over 60 years of clinical excellence offering implants, veneers, sleep apnea therapy, and general dentistry.",
  keywords: ["Ray Dental Clinic", "Ray Dental Clinic LLC", "Rapid City Dentist", "Dentist South Dakota", "Dental Implants Rapid City", "Cosmetic Dentistry Rapid City", "Sleep Apnea Treatment Rapid City", "Family Dentist SD"],
  openGraph: {
    title: "Ray Dental Clinic | Exceptional Family & Cosmetic Dentistry",
    description: "Advanced family, cosmetic, and restorative dentistry delivered with exceptional care and over 60 years of clinical heritage in South Dakota.",
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



