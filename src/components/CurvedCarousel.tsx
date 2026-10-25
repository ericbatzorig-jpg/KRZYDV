import React, { useEffect, useRef, useState, useCallback } from 'react';
import { WorkItem } from '../types';
import { Play, ExternalLink } from 'lucide-react';

interface CurvedCarouselProps {
  works: WorkItem[];
  onCardClick?: (item: WorkItem) => void;
  scale?: number;
}

interface CardLayout {
  item: WorkItem;
  x: number;
  width: number;
  heightL: number;
  heightR: number;
  centerY: number;
  minY: number;
  maxY: number;
  boxHeight: number;
  pathD: string;
  isVisible: boolean;
  dNorm: number;
}

const VIDEO_URL =
  'https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/04fd3d5f-99d7-476e-98a4-46c08518ffb3.mp4';
const POSTER_URL =
  'https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/b7ebb74a-8c8a-4f7e-8f80-55e2d74ecd05.webp';

// Generates smooth rounded quad path with corner radius r
function createRoundedQuadPath(w: number, hL: number, hR: number, minY: number, centerY: number, r = 15): string {
  const yTL = centerY - hL / 2 - minY;
  const yBL = centerY + hL / 2 - minY;
  const yTR = centerY - hR / 2 - minY;
  const yBR = centerY + hR / 2 - minY;

  const actualR = Math.min(r, w / 2, Math.min(hL, hR) / 4);

  return `
    M ${actualR} ${yTL}
    L ${w - actualR} ${yTR}
    Q ${w} ${yTR} ${w} ${yTR + actualR}
    L ${w} ${yBR - actualR}
    Q ${w} ${yBR} ${w - actualR} ${yBR}
    L ${actualR} ${yBL}
    Q 0 ${yBL} 0 ${yBL - actualR}
    L 0 ${yTL + actualR}
    Q 0 ${yTL} ${actualR} ${yTL}
    Z
  `.replace(/\s+/g, ' ').trim();
}

export const CurvedCarousel: React.FC<CurvedCarouselProps> = ({ works, onCardClick }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [cardLayouts, setCardLayouts] = useState<CardLayout[]>([]);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  // Physics state refs
  const offsetRef = useRef<number>(0);
  const velocityRef = useRef<number>(0);
  const isDraggingRef = useRef<boolean>(false);
  const dragStartXRef = useRef<number>(0);
  const dragStartOffsetRef = useRef<number>(0);
  const lastXRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);
  const totalTravelRef = useRef<number>(0);
  const animFrameIdRef = useRef<number>(0);
  const lastFrameTimeRef = useRef<number>(performance.now());

  // Calculate card geometries based on current offset
  const computeLayouts = useCallback((currOffset: number): CardLayout[] => {
    const pitch = 196;
    const count = 10;
    const totalSpan = count * pitch; // 1960

    return works.map((item, i) => {
      // Unpushed offset t in [-980, 980] relative to 720 center
      let rawT = (i * pitch - currOffset) % totalSpan;
      if (rawT < 0) rawT += totalSpan;
      let t = rawT - totalSpan / 2;

      // Visibility clipping beyond viewport reach
      if (Math.abs(t) > 850) {
        return {
          item,
          x: -9999,
          width: 170,
          heightL: 280,
          heightR: 280,
          centerY: 687,
          minY: 0,
          maxY: 280,
          boxHeight: 280,
          pathD: '',
          isVisible: false,
          dNorm: 1
        };
      }

      // Inside-of-a-cylinder formula from template:
      // x = 720 + t * (1 + 0.083 * (t / 706)^2)
      const tNorm = t / 706;
      const x = 720 + t * (1 + 0.083 * tNorm * tNorm);
      const d = Math.abs(x - 720) / 706;

      // Width = (170 + 48 * d^2)
      const w = 170 + 48 * d * d;

      // Left and right edges
      const xL = x - w / 2;
      const xR = x + w / 2;
      const qL = Math.abs(xL - 720) / 706;
      const qR = Math.abs(xR - 720) / 706;

      // Vertical edge heights: (280 + 92 * q^2.6)
      const hL = 280 + 92 * Math.pow(qL, 2.6);
      const hR = 280 + 92 * Math.pow(qR, 2.6);

      // Vertical center: (687 - 12 * d^2)
      const centerY = 687 - 12 * d * d;

      const yTL = centerY - hL / 2;
      const yTR = centerY - hR / 2;
      const yBL = centerY + hL / 2;
      const yBR = centerY + hR / 2;

      const minY = Math.min(yTL, yTR);
      const maxY = Math.max(yBL, yBR);
      const boxHeight = maxY - minY;

      const pathD = createRoundedQuadPath(w, hL, hR, minY, centerY, 15);

      return {
        item,
        x,
        width: w,
        heightL: hL,
        heightR: hR,
        centerY,
        minY,
        maxY,
        boxHeight,
        pathD,
        isVisible: true,
        dNorm: d
      };
    });
  }, [works]);

  // Main animation / physics loop
  useEffect(() => {
    let active = true;

    const tick = (now: number) => {
      if (!active) return;
      const dt = Math.min((now - lastFrameTimeRef.current) / 1000, 0.1);
      lastFrameTimeRef.current = now;

      if (!isDraggingRef.current) {
        if (Math.abs(velocityRef.current) > 1.5) {
          // Coasting with momentum: velocity decays about 95% per second (0.05^dt)
          velocityRef.current *= Math.pow(0.05, dt);
          offsetRef.current += velocityRef.current * dt;
        } else {
          // Continuous right -> left auto-scroll (~50u per second)
          velocityRef.current = 0;
          const speed = isHovered ? 25 : 50;
          offsetRef.current += speed * dt;
        }

        // Seamless wrap in [0, 1960)
        const totalSpan = 1960;
        offsetRef.current = ((offsetRef.current % totalSpan) + totalSpan) % totalSpan;
      }

      setCardLayouts(computeLayouts(offsetRef.current));
      animFrameIdRef.current = requestAnimationFrame(tick);
    };

    lastFrameTimeRef.current = performance.now();
    animFrameIdRef.current = requestAnimationFrame(tick);

    return () => {
      active = false;
      cancelAnimationFrame(animFrameIdRef.current);
    };
  }, [computeLayouts, isHovered]);

  // Pointer drag event handlers (touch and mouse)
  const handlePointerDown = (e: React.PointerEvent) => {
    // Only primary button
    if (e.button !== 0 && e.pointerType === 'mouse') return;

    isDraggingRef.current = true;
    setIsDragging(true);
    dragStartXRef.current = e.clientX;
    dragStartOffsetRef.current = offsetRef.current;
    lastXRef.current = e.clientX;
    lastTimeRef.current = performance.now();
    velocityRef.current = 0;
    totalTravelRef.current = 0;

    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;

    const now = performance.now();
    const dt = Math.max((now - lastTimeRef.current) / 1000, 0.005);
    const deltaScreenX = e.clientX - lastXRef.current;

    // Get current frame unit --u to convert screen pixels to frame units
    const container = containerRef.current;
    const rect = container?.getBoundingClientRect();
    const u = rect ? rect.width / 1440 : 1;
    const deltaU = deltaScreenX / u;

    // Dragging right pulls cards right (offset decreases); dragging left pushes cards left
    offsetRef.current -= deltaU;

    // Wrap
    const totalSpan = 1960;
    offsetRef.current = ((offsetRef.current % totalSpan) + totalSpan) % totalSpan;

    // Calculate instantaneous velocity in units/second
    velocityRef.current = -deltaU / dt;

    totalTravelRef.current += Math.abs(deltaScreenX);
    lastXRef.current = e.clientX;
    lastTimeRef.current = now;
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    setIsDragging(false);

    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // Ignore if already released
    }
  };

  const handleCardClick = (item: WorkItem, e: React.MouseEvent) => {
    // If the pointer travelled significantly during drag (> 6px), do not trigger click
    if (totalTravelRef.current > 6) {
      e.preventDefault();
      return;
    }

    if (onCardClick) {
      onCardClick(item);
    } else {
      // Open card's link in a new tab as mandated: карт бүр шинэ цонхонд нээгдэнэ
      window.open(item.link, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 select-none overflow-hidden ${
        isDragging ? 'cursor-grabbing' : 'cursor-grab'
      }`}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ touchAction: 'pan-y' }}
    >
      {/* Dynamic SVG Defs for 10 custom rounded quad clip paths */}
      <svg className="absolute w-0 h-0 pointer-events-none" aria-hidden="true">
        <defs>
          {cardLayouts.map((layout) => {
            if (!layout.isVisible) return null;
            return (
              <clipPath key={`clip-${layout.item.id}`} id={`card-clip-${layout.item.id}`} clipPathUnits="userSpaceOnUse">
                <path d={layout.pathD} />
              </clipPath>
            );
          })}
        </defs>
      </svg>

      {/* Render the 10 Cards */}
      {cardLayouts.map((layout) => {
        if (!layout.isVisible) return null;

        const { item, x, width, minY, boxHeight } = layout;
        const col = item.tileIndex % 5;
        const row = Math.floor(item.tileIndex / 5);

        // Grid offsets for 5x2 tile spritesheet video
        const tileW = width;
        const tileH = Math.max(boxHeight, width / 0.7111);
        const gridW = tileW * 5;
        const gridH = tileH * 2;
        const offX = -col * tileW;
        const offY = -row * tileH;

        return (
          <div
            key={item.id}
            onClick={(e) => handleCardClick(item, e)}
            className="absolute transition-transform duration-75 group"
            style={{
              left: `calc(var(--u) * ${x - width / 2})`,
              top: `calc(var(--u) * ${minY})`,
              width: `calc(var(--u) * ${width})`,
              height: `calc(var(--u) * ${boxHeight})`,
              clipPath: `url(#card-clip-${item.id})`,
              willChange: 'transform, left, top'
            }}
          >
            {/* Inner background container containing the synchronized 5x2 video and poster */}
            <div
              className="absolute pointer-events-none"
              style={{
                left: `calc(var(--u) * ${offX})`,
                top: `calc(var(--u) * ${offY})`,
                width: `calc(var(--u) * ${gridW})`,
                height: `calc(var(--u) * ${gridH})`
              }}
            >
              {/* Poster fallback image */}
              <img
                src={POSTER_URL}
                alt=""
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover"
              />
              {/* Looping muted synchronized video */}
              <video
                src={VIDEO_URL}
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                className="absolute inset-0 w-full h-full object-cover opacity-90 transition-opacity duration-300"
              />
            </div>

            {/* Subtle dark gradient scrim for crystal clear readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/5 pointer-events-none" />

            {/* Soft green highlight overlay on hover */}
            <div className="absolute inset-0 bg-[#08482D]/15 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none" />

            {/* Top Badge / Category */}
            <div
              className="absolute pointer-events-none"
              style={{
                top: 'calc(var(--u) * 14)',
                left: 'calc(var(--u) * 14)',
                right: 'calc(var(--u) * 14)'
              }}
            >
              <div className="flex items-center justify-between">
                <span className="text-[calc(var(--u)*10.5)] font-semibold uppercase tracking-wider text-white/80 drop-shadow-sm font-body">
                  {item.category}
                </span>
                <div className="w-5 h-5 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white/90">
                  <ExternalLink size={10} />
                </div>
              </div>
            </div>

            {/* Bottom Info: Title, Subtitle, and Frosted Play Icon */}
            <div
              className="absolute pointer-events-none"
              style={{
                bottom: 'calc(var(--u) * 14)',
                left: 'calc(var(--u) * 14)',
                right: 'calc(var(--u) * 14)'
              }}
            >
              <div className="flex items-end gap-[calc(var(--u)*10)]">
                {/* Frosted Play Icon as per template specification */}
                <div
                  className="shrink-0 rounded-full bg-white/30 backdrop-blur-md border border-white/40 flex items-center justify-center text-white shadow-sm transition-transform duration-200 group-hover:scale-110"
                  style={{
                    width: 'calc(var(--u) * 32)',
                    height: 'calc(var(--u) * 32)'
                  }}
                >
                  <Play size={13} fill="white" className="ml-0.5 text-white" />
                </div>

                {/* Card Title & Info */}
                <div className="min-w-0 flex-1">
                  <h3 className="text-white font-bold leading-tight drop-shadow truncate text-[calc(var(--u)*14)] font-heading">
                    {item.title}
                  </h3>
                  <p className="text-white/80 text-[calc(var(--u)*10.5)] truncate font-body">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
