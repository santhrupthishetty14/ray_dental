"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sliders, X, Palette, Type, Grid, Users, Layout } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function DesignSystemInspector() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"colors" | "typography" | "spacing" | "components" | "personas">("colors");
  const { language } = useLanguage();

  const isRtl = language === "ar";

  const tabs = [
    { id: "colors", label: isRtl ? "الألوان" : "Colors", icon: Palette },
    { id: "typography", label: isRtl ? "الخطوط" : "Typography", icon: Type },
    { id: "spacing", label: isRtl ? "المسافات" : "Spacing", icon: Grid },
    { id: "personas", label: isRtl ? "الفئات المستهدفة" : "UX Personas", icon: Users },
  ];

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-20 ${
          isRtl ? "left-6" : "right-6"
        } z-40 bg-burgundy border border-gold-mid text-gold-light hover:text-white px-4 py-2.5 rounded-full shadow-2xl flex items-center gap-2 text-xs font-semibold tracking-wider uppercase transition-all duration-300 hover:scale-105`}
      >
        <Sliders className="h-4 w-4" />
        <span>{isRtl ? "مواصفات التصميم UI/UX" : "UI/UX Design Spec"}</span>
      </button>

      {/* Slide-up Drawer */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-end justify-center pointer-events-none">
            {/* Clickable Overlay to close */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm pointer-events-auto"
            />

            {/* Drawer Container */}
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="w-full max-w-5xl h-[65vh] bg-white rounded-t-2xl shadow-2xl border-t border-gold-mid/30 pointer-events-auto flex flex-col relative overflow-hidden"
            >
              {/* Header */}
              <div className="bg-burgundy px-6 py-4 flex items-center justify-between border-b border-gold-mid/20 text-white shrink-0">
                <div className="flex items-center gap-3">
                  <Sliders className="h-5 w-5 text-gold-light" />
                  <div>
                    <h3 className="font-serif text-lg text-gold-light tracking-wide">
                      {isRtl ? "لوحة مواصفات التصميم ونظام المكونات" : "Bilingual UI/UX Design System Board"}
                    </h3>
                    <p className="text-[10px] text-white/60 tracking-wider uppercase font-sans">
                      {isRtl ? "تفاصيل الهوية البصرية وتجربة المستخدم" : "Interactive Spec sheet for Ray Dental Clinic LLC"}
                    </p>
                  </div>
                </div>
                
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 rounded-full hover:bg-white/10 text-white/80 hover:text-white transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Navigation Tabs */}
              <div className="bg-neutral-50 px-6 py-2 border-b border-neutral-200 flex gap-2 overflow-x-auto shrink-0 scrollbar-none">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold tracking-wide uppercase transition-colors shrink-0 ${
                        activeTab === tab.id
                          ? "bg-burgundy text-gold-light border border-gold-mid/20"
                          : "text-neutral-600 hover:bg-neutral-100"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Tab Panel Body */}
              <div className="p-6 overflow-y-auto flex-grow bg-white">
                {activeTab === "colors" && (
                  <div className="space-y-6 animate-fade-in">
                    <div>
                      <h4 className="font-serif text-sm font-semibold text-burgundy mb-2">Primary Color Palette</h4>
                      <p className="text-xs text-neutral-500 mb-4">The core luxury identity colors mapped to CSS variables for uniform branding.</p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {/* Burgundy */}
                        <div className="border border-neutral-100 rounded-lg p-3 space-y-3">
                          <div className="w-full h-16 rounded bg-[#5E0527] border border-black/5" />
                          <div>
                            <span className="text-xs font-bold text-neutral-800 block">Deep Burgundy</span>
                            <span className="text-[10px] text-neutral-400 font-mono block">#5E0527 | var(--color-burgundy)</span>
                            <span className="text-[9px] text-neutral-500 uppercase block font-semibold mt-1">Primary Brand Color</span>
                          </div>
                        </div>

                        {/* Gold Gradient */}
                        <div className="border border-neutral-100 rounded-lg p-3 space-y-3">
                          <div className="w-full h-16 rounded bg-gold-gradient border border-black/5" />
                          <div>
                            <span className="text-xs font-bold text-neutral-800 block">Luxury Gold Gradient</span>
                            <span className="text-[10px] text-neutral-400 font-mono block">#C89B3C → #E8C96B</span>
                            <span className="text-[9px] text-neutral-500 uppercase block font-semibold mt-1">Accent Details & CTA</span>
                          </div>
                        </div>

                        {/* Ice Blue */}
                        <div className="border border-neutral-100 rounded-lg p-3 space-y-3">
                          <div className="w-full h-16 rounded bg-[#EAF5FA] border border-black/5" />
                          <div>
                            <span className="text-xs font-bold text-neutral-800 block">Ice Blue</span>
                            <span className="text-[10px] text-neutral-400 font-mono block">#EAF5FA | var(--color-ice-blue)</span>
                            <span className="text-[9px] text-neutral-500 uppercase block font-semibold mt-1">Secondary BG Accent</span>
                          </div>
                        </div>

                        {/* Dark Text */}
                        <div className="border border-neutral-100 rounded-lg p-3 space-y-3">
                          <div className="w-full h-16 rounded bg-[#1A1A1A] border border-black/5" />
                          <div>
                            <span className="text-xs font-bold text-neutral-800 block">Luxury Charcoal</span>
                            <span className="text-[10px] text-neutral-400 font-mono block">#1A1A1A | Text Primary</span>
                            <span className="text-[9px] text-neutral-500 uppercase block font-semibold mt-1">Strict Typography</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "typography" && (
                  <div className="space-y-6 animate-fade-in">
                    <div>
                      <h4 className="font-serif text-sm font-semibold text-burgundy mb-2">Bilingual Font Pairing scale</h4>
                      <p className="text-xs text-neutral-500 mb-4">Carefully paired typography reflecting premium healthcare trust and cultural alignment for Arab audiences.</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* English Hierarchy */}
                        <div className="border border-neutral-100 rounded-lg p-4 space-y-4">
                          <span className="text-[10px] uppercase font-bold text-gold-dark tracking-widest block">English (LTR) Fonts</span>
                          <div className="space-y-2 border-b border-neutral-100 pb-3">
                            <span className="text-[9px] uppercase tracking-widest text-neutral-400 font-semibold block">Primary Brand Typography (Montserrat)</span>
                            <span className="font-sans text-3xl text-burgundy block font-light">Crafting Confident Smiles</span>
                            <span className="text-[10px] text-neutral-400 font-mono block">font-sans | Light 300, Regular 400, Medium 500, Bold 700</span>
                          </div>
                          <div className="space-y-2">
                            <span className="text-[9px] uppercase tracking-widest text-neutral-400 font-semibold block">Hierarchy Weight</span>
                            <span className="font-sans text-sm text-neutral-800 block leading-relaxed">
                              Advanced cosmetic and restorative dentistry delivered with exceptional care and world-class expertise.
                            </span>
                            <span className="text-[10px] text-neutral-400 font-mono block">Montserrat spans both headers and body text.</span>
                          </div>
                        </div>

                        {/* Arabic Hierarchy */}
                        <div className="border border-neutral-100 rounded-lg p-4 space-y-4 text-right" dir="rtl">
                          <span className="text-[10px] uppercase font-bold text-gold-dark tracking-widest block">العربية (RTL) الخطوط</span>
                          <div className="space-y-2 border-b border-neutral-100 pb-3">
                            <span className="text-[9px] uppercase tracking-widest text-neutral-400 font-semibold block">خط الهوية العربية الرئيسي (Tajawal)</span>
                            <span className="font-sans text-2xl text-burgundy block font-light">نصنع ابتسامات واثقة بدقة واحترافية</span>
                            <span className="text-[10px] text-neutral-400 font-mono block">font-tajawal | وزن خفيف، منتظم، عريض، سميك</span>
                          </div>
                          <div className="space-y-2">
                            <span className="text-[9px] uppercase tracking-widest text-neutral-400 font-semibold block">تناسق النصوص والفقرات</span>
                            <span className="font-sans text-sm text-neutral-800 block leading-relaxed">
                              أحدث تقنيات طب الأسنان التجميلي والترميمي المقدمة برعاية استثنائية وخبرات عالمية.
                            </span>
                            <span className="text-[10px] text-neutral-400 font-mono block">Tajawal يغطي العناوين والفقرات العربية بالتساوي.</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "spacing" && (
                  <div className="space-y-6 animate-fade-in">
                    <div>
                      <h4 className="font-serif text-sm font-semibold text-burgundy mb-2">Luxury Editorial Spacing Scale</h4>
                      <p className="text-xs text-neutral-500 mb-4">Adhering to whitespace-heavy, premium resort aesthetics with clear structural divisions.</p>
                      
                      <div className="border border-neutral-100 rounded-lg overflow-hidden">
                        <table className="w-full text-left border-collapse text-xs">
                          <thead>
                            <tr className="bg-neutral-50 border-b border-neutral-200 text-neutral-600 font-semibold">
                              <th className="p-3">Scale Name</th>
                              <th className="p-3">Value</th>
                              <th className="p-3">Usage Application</th>
                              <th className="p-3">Visual representation</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-neutral-100 text-neutral-700">
                            <tr>
                              <td className="p-3 font-semibold">Micro Space</td>
                              <td className="p-3 font-mono">8px / 0.5rem</td>
                              <td className="p-3">Gaps between small labels and subtitle tags</td>
                              <td className="p-3"><div className="h-2 w-12 bg-gold-mid/30 rounded" /></td>
                            </tr>
                            <tr>
                              <td className="p-3 font-semibold">Card Padding</td>
                              <td className="p-3 font-mono">24px / 1.5rem</td>
                              <td className="p-3">Padding inside services and indicators cards</td>
                              <td className="p-3"><div className="h-6 w-12 bg-gold-mid/30 rounded" /></td>
                            </tr>
                            <tr>
                              <td className="p-3 font-semibold">Boutique Spacing</td>
                              <td className="p-3 font-mono">96px / 6rem</td>
                              <td className="p-3">Hero top padding, large grid gaps</td>
                              <td className="p-3"><div className="h-10 w-12 bg-gold-mid/30 rounded" /></td>
                            </tr>
                            <tr>
                              <td className="p-3 font-semibold">Cinematic Padding</td>
                              <td className="p-3 font-mono">160px / 10rem</td>
                              <td className="p-3">Inter-section gaps (About stories, specialists)</td>
                              <td className="p-3"><div className="h-16 w-12 bg-gold-mid/30 rounded" /></td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "personas" && (
                  <div className="space-y-6 animate-fade-in">
                    <div>
                      <h4 className="font-serif text-sm font-semibold text-burgundy mb-2">UAE Audience Segmentation (UX Personas)</h4>
                      <p className="text-xs text-neutral-500 mb-4">How our design system directly addresses key audiences in Dubai & Abu Dhabi.</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Family Patient */}
                        <div className="border border-neutral-100 rounded-lg p-4 bg-ice-blue/20 space-y-3">
                          <span className="px-2.5 py-0.5 rounded-full bg-burgundy/10 text-burgundy text-[9px] font-bold uppercase tracking-wide inline-block">
                            Persona 1: Family Patient
                          </span>
                          <h5 className="font-serif text-sm text-neutral-800 font-semibold">Mona Al-Mansoori (Emirati Family)</h5>
                          <p className="text-[11px] text-neutral-600 leading-relaxed font-light">
                            <strong>UX Priority:</strong> Clinical trust, certified specialists, Arabic layout readability, and easy pediatric scheduling.
                          </p>
                          <p className="text-[11px] text-neutral-500 font-light">
                            <strong>UX Design Response:</strong> Grayscale insurance partner wall, specialized doctors qualifications, and direct Arabic appointment suites.
                          </p>
                        </div>

                        {/* Cosmetic Client */}
                        <div className="border border-neutral-100 rounded-lg p-4 bg-gold-light/10 space-y-3">
                          <span className="px-2.5 py-0.5 rounded-full bg-gold-dark/10 text-gold-dark text-[9px] font-bold uppercase tracking-wide inline-block">
                            Persona 2: Cosmetic client
                          </span>
                          <h5 className="font-serif text-sm text-neutral-800 font-semibold">Alessandra V. (Expat Fashion)</h5>
                          <p className="text-[11px] text-neutral-600 leading-relaxed font-light">
                            <strong>UX Priority:</strong> Before & after comparison, premium visual aesthetics, visual smile makeovers, and WhatsApp quick concierge.
                          </p>
                          <p className="text-[11px] text-neutral-500 font-light">
                            <strong>UX Design Response:</strong> Dual-layer Before & After slider, high-contrast gold shimmers, and float WhatsApp icon.
                          </p>
                        </div>

                        {/* Medical Tourist */}
                        <div className="border border-neutral-100 rounded-lg p-4 bg-neutral-50 space-y-3">
                          <span className="px-2.5 py-0.5 rounded-full bg-neutral-200 text-neutral-600 text-[9px] font-bold uppercase tracking-wide inline-block">
                            Persona 3: Medical Tourist
                          </span>
                          <h5 className="font-serif text-sm text-neutral-800 font-semibold">Richard K. (GCC Executive)</h5>
                          <p className="text-[11px] text-neutral-600 leading-relaxed font-light">
                            <strong>UX Priority:</strong> Treatment process timeline, credentials, English-first layout, and Jumeirah map pins.
                          </p>
                          <p className="text-[11px] text-neutral-500 font-light">
                            <strong>UX Design Response:</strong> Linear step roadmap, global English layout toggle, and interactive contact page directions.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
