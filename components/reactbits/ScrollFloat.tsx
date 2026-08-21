'use client';

import React, { useEffect, useMemo, useRef, type ReactNode, type RefObject } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollFloatProps {
  children: ReactNode;
  /** Trailing words rendered in an accent colour but animated with the rest. */
  accent?: string;
  accentClassName?: string;
  scrollContainerRef?: RefObject<HTMLElement>;
  containerClassName?: string;
  textClassName?: string;
  animationDuration?: number;
  ease?: string;
  scrollStart?: string;
  scrollEnd?: string;
  stagger?: number;
}

const ScrollFloat: React.FC<ScrollFloatProps> = ({
  children,
  accent,
  accentClassName = '',
  scrollContainerRef,
  containerClassName = '',
  textClassName = '',
  animationDuration = 1,
  ease = 'back.inOut(2)',
  scrollStart = 'center bottom+=50%',
  scrollEnd = 'bottom bottom-=40%',
  stagger = 0.03
}) => {
  const containerRef = useRef<HTMLHeadingElement>(null);

  // Chars are grouped inside per-word nowrap wrappers: bare inline-block chars
  // let the browser wrap mid-word ("deberia se / r").
  const splitChars = (text: string, keyPrefix: string, extraClassName = '') =>
    text.split(' ').map((word, wordIndex, words) => (
      <span className="inline-block whitespace-nowrap" key={`${keyPrefix}-w${wordIndex}`}>
        {word.split('').map((char, charIndex) => (
          <span
            className={`inline-block word ${extraClassName}`}
            key={`${keyPrefix}-w${wordIndex}-c${charIndex}`}
          >
            {char}
          </span>
        ))}
        {wordIndex < words.length - 1 && <span className="inline-block word">{'\u00A0'}</span>}
      </span>
    ));

  const splitText = useMemo(() => {
    const text = typeof children === 'string' ? children : '';
    const base = splitChars(text, 'base');
    if (!accent) return base;
    // Leading space keeps the two halves apart once every char is inline-block.
    return [...base, ...splitChars(` ${accent}`, 'accent', accentClassName)];
  }, [children, accent, accentClassName]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const scroller = scrollContainerRef && scrollContainerRef.current ? scrollContainerRef.current : window;

    // '.word' is the per-character span; '.inline-block' would also grab the wrapper.
    const charElements = el.querySelectorAll('.word');

    gsap.fromTo(
      charElements,
      {
        willChange: 'opacity, transform',
        opacity: 0,
        yPercent: 120,
        scaleY: 2.3,
        scaleX: 0.7,
        transformOrigin: '50% 0%'
      },
      {
        duration: animationDuration,
        ease: ease,
        opacity: 1,
        yPercent: 0,
        scaleY: 1,
        scaleX: 1,
        stagger: stagger,
        scrollTrigger: {
          trigger: el,
          scroller,
          start: scrollStart,
          end: scrollEnd,
          scrub: true
        }
      }
    );
  }, [scrollContainerRef, animationDuration, ease, scrollStart, scrollEnd, stagger]);

  return (
    <h2 ref={containerRef} className={`my-5 overflow-hidden ${containerClassName}`}>
      <span className={`inline-block text-[clamp(1.6rem,4vw,3rem)] leading-[1.5] ${textClassName}`}>{splitText}</span>
    </h2>
  );
};

export default ScrollFloat;