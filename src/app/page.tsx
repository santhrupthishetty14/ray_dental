"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Award,
  Cpu,
  UserCheck,
  Heart,
  ArrowRight,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Star,
  MapPin,
  Phone,
  Mail,
  Clock,
  ExternalLink,
  ShieldCheck,
  Video,
} from "lucide-react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookingModal from "@/components/BookingModal";
import ExitIntentPopup from "@/components/ExitIntentPopup";
import FloatingWidgets from "@/components/FloatingWidgets";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import DesignSystemInspector from "@/components/DesignSystemInspector";
import { useLanguage } from "@/context/LanguageContext";

export default function Home() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [activeReviewIndex, setActiveReviewIndex] = useState(0);
  const [activeDoctorIndex, setActiveDoctorIndex] = useState(0);
  const [showSpec, setShowSpec] = useState(false);
  const [activeLounge, setActiveLounge] = useState<"female" | "male">("female");
  const { language, t } = useLanguage();
  
  // State for Booking Form on homepage
  const [bookingName, setBookingName] = useState("");
  const [bookingPhone, setBookingPhone] = useState("");
  const [bookingEmail, setBookingEmail] = useState("");
  const [bookingService, setBookingService] = useState("");
  const [bookingDate, setBookingDate] = useState("");
  const [isBooked, setIsBooked] = useState(false);

  const isRtl = language === "ar";

  const openBooking = () => setIsBookingOpen(true);
  const closeBooking = () => setIsBookingOpen(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      if (params.get("spec") === "true") {
        setShowSpec(true);
      }
    }
  }, []);

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsBooked(true);

    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY || "YOUR_ACCESS_KEY_HERE";
    if (accessKey && accessKey !== "YOUR_ACCESS_KEY_HERE") {
      try {
        await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            access_key: accessKey,
            subject: `New Booking Request from ${bookingName}`,
            from_name: "Ray Dental Website Form",
            name: bookingName,
            phone: bookingPhone,
            email: bookingEmail,
            service: bookingService,
            date: bookingDate,
            message: `Suite booking requested via homepage form.`
          }),
        });
      } catch (err) {
        console.error("Form submission error:", err);
      }
    }

    setTimeout(() => {
      setIsBooked(false);
      setBookingName("");
      setBookingPhone("");
      setBookingEmail("");
      setBookingService("");
      setBookingDate("");
    }, 6000);
  };

  const services = [
    { name: t("service1Name"), desc: t("service1Desc"), slug: "implants", hasPage: true, img: "/service_implants.png", count: "01", isFeatured: true },
    { name: t("service2Name"), desc: t("service2Desc"), slug: "veneers", hasPage: true, img: "/service_veneers.png", count: "02", isFeatured: true },
    { name: t("service3Name"), desc: t("service3Desc"), slug: "orthodontics", hasPage: true, img: "/service_aligners.png", count: "03", isFeatured: true },
    { name: t("service4Name"), desc: t("service4Desc"), slug: "crowns-bridges", hasPage: false, isFeatured: false },
    { name: t("service5Name"), desc: t("service5Desc"), slug: "sleep-apnea", hasPage: false, isFeatured: false },
    { name: t("service6Name"), desc: t("service6Desc"), slug: "oral-surgery", hasPage: false, isFeatured: false },
    { name: t("service7Name"), desc: t("service7Desc"), slug: "tmj-treatment", hasPage: false, isFeatured: false },
    { name: t("service8Name"), desc: t("service8Desc"), slug: "root-canal", hasPage: true, isFeatured: false },
    { name: t("service9Name"), desc: t("service9Desc"), slug: "sedation-dentistry", hasPage: false, isFeatured: false },
    { name: t("service10Name"), desc: t("service10Desc"), slug: "whitening", hasPage: true, isFeatured: false },
    { name: t("service11Name"), desc: t("service11Desc"), slug: "dentures-partials", hasPage: false, isFeatured: false },
    { name: t("service12Name"), desc: t("service12Desc"), slug: "digital-diagnostics", hasPage: false, isFeatured: false },
  ];

  const doctors = [
    {
      name: t("doc4Name"),
      role: t("doc4Role"),
      bio: t("doc4Bio"),
      specialty: t("doc4Specialty"),
      credentials: t("doc4Credentials"),
      experience: t("doc4Experience"),
      image: "/dr_shereef.jpg",
      badge: isRtl ? "تجميل الأسنان" : "Cosmetic Dentist",
      tag: isRtl ? "المؤسس والرئيس التنفيذي" : "Founder and CEO"
    },
    {
      name: t("doc5Name"),
      role: t("doc5Role"),
      bio: t("doc5Bio"),
      specialty: t("doc5Specialty"),
      credentials: t("doc5Credentials"),
      experience: t("doc5Experience"),
      image: "/dr_wujithan.jpg",
      badge: isRtl ? "جراحة وعلاج عصب" : "Dental Surgeon & Endodontist",
      tag: isRtl ? "المؤسس والمدير المالي" : "Founder and CFO"
    },
    {
      name: t("doc6Name"),
      role: t("doc6Role"),
      bio: t("doc6Bio"),
      specialty: t("doc6Specialty"),
      credentials: t("doc6Credentials"),
      experience: t("doc6Experience"),
      image: "/dr_salam.jpg",
      badge: isRtl ? "طبيب أسنان عام" : "General Dentist",
      tag: isRtl ? "الرئيس التنفيذي للعمليات" : "Chief Operating Officer"
    },
    {
      name: t("doc7Name"),
      role: t("doc7Role"),
      bio: t("doc7Bio"),
      specialty: t("doc7Specialty"),
      credentials: t("doc7Credentials"),
      experience: t("doc7Experience"),
      image: "/dr_farook.png",
      badge: isRtl ? "علاج جذور وتجميل" : "Endodontics & Esthetics",
      tag: isRtl ? "طبيب أسنان عام" : "General Dentist"
    }
  ];

  const stats = [
    { label: t("stat2Label"), num: t("stat2Num"), icon: Award },
    { label: t("stat1Label"), num: t("stat1Num"), icon: Heart },
    { label: t("stat3Label"), num: t("stat3Num"), icon: ShieldCheck },
    { label: t("stat4Label"), num: t("stat4Num"), icon: Cpu },
  ];

  const reviews = [
    {
      text: t("review1Text"),
      author: t("review1Author"),
      location: t("review1Loc"),
      rating: 5,
    },
    {
      text: t("review2Text"),
      author: t("review2Author"),
      location: t("review2Loc"),
      rating: 5,
    },
    {
      text: t("review3Text"),
      author: t("review3Author"),
      location: t("review3Loc"),
      rating: 5,
    },
  ];

  const handleNextReview = () => {
    setActiveReviewIndex((prev) => (prev + 1) % reviews.length);
  };

  const handlePrevReview = () => {
    setActiveReviewIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  return (
    <>
      <Navbar onOpenBooking={openBooking} />

      <main className="flex-grow bg-burgundy-black transition-colors duration-300" dir={isRtl ? "rtl" : "ltr"}>
        
        {/* 1. Asymmetrical High-Fashion Hero Section (Polaris-Style Layout) */}
        <section className="relative min-h-[110vh] flex items-center bg-[#150106] overflow-hidden">
          {/* Subtle warm gold spotlight in background */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(200,155,60,0.06)_0%,_transparent_70%)] pointer-events-none z-10" />
          <div className="absolute top-0 right-1/4 w-[600px] h-[600px] rounded-full bg-gold-light/5 blur-3xl pointer-events-none" />

          <div className="w-full grid grid-cols-1 lg:grid-cols-12 min-h-[110vh] items-stretch relative z-10">
            {/* Left Column: Premium Editorial Content */}
            <div className={`lg:col-span-7 flex flex-col justify-center pt-28 pb-12 md:pt-36 md:pb-24 lg:pt-48 lg:pb-36 px-6 md:px-12 xl:px-20 relative z-20 ${isRtl ? "text-right order-first lg:order-last border-r border-gold-mid/10" : "text-left border-l border-gold-mid/10"}`}>
              <div className="space-y-6 max-w-2xl">


                {/* Editorial Headline */}
                <motion.h1
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.3, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  className="font-serif tracking-tight leading-[1.05] text-white"
                >
                  <span className="block text-[38px] sm:text-6xl lg:text-[72px] xl:text-[80px] font-light leading-[1.05] uppercase">
                    {t("heroTitleMain")}
                  </span>
                  <span className="block text-[28px] sm:text-5xl lg:text-[56px] xl:text-[64px] font-extrabold italic text-gold-gradient mt-4 leading-[1.05]">
                    {t("heroTitleSub")}
                  </span>
                </motion.h1>

                {/* Subheadline description */}
                <motion.p
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.3, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="text-neutral-300 text-base md:text-lg font-light leading-relaxed font-sans max-w-xl"
                >
                  {t("heroSubtitle")}
                </motion.p>

                {/* CTAs */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.3, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-wrap items-center gap-6 pt-2"
                >
                  <button
                    onClick={openBooking}
                    className="btn-primary-luxury"
                  >
                    {t("bookConsultation")}
                  </button>
                  <a
                    href="#services"
                    className="inline-flex items-center gap-2 group text-[11px] font-bold tracking-[0.2em] uppercase text-gold-light font-sans relative py-1"
                  >
                    <span>{t("exploreTreatments")}</span>
                    <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1.5 transition-transform duration-700 ease-[0.22,1,0.36,1]" />
                    <span className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-gold-mid to-gold-light scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-[0.22,1,0.36,1] origin-left" />
                  </a>
                </motion.div>
              </div>
            </div>

            {/* Right Column: Tall Clinic Interior Photo with subtle side border */}
            <div className={`lg:col-span-5 relative block w-full h-[280px] md:h-[400px] lg:h-auto bg-neutral-950 overflow-hidden ${isRtl ? "order-first" : ""} luxury-vignette`}>
              <motion.div 
                className="w-full h-full relative luxury-gold-filter"
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <Image
                  src="/clinic_reception.jpg"
                  alt="Ray Dental Clinic Reception Lobby"
                  fill
                  className="object-cover"
                  priority
                />
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-r from-burgundy-black/20 to-transparent pointer-events-none z-20" />
              
              {/* Gold gradient line detail */}
              <div className="absolute top-0 bottom-0 left-0 w-[1px] bg-gold-gradient opacity-35 z-20" />
            </div>
          </div>

          {/* Armordent-inspired Hero Fold Menu bar */}
          <div className="absolute bottom-8 left-6 right-6 z-20 hidden lg:block">
            <div className="max-w-7xl mx-auto glass-morphism-dark rounded-2xl p-2 border border-gold-mid/10 shadow-2xl">
              <div className="flex items-center w-full justify-around text-[10px] font-semibold uppercase tracking-[0.25em] text-neutral-200 font-sans">
                <a href="#gallery" className="hover:text-gold-mid transition-colors px-6 py-3 rounded-xl hover:bg-white/5">
                  {isRtl ? "معرض الحالات" : "Our Cases"}
                </a>
                <div className="h-6 w-[1px] bg-gold-mid/20" />
                <span className="text-gold-light px-6 py-3 font-bold bg-white/5 rounded-xl border border-gold-mid/10">
                  {isRtl ? "١٥,٠٠٠+ حالة تم علاجها" : "15,000+ Cases Treated"}
                </span>
                <div className="h-6 w-[1px] bg-gold-mid/20" />
                <a href="#about" className="hover:text-gold-mid transition-colors px-6 py-3 rounded-xl hover:bg-white/5">
                  {isRtl ? "قصة إرثنا" : "About Us"}
                </a>
                <div className="h-6 w-[1px] bg-gold-mid/20" />
                <a href="#doctors" className="hover:text-gold-mid transition-colors px-6 py-3 rounded-xl hover:bg-white/5">
                  {isRtl ? "الفريق الطبي" : "Team"}
                </a>
                <div className="h-6 w-[1px] bg-gold-mid/20" />
                <a href="#technology" className="hover:text-gold-mid transition-colors px-6 py-3 rounded-xl hover:bg-white/5">
                  {isRtl ? "لماذا تختارنا" : "Why Choose Us"}
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Gold transition separator */}
        <div className="divider-gold-glow relative z-20" />

        {/* 2. Stats Bar (Polaris Style) */}
        <section className="bg-[#150106] py-14 md:py-20 lg:py-24 border-b border-gold-mid/10 transition-colors duration-300">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 items-center justify-center">
              {stats.map((stat, idx) => (
                <div key={idx} className={`flex flex-col items-center justify-center text-center px-4 ${idx !== stats.length - 1 ? "lg:border-r border-gold-mid/15" : ""}`}>
                  <span className="font-extralight text-5xl sm:text-6xl text-gold-light block leading-none mb-2">
                    {stat.num}
                  </span>
                  <span className="text-[9px] uppercase tracking-luxury-wide text-neutral-400 font-bold font-sans">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Gold transition separator */}
        <div className="divider-gold-glow relative z-20" />

        {/* 3. About Clinic Section (Polaris & Armordent Style) */}
        <section id="about" className="py-20 md:py-32 lg:py-44 bg-[#150106] transition-colors duration-300 px-6">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* Story texts on the left */}
            <div className={`lg:col-span-7 space-y-8 ${isRtl ? "text-right" : "text-left"}`}>
              <span className="text-[11px] uppercase tracking-luxury-wide font-bold text-gold-light font-sans block">
                {isRtl ? "تراثنا الممتد لـ ٦ عقود" : "OUR 60-YEAR LEGACY"}
              </span>
              <h2 className="font-serif text-4xl sm:text-5xl lg:text-[54px] leading-tight text-white font-light">
                {isRtl ? "فن الدقة وجماليات الابتسامة" : "The Art of Precision & Smile Aesthetics"}
              </h2>
              <div className="w-16 h-0.5 bg-gold-gradient mt-4" />

              <p className="text-body-luxury text-neutral-300 font-light leading-relaxed font-sans">
                {t("expText1")}
              </p>
              <p className="text-body-luxury text-neutral-300 font-light leading-relaxed font-sans">
                {t("expText2")}
              </p>
              <div className="pt-4">
                <button
                  onClick={openBooking}
                  className="inline-flex items-center gap-2 group text-[11px] font-bold tracking-[0.2em] uppercase text-gold-light font-sans cursor-pointer relative py-1"
                >
                  <span>{t("discoverOurClinic")}</span>
                  <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1.5 transition-transform duration-700 ease-[0.22,1,0.36,1]" />
                  <span className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-gold-mid to-gold-light scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-[0.22,1,0.36,1] origin-left" />
                </button>
              </div>
            </div>

            {/* Immersive Photo on the right (Overlapping Rounded Style) */}
            <div className="w-full lg:col-span-5 relative aspect-[4/5] rounded-[36px] overflow-hidden shadow-[0_0_35px_rgba(200,155,60,0.12)] border border-gold-mid/20 group luxury-vignette">
              <motion.div 
                className="w-full h-full relative luxury-gold-filter"
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              >
                <Image
                  src="/clinic_treatment.jpg"
                  alt="Ray Dental Elite Treatment Suite"
                  fill
                  className="object-cover"
                />
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-t from-burgundy-black/40 to-transparent pointer-events-none z-20" />
              
              {/* Floating Badge */}
              <div className="absolute bottom-6 right-6 p-5 bg-[#150106]/95 backdrop-blur-md rounded-2xl border border-gold-mid/20 shadow-xl max-w-[220px] z-20">
                <span className="text-[9px] uppercase tracking-wider text-gold-light font-bold block mb-1">
                  {isRtl ? "رعاية خمس نجوم" : "5-STAR COMFORT"}
                </span>
                <p className="text-[10px] text-neutral-300 font-light leading-snug font-sans">
                  {isRtl ? "استمتع بأجنحة مهدئة وعزل تام للضوضاء." : "Indulge in noise-canceling suites and calming amenities."}
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* Gold transition separator */}
        <div className="divider-gold-glow relative z-20" />

        {/* 3.5. Prestige Plaque & Private Waiting Lounges Section */}
        <section className="py-20 md:py-32 lg:py-44 bg-[#150106] transition-colors duration-300 px-6 border-b border-gold-mid/10">
          <div className="max-w-7xl mx-auto space-y-24">
            
            {/* Part 1: UAE Commemorative Plaque Showcase */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
              {/* Plaque Image on the left */}
              <div className="w-full lg:col-span-6 relative aspect-[16/10] rounded-[24px] overflow-hidden shadow-[0_0_35px_rgba(200,155,60,0.12)] border border-gold-mid/25 group luxury-vignette">
                <motion.div 
                  className="w-full h-full relative luxury-gold-filter"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Image
                    src="/clinic_plaque.jpg"
                    alt="Ray Dental Clinic UAE Commemorative Plaque"
                    fill
                    className="object-cover"
                  />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-t from-burgundy-black/15 to-transparent pointer-events-none z-20" />
              </div>

              {/* Plaque text details on the right */}
              <div className="lg:col-span-6 space-y-6">
                <div className="inline-flex items-center gap-3">
                  <div className="h-1 w-8 bg-gold-gradient rounded-full" />
                  <span className="text-[11px] uppercase tracking-luxury-wide font-bold text-gold-light font-sans block">
                    {t("plaqueTextTitle")}
                  </span>
                </div>
                <h3 className="font-serif text-3xl sm:text-4xl text-white font-light">
                  {isRtl ? "تجسيد السلام والاستشفاء" : "A Sanctuary of Healing & Peace"}
                </h3>
                <div className="p-8 rounded-2xl bg-[#25020D]/60 border border-gold-mid/15 shadow-xl relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1.5 h-full bg-gold-gradient" />
                  <p className="text-body-luxury text-gold-light/90 italic font-serif leading-relaxed tracking-wide">
                    "{t("plaqueBodyText")}"
                  </p>
                </div>
              </div>
            </div>

            {/* Part 2: Private Waiting Lounges Switcher */}
            <div className="space-y-16">
              <div className="text-center space-y-4 max-w-3xl mx-auto">
                <span className="text-[11px] uppercase tracking-luxury-wide font-bold text-gold-light font-sans block">
                  {t("loungeSectionTitle")}
                </span>
                <h3 className="font-serif text-4xl sm:text-5xl text-white font-light">
                  {isRtl ? "صالونات الانتظار النخبوية الخاصة" : "Private Lounge Suites"}
                </h3>
                <p className="text-sm text-neutral-350 font-light font-sans leading-relaxed max-w-2xl mx-auto">
                  {t("loungeSectionSubtitle")}
                </p>
                <div className="w-16 h-0.5 bg-gold-gradient mx-auto mt-6" />
              </div>

              {/* Tab Switcher Buttons */}
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => setActiveLounge("female")}
                  className={`px-8 py-3.5 rounded-full text-xs font-bold tracking-widest uppercase transition-all duration-700 ease-[0.22,1,0.36,1] cursor-pointer ${
                    activeLounge === "female"
                      ? "bg-gold-gradient text-burgundy-black shadow-[0_0_20px_rgba(200,155,60,0.25)] border border-transparent"
                      : "border border-gold-mid/20 text-neutral-300 hover:border-gold-mid/60 hover:text-gold-light"
                  }`}
                >
                  {t("loungeFemaleTab")}
                </button>
                <button
                  onClick={() => setActiveLounge("male")}
                  className={`px-8 py-3.5 rounded-full text-xs font-bold tracking-widest uppercase transition-all duration-700 ease-[0.22,1,0.36,1] cursor-pointer ${
                    activeLounge === "male"
                      ? "bg-gold-gradient text-burgundy-black shadow-[0_0_20px_rgba(200,155,60,0.25)] border border-transparent"
                      : "border border-gold-mid/20 text-neutral-300 hover:border-gold-mid/60 hover:text-gold-light"
                  }`}
                >
                  {t("loungeMaleTab")}
                </button>
              </div>

              {/* Interactive Lounge Image Display with Framer Motion Cross-fade */}
              <div className="max-w-4xl mx-auto relative aspect-[16/10] rounded-[36px] overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.3)] border border-gold-mid/15 luxury-vignette">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeLounge}
                    initial={{ opacity: 0, scale: 1.01 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.01 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0 w-full h-full luxury-gold-filter"
                  >
                    <Image
                      src={activeLounge === "female" ? "/lounge_female.jpg" : "/lounge_male.jpg"}
                      alt={activeLounge === "female" ? "Ray Dental Female Private Lounge" : "Ray Dental Male Private Lounge"}
                      fill
                      className="object-cover"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-burgundy-black/20 via-transparent to-transparent pointer-events-none z-10" />
                    
                    {/* Bottom Label overlay */}
                    <div className="absolute bottom-8 left-8 right-8 flex items-center justify-between z-20">
                      <div className="space-y-1 ltr:text-left rtl:text-right">
                        <span className="text-[10px] uppercase tracking-luxury-wide text-gold-light font-bold">
                          {activeLounge === "female" ? t("loungeFemaleTab") : t("loungeMaleTab")}
                        </span>
                        <p className="text-xs text-neutral-200 font-light font-sans">
                          {isRtl
                            ? "بيئة فاخرة هادئة مصممة لضمان أقصى درجات الخصوصية والاسترخاء."
                            : "A serene, luxury environment crafted for absolute privacy and relaxation."}
                        </p>
                      </div>
                      <span className="text-[10px] uppercase tracking-widest text-gold-mid/60 border border-gold-mid/20 px-4 py-1.5 rounded-full backdrop-blur-md">
                        {isRtl ? "رعاية نخبوية" : "VIP Suite"}
                      </span>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

            </div>
          </div>
        </section>

        {/* 4. Luxury Services Section */}
        <section id="services" className="py-20 md:py-32 lg:py-44 px-6 bg-[#1C010A] transition-colors duration-300 border-t border-gold-mid/10">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-6">
              <div className="space-y-4 max-w-2xl">
                <span className="text-[11px] uppercase tracking-luxury-wide font-bold text-gold-light font-sans block">
                  {isRtl ? "خدماتنا المميزة" : "SIGNATURE DIRECTIONS"}
                </span>
                <h2 className="font-serif text-4xl sm:text-5xl text-white font-light">
                  {t("servicesTitle")}
                </h2>
                <p className="text-body-luxury text-neutral-300 font-sans leading-relaxed">
                  {t("servicesSubtitle")}
                </p>
              </div>
              <div className="shrink-0">
                <button
                  onClick={openBooking}
                  className="btn-secondary-luxury py-3 px-8 text-[10px] rounded-full group"
                >
                  <span>{isRtl ? "طلب استشارة خاصة" : "Request Consultation"}</span>
                  <ArrowRight className="h-4 w-4 ml-2 rtl:mr-2 rtl:rotate-180 transform group-hover:translate-x-1.5 transition-transform duration-700 ease-[0.22,1,0.36,1]" />
                </button>
              </div>
            </div>

            {/* Featured Luxury Showcase (3 Key Treatments - Polaris Style) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {services.filter(s => s.isFeatured).map((svc, idx) => (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, delay: idx * 0.15, ease: [0.22, 1, 0.36, 1] }}
                  key={idx}
                  className="group relative aspect-[4/5] rounded-[36px] overflow-hidden border border-gold-mid/15 hover:border-gold-mid/40 shadow-2xl hover:shadow-[0_0_35px_rgba(200,155,60,0.22)] transition-all duration-700 ease-[0.22,1,0.36,1] luxury-vignette"
                >
                  {/* Full image background */}
                  <div className="absolute inset-0 transition-transform duration-[1.4s] ease-[0.22,1,0.36,1] group-hover:scale-[1.03] luxury-gold-filter">
                    <Image
                      src={svc.img || "/service_implants.png"}
                      alt={svc.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  {/* Dark Vignette Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-burgundy-black/95 via-burgundy-black/10 to-transparent pointer-events-none z-20" />

                  {/* Absolute Card Content */}
                  <div className="absolute inset-0 p-6 flex flex-col justify-between z-30">
                    <div className="bg-white/10 backdrop-blur-md text-[10px] font-mono font-bold text-gold-light px-4 py-1.5 rounded-full border border-white/15 w-max">
                      {svc.count}
                    </div>

                    <div className="space-y-4 bg-[#150106]/65 backdrop-blur-md border border-gold-mid/10 p-5 rounded-[24px] group-hover:bg-[#150106]/85 group-hover:border-gold-mid/30 transition-all duration-700 ease-[0.22,1,0.36,1] shadow-xl">
                      <span className="text-[9px] uppercase tracking-widest text-gold-light font-bold font-sans block">
                        {isRtl ? "طب أسنان تجميلي" : "PREMIUM AESTHETICS"}
                      </span>
                      <h3 className="font-serif text-xl lg:text-2xl font-bold text-white leading-tight">
                        {svc.name}
                      </h3>
                      <p className="text-xs text-neutral-300 leading-relaxed font-light font-sans max-h-0 opacity-0 group-hover:max-h-20 group-hover:opacity-100 transition-all duration-700 ease-[0.22,1,0.36,1] overflow-hidden">
                        {svc.desc}
                      </p>

                      <div className="pt-2 flex items-center justify-between border-t border-gold-mid/10">
                        <Link
                          href={`/services/${svc.slug}`}
                          className="text-[9px] uppercase tracking-widest font-bold text-white hover:text-gold-light transition-all font-sans relative py-1"
                        >
                          <span>{isRtl ? "اكتشف الخدمة" : "EXPLORE TREATMENT"}</span>
                        </Link>
                        
                        <div
                          className="h-10 w-10 rounded-full bg-white/10 backdrop-blur-md text-white border border-white/20 group-hover:bg-gold-gradient group-hover:text-burgundy-black group-hover:border-transparent flex items-center justify-center shadow-lg transition-luxury transform group-hover:rotate-45"
                        >
                          <ArrowRight className={`h-4.5 w-4.5 ${isRtl ? "rotate-180" : ""}`} />
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Secondary Services List Grid (Armordent Card Style for the other 9 services) */}
            <div className="mt-28 border-t border-gold-mid/10 pt-16">
              <h3 className="font-serif text-3xl text-white font-light mb-12 text-center md:text-left">
                {isRtl ? "الخدمات الطبية والترميمية الشاملة" : "Comprehensive Restorative & General Care"}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {services.filter(s => !s.isFeatured).map((svc, idx) => (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.0, delay: idx * 0.05, ease: [0.22, 1, 0.36, 1] }}
                    key={idx}
                    className="p-8 rounded-[24px] bg-[#150106]/40 backdrop-blur-md border border-gold-mid/10 hover:border-gold-mid/35 hover:bg-[#150106]/55 shadow-md hover:shadow-[0_10px_30px_rgba(200,155,60,0.08)] transition-all duration-700 ease-[0.22,1,0.36,1] flex flex-col justify-between gap-6 group"
                  >
                    <div className="space-y-4">
                      {/* Decorative Line */}
                      <div className="h-1 w-8 bg-gold-gradient rounded-full" />
                      
                      <h4 className="font-serif text-lg font-bold text-white">
                        {svc.name}
                      </h4>
                      <p className="text-xs text-neutral-300 font-light font-sans leading-relaxed">
                        {svc.desc}
                      </p>
                    </div>
                    
                    <div className="pt-4 border-t border-gold-mid/10 flex items-center justify-between">
                      {svc.hasPage ? (
                        <Link
                          href={`/services/${svc.slug}`}
                          className="text-[9px] uppercase tracking-widest font-bold text-gold-light hover:text-white transition-all font-sans relative py-1"
                        >
                          {isRtl ? "تفاصيل الخدمة" : "More details"}
                        </Link>
                      ) : (
                        <button
                          onClick={openBooking}
                          className="text-[9px] uppercase tracking-widest font-bold text-gold-light hover:text-white transition-all font-sans cursor-pointer relative py-1"
                        >
                          {isRtl ? "حجز جناح خاص" : "Secure Suite"}
                        </button>
                      )}
                      
                      {svc.hasPage ? (
                        <Link
                          href={`/services/${svc.slug}`}
                          className="h-8 w-8 rounded-full bg-white/5 text-gold-light border border-gold-mid/10 hover:bg-gold-gradient hover:text-burgundy-black hover:border-transparent flex items-center justify-center transition-luxury shrink-0"
                          aria-label={svc.name}
                        >
                          <ArrowRight className={`h-4 w-4 ${isRtl ? "rotate-180" : ""}`} />
                        </Link>
                      ) : (
                        <button
                          onClick={openBooking}
                          className="h-8 w-8 rounded-full bg-white/5 text-gold-light border border-gold-mid/10 hover:bg-gold-gradient hover:text-burgundy-black hover:border-transparent flex items-center justify-center transition-luxury shrink-0 cursor-pointer"
                          aria-label={svc.name}
                        >
                          <ArrowRight className={`h-4 w-4 ${isRtl ? "rotate-180" : ""}`} />
                        </button>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Gold transition separator */}
        <div className="divider-gold-glow relative z-20" />

        {/* 5. Journey/Process Section */}
        <section id="journey" className="py-20 md:py-32 lg:py-44 px-6 bg-[#150106] transition-colors duration-300">
          <div className="max-w-7xl mx-auto">
            <div className="text-center space-y-6 mb-24">
              <span className="text-[11px] uppercase tracking-luxury-wide font-bold text-gold-light font-sans block">
                {t("processTitle")}
              </span>
              <h2 className="font-serif text-section-title text-white font-light">
                {t("processSubtitle")}
              </h2>
              <div className="w-16 h-0.5 bg-gold-gradient mx-auto mt-4" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative max-w-6xl mx-auto">
              {/* Connector line for desktop */}
              <div className="hidden md:block absolute top-[22%] left-[12%] right-[12%] h-[1px] bg-gradient-to-r from-transparent via-gold-mid/20 to-transparent pointer-events-none" />

              {[
                { num: t("step1Num"), title: t("step1Name"), desc: t("step1Desc") },
                { num: t("step2Num"), title: t("step2Name"), desc: t("step2Desc") },
                { num: t("step3Num"), title: t("step3Name"), desc: t("step3Desc") },
              ].map((step, idx) => (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, delay: idx * 0.2, ease: [0.22, 1, 0.36, 1] }}
                  key={idx}
                  className="flex flex-col items-center text-center relative z-10 group"
                >
                  <div className="h-20 w-20 rounded-full bg-[#150106] border border-gold-mid/25 shadow-[0_0_20px_rgba(200,155,60,0.1)] flex items-center justify-center group-hover:border-gold-mid/60 group-hover:shadow-[0_0_25px_rgba(200,155,60,0.2)] transition-luxury">
                    <span className="text-3xl font-extralight tracking-widest text-gold-light font-serif">
                      {step.num}
                    </span>
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-white mt-8">
                    {step.title}
                  </h3>
                  <p className="text-sm text-neutral-350 leading-relaxed font-light font-sans max-w-xs mt-4">
                    {step.desc}
                  </p>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-20">
              <button
                onClick={openBooking}
                className="btn-primary-luxury"
              >
                {t("bookConsultation")}
              </button>
            </div>
          </div>
        </section>

        {/* 6. Doctor Spotlight Section */}
        <section id="doctors" className="py-20 md:py-32 lg:py-44 bg-[#2A0210] transition-colors duration-300 px-6">
          <div className="max-w-7xl mx-auto">
            {/* Doctor Section Header */}
            <div className="text-center space-y-4 mb-16">
              <span className="text-[11px] uppercase tracking-luxury-wide font-bold text-gold-light font-sans block">
                {isRtl ? "الفريق الطبي الرئيسي" : "CHIEF SMILE ARCHITECTS"}
              </span>
              <h2 className="font-serif text-4xl sm:text-5xl text-white font-light">
                {t("doctorTitle")}
              </h2>
              <p className="text-body-luxury text-neutral-350 max-w-2xl mx-auto font-sans leading-relaxed">
                {t("doctorSubtitle")}
              </p>
              <div className="w-16 h-0.5 bg-gold-gradient mx-auto mt-4" />
            </div>

            {/* Doctor Tabs Selector */}
            <div className="flex flex-wrap justify-center gap-3 mb-16 border-b border-gold-mid/10 pb-8 max-w-2xl mx-auto font-sans">
              {doctors.map((doc, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveDoctorIndex(idx)}
                  className={`px-8 py-3 rounded-full text-[10px] font-semibold uppercase tracking-widest transition-all duration-700 ease-[0.22,1,0.36,1] font-sans border cursor-pointer ${
                    activeDoctorIndex === idx
                      ? "border-gold-mid text-white bg-gold-mid/10 shadow-[0_0_15px_rgba(200,155,60,0.1)]"
                      : "border-white/10 text-neutral-400 hover:border-gold-mid/45 hover:text-white hover:bg-gold-light/5"
                  }`}
                >
                  {doc.name}
                </button>
              ))}
            </div>

            {/* Active Doctor Details Grid (Polaris Style) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
              
              {/* Photo spotlight inside a tall vertical frame with double-bordered gold-line frame */}
              <div className="w-full lg:col-span-5 relative rounded-[36px] border border-gold-mid/30 p-2.5 bg-burgundy-black shadow-[0_0_35px_rgba(200,155,60,0.12)] group flex flex-col gap-4">
                <div className="w-full aspect-[4/5] relative rounded-[28px] overflow-hidden border border-gold-mid/20 luxury-vignette">
                  <motion.div 
                    className="w-full h-full relative luxury-gold-filter"
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Image
                      src={doctors[activeDoctorIndex].image}
                      alt={doctors[activeDoctorIndex].name}
                      fill
                      className="object-cover"
                    />
                  </motion.div>
                  <div className="absolute inset-0 bg-gradient-to-t from-burgundy-black/40 via-transparent to-transparent pointer-events-none z-20" />
                </div>
                
                {/* Nameplate container - placed naturally below the image instead of absolute overlay */}
                <div className={`p-5 rounded-2xl bg-[#150106]/95 border border-gold-mid/20 shadow-xl z-20 ${isRtl ? "text-right" : "text-left"}`}>
                  <span className="px-3 py-1 rounded bg-gold-mid text-white text-[8px] tracking-[0.2em] uppercase font-bold font-sans inline-block mb-2">
                    {doctors[activeDoctorIndex].tag}
                  </span>
                  <h4 className="text-white text-2xl font-bold tracking-wide font-sans">{doctors[activeDoctorIndex].name}</h4>
                  <p className="text-gold-light text-[10px] uppercase tracking-widest font-semibold font-sans mt-1">{doctors[activeDoctorIndex].role}</p>
                </div>
              </div>

              {/* Bio details (Editorial Pull-Quote Style) */}
              <div className={`lg:col-span-7 space-y-8 ${isRtl ? "text-right" : "text-left"}`}>
                <div className="relative pl-6 border-l-2 border-gold-mid/40 dark:border-gold-light/20">
                  <p className="text-body-luxury text-neutral-200 font-light leading-relaxed font-sans min-h-[140px] md:min-h-[110px]">
                    "{doctors[activeDoctorIndex].bio}"
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-8 border-t border-white/10">
                  <div className="space-y-2">
                    <span className="text-[10px] uppercase tracking-widest text-neutral-450 font-bold block">{isRtl ? "المسمى الوظيفي" : "Designation"}</span>
                    <p className="text-sm sm:text-base font-semibold text-gold-light font-sans">{doctors[activeDoctorIndex].specialty}</p>
                  </div>
                  <div className="space-y-2">
                    <span className="text-[10px] uppercase tracking-widest text-neutral-450 font-bold block">{isRtl ? "الشهادات والاعتمادات" : "Credentials"}</span>
                    <p className="text-sm sm:text-base font-semibold text-neutral-200 font-sans">{doctors[activeDoctorIndex].credentials}</p>
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <span className="text-[10px] uppercase tracking-widest text-neutral-450 font-bold block">{isRtl ? "سنوات الممارسة النخبوية" : "Clinical Practice"}</span>
                    <p className="text-sm sm:text-base font-semibold text-neutral-200 font-sans">{doctors[activeDoctorIndex].experience}</p>
                  </div>
                </div>

                <div className="pt-4 flex flex-wrap items-center gap-6">
                  <button
                    onClick={openBooking}
                    className="btn-primary-luxury"
                  >
                    {t("bookConsultation")}
                  </button>
                  <a
                    href="#contact"
                    className="text-[11px] font-bold tracking-[0.2em] uppercase text-gold-light font-sans relative py-1 group"
                  >
                    <span>{isRtl ? "عرض ساعات العمل" : "View Coordinates"}</span>
                    <span className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-gold-mid to-gold-light scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-[0.22,1,0.36,1] origin-left" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 7. Advanced Technology Section */}
        <section id="technology" className="py-20 md:py-32 lg:py-40 bg-[#150106] border-t border-gold-mid/20 text-white px-6 transition-colors duration-300 relative overflow-hidden">
          <div className="absolute inset-0 bg-radial-gradient from-burgundy-light/25 via-transparent to-transparent pointer-events-none" />

          <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center space-y-6 mb-20">
              <span className="text-[11px] uppercase tracking-[0.25em] font-bold text-gold-light font-sans block">
                {t("techTitle")}
              </span>
              <h2 className="font-sans text-section-title text-white font-light">
                {t("techSubtitle")}
              </h2>
              <div className="w-16 h-0.5 bg-gold-gradient mx-auto mt-4" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                whileHover={{ y: -5 }}
                className="rounded-2xl p-10 border border-gold-mid/10 backdrop-blur-2xl bg-white/[0.03] hover:border-gold-mid/30 hover:bg-white/[0.06] shadow-2xl relative overflow-hidden group transition-all duration-700 ease-[0.22,1,0.36,1]"
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(200,155,60,0)_0%,_transparent_70%)] group-hover:bg-[radial-gradient(circle_at_center,_rgba(200,155,60,0.08)_0%,_transparent_70%)] transition-all duration-700 ease-[0.22,1,0.36,1] pointer-events-none" />
                <div className="absolute top-0 left-0 w-full h-[2px] bg-gold-gradient" />
                <h3 className="font-sans text-gold-light text-xl font-bold mb-4 relative z-10">{t("techCard1Title")}</h3>
                <p className="text-sm text-white/70 leading-relaxed font-sans font-light relative z-10">{t("techCard1Desc")}</p>
              </motion.div>

              <motion.div
                whileHover={{ y: -5 }}
                className="rounded-2xl p-10 border border-gold-mid/10 backdrop-blur-2xl bg-white/[0.03] hover:border-gold-mid/30 hover:bg-white/[0.06] shadow-2xl relative overflow-hidden group transition-all duration-700 ease-[0.22,1,0.36,1]"
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(200,155,60,0)_0%,_transparent_70%)] group-hover:bg-[radial-gradient(circle_at_center,_rgba(200,155,60,0.08)_0%,_transparent_70%)] transition-all duration-700 ease-[0.22,1,0.36,1] pointer-events-none" />
                <div className="absolute top-0 left-0 w-full h-[2px] bg-gold-gradient" />
                <h3 className="font-sans text-gold-light text-xl font-bold mb-4 relative z-10">{t("techCard2Title")}</h3>
                <p className="text-sm text-white/70 leading-relaxed font-sans font-light relative z-10">{t("techCard2Desc")}</p>
              </motion.div>

              <motion.div
                whileHover={{ y: -5 }}
                className="rounded-2xl p-10 border border-gold-mid/10 backdrop-blur-2xl bg-white/[0.03] hover:border-gold-mid/30 hover:bg-white/[0.06] shadow-2xl relative overflow-hidden group transition-all duration-700 ease-[0.22,1,0.36,1]"
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(200,155,60,0)_0%,_transparent_70%)] group-hover:bg-[radial-gradient(circle_at_center,_rgba(200,155,60,0.08)_0%,_transparent_70%)] transition-all duration-700 ease-[0.22,1,0.36,1] pointer-events-none" />
                <div className="absolute top-0 left-0 w-full h-[2px] bg-gold-gradient" />
                <h3 className="font-sans text-gold-light text-xl font-bold mb-4 relative z-10">{t("techCard3Title")}</h3>
                <p className="text-sm text-white/70 leading-relaxed font-sans font-light relative z-10">{t("techCard3Desc")}</p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Gold transition separator */}
        <div className="divider-gold-glow relative z-20" />

        {/* 8. Before & After Section */}
        <section id="gallery" className="py-20 md:py-32 lg:py-44 bg-[#150106] px-6 transition-colors duration-300">
          <div className="max-w-4xl mx-auto">
            <div className="text-center space-y-6 mb-16">
              <span className="text-[11px] uppercase tracking-luxury-wide font-bold text-gold-light font-sans block">
                {t("baTitle")}
              </span>
              <h2 className="font-sans text-section-title text-white font-light">
                {t("baSubtitle")}
              </h2>
              <div className="w-16 h-0.5 bg-gold-gradient mx-auto mt-4" />
            </div>

            <BeforeAfterSlider />

            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-6 p-6 rounded-2xl bg-[#25020D]/65 border border-gold-mid/10 text-xs font-sans text-neutral-300 shadow-lg">
              <div>
                <span className="text-[9px] uppercase tracking-wider text-neutral-450 block font-bold">{isRtl ? "رمز الحالة" : "Case ID"}</span>
                <span className="font-semibold text-gold-light">RD-9821</span>
              </div>
              <div>
                <span className="text-[9px] uppercase tracking-wider text-neutral-450 block font-bold">{isRtl ? "التشخيص" : "Diagnosis"}</span>
                <span className="font-semibold text-white">{isRtl ? "تصبغ الفلور والفراغات" : "Fluorosis & spacing"}</span>
              </div>
              <div>
                <span className="text-[9px] uppercase tracking-wider text-neutral-450 block font-bold">{isRtl ? "العلاج" : "Treatment"}</span>
                <span className="font-semibold text-white">{isRtl ? "١٠ عدسات إيماكس يدوية" : "10 Handcrafted Veneers"}</span>
              </div>
              <div>
                <span className="text-[9px] uppercase tracking-wider text-neutral-450 block font-bold">{isRtl ? "المدة" : "Duration"}</span>
                <span className="font-semibold text-white">{isRtl ? "جلستان (أسبوع واحد)" : "2 Sessions (1 Week)"}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Gold transition separator */}
        <div className="divider-gold-glow relative z-20" />

        {/* 9. Patient Testimonials Section */}
        <section id="testimonials" className="py-20 md:py-32 lg:py-44 bg-[#1C010A] transition-colors duration-300">
          <div className="max-w-4xl mx-auto">
            <div className="text-center space-y-6 mb-20">
              <span className="text-[11px] uppercase tracking-luxury-wide font-bold text-gold-light font-sans block">
                {t("testimonialsTitle")}
              </span>
              <h2 className="font-sans text-section-title text-white font-light">
                {t("testimonialsSubtitle")}
              </h2>
              <div className="w-16 h-0.5 bg-gold-gradient mx-auto mt-4" />
            </div>

            {/* Testimonials Slideshow */}
            <div className="bg-[#150106]/40 backdrop-blur-md border border-gold-mid/10 rounded-[32px] p-10 md:p-16 relative shadow-xl text-center z-10">
              <div className="absolute -top-6 left-12 text-[150px] font-serif text-gold-mid/5 select-none pointer-events-none">“</div>
              <div className="flex justify-center gap-1.5 mb-6 text-gold-light">
                {[...Array(reviews[activeReviewIndex].rating)].map((_, i) => (
                  <Star key={i} className="h-4.5 w-4.5 fill-current" />
                ))}
              </div>

              {/* Video icon indicator for premium luxury video testimonials overlay */}
              <div className="flex justify-center mb-8">
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-light/10 text-gold-light text-[9px] uppercase tracking-widest font-bold border border-gold-mid/25">
                  <Video className="h-3.5 w-3.5 text-gold-light animate-pulse" />
                  <span>{isRtl ? "شاهد التوثيق المرئي" : "Watch Video Log"}</span>
                </span>
              </div>

              <blockquote className="font-sans text-lg md:text-2xl text-white leading-relaxed font-light italic mb-10 max-w-2xl mx-auto relative z-10">
                "{reviews[activeReviewIndex].text}"
              </blockquote>

              <div className="relative z-10">
                <cite className="not-italic text-sm font-bold text-gold-light block font-sans">
                  {reviews[activeReviewIndex].author}
                </cite>
                <span className="text-[9px] text-neutral-400 uppercase tracking-widest font-semibold mt-0.5 block font-sans">
                  {reviews[activeReviewIndex].location}
                </span>
              </div>

              {/* Navigation Arrows */}
              <div className="absolute top-1/2 -translate-y-1/2 -left-4 -right-4 md:-left-6 md:-right-6 flex justify-between pointer-events-none">
                <button
                  onClick={isRtl ? handleNextReview : handlePrevReview}
                  className="h-12 w-12 rounded-full bg-[#150106]/60 backdrop-blur-md border border-gold-mid/30 hover:border-gold-mid flex items-center justify-center text-gold-light hover:text-white hover:bg-gold-gradient hover:shadow-[0_0_15px_rgba(200,155,60,0.3)] transition-all duration-700 ease-[0.22,1,0.36,1] pointer-events-auto cursor-pointer"
                  aria-label="Previous Review"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={isRtl ? handlePrevReview : handleNextReview}
                  className="h-12 w-12 rounded-full bg-[#150106]/60 backdrop-blur-md border border-gold-mid/30 hover:border-gold-mid flex items-center justify-center text-gold-light hover:text-white hover:bg-gold-gradient hover:shadow-[0_0_15px_rgba(200,155,60,0.3)] transition-all duration-700 ease-[0.22,1,0.36,1] pointer-events-auto cursor-pointer"
                  aria-label="Next Review"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* 10. Book Appointment Section */}
        <section id="contact" className="bg-[#2A0210] py-20 md:py-32 lg:py-44 px-6 text-center relative overflow-hidden">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-gold-mid/5 pointer-events-none" />

          <div className="max-w-xl mx-auto space-y-6 relative z-10 text-center">
            <h2 className="font-sans text-section-title text-gold-light font-light leading-tight">
              {t("bookingTitle")}
            </h2>
            <p className="text-white/70 text-sm sm:text-base font-light leading-relaxed font-sans max-w-md mx-auto">
              {t("bookingSubtitle")}
            </p>

            {/* In-page Booking Form */}
            <form onSubmit={handleBookingSubmit} className="space-y-4 pt-4 text-left">
              <AnimatePresence mode="wait">
                {isBooked ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.5 }}
                    className="bg-[#150106]/85 border border-gold-mid/20 rounded-2xl p-8 text-center space-y-4"
                  >
                    <Sparkles className="h-10 w-10 text-gold-light mx-auto animate-pulse" />
                    <h4 className="font-sans text-gold-light text-lg font-bold">
                      {isRtl ? "طلب حجز معلق" : "Suite Requested Successfully"}
                    </h4>
                    <p className="text-xs text-white/80 font-light font-sans max-w-xs mx-auto leading-relaxed">
                      {isRtl
                        ? "شكراً لك. لقد استلم مستشار كونسيرج راي طلب حجز الموعد المبدئي. سيتصل بك فريقنا لتأكيد الجناح خلال ١٥ دقيقة."
                        : "Thank you. A Ray concierge suite coordinator has received your request. We will contact you within 15 minutes to secure your slot."}
                    </p>
                  </motion.div>
                ) : (
                  <motion.div key="form" className="space-y-4">
                    {/* Name */}
                    <div>
                      <input
                        type="text"
                        required
                        placeholder={t("formName")}
                        value={bookingName}
                        onChange={(e) => setBookingName(e.target.value)}
                        className={`w-full bg-transparent border-b border-white/20 focus:border-gold-mid py-3 text-xs text-white placeholder-white/40 focus:outline-none transition-all duration-700 ease-[0.22,1,0.36,1] ${
                          isRtl ? "text-right" : "text-left"
                        }`}
                      />
                    </div>

                    {/* Phone */}
                    <div>
                      <input
                        type="tel"
                        required
                        placeholder={t("formPhone")}
                        value={bookingPhone}
                        onChange={(e) => setBookingPhone(e.target.value)}
                        className={`w-full bg-transparent border-b border-white/20 focus:border-gold-mid py-3 text-xs text-white placeholder-white/40 focus:outline-none transition-all duration-700 ease-[0.22,1,0.36,1] ${
                          isRtl ? "text-right" : "text-left"
                        }`}
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <input
                        type="email"
                        required
                        placeholder={t("formEmail")}
                        value={bookingEmail}
                        onChange={(e) => setBookingEmail(e.target.value)}
                        className={`w-full bg-transparent border-b border-white/20 focus:border-gold-mid py-3 text-xs text-white placeholder-white/40 focus:outline-none transition-all duration-700 ease-[0.22,1,0.36,1] ${
                          isRtl ? "text-right" : "text-left"
                        }`}
                      />
                    </div>

                    {/* Service / Treatment dropdown */}
                    <div>
                      <select
                        required
                        value={bookingService}
                        onChange={(e) => setBookingService(e.target.value)}
                        className={`w-full bg-transparent border-b border-white/20 focus:border-gold-mid py-3 text-xs text-white focus:outline-none transition-all duration-700 ease-[0.22,1,0.36,1] ${
                          isRtl ? "text-right" : "text-left"
                        } [&>option]:bg-burgundy [&>option]:text-white`}
                      >
                        <option value="" disabled className="text-white/40">
                          {t("formService")}
                        </option>
                        {services.map((svc, i) => (
                          <option key={i} value={svc.name}>
                            {svc.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Preferred Date */}
                    <div>
                      <label className={`block text-[8px] uppercase tracking-widest text-white/50 mb-1 font-bold ${
                        isRtl ? "text-right" : "text-left"
                      }`}>
                        {t("formDate")}
                      </label>
                      <input
                        type="date"
                        required
                        value={bookingDate}
                        onChange={(e) => setBookingDate(e.target.value)}
                        min={new Date().toISOString().split("T")[0]}
                        className={`w-full bg-transparent border-b border-white/20 focus:border-gold-mid py-2 text-xs text-white focus:outline-none transition-all duration-700 ease-[0.22,1,0.36,1] ${
                          isRtl ? "text-right" : "text-left"
                        }`}
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full btn-primary-luxury py-4 text-xs rounded-full mt-6"
                    >
                      {t("submitBooking")}
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </div>
        </section>

        {/* 11. Contact Details & Google Maps Section */}
        <div className="divider-gold-glow relative z-20" />
        <section className="py-20 md:py-32 lg:py-44 bg-[#150106] transition-colors duration-700 px-6 relative overflow-hidden">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-stretch">
            
            {/* Coordinates / details */}
            <div className={`lg:col-span-5 flex flex-col justify-between ${isRtl ? "text-right" : "text-left"}`}>
              <div className="space-y-6">
                <span className="text-[10px] uppercase tracking-[0.35em] font-light text-gold-light font-sans block">
                  {t("contactTitle")}
                </span>
                <h2 className="font-serif text-4xl sm:text-5xl text-white font-extralight tracking-wide leading-tight">
                  {isRtl ? "تواصل مباشر" : "Direct Connection"}
                </h2>
                <div className="w-20 h-[1px] bg-gradient-to-r from-gold-mid to-transparent mt-4" />
              </div>

              {/* Coordinates List */}
              <div className="space-y-8 my-10 font-sans">
                <div className="flex gap-5 group">
                  <div className="h-10 w-10 rounded-full border border-gold-mid/30 bg-gold-light/5 text-gold-light flex items-center justify-center shrink-0 transition-all duration-700 ease-[0.22,1,0.36,1] group-hover:border-gold-light/60 group-hover:bg-gold-light/10">
                    <MapPin className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 block font-light">{t("addressLabel")}</span>
                    <p className="text-sm text-neutral-350 font-light mt-1 tracking-wide leading-relaxed">{t("addressValue")}</p>
                  </div>
                </div>

                <div className="flex gap-5 group">
                  <div className="h-10 w-10 rounded-full border border-gold-mid/30 bg-gold-light/5 text-gold-light flex items-center justify-center shrink-0 transition-all duration-700 ease-[0.22,1,0.36,1] group-hover:border-gold-light/60 group-hover:bg-gold-light/10">
                    <Phone className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 block font-light">{t("phoneLabel")}</span>
                    <a href="tel:+971566370056" className="text-sm text-neutral-350 font-light hover:text-gold-light transition-colors duration-700 ease-[0.22,1,0.36,1] block mt-1 tracking-wide">
                      <span dir="ltr">+971 56 637 0056</span>
                    </a>
                  </div>
                </div>

                <div className="flex gap-5 group">
                  <div className="h-10 w-10 rounded-full border border-gold-mid/30 bg-gold-light/5 text-gold-light flex items-center justify-center shrink-0 transition-all duration-700 ease-[0.22,1,0.36,1] group-hover:border-gold-light/60 group-hover:bg-gold-light/10">
                    <Mail className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 block font-light">{isRtl ? "البريد الإلكتروني للكونسيرج" : "Concierge Email"}</span>
                    <a href="mailto:info@raydentaluae.com" className="text-sm text-neutral-350 font-light hover:text-gold-light transition-colors duration-700 ease-[0.22,1,0.36,1] block mt-1 tracking-wide">
                      info@raydentaluae.com
                    </a>
                  </div>
                </div>
              </div>

              {/* Direct WhatsApp Concierge Trigger */}
              <div className="mt-4">
                <a
                  href="https://wa.me/971566370056?text=Hello%20Ray%20Dental%20Clinic,%20I%20would%20like%20to%20book%20a%20private%20consultation."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border border-[#25D366]/40 hover:border-[#25D366] text-[#25D366] text-[11px] font-bold tracking-[0.2em] uppercase px-8 py-4 rounded-full bg-[#25D366]/5 hover:bg-[#25D366]/10 transition-all duration-700 ease-[0.22,1,0.36,1] font-sans"
                >
                  <span>{isRtl ? "تواصل عبر الواتساب" : "WhatsApp Concierge"}</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>

            {/* Google Map iframe */}
            <div className="lg:col-span-7 rounded-[32px] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-gold-mid/20 min-h-[400px] relative transition-all duration-700 ease-[0.22,1,0.36,1] hover:scale-[1.01]">
              <iframe
                title="Ray Dental Clinic Fujairah Clinic"
                src="https://maps.google.com/maps?q=Burj%20Amoon%2C%20Al%20Ghurfah%2C%20Fujairah%2C%20UAE&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: "400px" }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="filter invert-[90%] hue-rotate-[180deg] contrast-[100%] brightness-[90%]"
              />
            </div>

          </div>
        </section>

      </main>

      <Footer onOpenBooking={openBooking} />

      <BookingModal isOpen={isBookingOpen} onClose={closeBooking} />

      <ExitIntentPopup onOpenBooking={openBooking} />

      <FloatingWidgets onOpenBooking={openBooking} />

      {showSpec && <DesignSystemInspector />}
    </>
  );
}
