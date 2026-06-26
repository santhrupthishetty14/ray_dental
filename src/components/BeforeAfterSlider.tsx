"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

export default function BeforeAfterSlider() {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { language, t } = useLanguage();

  const isRtl = language === "ar";

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const position = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(position);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-video md:aspect-[2.35/1] rounded-[24px] overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.4)] border border-gold-mid/25 cursor-ew-resize select-none"
      onMouseDown={() => setIsDragging(true)}
      onMouseUp={() => setIsDragging(false)}
      onMouseLeave={() => setIsDragging(false)}
      onMouseMove={handleMouseMove}
      onTouchStart={() => setIsDragging(true)}
      onTouchEnd={() => setIsDragging(false)}
      onTouchMove={handleTouchMove}
    >
      {/* After Image (Right/Full Background) */}
      <div className="absolute inset-0 w-full h-full bg-neutral-900">
        <Image
          src="/smile.png"
          alt="After Smile Makeover"
          fill
          sizes="100vw"
          className="object-cover pointer-events-none"
          priority
        />
        <div className={`absolute bottom-4 ${isRtl ? "left-4" : "right-4"} bg-black/60 backdrop-blur-sm text-white px-3 py-1 rounded text-[10px] tracking-widest font-semibold uppercase font-sans`}>
          {t("afterLabel")}
        </div>
      </div>

      {/* Before Image (Left/Overlay Clip) */}
      <div
        className="absolute inset-0 w-full h-full bg-neutral-900 overflow-hidden pointer-events-none"
        style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
      >
        <Image
          src="/smile.png"
          alt="Before Smile Treatment"
          fill
          sizes="100vw"
          className="object-cover pointer-events-none filter sepia-[0.35] saturate-[0.7] hue-rotate-[340deg]"
          priority
        />
        <div className={`absolute bottom-4 ${isRtl ? "right-4" : "left-4"} bg-black/60 backdrop-blur-sm text-white px-3 py-1 rounded text-[10px] tracking-widest font-semibold uppercase font-sans`}>
          {t("beforeLabel")}
        </div>
      </div>


      {/* Slider Bar & Handle */}
      <div
        className="absolute top-0 bottom-0 w-0.5 bg-gold-gradient cursor-ew-resize"
        style={{ left: `${sliderPosition}%` }}
      >
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-[#150106]/95 border-2 border-gold-mid shadow-[0_0_25px_rgba(200,155,60,0.35)] flex items-center justify-center pointer-events-none transition-transform duration-500">
          {/* Inner ring */}
          <div className="w-7 h-7 rounded-full border border-gold-light/40 flex items-center justify-center bg-transparent">
            {/* Center core dot */}
            <span className="w-2 h-2 rounded-full bg-gold-gradient"></span>
          </div>
        </div>
      </div>
    </div>
  );
}
