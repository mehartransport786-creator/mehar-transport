"use client";

import React, { forwardRef, useEffect, useRef, useState } from "react";

// Shared IntersectionObserver for reveals
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

const createMotionComponent = (Tag: any) => {
  return forwardRef(({ initial, animate, exit, whileHover, whileTap, whileInView, viewport, transition, variants, staggerChildren, layout, layoutId, ...props }: any, ref: any) => {
    
    // We only apply the reveal animation if whileInView was passed
    if (whileInView) {
      const delay = transition?.delay ? transition.delay * 1000 : 0;
      return <RevealWrapper delay={delay} Tag={Tag} fwdRef={ref} props={props} />;
    }
    
    // Otherwise, just render the native element stripped of framer-motion props
    return <Tag ref={ref} {...props} />;
  });
};

function RevealWrapper({ delay, Tag, fwdRef, props }: { delay: number, Tag: any, fwdRef: any, props: any }) {
  const ref = useRef<Element>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const el = ref.current;
    if (!el) return;
    
    const currentObserver = getObserver();
    if (currentObserver) {
      callbacks.set(el, () => {
        if (delay > 0) {
          setTimeout(() => setIsRevealed(true), Math.min(delay, 300)); // Cap delay to 300ms max for performance feel
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

  const visible = !isMounted || isRevealed;

  // We inject our semantic classes into the element's existing classes
  const combinedClassName = `transition-[opacity,transform] duration-[var(--duration-base)] ease-[var(--ease-out)] ${
    visible 
      ? "opacity-100 translate-y-0" 
      : "opacity-0 translate-y-[var(--motion-lg)]"
  } ${props.className || ""}`;

  return <Tag ref={(node: any) => {
    // @ts-ignore
    ref.current = node;
    if (typeof fwdRef === 'function') fwdRef(node);
    else if (fwdRef) fwdRef.current = node;
  }} {...props} className={combinedClassName} />;
}

export const motion = {
  div: createMotionComponent('div'),
  section: createMotionComponent('section'),
  main: createMotionComponent('main'),
  h1: createMotionComponent('h1'),
  h2: createMotionComponent('h2'),
  h3: createMotionComponent('h3'),
  h4: createMotionComponent('h4'),
  p: createMotionComponent('p'),
  span: createMotionComponent('span'),
  button: createMotionComponent('button'),
  ul: createMotionComponent('ul'),
  ol: createMotionComponent('ol'),
  li: createMotionComponent('li'),
  a: createMotionComponent('a'),
  img: createMotionComponent('img'),
  form: createMotionComponent('form'),
  tr: createMotionComponent('tr'),
};

// Mock AnimatePresence to just render children instantly if missed
export const AnimatePresence = ({ children }: { children: React.ReactNode }) => <>{children}</>;

// Mock scroll hooks to prevent crashes
export const useScroll = (options?: any) => ({ scrollY: 0, scrollYProgress: { on: () => {}, get: () => 0 } });
export const useTransform = (value: any, input: any, output: any) => 0;
