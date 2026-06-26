"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronDown, Globe, Sun, Moon } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface NavbarProps {
  onOpenBooking: () => void;
}

export default function Navbar({ onOpenBooking }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { language, toggleLanguage, darkMode, toggleDarkMode, t } = useLanguage();

  const isRtl = language === "ar";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: t("home"), href: "/" },
    { name: t("about"), href: "#about" },
    { name: t("services"), href: "#services" },
    { name: t("doctors"), href: "#doctors" },
    { name: t("technology"), href: "#technology" },
    { name: t("gallery"), href: "#gallery" },
    { name: t("testimonials"), href: "#testimonials" },
    { name: t("contact"), href: "#contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-700 ease-[0.22,1,0.36,1] ${
        isScrolled
          ? "bg-[#FAF6F0]/95 backdrop-blur-xl border-b border-gold-mid/15 shadow-[0_10px_30px_rgba(0,0,0,0.06)] py-3"
          : "bg-[#FAF6F0]/85 backdrop-blur-md py-4 border-b border-gold-mid/10"
      }`}
      dir={isRtl ? "rtl" : "ltr"}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link 
          href="/" 
          className="flex items-center py-1 bg-transparent border-none outline-none shadow-none filter-none after:content-none before:content-none"
          style={{ boxShadow: "none", filter: "none", background: "transparent", border: "none", outline: "none" }}
        >
          <Image
            src="/logo_v2.png"
            alt="Ray Dental Clinic Logo"
            width={160}
            height={90}
            className="object-contain h-[55px] md:h-[70px] xl:h-[85px] w-auto transition-all duration-700 ease-[0.22,1,0.36,1] hover:scale-[1.01] bg-transparent border-none outline-none shadow-none filter-none"
            style={{ boxShadow: "none", filter: "none", background: "transparent", border: "none", outline: "none" }}
            priority
          />
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center gap-7">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-[10px] uppercase tracking-[0.25em] text-neutral-800 hover:text-gold-dark font-semibold transition-colors font-sans relative group py-1.5"
            >
              <span>{link.name}</span>
              <span className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-gold-mid to-gold-dark scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-[0.22,1,0.36,1] origin-left" />
            </Link>
          ))}
        </nav>

        {/* Desktop Actions (Switcher + Appointment CTA) */}
        <div className="hidden xl:flex items-center gap-4">
          {/* Language Toggle Button */}
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-gold-mid/30 text-neutral-800 hover:border-gold-mid hover:text-gold-dark text-xs font-bold tracking-wider transition-all duration-700 ease-[0.22,1,0.36,1] uppercase cursor-pointer"
          >
            <Globe className="h-3.5 w-3.5 text-gold-mid" />
            <span>{isRtl ? "English" : "عربي"}</span>
          </button>

          <button
            onClick={onOpenBooking}
            className="btn-primary-luxury px-6 py-2.5 !text-[9px] rounded-full"
          >
            {t("bookConsultation")}
          </button>
        </div>

        {/* Mobile Actions Container */}
        <div className="flex xl:hidden items-center gap-3">
          {/* Language Switcher (Mobile) */}
          <button
            onClick={toggleLanguage}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-gold-mid/30 text-neutral-800 text-xs font-bold transition-all duration-700 hover:border-gold-mid cursor-pointer"
          >
            {isRtl ? "EN" : "ع"}
          </button>

          {/* Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-gold-mid hover:text-gold-dark transition-colors cursor-pointer"
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="xl:hidden bg-[#FAF6F0] border-b border-gold-mid/15 py-8 px-6 space-y-6 shadow-2xl transition-all duration-700 ease-[0.22,1,0.36,1]">
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-xs uppercase tracking-widest text-[#4A0A16] hover:text-[#C9A227] active:text-[#8B6B1F] font-bold py-1.5 border-b border-[#C9A227]/20 font-sans transition-colors duration-500"
              >
                {link.name}
              </Link>
            ))}
          </nav>
          
          <button
            onClick={() => {
              setIsMobileMenuOpen(false);
              onOpenBooking();
            }}
            className="w-full btn-primary-luxury py-3.5 text-xs rounded-full"
          >
            {t("bookConsultation")}
          </button>
        </div>
      )}
    </header>
  );
}
