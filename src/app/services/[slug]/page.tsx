import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Award, CheckCircle, HelpCircle, Shield, Sparkles, Stethoscope } from "lucide-react";

import NavbarWrapper from "@/components/NavbarWrapper"; // We will create a light client wrapper for layout widgets
import BeforeAfterSlider from "@/components/BeforeAfterSlider";

// Static registry of all 8 service page contents
interface ServiceContent {
  title: string;
  subheading: string;
  metaDesc: string;
  benefits: string[];
  process: { title: string; desc: string }[];
  faqs: { q: string; a: string }[];
}

const serviceRegistry: Record<string, ServiceContent> = {
  implants: {
    title: "Swiss-Engineered Dental Implants",
    subheading: "Restore absolute functionality and structural integrity with premium titanium and zirconia implants.",
    metaDesc: "Restore your smile with Swiss-engineered dental implants at Ray Dental Clinic LLC. Computer-guided precision placement and premium lifetime warranty.",
    benefits: [
      "Lifetime Structural Warranty",
      "Computer-Guided 3D Placement",
      "Biocompatible Zirconia & Titanium",
      "Natural-Looking Matching Porcelain Crown",
    ],
    process: [
      { title: "CBCT 3D Scan & Mapping", desc: "We capture high-resolution bone profiles to plan exact positioning digitally." },
      { title: "Sedation & Micro-Placement", desc: "Painless guided insertion in our luxury sterile surgical suites." },
      { title: "Osseointegration Phase", desc: "The implant fuses naturally with the bone over a few weeks with a temporary aesthetic crown." },
      { title: "Bespoke Crown Reveal", desc: "We attach a custom-shaded ceramic crown designed to match your surrounding dentition." },
    ],
    faqs: [
      { q: "Is the dental implant process painful?", a: "No. Our clinic utilizes computerized local anesthesia and optional sedation to ensure you experience zero discomfort." },
      { q: "How long does a dental implant last?", a: "With proper oral hygiene and regular clinical check-ups, our premium Swiss-engineered implants are designed to last a lifetime." },
      { q: "Am I a suitable candidate for implants?", a: "Almost anyone with sufficient bone density is a candidate. We offer advanced bone grafting for patients requiring structural reinforcement." },
    ],
  },
  veneers: {
    title: "Porcelain Veneers & Smile Design",
    subheading: "Transform your smile's alignment, contour, and brilliant shade with ultra-thin handcrafted porcelain.",
    metaDesc: "Achieve a gorgeous smile with handcrafted porcelain veneers at Ray Dental Clinic. Personalized smile architecture in Fujairah, UAE.",
    benefits: [
      "Bespoke Face-Driven Aesthetics",
      "Minimally Invasive Surface Preparation",
      "High-Translucency Stain-Resistant Ceramics",
      "15+ Years Verified Longevity",
    ],
    process: [
      { title: "Smile Architecture Session", desc: "High-definition facial photography, digital styling, and a temporary 3D mockup preview." },
      { title: "Micro-Preparation", desc: "We gently refine the enamel surface (less than 0.5mm) to accommodate the porcelain." },
      { title: "Master Lab Artistry", desc: "Elite dental ceramists hand-sculpt each veneer to match your ideal light reflection." },
      { title: "Adhesive Bonding", desc: "We permanently fuse the veneers to your teeth using high-strength light-curing resin." },
    ],
    faqs: [
      { q: "How many sessions are required for veneers?", a: "Veneers typically require just two main sessions: one for micro-preparation and digital scans, and one for bonding your final hand-crafted porcelain." },
      { q: "Do veneers stain over time?", a: "No. Premium porcelain is non-porous and highly resistant to stains from coffee, tea, and red wine." },
      { q: "Are veneers reversible?", a: "Since a minor amount of enamel is polished, veneers are a permanent cosmetic choice. They are built to last 15-20 years before replacement is needed." },
    ],
  },
  cosmetic: {
    title: "Elite Cosmetic Dentistry Suites",
    subheading: "Harmonize your facial profile and teeth aesthetics with customized smile contouring and styling.",
    metaDesc: "Cosmetic dentistry at Ray Dental Clinic. Tailored smile makeovers combining advanced procedures in Fujairah, UAE.",
    benefits: [
      "Comprehensive Smile Makeovers",
      "Gingival Laser Contouring (Gum Lift)",
      "Tooth Re-shaping & Bonding",
      "Completely Metal-Free Restorations",
    ],
    process: [
      { title: "Digital Smile Analysis", desc: "We analyze your smile proportions relative to your eyes, lips, and facial midline." },
      { title: "Coordinated Treatment Design", desc: "A combined sequence of whitening, shaping, or restoration is structured." },
      { title: "Minimally Invasive Trial", desc: "We preview the changes so you can approve the look before final application." },
      { title: "The Signature Reveal", desc: "Completing the changes to hand off a brilliant, symmetrical, healthy smile." },
    ],
    faqs: [
      { q: "What is a complete smile makeover?", a: "A smile makeover combines multiple cosmetic procedures (such as veneers, laser gum contouring, and whitening) to achieve optimal harmony." },
      { q: "How long does a smile design take?", a: "Simple bonding takes one visit. Comprehensive makeovers combining veneers or aligners can range from 2 weeks to a few months." },
    ],
  },
  whitening: {
    title: "Advanced Laser Teeth Whitening",
    subheading: "Uncover a brighter, radiant smile of up to 8 shades lighter in one luxury clinical session.",
    metaDesc: "Professional laser teeth whitening at Ray Dental Clinic LLC. Immediate Zoom laser results with sensitivity-shield technology.",
    benefits: [
      "Up to 8 Shades Whiter in 45 Minutes",
      "State-of-the-Art Zoom Laser Light",
      "Sensitivity-Shield Protective Coating",
      "Take-Home Premium Maintenance Kit Included",
    ],
    process: [
      { title: "Gingival Shielding", desc: "We apply a medical-grade barrier gel to protect your gums and soft tissues completely." },
      { title: "Gel Application", desc: "A premium, pH-balanced hydrogen peroxide whitening formula is painted on your teeth." },
      { title: "Laser Acceleration", desc: "Our advanced whitening laser targets the gel to break down deep discoloration." },
      { title: "Fluoride Infusion", desc: "We conclude with a soothing remineralizing agent to seal enamel and prevent sensitivity." },
    ],
    faqs: [
      { q: "Will laser whitening make my teeth sensitive?", a: "We apply a specialized desensitizing gel and utilize advanced light settings to minimize sensitivity. Most patients report zero discomfort." },
      { q: "How long do professional whitening results last?", a: "Results typically last 1 to 2 years, depending on your dietary habits. Using our take-home maintenance kit helps preserve the brightness." },
    ],
  },
  invisalign: {
    title: "Invisalign® Clear Aligners",
    subheading: "Straighten your teeth discreetly and comfortably with customized, medical-grade clear aligners.",
    metaDesc: "Discreet orthodontic alignment with Invisalign clear aligners at Ray Dental Clinic. iTero 3D digital simulation and custom treatment paths.",
    benefits: [
      "100% Virtually Invisible Trays",
      "Removable for Eating and Hygiene",
      "iTero® 3D Virtual Progress Modeling",
      "Fewer Clinical Appointments Required",
    ],
    process: [
      { title: "iTero® 3D Scan", desc: "We scan your teeth in minutes, generating a 3D digital model of your jaw." },
      { title: "ClinCheck® Stage Plan", desc: "We generate a customized 3D movie showing exactly how your teeth will move each week." },
      { title: "Aligner Fitting", desc: "You receive your sequence of smooth, BPA-free clear aligners to wear daily." },
      { title: "Bi-Monthly Check-ins", desc: "Quick check-ups every 6–8 weeks to review alignment and hand over your next sets." },
    ],
    faqs: [
      { q: "How many hours a day must I wear aligners?", a: "For optimal results, aligners should be worn 20 to 22 hours per day, removing them only for meals, brushing, and flossing." },
      { q: "Is Invisalign as effective as metal braces?", a: "Yes, for the vast majority of orthodontic cases, Invisalign is highly effective, predictable, and significantly more comfortable." },
    ],
  },
  orthodontics: {
    title: "Specialist Orthodontics",
    subheading: "Expert bite correction and structural alignment for adults and children in a luxury setting.",
    metaDesc: "Board-certified specialist orthodontic care at Ray Dental Clinic. Options include Damon self-ligating braces, ceramic braces, and hidden alignment systems.",
    benefits: [
      "Board-Certified Specialist Orthodontists",
      "Discreet Ceramic & Clear Braces Available",
      "Advanced Self-Ligating Technology",
      "Full Functional Jaw Alignment",
    ],
    process: [
      { title: "Detailed Orthodontic Assessment", desc: "Cephalometric X-rays, photos, and digital bite profiling are completed." },
      { title: "Custom System Selection", desc: "Choose from aesthetic ceramic brackets, Damon self-ligating braces, or Invisalign." },
      { title: "Precision Bracket Placement", desc: "Brackets are bonded to teeth with surgical accuracy to direct tooth movement." },
      { title: "Gentle Wire Tuning", desc: "Periodic short adjustment appointments to keep treatment moving efficiently." },
    ],
    faqs: [
      { q: "At what age should children see an orthodontist?", a: "The American Association of Orthodontists recommends a first evaluation by age 7 to detect early skeletal issues." },
      { q: "How long does standard orthodontic treatment last?", a: "Active treatment ranges between 12 to 24 months, depending on the complexity of the alignment." },
    ],
  },
  "root-canal": {
    title: "Microscopic Root Canal Therapy",
    subheading: "Preserve and protect infected teeth painlessly using advanced microscope-assisted endodontics.",
    metaDesc: "Painless microscopic root canal treatments at Ray Dental Clinic LLC. Single-visit completion, high success rate, and expert endodontists.",
    benefits: [
      "High-Power Microscope Visualization",
      "Painless Computerized Local Anesthesia",
      "Completed in a Single Session (90 Mins)",
      "High-Strength Protective Ceramic Crown",
    ],
    process: [
      { title: "Digital 3D Diagnosis", desc: "We utilize 3D dental scans to inspect the precise internal root canal structures." },
      { title: "Anesthetic Numbing", desc: "Computerized delivery ensures you feel absolutely nothing during the treatment." },
      { title: "Microscopic Cleansing", desc: "We access, disinfect, and sterilize the canals under 20x microscopic magnification." },
      { title: "Thermafil Canal Sealing", desc: "The canal is filled and sealed to prevent re-infection, prepared for a final crown." },
    ],
    faqs: [
      { q: "Is a root canal painful?", a: "No. With our advanced computerized numbing and microscopic approach, a root canal feels no different than a standard dental filling." },
      { q: "Will I need a crown after the treatment?", a: "Yes. Removing the pulp weakens the tooth structure. A custom porcelain crown is highly recommended to restore complete chewing strength." },
    ],
  },
  pediatric: {
    title: "Specialist Pediatric Care",
    subheading: "Gentle, fear-free specialist dental care for children inside a fun, welcoming boutique environment.",
    metaDesc: "Bespoke pediatric dentistry at Ray Dental Clinic LLC. Child-friendly suites, preventive sealants, and positive reinforcement visits.",
    benefits: [
      "Board-Certified Specialist Pediatric Dentists",
      "Intimidating Tools Kept Out of Sight",
      "Interactive Screen Entertainment in Ceilings",
      "Preventive Sealants & Gentle Fluoride Varnishes",
    ],
    process: [
      { title: "Happy Visit Tour", desc: "We show the child our luxury suites, letting them play with the dental chair buttons." },
      { title: "Non-Intimidating Exam", desc: "We perform a gentle visual check-up, explaining everything as a fun game." },
      { title: "Aesthetic Cleaning", desc: "Removing plaque gently while the child watches their favorite cartoons on the ceiling." },
      { title: "Health Badge & Reward", desc: "Positive reinforcement with healthy rewards to build lifelong positive associations." },
    ],
    faqs: [
      { q: "When should my baby have their first dental visit?", a: "We recommend booking their first happy visit within six months of their first tooth erupting, or by their first birthday." },
      { q: "What are dental sealants?", a: "Sealants are thin, protective coatings applied to the chewing surfaces of primary molars to prevent cavities from forming in deep grooves." },
    ],
  },
};

// Generate static routes for build optimization
export async function generateStaticParams() {
  return Object.keys(serviceRegistry).map((slug) => ({
    slug: slug,
  }));
}

// Generate dynamic SEO metadata
type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = serviceRegistry[slug];
  if (!service) {
    return {
      title: "Service Not Found | Ray Dental Group",
    };
  }
  return {
    title: `${service.title} | Ray Dental Clinic LLC`,
    description: service.metaDesc,
  };
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = serviceRegistry[slug];

  if (!service) {
    notFound();
  }

  return (
    <NavbarWrapper>
      <main className="flex-grow">
        {/* Service Hero Banner */}
        <section className="relative min-h-[60vh] flex items-center justify-center pt-32 pb-16 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image
              src="/hero.png"
              alt={service.title}
              fill
              className="object-cover brightness-50"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-burgundy via-burgundy/60 to-transparent" />
          </div>

          <div className="max-w-4xl mx-auto px-6 relative z-10 text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-gold-light/10 border border-gold-mid/30">
              <Sparkles className="h-3.5 w-3.5 text-gold-light" />
              <span className="text-[10px] uppercase tracking-widest font-bold text-gold-light">
                Premium Dental Suite
              </span>
            </div>
            <h1 className="font-serif text-4xl sm:text-6xl text-white leading-tight">
              {service.title}
            </h1>
            <p className="text-white/80 max-w-xl mx-auto text-sm sm:text-base font-light leading-relaxed">
              {service.subheading}
            </p>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 bg-white px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center space-y-4 mb-16">
              <span className="text-[10px] uppercase tracking-widest font-bold text-gold-dark">
                The Ray Standard
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl text-burgundy">
                Why Select Our Clinic for {service.title}
              </h2>
              <div className="w-12 h-0.5 bg-gold-gradient mx-auto" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {service.benefits.map((benefit, idx) => (
                <div
                  key={idx}
                  className="bg-ice-blue/30 border border-neutral-100 rounded-lg p-6 hover:border-gold-mid/30 transition-slow"
                >
                  <div className="h-10 w-10 rounded-lg bg-gold-light/10 flex items-center justify-center text-gold-dark mb-4 border border-gold-mid/10">
                    <CheckCircle className="h-5 w-5" />
                  </div>
                  <h4 className="font-serif text-sm font-semibold text-burgundy mb-2">
                    Premium Feature {idx + 1}
                  </h4>
                  <p className="text-xs text-neutral-700 leading-relaxed font-light">
                    {benefit}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Treatment Process Roadmap */}
        <section className="py-20 bg-ice-blue/20 border-y border-gold-mid/10 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center space-y-4 mb-16">
              <span className="text-[10px] uppercase tracking-widest font-bold text-gold-dark">
                Bespoke Treatment Flow
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl text-burgundy">
                The Treatment Journey
              </h2>
              <div className="w-12 h-0.5 bg-gold-gradient mx-auto" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
              {service.process.map((step, idx) => (
                <div key={idx} className="space-y-4 relative z-10 bg-white p-6 rounded-lg shadow-sm border border-neutral-100">
                  <div className="h-12 w-12 rounded-full bg-burgundy text-gold-light flex items-center justify-center font-serif text-lg font-bold border border-gold-mid/20">
                    0{idx + 1}
                  </div>
                  <h4 className="font-serif text-base text-burgundy font-semibold">
                    {step.title}
                  </h4>
                  <p className="text-xs text-neutral-500 leading-relaxed font-light">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Before & After Interactive Slider */}
        <section className="py-20 bg-white px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center space-y-4 mb-12">
              <span className="text-[10px] uppercase tracking-widest font-bold text-gold-dark">
                Clinical Cases
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl text-burgundy">
                Expectation vs Reality
              </h2>
              <div className="w-12 h-0.5 bg-gold-gradient mx-auto" />
            </div>

            <BeforeAfterSlider />
          </div>
        </section>

        {/* Accordion FAQ Section */}
        <section className="py-20 bg-ice-blue/20 border-y border-gold-mid/10 px-6">
          <div className="max-w-3xl mx-auto">
            <div className="text-center space-y-4 mb-12">
              <span className="text-[10px] uppercase tracking-widest font-bold text-gold-dark">
                Common Inquiries
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl text-burgundy">
                Frequently Asked Questions
              </h2>
              <div className="w-12 h-0.5 bg-gold-gradient mx-auto" />
            </div>

            <div className="space-y-4">
              {service.faqs.map((faq, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-lg border border-neutral-100 p-6 space-y-2 shadow-sm"
                >
                  <h4 className="font-serif text-sm font-semibold text-burgundy flex items-start gap-2">
                    <HelpCircle className="h-4.5 w-4.5 text-gold-mid shrink-0 mt-0.5" />
                    <span>{faq.q}</span>
                  </h4>
                  <p className="text-xs text-neutral-600 font-light leading-relaxed pl-6">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Action-Driving Banner */}
        <section className="bg-burgundy py-20 px-6 text-center border-t border-gold-mid/20 relative overflow-hidden">
          <div className="absolute inset-0 bg-radial-gradient from-burgundy-light/20 to-transparent pointer-events-none" />
          <div className="max-w-xl mx-auto space-y-6 relative z-10">
            <h2 className="font-serif text-2xl sm:text-4xl text-gold-light">
              Schedule Your Consultation
            </h2>
            <p className="text-white/70 text-xs sm:text-sm font-light leading-relaxed">
              Reserve your private suite and meet with our elite clinical specialists. Experience dental care redesigned.
            </p>
            <div className="pt-2">
              {/* Trigger booking via floating concierge / contact */}
              <a
                href="https://wa.me/16053432842?text=Hello%20Ray%20Dental,%20I%20would%20like%2520to%2520schedule%2520a%2520consultation."
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gold-gradient hover:brightness-105 text-white text-xs font-semibold tracking-widest uppercase px-8 py-3.5 rounded shadow-lg shadow-gold-mid/10 transition-all inline-block"
              >
                Connect With Concierge
              </a>
            </div>
          </div>
        </section>
      </main>
    </NavbarWrapper>
  );
}
