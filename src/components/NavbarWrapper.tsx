"use client";

import React, { useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import BookingModal from "./BookingModal";
import ExitIntentPopup from "./ExitIntentPopup";
import FloatingWidgets from "./FloatingWidgets";

export default function NavbarWrapper({ children }: { children: React.ReactNode }) {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const openBooking = () => setIsBookingOpen(true);
  const closeBooking = () => setIsBookingOpen(false);

  return (
    <>
      <Navbar onOpenBooking={openBooking} />
      {children}
      <Footer onOpenBooking={openBooking} />
      <BookingModal isOpen={isBookingOpen} onClose={closeBooking} />
      <ExitIntentPopup onOpenBooking={openBooking} />
      <FloatingWidgets onOpenBooking={openBooking} />
    </>
  );
}
