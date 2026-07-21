"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, Instagram, Facebook, Clock } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface FooterProps {
  onOpenBooking: () => void;
}

export default function Footer({ onOpenBooking }: FooterProps) {
  const { language, t } = useLanguage();
  const isRtl = language === "ar";

  const services = [
    t("service1Name"),
    t("service2Name"),
    t("service3Name"),
    t("service4Name"),
    t("service5Name"),
    t("service6Name"),
    t("service7Name"),
    t("service8Name"),
    t("service9Name"),
    t("service10Name"),
    t("service11Name"),
    t("service12Name"),
  ];

  return (
    <footer
      className="bg-[#FAF6F0] text-neutral-800 border-t border-gold-mid/20 pt-28 pb-16 px-6 relative overflow-hidden"
      dir={isRtl ? "rtl" : "ltr"}
    >
      <div className="absolute right-0 bottom-0 w-[500px] h-[500px] rounded-full bg-gold-light/2 blur-[150px] pointer-events-none" />
      <div className="absolute left-0 top-0 w-[400px] h-[400px] rounded-full bg-burgundy/5 blur-[120px] pointer-events-none" />

      {/* Main Destination Footer Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-16 mb-20 relative z-10">
        
        {/* Brand Heritage & Socials */}
        <div className="md:col-span-4 space-y-8">
          <Link href="/">
            <Image
              src="/logo_v2.png"
              alt="Ray Dental Clinic Logo"
              width={160}
              height={90}
              className="object-contain h-[75px] w-auto transition-all duration-700 ease-[0.22,1,0.36,1] hover:scale-[1.01]"
            />
          </Link>
          
          <p className="text-xs text-neutral-600 leading-relaxed font-light font-sans max-w-sm">
            {isRtl
              ? "نصمم ابتسامات استثنائية ونقدم رعاية صحية تجميلية نخبوية تجمع بين إرث إكلينيكي ممتد لأكثر من عقدين وأحدث التقنيات الرقمية المبتكرة."
              : "Designing signature smiles and providing elite aesthetic care, bridging over two decades of clinical trust with digital diagnostic innovation."}
          </p>

          <div className="flex gap-4 pt-2">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="h-10 w-10 rounded-full border border-gold-mid/30 hover:border-gold-mid flex items-center justify-center text-gold-dark hover:bg-gold-gradient hover:text-white hover:shadow-[0_0_15px_rgba(200,155,60,0.3)] transition-all duration-700 ease-[0.22,1,0.36,1]">
              <Instagram className="h-4.5 w-4.5" />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="h-10 w-10 rounded-full border border-gold-mid/30 hover:border-gold-mid flex items-center justify-center text-gold-dark hover:bg-gold-gradient hover:text-white hover:shadow-[0_0_15px_rgba(200,155,60,0.3)] transition-all duration-700 ease-[0.22,1,0.36,1]">
              <Facebook className="h-4.5 w-4.5" />
            </a>
          </div>
        </div>

        {/* Bespoke Services */}
        <div className="md:col-span-3">
          <h4 className="font-serif text-burgundy text-[11px] uppercase tracking-luxury-wide font-bold mb-8">
            {isRtl ? "باقات الرعاية التجميلية" : "Bespoke Services"}
          </h4>
          <ul className="space-y-3.5">
            {services.slice(0, 6).map((svcName) => (
              <li key={svcName}>
                <button
                  onClick={onOpenBooking}
                  className="text-xs text-neutral-600 hover:text-gold-dark hover:translate-x-1.5 ltr:text-left rtl:text-right inline-block transition-all duration-700 ease-[0.22,1,0.36,1] font-light font-sans cursor-pointer"
                >
                  {svcName}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Clinic Hours */}
        <div className="md:col-span-2 space-y-6">
          <h4 className="font-serif text-burgundy text-[11px] uppercase tracking-luxury-wide font-bold mb-8">
            {t("openingHours")}
          </h4>
          <div className="space-y-4 text-xs text-neutral-600 font-light font-sans">
            <div className="space-y-1">
              <span className="text-[10px] uppercase tracking-wider text-neutral-500 font-bold block">{isRtl ? "الجمعة – الأربعاء" : "Fri - Wed"}</span>
              <p className="flex items-center gap-2">
                <Clock className="h-3.5 w-3.5 text-gold-mid shrink-0" />
                <span>{isRtl ? "9:00 صباحاً – 1:30 ظهراً / 4:30 عصراً – 10:30 مساءً" : "9:00 AM - 1:30 PM & 4:30 PM - 10:30 PM"}</span>
              </p>
            </div>
            <div className="space-y-1">
              <span className="text-[10px] uppercase tracking-wider text-neutral-500 font-bold block">{isRtl ? "الخميس" : "Thursday"}</span>
              <p className="flex items-center gap-2">
                <Clock className="h-3.5 w-3.5 text-gold-mid/45 shrink-0" />
                <span>{isRtl ? "مغلق (عطلة)" : "Closed (Off)"}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Destination Clinic Locations & Coordinates */}
        <div className="md:col-span-3 space-y-8">
          <div>
            <h4 className="font-serif text-burgundy text-[11px] uppercase tracking-luxury-wide font-bold mb-8">
              {isRtl ? "إحداثيات العيادة والمقر" : "Clinic Coordinates"}
            </h4>
            
            <div className="space-y-5 text-xs text-neutral-600 font-light font-sans">
              <div>
                <span className="text-[9px] uppercase tracking-widest text-gold-dark font-bold block mb-1">{isRtl ? "المقر الرئيسي" : "CLINIC HEADQUARTERS"}</span>
                <p className="leading-relaxed">{t("addressValue")}</p>
                <a href="tel:+971566370056" className="text-burgundy hover:text-gold-dark transition-colors font-semibold block mt-1.5">
                  <span dir="ltr">+971 56 637 0056</span>
                </a>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Hairline Gold Divider with Gradient Fade */}
      <div className="max-w-7xl mx-auto h-[1px] bg-gradient-to-r from-transparent via-gold-mid/20 to-transparent my-10" />

      {/* Footer Info & Copyright */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between text-[11px] text-neutral-500 font-light gap-4 font-sans relative z-10">
        <p className="tracking-wide">{t("allRightsReserved")}</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-gold-dark transition-colors duration-500">{isRtl ? "سياسة الخصوصية" : "Privacy Policy"}</a>
          <a href="#" className="hover:text-gold-dark transition-colors duration-500">{isRtl ? "شروط الخدمة" : "Terms of Service"}</a>
        </div>
      </div>
    </footer>
  );
}
