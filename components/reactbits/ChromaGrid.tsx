'use client';

import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

export interface ChromaItem {
  image: string;
  title: string;
  subtitle: string;
  handle?: string;
  location?: string;
  borderColor?: string;
  gradient?: string;
  url?: string;
  /** Pill rendered over the thumbnail, e.g. "En vivo". */
  badge?: string;
  /** Small mono chips under the footer, e.g. the stack. */
  tags?: string[];
  /** Action label, e.g. "Abrir demo". */
  cta?: string;
}

export interface ChromaGridProps {
  items?: ChromaItem[];
  className?: string;
  radius?: number;
  damping?: number;
  fadeOut?: number;
  ease?: string;
}

type SetterFn = (v: number | string) => void;

const ChromaGrid: React.FC<ChromaGridProps> = ({
  items,
  className = '',
  radius = 300,
  damping = 0.45,
  fadeOut = 0.6,
  ease = 'power3.out'
}) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const fadeRef = useRef<HTMLDivElement>(null);
  const setX = useRef<SetterFn | null>(null);
  const setY = useRef<SetterFn | null>(null);
  const pos = useRef({ x: 0, y: 0 });

  // Always the caller's list. Never the stock ReactBits pravatars.
  const data = items ?? [];

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    setX.current = gsap.quickSetter(el, '--x', 'px') as SetterFn;
    setY.current = gsap.quickSetter(el, '--y', 'px') as SetterFn;
    const { width, height } = el.getBoundingClientRect();
    pos.current = { x: width / 2, y: height / 2 };
    setX.current(pos.current.x);
    setY.current(pos.current.y);
  }, []);

  const moveTo = (x: number, y: number) => {
    gsap.to(pos.current, {
      x,
      y,
      duration: damping,
      ease,
      onUpdate: () => {
        setX.current?.(pos.current.x);
        setY.current?.(pos.current.y);
      },
      overwrite: true
    });
  };

  const handleMove = (e: React.PointerEvent) => {
    const r = rootRef.current!.getBoundingClientRect();
    moveTo(e.clientX - r.left, e.clientY - r.top);
    gsap.to(fadeRef.current, { opacity: 0, duration: 0.25, overwrite: true });
  };

  const handleLeave = () => {
    gsap.to(fadeRef.current, {
      opacity: 1,
      duration: fadeOut,
      overwrite: true
    });
  };

  const handleCardClick = (url?: string) => {
    if (url) window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleCardMove: React.MouseEventHandler<HTMLElement> = e => {
    const c = e.currentTarget as HTMLElement;
    const rect = c.getBoundingClientRect();
    c.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
    c.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
  };

  const onThumbError: React.ReactEventHandler<HTMLImageElement> = e => {
    const el = e.currentTarget;
    el.style.display = 'none';
    if (el.parentElement) el.parentElement.style.background = '#111111';
  };

  if (data.length === 0) return null;

  return (
    <div
      ref={rootRef}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      className={`relative w-full h-full flex flex-wrap justify-center items-start gap-3 ${className}`}
      style={
        {
          '--r': `${radius}px`,
          '--x': '50%',
          '--y': '50%'
        } as React.CSSProperties
      }
    >
      {data.map((c, i) => (
        <article
          key={i}
          onMouseMove={handleCardMove}
          onClick={() => handleCardClick(c.url)}
          onKeyDown={e => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleCardClick(c.url);
            }
          }}
          role={c.url ? 'link' : undefined}
          tabIndex={c.url ? 0 : undefined}
          aria-label={c.url ? `${c.title} — ${c.subtitle}` : undefined}
          className="group relative flex flex-col w-full sm:w-[340px] lg:w-[364px] rounded-[20px] overflow-hidden border-2 cursor-pointer"
          style={
            {
              borderColor: c.borderColor || 'transparent',
              '--card-border': c.borderColor || 'transparent',
              background: c.gradient,
              '--spotlight-color': 'rgba(34,242,58,0.22)'
            } as React.CSSProperties
          }
        >
          <div
            className="chroma-card-spotlight absolute inset-0 pointer-events-none transition-opacity duration-500 z-20 opacity-0 group-hover:opacity-100"
            style={{
              background:
                'radial-gradient(circle at var(--mouse-x) var(--mouse-y), var(--spotlight-color), transparent 70%)'
            }}
          />
          <div className="relative z-10 p-[10px] box-border">
            <div className="relative w-full aspect-[16/10] overflow-hidden rounded-[10px] bg-[#111111]">
              <img
                src={c.image}
                alt={c.title}
                loading="lazy"
                onError={onThumbError}
                className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]"
              />
              {c.badge && (
                <span className="absolute top-2 left-2 inline-flex items-center gap-1.5 rounded-full bg-black/70 backdrop-blur-sm px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-[#22F23A] border border-[#22F23A]/40">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#22F23A] animate-pulse-dot" />
                  {c.badge}
                </span>
              )}
            </div>
          </div>
          <footer className="relative z-10 px-4 pb-4 pt-1 font-sans">
            <div className="flex items-start justify-between gap-3">
              <h3 className="m-0 font-display text-[1.05rem] font-semibold tracking-tight text-gray-100">{c.title}</h3>
              {c.handle && (
                <span className="shrink-0 font-mono text-[10px] uppercase tracking-wider text-gray-300 text-right pt-1">
                  {c.handle}
                </span>
              )}
            </div>
            <p className="mt-1 m-0 font-mono text-[10px] uppercase tracking-wider text-gray-300">{c.subtitle}</p>
            {c.location && <p className="mt-2 m-0 text-[0.85rem] leading-relaxed text-gray-300">{c.location}</p>}
            {c.tags && c.tags.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-x-2 gap-y-1">
                {c.tags.map(tag => (
                  <span key={tag} className="font-mono text-[10px] uppercase tracking-wider text-gray-300">
                    {tag}
                  </span>
                ))}
              </div>
            )}
            {c.cta && (
              <p className="mt-3 m-0 font-display text-sm font-semibold text-[#22F23A]">{c.cta}</p>
            )}
          </footer>
        </article>
      ))}
      <div
        className="chroma-desaturate absolute inset-0 pointer-events-none z-30"
        style={{
          backdropFilter: 'grayscale(0.15) brightness(0.98)',
          WebkitBackdropFilter: 'grayscale(0.15) brightness(0.98)',
          background: 'rgba(0,0,0,0.001)',
          maskImage:
            'radial-gradient(circle var(--r) at var(--x) var(--y),transparent 0%,transparent 15%,rgba(0,0,0,0.10) 30%,rgba(0,0,0,0.22)45%,rgba(0,0,0,0.35)60%,rgba(0,0,0,0.50)75%,rgba(0,0,0,0.68)88%,white 100%)',
          WebkitMaskImage:
            'radial-gradient(circle var(--r) at var(--x) var(--y),transparent 0%,transparent 15%,rgba(0,0,0,0.10) 30%,rgba(0,0,0,0.22)45%,rgba(0,0,0,0.35)60%,rgba(0,0,0,0.50)75%,rgba(0,0,0,0.68)88%,white 100%)'
        }}
      />
      <div
        ref={fadeRef}
        className="chroma-desaturate absolute inset-0 pointer-events-none transition-opacity duration-[250ms] z-40"
        style={{
          backdropFilter: 'grayscale(0.15) brightness(0.98)',
          WebkitBackdropFilter: 'grayscale(0.15) brightness(0.98)',
          background: 'rgba(0,0,0,0.001)',
          maskImage:
            'radial-gradient(circle var(--r) at var(--x) var(--y),white 0%,white 15%,rgba(255,255,255,0.90)30%,rgba(255,255,255,0.78)45%,rgba(255,255,255,0.65)60%,rgba(255,255,255,0.50)75%,rgba(255,255,255,0.32)88%,transparent 100%)',
          WebkitMaskImage:
            'radial-gradient(circle var(--r) at var(--x) var(--y),white 0%,white 15%,rgba(255,255,255,0.90)30%,rgba(255,255,255,0.78)45%,rgba(255,255,255,0.65)60%,rgba(255,255,255,0.50)75%,rgba(255,255,255,0.32)88%,transparent 100%)',
          opacity: 0
        }}
      />
    </div>
  );
};

export default ChromaGrid;
