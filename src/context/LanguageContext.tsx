"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type Language = "en" | "ar";

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations: Record<string, Record<Language, string>> = {
  // Navigation
  home: { en: "Home", ar: "الرئيسية" },
  about: { en: "About", ar: "من نحن" },
  services: { en: "Services", ar: "خدماتنا" },
  doctors: { en: "Doctors", ar: "فريقنا الطبي" },
  technology: { en: "Technology", ar: "التقنيات الحديثة" },
  gallery: { en: "Gallery", ar: "معرض الحالات" },
  testimonials: { en: "Testimonials", ar: "آراء المرضى" },
  contact: { en: "Contact", ar: "اتصل بنا" },
  bookConsultation: { en: "Book Appointment", ar: "احجز موعداً" },
  exploreTreatments: { en: "Explore Treatments", ar: "استكشف خدماتنا" },
  discoverOurClinic: { en: "Discover Our Clinic", ar: "تعرف على عيادتنا" },

  // Hero Section
  heroTitleMain: { en: "Crafting Confident Smiles", ar: "ابتسامة أجمل." },
  heroTitleSub: { en: "with World-Class Precision", ar: "رعاية أدق." },
  heroSubtitle: {
    en: "Advanced cosmetic and restorative dentistry delivered with exceptional care and world-class expertise.",
    ar: "نجمع بين الخبرة الطبية المتقدمة وأحدث التقنيات الرقمية لنقدم تجربة علاجية مريحة ونتائج استثنائية تدوم لسنوات.",
  },
  heroBadge: { en: "Rapid City • South Dakota • Over 60 Years of Excellence", ar: "رابيد سيتي • ساوث داكوتا • أكثر من 60 عاماً من الثقة والخبرة" },
  
  // Hero Float Cards
  floatCard1Title: { en: "Next-Gen 3D Imaging", ar: "تصوير ثلاثي الأبعاد متطور" },
  floatCard1Desc: { en: "Ultra-precise digital scans for custom treatment mapping.", ar: "مسح رقمي دقيق للغاية لتخطيط العلاج المخصص." },
  floatCard2Title: { en: "5-Star Lounge Comfort", ar: "راحة ردهة ٥ نجوم" },
  floatCard2Desc: { en: "Indulge in noise-canceling suites and calming amenities.", ar: "استمتع بأجنحة عزل الصوت والمرافق الهادئة." },

  // Trust Section
  trustTitle: { en: "The Standard of Prestige", ar: "معيار التميز والهيبة" },
  trustSubtitle: { en: "Delivering elite clinical outcomes backed by world-class satisfaction rates.", ar: "تقديم نتائج علاجية نخبوية مدعومة بنسب رضا عالمية." },
  stat1Num: { en: "15,000+", ar: "15,000+" },
  stat1Label: { en: "Happy Patients", ar: "مريض تمت خدمته" },
  stat2Num: { en: "20+", ar: "20+" },
  stat2Label: { en: "Years Experience", ar: "عاماً من الخبرة المتخصصة" },
  stat3Num: { en: "98%", ar: "98%" },
  stat3Label: { en: "Patient Satisfaction", ar: "نسبة رضا المرضى" },
  stat4Num: { en: "100%", ar: "100%" },
  stat4Label: { en: "Advanced Technology", ar: "تقنيات رقمية متطورة" },

  // Services Section
  servicesTitle: { en: "Signature Services", ar: "خدماتنا" },
  servicesSubtitle: { en: "Every treatment curated as a masterpiece of clinical engineering.", ar: "نقدم مجموعة متكاملة من خدمات طب الأسنان الحديثة باستخدام أحدث التقنيات والمعايير الطبية." },
  learnMore: { en: "Discover Experience", ar: "اكتشف التجربة" },
  
  service1Name: { en: "Dental Implants", ar: "زراعة الأسنان" },
  service1Desc: { en: "Swiss titanium & zirconia implants restoring absolute structural bite integrity.", ar: "حلول متقدمة لتعويض الأسنان المفقودة واستعادة الوظيفة الطبيعية والمظهر الجمالي." },
  service2Name: { en: "Porcelain Veneers", ar: "الفينير التجميلي" },
  service2Desc: { en: "Ultra-thin handcrafted porcelain overlays tailored to reflect natural optical enamel.", ar: "عدسات خزفية عالية الجودة تمنح الأسنان مظهراً أكثر تناسقاً وإشراقاً." },
  service3Name: { en: "Orthodontics", ar: "تقويم الأسنان" },
  service3Desc: { en: "Discreet alignment correction utilizing premium Invisalign clear aligners.", ar: "خطط علاجية متطورة لتحسين اصطفاف الأسنان وتحقيق ابتسامة متوازنة." },
  service4Name: { en: "Crowns & Bridges", ar: "التيجان والجسور" },
  service4Desc: { en: "Premium aesthetic zirconia caps and bridges restoring bite strength.", ar: "ترميمات عالية الجودة لاستعادة قوة الأسنان ووظيفة الأسنان الطبيعية." },
  service5Name: { en: "TMJ Disorder Treatment", ar: "علاج اضطرابات مفصل الفك" },
  service5Desc: { en: "Diagnostic and therapeutic care to relieve jaw joint pain and click tension.", ar: "تشخيص وعلاج مشكلات مفصل الفك لتحسين الراحة ووظائف الفم." },
  service6Name: { en: "Oral Surgery", ar: "جراحة الفم" },
  service6Desc: { en: "Expert wisdom teeth extractions and surgical procedures with clinical precision.", ar: "إجراءات جراحية متخصصة تتم وفق أعلى معايير السلامة والرعاية." },
  service7Name: { en: "TMJ Disorder Treatment", ar: "علاج اضطرابات مفصل الفك" },
  service7Desc: { en: "Diagnostic and therapeutic care to relieve jaw joint pain and click tension.", ar: "تشخيص وعلاج مشكلات مفصل الفك لتحسين الراحة ووظائف الفم." },
  service8Name: { en: "Root Canal Therapy", ar: "علاج جذور الأسنان" },
  service8Desc: { en: "Microscopic endodontic nerve therapy saving and preserving natural teeth.", ar: "تقنيات دقيقة للحفاظ على الأسنان الطبيعية وعلاج الالتهابات بفعالية." },
  service9Name: { en: "Sedation Dentistry", ar: "طب الأسنان المهدئ" },
  service9Desc: { en: "Conscious sedation options for a completely relaxed and anxiety-free visit.", ar: "خيارات التخدير الواعي لزيارة مريحة وخالية تمامًا من القلق." },
  service10Name: { en: "Teeth Whitening", ar: "تبييض الأسنان" },
  service10Desc: { en: "Advanced light-activated teeth whitening rendering enamel shades brighter.", ar: "إجراءات آمنة وفعالة للحصول على أسنان أكثر بياضاً وإشراقاً." },
  service11Name: { en: "Dentures & Partials", ar: "أطقم الأسنان الكاملة والجزئية" },
  service11Desc: { en: "Comfortable and natural-looking custom prosthetics restoring full dental function.", ar: "تركيبات تعويضية مريحة وذات مظهر طبيعي لاستعادة وظيفة الفم كاملة." },
  service12Name: { en: "Digital 3D Diagnostics", ar: "التشخيص الرقمي ثلاثي الأبعاد" },
  service12Desc: { en: "Next-generation low-radiation 3D imaging for highly precise diagnostic mapping.", ar: "تصوير متطور منخفض الإشعاع لتخطيط تشخيصي شامل ودقيق." },

  // Doctor Spotlight
  doctorTitle: { en: "Elite Clinical Artistry", ar: "فريقنا الطبي" },
  doctorSubtitle: { en: "Meet the dedicated team of clinical professionals behind Ray Dental Clinic.", ar: "يضم فريقنا نخبة من أطباء الأسنان ذوي الخبرة والكفاءة في مختلف التخصصات. نعمل بروح الفريق الواحد لنقدم رعاية شخصية وتجربة علاجية مريحة لكل مريض." },
  doc1Name: { en: "Dr. Joshua Friedman", ar: "د. جوشوا فريدمان" },
  doc1Role: { en: "Cosmetic & Implant Surgeon", ar: "جراح التجميل وزراعة الأسنان" },
  doc1Bio: {
    en: "Dr. Joshua Friedman graduated from Miami University with a Bachelor of Arts in Zoology and Psychology (minor in Neuroscience), and earned his Doctorate of Dental Surgery from the University of Michigan. He completed advanced implant training in West Palm Beach under the late pioneer Dr. Carl Misch, combining microsurgical precision with elite cosmetic artistry.",
    ar: "تخرج الدكتور جوشوا فريدمان من جامعة ميامي بدرجة البكالوريوس في علم الحيوان وعلم النفس، وحصل على الدكتوراه في جراحة طب الأسنان من جامعة ميشيغان. أكمل تدريبًا متقدمًا في زراعة الأسنان في ويست بالم بيتش تحت إشراف الرائد الراحل الدكتور كارل ميش، جامعًا بين الدقة الجراحية المجهرية والفن التجميلي النخبوية.",
  },
  doc1Specialty: { en: "Cosmetic & Implant Dentistry", ar: "طب الأسنان التجميلي وزراعة الأسنان" },
  doc1Credentials: { en: "Michigan Dental (DDS) • Misch International Implant Institute", ar: "دكتوراه طب الأسنان من جامعة ميشيغان (DDS) • معهد ميش الدولي لزراعة الأسنان" },
  doc1Experience: { en: "18+ Years Advanced Aesthetics", ar: "أكثر من ١٨ عاماً من الجماليات المتقدمة" },

  doc2Name: { en: "Dr. Anh Harper", ar: "د. آن هاربر" },
  doc2Role: { en: "Sleep Apnea & Pediatric Specialist", ar: "أخصائية انقطاع النفس النومي وطب أسنان الأطفال" },
  doc2Bio: {
    en: "Dr. Anh Harper graduated from the University of Nebraska. She specializes in advanced assistance and therapy for sleep apnea patients, utilizing custom-fit snoring appliances. She excels in all areas of restorative dentistry, including dentures and partials, and has a special passion for working with children.",
    ar: "تخرجت الدكتورة آن هاربر من جامعة نبراسكا. وهي متخصصة في المساعدة المتقدمة والعلاج لمرضى انقطاع النفس النومي باستخدام أجهزة الشخير المصممة خصيصًا. وتتميز في جميع مجالات طب الأسنان الترميمي بما في ذلك أطقم الأسنان الكاملة والجزئية ولديها شغف خاص بالعمل مع الأطفال.",
  },
  doc2Specialty: { en: "Sleep Apnea Therapy & Pedodontics", ar: "علاج انقطاع النفس النومي وطب أسنان الأطفال" },
  doc2Credentials: { en: "University of Nebraska (DDS)", ar: "جامعة نبراسكا (DDS)" },
  doc2Experience: { en: "15+ Years Specialized Care", ar: "أكثر من ١٥ عاماً من الرعاية المتخصصة" },

  doc3Name: { en: "Dr. Travis Lambert", ar: "د. ترافيس لومبارت" },
  doc3Role: { en: "Family & General Aesthetics", ar: "طب الأسنان العائلي والتجميل العام" },
  doc3Bio: {
    en: "Dr. Travis Lambert graduated from Chadron State College with a Chemistry degree and earned his Doctorate of Dental Surgery from the University of Nebraska Medical Center. He owned and operated several practices during his career, focusing on listening to patients and explaining treatment options so they are easily understood. He is an active member of the ADA and SDDA.",
    ar: "تخرج الدكتور ترافيس لامبرت من كلية تشادرون الحكومية بشهادة في الكيمياء، وحصل على دكتوراه في جراحة الأسنان من المركز الطبي لجامعة نبراسكا. امتلك وأدار العديد من العيادات، مع التركيز على شرح خيارات العلاج للمرضى لتبسيط فهمها. وهو عضو نشط في الجمعية الأمريكية لطب الأسنان وجمعية ساوث داكوتا لطب الأسنان.",
  },
  doc3Specialty: { en: "Family & Restorative Dentistry", ar: "طب الأسنان العائلي والترميمي" },
  doc3Credentials: { en: "UNMC Dental (DDS) • Member of ADA & SDDA", ar: "المركز الطبي لجامعة نبراسكا (DDS) • عضو الجمعية الأمريكية لطب الأسنان" },
  doc3Experience: { en: "20+ Years Family Clinical Trust", ar: "أكثر من ٢٠ عاماً من الثقة الإكلينيكية العائلية" },

  doc4Name: { en: "Dr. Shereef K. Bava", ar: "د. شريف ك. بافا" },
  doc4Role: { en: "Cosmetic Dentist | Founder and CEO, Ray Dental Clinic LLC", ar: "طبيب أسنان تجميلي | المؤسس والرئيس التنفيذي، عيادة راي لطب الأسنان ذ.م.م" },
  doc4Bio: {
    en: "Dr. Shereef K. Bava is a passionate Cosmetic Dentist with nearly a decade of experience in aesthetic dentistry. As the Founder & CEO of Ray Dental Clinic LLC, he specializes in Hollywood Smile Designing, Smile Makeovers, Veneers, and advanced cosmetic dental treatments. Known for his artistic approach and attention to detail, Dr. Shereef combines modern dental techniques with personalized care to create natural, confident smiles. His commitment to excellence and patient satisfaction has made him a trusted name in cosmetic dentistry.",
    ar: "الدكتور شريف ك. بافا هو طبيب أسنان تجميلي شغوف يتمتع بخبرة تقارب العقد في طب الأسنان التجميلي. بصفته المؤسس والرئيس التنفيذي لعيادة راي لطب الأسنان ذ.م.م، فهو متخصص في تصميم ابتسامة هوليوود، وتجميل الابتسامة، والفينير، وعلاجات الأسنان التجميلية المتقدمة. يشتهر الدكتور شريف بأسلوبه الفني واهتمامه بالتفاصيل، ويجمع بين تقنيات طب الأسنان الحديثة والرعاية الشخصية لخلق ابتسامات طبيعية وواثقة. إن التزامه بالتميز ورضا المرضى جعله اسماً موثوقاً به في طب الأسنان التجميلي."
  },
  doc4Specialty: { en: "Founder and CEO", ar: "المؤسس والرئيس التنفيذي" },
  doc4Credentials: { en: "Cosmetic Dentist • Specialist in Aesthetic Dentistry", ar: "طبيب أسنان تجميلي • أخصائي تجميل الأسنان" },
  doc4Experience: { en: "9+ Years Aesthetic Dentistry", ar: "أكثر من ٩ سنوات في تجميل الأسنان" },

  doc5Name: { en: "Dr. Wujithan Sid", ar: "د. وجيثان سيد" },
  doc5Role: { en: "Dental Surgeon | Founder and CFO, Ray Dental Clinic LLC", ar: "جراحة أسنان | المؤسس والمدير المالي، عيادة راي لطب الأسنان ذ.م.م" },
  doc5Bio: {
    en: "Dr. Wujithan Sid is a dedicated Dental Surgeon with a special focus on Endodontics and Pediatric Dentistry. As the Founder & CFO of Ray Dental Clinic LLC, she combines clinical excellence with strategic leadership, contributing to both exceptional patient care and the growth of the organization. Skilled in root canal treatments, pediatric dental care, restorative dentistry, preventive dentistry, dental extractions, and emergency dental management, Dr. Wujithan is committed to delivering compassionate, evidence-based dental care for patients of all ages. Her gentle approach, clinical precision, and patient-centered philosophy have made her a trusted choice for both children and adults.",
    ar: "الدكتورة وجيثان سيد هي جراحة أسنان متميزة تركز بشكل خاص على علاج عصب الأسنان وطب أسنان الأطفال. بصفتها المؤسس والمدير المالي لعيادة راي لطب الأسنان ذ.م.م، فهي تجمع بين التميز السريري والقيادة الاستراتيجية، مما يساهم في تقديم رعاية استثنائية للمرضى ونمو المؤسسة. تتمتع الدكتورة وجيثان بمهارة عالية في علاجات قنوات الجذور، ورعاية أسنان الأطفال، وطب الأسنان الترميمي، وطب الأسنان الوقائي، وخلع الأسنان، وإدارة حالات طوارئ الأسنان، وهي ملتزمة بتقديم رعاية أسنان رحيمة ومبنية على الأدلة للمرضى من جميع الأعمار. إن أسلوبها اللطيف، ودقتها السريرية، وفلسفتها التي تركز على المريض جعلتها خياراً موثوقاً به للأطفال والبالغين على حد سواء."
  },
  doc5Specialty: { en: "Founder and CFO", ar: "المؤسس والمدير المالي" },
  doc5Credentials: { en: "Dental Surgeon (BDS) • Specialist in Endodontics & Pedodontics", ar: "جراحة أسنان (BDS) • أخصائية علاج الجذور وطب أسنان الأطفال" },
  doc5Experience: { en: "10+ Years Dedicated Clinical Care", ar: "أكثر من ١٠ سنوات من الرعاية السريرية المخصصة" },

  doc6Name: { en: "Dr. Muhammed Salam K", ar: "د. محمد سلام ك." },
  doc6Role: { en: "Chief Operating Officer (COO), Ray Dental LLC | General Dentist", ar: "طبيب أسنان عام | الرئيس التنفيذي للعمليات، راي لطب الأسنان ذ.م.م" },
  doc6Bio: {
    en: "A dedicated General Dentist with over 5 years of clinical experience, skilled in managing a wide range of routine dental procedures. As the Chief Operating Officer (COO) of Ray Dental LLC, he combines clinical expertise with operational leadership to ensure high standards of patient care and practice management. Passionate about Exodontia and Minor Oral Surgical Procedures, with strong expertise in restorative dentistry, preventive care, emergency dental management, and comprehensive treatment planning.",
    ar: "طبيب أسنان عام متميز يتمتع بخبرة سريرية تزيد عن ٥ سنوات، وماهر في إدارة مجموعة واسعة من إجراءات طب الأسنان الروتينية. بصفته الرئيس التنفيذي للعمليات (COO) لشركة راي لطب الأسنان ذ.م.م، فهو يجمع بين الخبرة السريرية والقيادة التشغيلية لضمان معايير عالية من رعاية المرضى وإدارة العيادة. شغوف بخلع الأسنان والإجراءات الجراحية الصغرى للفم، مع خبرة قوية في طب الأسنان الترميمي، والرعاية الوقائية، وإدارة طوارئ الأسنان، والتخطيط الشامل للعلاج."
  },
  doc6Specialty: { en: "Chief Operating Officer & General Dentist", ar: "الرئيس التنفيذي للعمليات وطبيب أسنان عام" },
  doc6Credentials: { en: "BDS • Specialist in Minor Oral Surgery", ar: "بكالوريوس في جراحة طب الأسنان (BDS) • متخصص في جراحة الفم الصغرى" },
  doc6Experience: { en: "5+ Years Clinical Practice", ar: "أكثر من ٥ سنوات من الممارسة السريرية" },

  doc7Name: { en: "Dr. Farook Rahman Kalappattil", ar: "د. فاروق رحمن كالاباتيل" },
  doc7Role: { en: "General Dentist", ar: "طبيب أسنان عام" },
  doc7Bio: {
    en: "Dr. Farook Rahman Kalappattil is a skilled General Dentist with 5 years of clinical experience. He is recognized for exceptional clinical precision, excellent hand skills, and a compassionate, patient-centered approach, ensuring comfortable and high-quality dental care. He specializes in root canal treatment, pulpectomy, cosmetic dentistry, and minor surgical procedures.",
    ar: "الدكتور فاروق رحمن كالاباتيل هو طبيب أسنان عام ماهر يتمتع بخبرة سريرية تبلغ ٥ سنوات. وهو معروف بدقته السريرية الاستثنائية، ومهاراته اليدوية الممتازة، ونهجه الرحيم الذي يركز على المريض، مما يضمن رعاية أسنان مريحة وعالية الجودة. وهو متخصص في علاج عصب الأسنان، واستئصال اللب، وطب الأسنان التجميلي، والإجراءات الجراحية الصغرى."
  },
  doc7Specialty: { en: "General Dentist", ar: "طبيب أسنان عام" },
  doc7Credentials: { en: "BDS • Specialist in Root Canal & Esthetics", ar: "بكالوريوس في جراحة طب الأسنان (BDS) • أخصائي علاج الجذور وتجميل الأسنان" },
  doc7Experience: { en: "5+ Years Clinical Practice", ar: "أكثر من ٥ سنوات من الممارسة السريرية" },

  // Technology Section
  techTitle: { en: "Futuristic Precision Dentistry", ar: "التقنيات الحديثة" },
  techSubtitle: { en: "Where cutting-edge technology meets flawless execution.", ar: "نستخدم أحدث التقنيات الرقمية لتوفير تشخيص أكثر دقة وعلاج أكثر راحة وكفاءة." },
  techCard1Title: { en: "AI-Powered Smile Designs", ar: "تصميم الابتسامة الرقمي" },
  techCard1Desc: { en: "Algorithms analyze facial symmetry to map crowns in real-time.", ar: "نستخدم أحدث تقنيات تصميم الابتسامة ثلاثية الأبعاد بالذكاء الاصطناعي لتحليل تناسق الوجه ومحاكاة الابتسامة بالكامل." },
  techCard2Title: { en: "Intraoral 3D Laser Scanning", ar: "المسح الرقمي للأسنان" },
  techCard2Desc: { en: "Skip uncomfortable physical molds with instant micro-micron resolution scans.", ar: "نستبدل طبعات الأسنان التقليدية المزعجة بمسح فموي ليزري رقمي دقيق ومريح وسريع." },
  techCard3Title: { en: "Microscopic Endodontics", ar: "التصوير ثلاثي الأبعاد وتقنيات الجراحة" },
  techCard3Desc: { en: "Up to 20x magnification for surgical accuracy during nerve therapy.", ar: "أجهزة تصوير ثلاثي الأبعاد وجراحة مجهرية متقدمة منخفضة الإشعاع لضمان دقة متناهية في العلاج والزراعة." },

  // Before & After Section
  baTitle: { en: "Transformational Artistry", ar: "معرض الحالات" },
  baSubtitle: { en: "Slide to witness the precision of actual cosmetic restorations.", ar: "اسحب لمشاهدة دقة ترميمات الأسنان التجميلية الفعلية." },
  beforeLabel: { en: "Before Treatment", ar: "قبل العلاج" },
  afterLabel: { en: "After Treatment", ar: "بعد العلاج" },

  // Testimonials
  testimonialsTitle: { en: "Echoes of Gratitude", ar: "آراء المرضى" },
  testimonialsSubtitle: { en: "Read genuine feedback from our patient community.", ar: "نفخر بثقة مرضانا ونسعى دائماً لتقديم تجربة تتجاوز التوقعات." },
  review1Text: {
    en: "I love Ray Dental Clinic! They are always so kind and willing to work with you. They actually care about their patients. I love this place!",
    ar: "فريق احترافي ومتميز. شعرت بالراحة منذ الزيارة الأولى وكانت النتائج رائعة.",
  },
  review1Author: { en: "Emily W.", ar: "إيميلي و." },
  review1Loc: { en: "Rapid City, SD", ar: "رابط سيتي، ساوث داكوتا" },
  review2Text: {
    en: "Everyone at Ray Dental is so courteous and always has a smile. They know me by name and always accommodate me, getting me in right away if I have a problem!",
    ar: "أفضل تجربة علاج أسنان مررت بها. اهتمام كبير بالتفاصيل وشرح واضح لكل خطوة.",
  },
  review2Author: { en: "Kristi K.", ar: "كريستي ك." },
  review2Loc: { en: "Rapid City, SD", ar: "رابط سيتي، ساوث داكوتا" },
  review3Text: {
    en: "The doctors and the whole team are just terrific. I would highly recommend them to anyone looking for a great dentist.",
    ar: "الأطباء والفريق بأكمله رائعون حقًا. أوصي بهم بشدة لأي شخص يبحث عن طبيب أسنان رائع.",
  },
  review3Author: { en: "Steve M.", ar: "ستيف م." },
  review3Loc: { en: "Rapid City, SD", ar: "رابيد سيتي، ساوث داكوتا" },

  // Clinic Experience Section
  expTitle: { en: "Six Decades of Trust, Five-Star Care", ar: "من نحن" },
  expText1: {
    en: "At Ray Dental Clinic, we combine a 60-year legacy of clinical trust in Rapid City with the latest advancements in modern, gentle dentistry. Every visit is tailored to your comfort in a relaxing environment equipped with cutting-edge dental technology.",
    ar: "منذ عقود، تلتزم عيادة راي لطب الأسنان بتقديم رعاية متقدمة تجمع بين الخبرة السريرية والتقنيات الحديثة في بيئة مريحة واحترافية. نؤمن بأن كل ابتسامة فريدة، ولذلك نعمل على تصميم خطط علاجية مخصصة تلبي احتياجات كل مريض بدقة واهتمام.",
  },
  expText2: {
    en: "Our state-of-the-art office is fully equipped for everything from routine family care and cosmetic smiles to advanced implant dentistry and specialized sleep apnea treatments, maintaining the highest standards of safety and care in South Dakota.",
    ar: "سواء كنت تبحث عن رعاية وقائية، علاجية أو تجميلية، ستجد فريقاً متخصصاً يرافقك في كل خطوة لتحقيق أفضل النتائج الممكنة.",
  },

  // Booking Form
  bookingTitle: { en: "Begin Your Smile Transformation", ar: "احجز موعدك" },
  bookingSubtitle: {
    en: "Enter your details below. Our concierge committee will contact you within 15 minutes to secure your private suite.",
    ar: "يسعد فريقنا بمساعدتك والإجابة عن جميع استفساراتك.",
  },
  formName: { en: "Your Full Name", ar: "الاسم الكامل" },
  formPhone: { en: "Your Phone Number", ar: "رقم الهاتف" },
  formEmail: { en: "Your Email Address", ar: "البريد الإلكتروني" },
  formService: { en: "Select Desired Treatment", ar: "الخدمة المطلوبة" },
  formDate: { en: "Preferred Appointment Date", ar: "التاريخ المفضل" },
  submitBooking: { en: "Secure Private Suite", ar: "إرسال الطلب" },

  // Contact Info
  contactTitle: { en: "Coordinates of Care", ar: "معلومات التواصل" },
  openingHours: { en: "Opening Hours", ar: "ساعات العمل" },
  hoursWeekdays: { en: "Mon - Fri: 8:00 AM - 5:00 PM", ar: "الإثنين – الجمعة: 8:00 صباحاً – 5:00 مساءً" },
  hoursSunday: { en: "Sat & Sun: Closed", ar: "السبت والأحد: مغلق" },
  addressLabel: { en: "Address", ar: "العنوان" },
  addressValue: { en: "Office No: 202, Burj Amoon, Near Sharjah Islamic Bank, Al Gurfah, Fujairah, UAE", ar: "مكتب رقم 202، برج آمون، بالقرب من مصرف الشارقة الإسلامي، الغرفة، الفجيرة، الإمارات العربية المتحدة" },
  phoneLabel: { en: "Phone Concierge", ar: "الهاتف" },
  whatsappLabel: { en: "Direct Concierge", ar: "الكونسيرج المباشر" },

  // Journey Process
  processTitle: { en: "The Transformation Journey", ar: "رحلة العلاج" },
  processSubtitle: { en: "An extraordinary smile designed in three acts.", ar: "نقدم رعاية متكاملة من خلال خطوات واضحة ومحددة لضمان راحتك ورضاك." },
  step1Num: { en: "01", ar: "01" },
  step1Name: { en: "Virtual Consultation", ar: "الاستشارة والتقييم" },
  step1Desc: { en: "Begin with a digital smile scan and diagnostic blueprint mapping from your private suite.", ar: "فحص شامل وتشخيص دقيق باستخدام أحدث وسائل التصوير الرقمي." },
  step2Num: { en: "02", ar: "02" },
  step2Name: { en: "Clinical Artistry", ar: "خطة علاج مخصصة" },
  step2Desc: { en: "Collaborate with chief smile architects utilizing state-of-the-art 3D mockup previews.", ar: "وضع خطة علاجية واضحة تناسب احتياجاتك وأهدافك الصحية والتجميلية." },
  step3Num: { en: "03", ar: "03" },
  step3Name: { en: "Master Delivery", ar: "العلاج والمتابعة" },
  step3Desc: { en: "Complete restoration and bonding of custom Swiss veneers in a single, comfortable visit.", ar: "تنفيذ العلاج وفق أعلى المعايير مع متابعة مستمرة لضمان أفضل النتائج." },

  // Commemoration Plaque
  plaqueTextTitle: { en: "Heritage & Prestige", ar: "ميثاق التأسيس والامتنان" },
  plaqueBodyText: {
    en: "Established in 2026 amid war and uncertainty this clinic is a space of healing made possible by a nation that stood unshaken in its duty to protect. With deepest gratitude to the UAE Government and Armed Forces for their strength, sacrifice, and unbroken guardianship of peace.",
    ar: "تأسست في عام ٢٠٢٦ في ظل الأوقات العصيبة، لتكون هذه العيادة مساحة للشفاء بفضل وطن ظل ثابتاً في أداء واجبه في الحماية. مع أعمق درجات الامتنان لحكومة دولة الإمارات العربية المتحدة والقوات المسلحة على قوتهم وتضحياتهم وحراستهم المستمرة للسلام."
  },

  // Private Waiting Lounges
  loungeSectionTitle: { en: "Private Lounges", ar: "أجنحة الانتظار الخاصة" },
  loungeSectionSubtitle: {
    en: "Bespoke privacy and comfort tailored to GCC cultural traditions, offering separate luxury lounges.",
    ar: "خصوصية وراحة مخصصة تتماشى مع العادات والتقاليد العربية، مع صالات انتظار منفصلة ومجهزة بالكامل."
  },
  loungeFemaleTab: { en: "Female Lounge", ar: "صالون السيدات الخاص" },
  loungeMaleTab: { en: "Male Lounge", ar: "صالون الرجال الخاص" },

  // Footer & Copy
  allRightsReserved: { en: "© 2026 Ray Dental Clinic LLC. All Rights Reserved.", ar: "جميع الحقوق محفوظة © 2026" },
  locations: { en: "Rapid City, South Dakota", ar: "الرياض • دبي • رابيد سيتي" },
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");
  const [darkMode, setDarkMode] = useState<boolean>(true);

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "en" ? "ar" : "en"));
  };

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  useEffect(() => {
    const dir = language === "ar" ? "rtl" : "ltr";
    document.documentElement.dir = dir;
    document.documentElement.lang = language;
  }, [language]);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const t = (key: string): string => {
    if (translations[key]) {
      return translations[key][language];
    }
    return key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, darkMode, toggleDarkMode, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
