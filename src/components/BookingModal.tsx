import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, Clock, User, Phone, Mail, ChevronRight, CheckCircle2 } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const { language, t } = useLanguage();
  const isRtl = language === "ar";
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    service: "",
    date: "",
    time: "",
    name: "",
    phone: "",
    email: "",
    notes: "",
  });

  const services = [
    isRtl ? "زراعة الأسنان" : "Dental Implants",
    isRtl ? "الفينير الخزفي" : "Porcelain Veneers",
    isRtl ? "تجميل الأسنان" : "Cosmetic Dentistry",
    isRtl ? "تبييض الأسنان" : "Teeth Whitening",
    isRtl ? "تقويم إنفزلاين" : "Invisalign Aligners",
    isRtl ? "تقويم الأسنان" : "Orthodontics",
    isRtl ? "علاج العصب" : "Root Canal Treatment",
    isRtl ? "أسنان الأطفال" : "Pediatric Dentistry",
  ];

  const timeslots = [
    "09:00 AM",
    "10:30 AM",
    "12:00 PM",
    "02:00 PM",
    "03:30 PM",
    "05:00 PM",
    "06:30 PM",
  ];

  const handleNext = () => setStep((prev) => prev + 1);
  const handlePrev = () => setStep((prev) => prev - 1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(4); // Success step
  };

  const handleClose = () => {
    setStep(1);
    setFormData({
      service: "",
      date: "",
      time: "",
      name: "",
      phone: "",
      email: "",
      notes: "",
    });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-[#150106]/85 backdrop-blur-md"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-lg overflow-hidden rounded-[32px] bg-[#150106] shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-gold-mid/20 z-10"
            dir={isRtl ? "rtl" : "ltr"}
          >
            {/* Header banner */}
            <div className="bg-gradient-to-b from-[#1C010A] to-[#150106] px-8 py-7 text-white relative border-b border-gold-mid/10">
              <button
                onClick={handleClose}
                className={`absolute ${isRtl ? "left-6" : "right-6"} top-6 text-gold-light hover:text-white transition-colors cursor-pointer`}
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
              <h3 className="font-serif text-2xl tracking-wide text-gold-light">
                {step === 4 
                  ? (isRtl ? "تم طلب الاستشارة" : "Consultation Requested") 
                  : (isRtl ? "حجز جناح استشارة" : "Bespoke Appointment")}
              </h3>
              <p className="text-[9px] text-neutral-400 font-light mt-1.5 tracking-[0.2em] uppercase font-sans">
                {step === 4 
                  ? (isRtl ? "طلب حجز جناح خاص" : "Exclusive Suite Reservation") 
                  : isRtl 
                    ? `الخطوة ${step} من ٣ — استشارة خاصة`
                    : `Step ${step} of 3 — Private Consultation`}
              </p>
            </div>

            {/* Form body */}
            <div className="p-8">
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: isRtl ? -20 : 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: isRtl ? 20 : -20 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <h4 className="font-serif text-base text-gold-light mb-5 uppercase tracking-wider">
                      {isRtl ? "اختر باقة الرعاية المطلوبة" : "Select Desired Care Package"}
                    </h4>
                    <div className="grid grid-cols-2 gap-3 mb-8">
                      {services.map((svc) => (
                        <button
                          key={svc}
                          type="button"
                          onClick={() => setFormData({ ...formData, service: svc })}
                          className={`p-4 rounded-xl text-[10px] font-medium tracking-wide transition-all border ${
                            isRtl ? "text-right" : "text-left"
                          } ${
                            formData.service === svc
                              ? "bg-gold-gradient text-burgundy-black border-transparent shadow-[0_0_15px_rgba(200,155,60,0.25)]"
                              : "bg-white/5 text-neutral-300 border-gold-mid/10 hover:border-gold-mid/40 hover:bg-[#1C010A]/50 cursor-pointer"
                          }`}
                        >
                          {svc}
                        </button>
                      ))}
                    </div>
                    <button
                      type="button"
                      disabled={!formData.service}
                      onClick={handleNext}
                      className="w-full btn-primary-luxury py-4 text-[10px] rounded-full disabled:opacity-40"
                    >
                      {isRtl ? "اختر التاريخ والوقت" : "Choose Date & Time"} <ChevronRight className={`h-4 w-4 ${isRtl ? "rotate-180" : ""}`} />
                    </button>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: isRtl ? -20 : 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: isRtl ? 20 : -20 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <h4 className="font-serif text-base text-gold-light mb-4 uppercase tracking-wider">
                      {isRtl ? "احجز التاريخ والساعة المفضلة" : "Reserve Date & Time Slot"}
                    </h4>
                    
                    {/* Date Input */}
                    <div className="mb-5">
                      <label className="block text-[8px] uppercase tracking-[0.25em] font-bold text-neutral-400 mb-2">
                        {isRtl ? "التاريخ المفضل" : "Preferred Date"}
                      </label>
                      <div className="relative">
                        <input
                          type="date"
                          value={formData.date}
                          min={new Date().toISOString().split("T")[0]}
                          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                          className={`w-full bg-transparent border-b border-white/20 text-white ${isRtl ? "pr-10 pl-4 text-right" : "pl-10 pr-4 text-left"} py-3 text-xs focus:outline-none focus:border-gold-mid transition-all duration-500`}
                        />
                        <Calendar className={`absolute ${isRtl ? "right-2" : "left-2"} top-3 h-4 w-4 text-gold-mid`} />
                      </div>
                    </div>

                    {/* Time Slots */}
                    <div className="mb-8">
                      <label className="block text-[8px] uppercase tracking-[0.25em] font-bold text-neutral-400 mb-3">
                        {isRtl ? "الساعة المفضلة" : "Preferred Hour"}
                      </label>
                      <div className="grid grid-cols-3 gap-2.5">
                        {timeslots.map((t) => (
                          <button
                            key={t}
                            type="button"
                            onClick={() => setFormData({ ...formData, time: t })}
                            className={`py-3 rounded-lg text-[9px] font-medium tracking-wider transition-all border ${
                              formData.time === t
                                ? "bg-gold-gradient text-burgundy-black border-transparent shadow-[0_0_15px_rgba(200,155,60,0.25)]"
                                : "bg-white/5 text-neutral-300 border-gold-mid/10 hover:border-gold-mid/40 hover:bg-[#1C010A]/50 cursor-pointer"
                            }`}
                          >
                            <Clock className={`h-3 w-3 inline ${isRtl ? "ml-1" : "mr-1"} -mt-0.5 opacity-60`} />
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <button
                        type="button"
                        onClick={handlePrev}
                        className="w-1/3 btn-secondary-luxury py-4 text-[9px] rounded-full"
                      >
                        {isRtl ? "رجوع" : "Back"}
                      </button>
                      <button
                        type="button"
                        disabled={!formData.date || !formData.time}
                        onClick={handleNext}
                        className="w-2/3 btn-primary-luxury py-4 text-[9px] rounded-full disabled:opacity-40"
                      >
                        {isRtl ? "بيانات المريض" : "Patient details"} <ChevronRight className={`h-4 w-4 ${isRtl ? "rotate-180" : ""}`} />
                      </button>
                    </div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: isRtl ? -20 : 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: isRtl ? 20 : -20 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <h4 className="font-serif text-base text-gold-light mb-5 uppercase tracking-wider">
                      {isRtl ? "بيانات المريض الشخصية" : "Patient Information"}
                    </h4>
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="relative">
                        <input
                          type="text"
                          required
                          placeholder={isRtl ? "الاسم الكامل" : "Full Name"}
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className={`w-full bg-transparent border-b border-white/20 text-white ${isRtl ? "pr-10 pl-4 text-right" : "pl-10 pr-4 text-left"} py-3 text-xs placeholder-white/35 focus:outline-none focus:border-gold-mid transition-all duration-500`}
                        />
                        <User className={`absolute ${isRtl ? "right-2" : "left-2"} top-3 h-4 w-4 text-gold-mid`} />
                      </div>
                      
                      <div className="relative">
                        <input
                          type="tel"
                          required
                          placeholder={isRtl ? "رقم الهاتف" : "Phone Number (e.g. +971 50 ...)"}
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className={`w-full bg-transparent border-b border-white/20 text-white ${isRtl ? "pr-10 pl-4 text-right" : "pl-10 pr-4 text-left"} py-3 text-xs placeholder-white/35 focus:outline-none focus:border-gold-mid transition-all duration-500`}
                        />
                        <Phone className={`absolute ${isRtl ? "right-2" : "left-2"} top-3 h-4 w-4 text-gold-mid`} />
                      </div>

                      <div className="relative">
                        <input
                          type="email"
                          required
                          placeholder={isRtl ? "البريد الإلكتروني" : "Email Address"}
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className={`w-full bg-transparent border-b border-white/20 text-white ${isRtl ? "pr-10 pl-4 text-right" : "pl-10 pr-4 text-left"} py-3 text-xs placeholder-white/35 focus:outline-none focus:border-gold-mid transition-all duration-500`}
                        />
                        <Mail className={`absolute ${isRtl ? "right-2" : "left-2"} top-3 h-4 w-4 text-gold-mid`} />
                      </div>

                      <div>
                        <textarea
                          placeholder={isRtl ? "أية ملاحظات أو متطلبات خاصة" : "Any specific requests or requirements"}
                          rows={2}
                          value={formData.notes}
                          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                          className={`w-full bg-transparent border-b border-white/20 text-white p-3 text-xs placeholder-white/35 focus:outline-none focus:border-gold-mid transition-all duration-500 ${
                            isRtl ? "text-right" : "text-left"
                          }`}
                        />
                      </div>

                      <div className="flex gap-4 pt-3">
                        <button
                          type="button"
                          onClick={handlePrev}
                          className="w-1/3 btn-secondary-luxury py-4 text-[9px] rounded-full"
                        >
                          {isRtl ? "رجوع" : "Back"}
                        </button>
                        <button
                          type="submit"
                          className="w-2/3 btn-primary-luxury py-4 text-[9px] rounded-full"
                        >
                          {isRtl ? "إرسال طلب الحجز" : "Request Booking"}
                        </button>
                      </div>
                    </form>
                  </motion.div>
                )}

                {step === 4 && (
                  <motion.div
                    key="step4"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="text-center py-6 px-4"
                  >
                    <div className="flex justify-center mb-6">
                      <CheckCircle2 className="h-16 w-16 text-gold-mid" />
                    </div>
                    <h4 className="font-serif text-2xl text-gold-light mb-3">
                      {isRtl ? "تم حجز الجناح الخاص" : "Bespoke Suite Reserved"}
                    </h4>
                    <p className="text-xs text-neutral-400 max-w-sm mx-auto mb-8 leading-relaxed font-sans font-light">
                      {isRtl ? (
                        <>
                          شكراً لك، <span className="font-semibold text-white">{formData.name}</span>. سيتواصل معك مستشار كونسيرج من عيادة راي على الرقم <span className="font-semibold text-white">{formData.phone}</span> خلال الساعتين القادمتين لتأكيد تفاصيل الموعد وجناح الاستشفاء.
                        </>
                      ) : (
                        <>
                          Thank you, <span className="font-semibold text-white">{formData.name}</span>. A private concierge advisor from Ray Dental Clinic LLC will contact you on <span className="font-semibold text-white">{formData.phone}</span> within the next two hours to finalize your exclusive consultation details.
                        </>
                      )}
                    </p>
                    <div className={`bg-white/5 border border-gold-mid/10 rounded-2xl p-5 mx-auto mb-8 text-xs text-neutral-300 space-y-2 max-w-xs ${
                      isRtl ? "text-right" : "text-left"
                    }`}>
                      <p><strong>{isRtl ? "الرعاية المحددة:" : "Care Selected:"}</strong> {formData.service}</p>
                      <p><strong>{isRtl ? "التاريخ المقترح:" : "Proposed Date:"}</strong> {formData.date}</p>
                      <p><strong>{isRtl ? "الوقت:" : "Hour:"}</strong> {formData.time}</p>
                    </div>
                    <button
                      type="button"
                      onClick={handleClose}
                      className="btn-secondary-luxury px-8 py-3.5 text-[9px] rounded-full"
                    >
                      {isRtl ? "إغلاق النافذة" : "Close Window"}
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

