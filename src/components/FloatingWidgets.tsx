"use client";

import React from "react";
import { MessageSquare, Phone, Calendar } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface FloatingWidgetsProps {
  onOpenBooking: () => void;
}

export default function FloatingWidgets({ onOpenBooking }: FloatingWidgetsProps) {
  const { language } = useLanguage();
  const isRtl = language === "ar";
  const whatsappUrl = "https://wa.me/97156637056?text=Hello%20Ray%20Dental%20Clinic,%20I%20would%20like%20to%20schedule%20a%20private%20luxury%20consultation.";

  return (
    <>
      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
        {/* Call Button */}
        <a
          href="tel:+97156637056"
          className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-burgundy shadow-xl border border-gold-mid/20 hover:scale-105 hover:bg-neutral-50 transition-all group"
          title="Call Clinic Concierge"
        >
          <Phone className="h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
        </a>

        {/* WhatsApp Button */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl hover:scale-105 transition-all group"
          title="Direct WhatsApp Concierge"
        >
          {/* Custom chat icon resembling luxury messaging */}
          <MessageSquare className="h-5.5 w-5.5 group-hover:scale-110 transition-transform duration-300" />
        </a>
      </div>

      {/* Sticky Mobile Booking Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-[#FAF6F0]/95 backdrop-blur-md border-t border-gold-mid/15 shadow-[0_-5px_20px_rgba(0,0,0,0.05)] px-4 py-2 flex gap-3">
        <a
          href="tel:+97156637056"
          className="flex-1 flex items-center justify-center gap-1.5 border border-gold-mid/30 py-2 rounded-full text-[9px] font-bold tracking-[0.12em] text-neutral-800 hover:text-gold-dark hover:border-gold-mid transition-all uppercase"
        >
          <Phone className="h-3.5 w-3.5 text-gold-mid" />
          <span>{isRtl ? "اتصال بالكونسيرج" : "CALL CLINIC"}</span>
        </a>
        <button
          onClick={onOpenBooking}
          className="flex-1 flex items-center justify-center gap-1.5 bg-[#150106] border border-gold-mid/30 py-2 rounded-full text-[9px] font-bold tracking-[0.12em] text-gold-light hover:bg-[#150106]/90 transition-all uppercase cursor-pointer"
        >
          <Calendar className="h-3.5 w-3.5 text-gold-mid" />
          <span>{isRtl ? "حجز جناح خاص" : "RESERVE SUITE"}</span>
        </button>
      </div>
    </>
  );
}
