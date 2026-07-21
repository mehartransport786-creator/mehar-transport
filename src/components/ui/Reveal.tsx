"use client";

import { useEffect, useRef, useState } from "react";

// Singleton observer to avoid creating one per element
let observer: IntersectionObserver | null = null;
const callbacks = new Map<Element, () => void>();

function getObserver() {
  if (typeof window === "undefined") return null;
  if (!observer) {
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const callback = callbacks.get(entry.target);
            if (callback) {
              callback();
              observer?.unobserve(entry.target);
              callbacks.delete(entry.target);
            }
          }
        });
      },
      {
        rootMargin: "0px 0px -10% 0px",
        threshold: 0.1,
      }
    );
  }
  return observer;
}

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number; // In ms, though we want to limit stagger
}

export function Reveal({ children, className = "", delay = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  // We start as true during SSR to prevent the content from being invisible if JS fails.
  // Then we immediately hide it on the first client render before the observer takes over.
  // Wait, if it renders true on SSR, and false on client, it will flash visible then hidden.
  // To follow the "Set the hidden state from JS or via a .js root class" rule properly:
  const [isRevealed, setIsRevealed] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true); // Now we know JS is running
    const el = ref.current;
    if (!el) return;
    
    // Register with the shared observer
    const currentObserver = getObserver();
    if (currentObserver) {
      callbacks.set(el, () => {
        if (delay > 0) {
          setTimeout(() => setIsRevealed(true), delay);
        } else {
          setIsRevealed(true);
        }
      });
      currentObserver.observe(el);
    }

    return () => {
      if (currentObserver && el) {
        currentObserver.unobserve(el);
        callbacks.delete(el);
      }
    };
  }, [delay]);

  // If JS hasn't loaded (or failed), we want it fully visible.
  // When JS loads (isMounted), we set it to the observer's state (isRevealed).
  const visible = !isMounted || isRevealed;

  return (
    <div
      ref={ref}
      className={`transition-[opacity,transform] duration-[var(--duration-base)] ease-[var(--ease-out)] ${
        visible 
          ? "opacity-100 translate-y-0" 
          : "opacity-0 translate-y-[var(--motion-lg)]"
      } ${className}`}
    >
      {children}
    </div>
  );
}
