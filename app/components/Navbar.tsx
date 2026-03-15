"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const navItems = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "journey", label: "Journey" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

export function Navbar() {
  const [active, setActive] = useState("home");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]?.target?.id) {
          setActive(visible[0].target.id);
        }
      },
      {
        rootMargin: "-20% 0px -60% 0px",
        threshold: [0.2, 0.35, 0.5, 0.7],
      },
    );

    navItems.forEach((item) => {
      const section = document.getElementById(item.id);
      if (section) {
        observer.observe(section);
      }
    });

    return () => observer.disconnect();
  }, []);

  return (
    <header className="fixed top-0 z-50 w-full bg-transparent">
      <nav className="container-shell flex h-14 items-center justify-between gap-4">
        <a href="#home" className="text-sm font-semibold tracking-[0.2em] uppercase">
          NHH
        </a>

        <ul className="flex max-w-[75vw] items-center gap-4 overflow-x-auto py-1 text-xs sm:gap-6 sm:text-sm">
          {navItems.map((item) => (
            <li key={item.id} className="relative whitespace-nowrap text-sm">
              <a
                href={`#${item.id}`}
                className={`transition-opacity ${active === item.id ? "opacity-100" : "opacity-55 hover:opacity-100"}`}
              >
                {item.label}
              </a>
              {active === item.id ? (
                <motion.span
                  layoutId="active-nav"
                  className="absolute -bottom-1 left-0 h-px w-full bg-black"
                />
              ) : null}
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
