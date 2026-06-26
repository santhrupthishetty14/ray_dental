import React from "react";

export const LuxuryToothIcon = ({ className = "h-8 w-8" }: { className?: string }) => {
  return (
    <svg
      className={className}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Shimmering Gold Gradient for the 3D ribbon look */}
        <linearGradient id="ray-gold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#C89B3C" />
          <stop offset="25%" stopColor="#F5DF9E" />
          <stop offset="50%" stopColor="#D4A74A" />
          <stop offset="75%" stopColor="#A67C00" />
          <stop offset="100%" stopColor="#B38B38" />
        </linearGradient>
      </defs>

      {/* The main stylized R-Tooth path based on the brand guide:
          Left side forms an elegant R, right side completes the tooth crown/root */}
      <path
        d="M28.5 28C28.5 21.5 32 17 38.5 17C46 17 48.5 22.5 48.5 28.5C48.5 33.5 45.5 38 38.5 38H28.5V28ZM28.5 44H38.5C50 44 56.5 37 56.5 28.5C56.5 20 50 11.5 38.5 11.5H21V88.5H28.5V50H37.5C40.5 50 42.5 52 44.5 56.5L54 80.5C56 85.5 58 88.5 63.5 88.5H72L60.5 59.5C56.5 49.5 51 46 45 44.5C58 42.5 68.5 35 68.5 24.5C68.5 12.5 58.5 5.5 44.5 5.5H21C14.5 5.5 10 10 10 16.5V83C10 86.5 12 88.5 15.5 88.5H21V94.5H28.5V88.5ZM72.5 11.5C82 11.5 88 19.5 88 28.5C88 38 82 46 72.5 46C70 46 67.5 45.5 65.5 44.5L62.5 51.5C65.5 53 69 53.5 72.5 53.5C86.5 53.5 95.5 42.5 95.5 28.5C95.5 14.5 86.5 5.5 72.5 5.5C66.5 5.5 61 7.5 56.5 11L61.5 17C64.5 14.5 68.5 11.5 72.5 11.5ZM56.5 69.5L60.5 76.5C64 73 66 69.5 66 65C66 61 63 58.5 59.5 58.5C57.5 58.5 55.5 59.5 54 61.5L50 54.5C52.5 51 56 49.5 60 49.5C67.5 49.5 73.5 55.5 73.5 64C73.5 72.5 68.5 78.5 62 82.5L56.5 69.5Z"
        fill="url(#ray-gold)"
      />
    </svg>
  );
};
