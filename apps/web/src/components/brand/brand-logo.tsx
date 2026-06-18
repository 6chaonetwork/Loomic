"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { BRAND_ICON_SRC, BRAND_NAME } from "@/components/brand/constants";

export {
  BRAND_DESCRIPTION,
  BRAND_ICON_SRC,
  BRAND_NAME,
  BRAND_TAGLINE,
} from "@/components/brand/constants";

interface BrandLogoProps {
  className?: string;
  iconClassName?: string;
  showText?: boolean;
  priority?: boolean;
}

export function BrandLogo({
  className,
  iconClassName,
  showText = true,
  priority = false,
}: BrandLogoProps) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <span
        className={cn(
          "relative size-7 shrink-0 overflow-hidden rounded-lg bg-black shadow-sm ring-1 ring-white/10",
          iconClassName,
        )}
      >
        <Image
          src={BRAND_ICON_SRC}
          alt=""
          fill
          priority={priority}
          unoptimized
          className="object-cover"
          sizes="32px"
          aria-hidden="true"
        />
      </span>
      {showText && (
        <span className="font-bold tracking-tight text-foreground">
          {BRAND_NAME}
        </span>
      )}
    </span>
  );
}
