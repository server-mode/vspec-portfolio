"use client";

import { useEffect, useMemo, useState } from "react";

type TypewriterTextProps = {
  text: string;
  className?: string;
  speed?: number;
  startDelay?: number;
  onComplete?: () => void;
  highlightPhrase?: string;
  highlightClassName?: string;
};

export function TypewriterText({
  text,
  className,
  speed = 90,
  startDelay = 260,
  onComplete,
  highlightPhrase,
  highlightClassName,
}: TypewriterTextProps) {
  const fullText = useMemo(() => text.trim(), [text]);
  const [visibleLength, setVisibleLength] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [highlightReady, setHighlightReady] = useState(false);

  useEffect(() => {
    let startAt = 0;
    let rafId = 0;
    let delayTimer = 0;

    const run = (now: number) => {
      if (startAt === 0) {
        startAt = now;
      }

      const elapsed = now - startAt;
      const nextLength = Math.min(Math.floor(elapsed / speed), fullText.length);
      setVisibleLength(nextLength);

      if (nextLength < fullText.length) {
        rafId = window.requestAnimationFrame(run);
      } else {
        setCompleted(true);
        onComplete?.();
      }
    };

    delayTimer = window.setTimeout(() => {
      rafId = window.requestAnimationFrame(run);
    }, startDelay);

    return () => {
      window.clearTimeout(delayTimer);
      window.cancelAnimationFrame(rafId);
    };
  }, [fullText, speed, startDelay, onComplete]);

  useEffect(() => {
    if (!completed || !highlightPhrase) {
      return;
    }

    const timer = window.setTimeout(() => {
      setHighlightReady(true);
    }, 200);

    return () => window.clearTimeout(timer);
  }, [completed, highlightPhrase]);

  const renderFullWithHighlight = () => {
    if (!highlightPhrase) {
      return fullText;
    }

    const phraseIndex = fullText.indexOf(highlightPhrase);
    if (phraseIndex === -1) {
      return fullText;
    }

    const before = fullText.slice(0, phraseIndex);
    const phrase = fullText.slice(phraseIndex, phraseIndex + highlightPhrase.length);
    const after = fullText.slice(phraseIndex + highlightPhrase.length);

    return (
      <>
        {before}
        <span className={`${highlightClassName ?? ""} ${highlightReady ? "is-active" : ""}`.trim()}>{phrase}</span>
        {after}
      </>
    );
  };

  return (
    <h2 className={className} aria-label={fullText}>
      <span className="relative block">
        <span className="invisible whitespace-normal">{fullText}</span>
        <span className="absolute inset-0 whitespace-normal">
          {completed ? renderFullWithHighlight() : fullText.slice(0, visibleLength)}
          {!completed ? <span className="ml-1 inline-block h-[0.95em] w-[0.08em] animate-pulse bg-black align-[-0.15em]" /> : null}
        </span>
      </span>
    </h2>
  );
}
