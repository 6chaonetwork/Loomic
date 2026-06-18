"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Sparkles, ChevronDown, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { BRAND_ICON_SRC, BRAND_NAME } from "@/components/brand/brand-logo";
import { fadeUp, blurIn, scaleUp } from "@/components/landing/motion";
import { TypewriterText, useTypewriter } from "@/components/landing/typewriter";

const HERO_HEADLINE = "让好画面，不可错过";
const EXPO_OUT = [0.16, 1, 0.3, 1] as const;
const OVERSHOOT = [0.34, 1.56, 0.64, 1] as const;

// ---------------------------------------------------------------------------
// BrandPrelude -- kinetic brand mark for the first viewport
// ---------------------------------------------------------------------------

function BrandPrelude() {
  const shouldReduceMotion = useReducedMotion();
  const ringMotionProps = shouldReduceMotion
    ? {}
    : {
        animate: {
          rotate: [0, 360],
          scale: [1, 1.04, 1],
        },
      };
  const markMotionProps = shouldReduceMotion
    ? {}
    : {
        animate: {
          y: [0, -7, 0],
          rotate: [0, -1.5, 1.5, 0],
        },
      };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.86, filter: "blur(14px)" }}
      animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
      transition={{ duration: 0.95, ease: OVERSHOOT }}
      className="relative mb-5 flex flex-col items-center"
    >
      <div className="relative grid size-24 place-items-center md:size-28">
        <motion.span
          aria-hidden="true"
          className="landing-brand-ring absolute inset-0 rounded-[2rem] border border-white/20"
          {...ringMotionProps}
          transition={{
            rotate: { duration: 18, repeat: Infinity, ease: "linear" },
            scale: { duration: 4.8, repeat: Infinity, ease: "easeInOut" },
          }}
        />
        <motion.span
          aria-hidden="true"
          className="landing-brand-trail landing-brand-trail-a"
          initial={{ opacity: 0, pathLength: 0 }}
          animate={{ opacity: [0, 0.85, 0.2], pathLength: 1 }}
          transition={{ duration: 1.3, delay: 0.2, ease: EXPO_OUT }}
        />
        <motion.span
          aria-hidden="true"
          className="landing-brand-trail landing-brand-trail-b"
          initial={{ opacity: 0, pathLength: 0 }}
          animate={{ opacity: [0, 0.7, 0.16], pathLength: 1 }}
          transition={{ duration: 1.35, delay: 0.34, ease: EXPO_OUT }}
        />
        <motion.span
          className="relative size-20 overflow-hidden rounded-[1.55rem] bg-black shadow-[0_20px_70px_oklch(0.58_0.22_294_/_0.36)] ring-1 ring-white/20 md:size-24"
          {...markMotionProps}
          transition={{ duration: 5.4, repeat: Infinity, ease: "easeInOut" }}
        >
          <Image
            src={BRAND_ICON_SRC}
            alt=""
            fill
            priority
            unoptimized
            aria-hidden="true"
            className="object-cover"
            sizes="96px"
          />
        </motion.span>
      </div>

      <motion.span
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.45, ease: EXPO_OUT }}
        className="mt-3 text-sm font-medium tracking-[0.38em] text-muted-foreground"
      >
        {BRAND_NAME}
      </motion.span>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// HeroBadge
// ---------------------------------------------------------------------------

function HeroBadge() {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      transition={{ delay: 0.18, ease: EXPO_OUT }}
      className="inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-4 py-1.5 text-sm shadow-sm backdrop-blur-xl"
    >
      <Sparkles className="size-3.5 text-accent" />
      <span className="text-muted-foreground">AI Visual Creation Studio</span>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Animated cursor inside mockup canvas
// ---------------------------------------------------------------------------

function MockupCursor() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className="absolute z-10 pointer-events-none will-change-transform"
      animate={
        shouldReduceMotion
          ? { x: 88, y: 52 }
          : {
              x: [40, 132, 220, 98, 40],
              y: [34, 92, 46, 140, 34],
            }
      }
      transition={{
        duration: 9.5,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {/* Cursor arrow */}
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        className="drop-shadow-md"
        aria-hidden="true"
      >
        <path
          d="M1 1L6.5 14L8.5 8.5L14 6.5L1 1Z"
          fill="oklch(0.90 0.17 115)"
          stroke="oklch(0.90 0.17 115 / 0.6)"
          strokeWidth="0.5"
        />
      </svg>
      {/* Cursor label */}
      <div
        className="mt-0.5 ml-3 px-1.5 py-0.5 rounded text-[8px] font-medium whitespace-nowrap"
        style={{
          background: "oklch(0.90 0.17 115)",
          color: "oklch(0.25 0.04 115)",
        }}
      >
        AI
      </div>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// HeroMockup -- canvas interface preview
// Uses next/image with unoptimized for CLS prevention via explicit dimensions
// ---------------------------------------------------------------------------

function HeroMockup() {
  const shouldReduceMotion = useReducedMotion();
  const hoverMotionProps = shouldReduceMotion
    ? {}
    : { whileHover: { rotateX: 1.2, rotateY: -1.8, scale: 1.01 } };

  return (
    <motion.div
      variants={scaleUp}
      initial="hidden"
      animate="visible"
      transition={{ delay: 1.15, duration: 0.9, ease: EXPO_OUT }}
      className="landing-hero-stage relative w-full max-w-5xl mx-auto mt-14 md:mt-20 will-change-transform"
      style={{
        animation: shouldReduceMotion
          ? undefined
          : "landing-hero-float 7s ease-in-out infinite",
      }}
    >
      {/* Glow behind mockup */}
      <div
        className="absolute inset-x-8 top-8 -z-10 h-[78%] rounded-[2rem] blur-3xl opacity-30 dark:opacity-40"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.78 0.23 319 / 0.26), oklch(0.72 0.19 230 / 0.22), transparent 70%)",
        }}
      />

      <motion.div
        className="landing-hero-window w-full overflow-hidden rounded-2xl border border-border bg-card shadow-2xl aspect-video ring-1 ring-white/10"
        {...hoverMotionProps}
        transition={{ duration: 0.45, ease: EXPO_OUT }}
      >
        {/* Window chrome */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-muted/30">
          <div className="flex items-center gap-1.5">
            <span className="size-3 rounded-full bg-red-400/80" />
            <span className="size-3 rounded-full bg-yellow-400/80" />
            <span className="size-3 rounded-full bg-green-400/80" />
          </div>
          <span className="text-xs text-muted-foreground font-medium">
            {BRAND_NAME} Canvas
          </span>
          <div className="w-14" />
        </div>

        {/* Canvas area -- hero image is LCP candidate, loaded eagerly */}
        <div className="relative w-full h-full overflow-hidden">
          <MockupCursor />
          <div
            aria-hidden="true"
            className="landing-canvas-scan absolute inset-0 z-10"
          />
          <Image
            src="/images/showcase/showcase-12.jpg"
            alt={`${BRAND_NAME} AI creative workspace`}
            width={1200}
            height={675}
            priority
            unoptimized
            className="w-full h-full object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1024px"
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// ScrollIndicator -- smooth sine wave
// ---------------------------------------------------------------------------

function ScrollIndicator() {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 200], [1, 0]);

  return (
    <motion.div
      style={{ opacity }}
      className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
    >
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{
          repeat: Infinity,
          duration: 2.4,
          ease: [0.37, 0, 0.63, 1],
        }}
      >
        <ChevronDown className="size-5 text-muted-foreground/50" />
      </motion.div>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// AnimatedSubtitle -- separate to isolate motion state
// ---------------------------------------------------------------------------

function AnimatedSubtitle({ show }: { show: boolean }) {
  return (
    <motion.p
      variants={blurIn}
      initial="hidden"
      animate={show ? "visible" : "hidden"}
      className="mt-4 text-sm md:text-base text-muted-foreground font-light tracking-[0.2em] uppercase"
    >
      Make Every Frame Worth Seeing
    </motion.p>
  );
}

// ---------------------------------------------------------------------------
// HeroSection
// ---------------------------------------------------------------------------

export function HeroSection() {
  const { isComplete } = useTypewriter({
    text: HERO_HEADLINE,
    speed: 60,
    delay: 200,
  });
  const [showSub, setShowSub] = useState(false);

  // Keep the subtitle synchronized with the localized headline length.
  const typewriterEnd = 200 + HERO_HEADLINE.length * 60;
  const subtitleDelay = typewriterEnd + 400;
  const descDelay = (subtitleDelay + 200) / 1000;
  const ctaDelay = (subtitleDelay + 400) / 1000;

  useEffect(() => {
    if (isComplete) {
      const t = setTimeout(() => setShowSub(true), 400);
      return () => clearTimeout(t);
    }
  }, [isComplete]);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-24 md:pt-32 pb-24 overflow-hidden">
      {/* Animated gradient background -- GPU-composited via translate3d */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div
          className="landing-hero-ribbon landing-hero-ribbon-a absolute opacity-70 will-change-transform"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, oklch(0.73 0.23 319 / 0.16) 32%, oklch(0.70 0.17 230 / 0.14) 58%, transparent 100%)",
            animation: "landing-gradient-drift-1 18s ease-in-out infinite alternate",
          }}
        />
        <div
          className="landing-hero-ribbon landing-hero-ribbon-b absolute opacity-60 will-change-transform"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, oklch(0.80 0.20 190 / 0.12) 36%, oklch(0.66 0.20 282 / 0.12) 70%, transparent 100%)",
            animation: "landing-gradient-drift-2 22s ease-in-out infinite alternate",
          }}
        />
        {/* Noise/grain texture overlay */}
        <div
          className="absolute inset-0 opacity-[0.035] dark:opacity-[0.06] pointer-events-none mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
            backgroundSize: "128px 128px",
          }}
        />
        {/* Radial vignette */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, oklch(1 0 0 / 0.04) 0%, transparent 34%, oklch(0 0 0 / 0.04) 100%)",
          }}
        />
      </div>

      {/* Content */}
      <div className="flex flex-col items-center text-center px-4 max-w-4xl mx-auto w-full">
        <BrandPrelude />

        {/* Badge */}
        <HeroBadge />

        {/* Headline -- gradient text + tighter tracking */}
        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.32, duration: 0.8, ease: EXPO_OUT }}
          className="landing-hero-title mt-6 text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter bg-gradient-to-r from-foreground via-foreground to-muted-foreground bg-clip-text text-transparent"
        >
          <TypewriterText text={HERO_HEADLINE} speed={60} delay={200} />
        </motion.h1>

        {/* English subtitle -- editorial style */}
        <AnimatedSubtitle show={showSub} />

        {/* Description */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: descDelay }}
          className="mt-6 text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed"
        >
          从灵感到可交付画面，{BRAND_NAME} 是你的 AI 视觉创作伙伴。它理解品牌、场景与审美目标，帮你快速生成、迭代并沉淀专业作品。
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: ctaDelay }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <Link
            href="/login"
          className={cn(
              "landing-cta-shimmer inline-flex items-center px-8 py-3 rounded-full text-base font-medium",
              "text-foreground",
              "transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:scale-[1.035] active:scale-95",
              "hover:shadow-[0_0_30px_6px_oklch(0.74_0.22_310_/_0.34)]",
            )}
            style={{
              background:
                "linear-gradient(135deg, oklch(0.88 0.18 330) 0%, oklch(0.78 0.18 252) 48%, oklch(0.83 0.16 190) 100%)",
            }}
          >
            开始创作
          </Link>
          <a
            href="#showcase"
            onClick={(e) => {
              e.preventDefault();
              document
                .querySelector("#showcase")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            className="group inline-flex items-center gap-2 px-8 py-3 rounded-full text-base font-medium border border-border bg-background/55 text-muted-foreground backdrop-blur-xl transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:border-foreground/25 hover:text-foreground hover:bg-muted"
          >
            查看案例
            <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
          </a>
        </motion.div>

        {/* Mockup */}
        <HeroMockup />
      </div>

      {/* Scroll indicator */}
      <ScrollIndicator />
    </section>
  );
}
