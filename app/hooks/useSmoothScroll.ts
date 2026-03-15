"use client";

import Lenis from "lenis";
import { useEffect } from "react";

export function useSmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const lenis = new Lenis({
      duration: 1,
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1,
      lerp: 0.08,
    });

    let rafId = 0;

    const raf = (time: number) => {
      lenis.raf(time);
      rafId = window.requestAnimationFrame(raf);
    };

    rafId = window.requestAnimationFrame(raf);

    const onAnchorClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const anchor = target?.closest('a[href^="#"]') as HTMLAnchorElement | null;

      if (!anchor) {
        return;
      }

      const sectionId = anchor.getAttribute("href");
      if (!sectionId || sectionId === "#") {
        return;
      }

      const section = document.querySelector(sectionId);
      if (!section) {
        return;
      }

      event.preventDefault();
      lenis.scrollTo(section as HTMLElement, {
        offset: -84,
        duration: 1,
      });
    };

    document.addEventListener("click", onAnchorClick);

    return () => {
      document.removeEventListener("click", onAnchorClick);
      window.cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);
}
