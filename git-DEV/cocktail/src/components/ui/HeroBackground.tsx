'use client';

import Image from 'next/image';
import { forwardRef } from 'react';

interface HeroBackgroundProps {
  className?: string;
}

const HeroBackground = forwardRef<HTMLDivElement, HeroBackgroundProps>(
  ({ className = '' }, ref) => {
    return (
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-[#0A0D14] z-10" />
        <div ref={ref} className={`relative h-full w-full transform-gpu will-change-transform ${className}`}>
          <Image
            src="/images/bars.png"
            alt="L'art de la mixologie"
            fill
            className="object-cover object-center"
            priority
            quality={100}
            sizes="100vw"
          />
        </div>
      </div>
    );
  }
);

HeroBackground.displayName = 'HeroBackground';

export default HeroBackground; 