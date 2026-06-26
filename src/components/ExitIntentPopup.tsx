"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface ExitIntentPopupProps {
  onOpenBooking: () => void;
}

export default function ExitIntentPopup({ onOpenBooking }: ExitIntentPopupProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [hasShown, setHasShown] = useState(false);
  const { language } = useLanguage();

  const isRtl = language === "ar";

  useEffect(() => {
    // Check local storage so we only show this once per session
    const shown = sessionStorage.getItem("ray_exit_popup_shown");
    if (shown) {
      setHasShown(true);
      return;
    }

    const handleMouseLeave = (e: MouseEvent) => {
      // Trigger when mouse moves out of top viewport
      if (e.clientY < 20 && !hasShown) {
        setIsVisible(true);
        setHasShown(true);
        sessionStorage.setItem("ray_exit_popup_shown", "true");
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [hasShown]);

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleAction = () => {
    setIsVisible(false);
    onOpenBooking();
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" dir={isRtl ? "rtl" : "ltr"}>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm"
          />

          {/* Dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ type: "spring", duration: 0.7 }}
            className="relative w-full max-w-md overflow-hidden rounded-xl bg-white dark:bg-card-bg shadow-2xl border border-gold-mid/30 z-10 p-8 text-center"
          >
            <button
              onClick={handleClose}
              className={`absolute ${isRtl ? "left-4" : "right-4"} top-4 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 transition-colors`}
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Premium Gold Icon */}
            <div className="mx-auto w-12 h-12 rounded-full bg-gold-light/10 flex items-center justify-center mb-5 text-gold-dark border border-gold-mid/20">
              <Sparkles className="h-6 w-6" />
            </div>

            <h3 className="font-sans text-2xl text-burgundy dark:text-gold-light font-bold mb-2 tracking-wide">
              {isRtl ? "قبل أن تغادرنا" : "Before You Walk Away"}
            </h3>
            <p className="text-xs uppercase tracking-widest text-gold-dark dark:text-white/60 font-semibold mb-4">
              {isRtl ? "دعوة خاصة لتصميم ابتسامتك" : "Private Smile Architecture Invitation"}
            </p>
            
            <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed mb-6 max-w-sm mx-auto font-sans font-light">
              {isRtl
                ? "عرض حصري لزوارنا الرقميين لأول مرة. احصل على محاكاة رقمية مجانية لابتسامتك مع أخصائيينا لتشاهد النتيجة بنفسك دون أية التزامات."
                : "Exclusive to first-time digital visitors. Claim a complimentary, zero-obligation smile mockup with our elite cosmetic specialists to preview your timeless smile."}
            </p>

            <div className="space-y-3">
              <button
                onClick={handleAction}
                className="w-full bg-gold-gradient py-3 text-white rounded-lg text-xs font-semibold tracking-widest uppercase hover:brightness-105 shadow-md shadow-gold-mid/20 transition-all font-sans"
              >
                {isRtl ? "احجز جناح الاستشارة المجانية" : "Claim Consultation Suite"}
              </button>
              <button
                onClick={handleClose}
                className="w-full py-2.5 text-xs text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 transition-colors font-medium tracking-wide font-sans"
              >
                {isRtl ? "لا شكراً، أفضل المتابعة لاحقاً" : "No thank you, I prefer standard options"}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
