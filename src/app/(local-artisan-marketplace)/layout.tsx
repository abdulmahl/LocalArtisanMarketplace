"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function RSLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    AOS.init({
      duration: 500, // Animation duration in ms
      easing: "ease-in-out", // Animation easing style
      once: true, // Run animations only once per scroll
    });
  }, []);

  return <div className=" ">{children}</div>;
}
