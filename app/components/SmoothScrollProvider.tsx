"use client";

import { type PropsWithChildren } from "react";
import { useSmoothScroll } from "../hooks/useSmoothScroll";

export function SmoothScrollProvider({ children }: PropsWithChildren) {
  useSmoothScroll();

  return children;
}
