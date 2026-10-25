import React from 'react';

interface DoodlesProps {
  scale?: number;
}

export const Doodles: React.FC<DoodlesProps> = () => {
  return (
    <>
      {/* 1. Double slash "//" doodle at (263, 377) */}
      <div
        className="absolute pointer-events-none z-20 select-none"
        style={{
          left: 'calc(var(--u) * 263)',
          top: 'calc(var(--u) * 377)',
          width: 'calc(var(--u) * 36)',
          height: 'calc(var(--u) * 36)'
        }}
      >
        <svg
          viewBox="0 0 36 36"
          className="w-full h-full text-[#08482D] stroke-current fill-none"
        >
          <path
            d="M 10 32 L 20 6"
            strokeWidth="3.2"
            strokeLinecap="round"
            className="animate-draw"
            style={{ animationDelay: '0.4s' }}
          />
          <path
            d="M 18 32 L 28 6"
            strokeWidth="3.2"
            strokeLinecap="round"
            className="animate-draw"
            style={{ animationDelay: '0.55s' }}
          />
        </svg>
      </div>

      {/* 2. Handwritten note at (1212, 310) rotated 16° with a long curving arrow down to the cards */}
      <div
        className="absolute z-20 select-none pointer-events-none"
        style={{
          left: 'calc(var(--u) * 1170)',
          top: 'calc(var(--u) * 300)',
          width: 'calc(var(--u) * 230)',
          height: 'calc(var(--u) * 220)'
        }}
      >
        <div
          className="font-hand font-semibold text-[#08482D] text-[calc(var(--u)*23)] leading-[1.1] tracking-tight origin-top-left"
          style={{ transform: 'rotate(16deg)' }}
        >
          Дарж үзээрэй
          <br />
          <span className="text-[calc(var(--u)*19)] text-[#08482D]/85">карт бүр нээгдэнэ</span>
        </div>

        {/* Long curving arrow curling down towards cards (starts below the note) */}
        <div
          className="absolute"
          style={{
            left: 'calc(var(--u) * 20)',
            top: 'calc(var(--u) * 58)',
            width: 'calc(var(--u) * 110)',
            height: 'calc(var(--u) * 140)'
          }}
        >
          <svg
            viewBox="0 0 110 140"
            className="w-full h-full text-[#08482D] stroke-current fill-none overflow-visible"
          >
            <path
              d="M 45 4 C 58 45, 10 85, 2 122"
              strokeWidth="2.4"
              strokeLinecap="round"
              className="animate-draw"
              style={{ animationDelay: '0.8s' }}
            />
            {/* Arrowhead */}
            <path
              d="M 14 112 L 2 122 L 6 136"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="animate-draw"
              style={{ animationDelay: '1.1s' }}
            />
          </svg>
        </div>
      </div>

      {/* 3. "Шууд нээх" rotated 24° at (521, 937) with small arrow pointing to the button */}
      <div
        className="absolute z-20 select-none pointer-events-none"
        style={{
          left: 'calc(var(--u) * 510)',
          top: 'calc(var(--u) * 920)',
          width: 'calc(var(--u) * 130)',
          height: 'calc(var(--u) * 80)'
        }}
      >
        <div
          className="font-hand font-semibold text-[#08482D] text-[calc(var(--u)*24)] leading-tight tracking-tight origin-left"
          style={{ transform: 'rotate(24deg)' }}
        >
          Шууд үзэх
        </div>
        <div
          className="absolute"
          style={{
            left: 'calc(var(--u) * 60)',
            top: 'calc(var(--u) * 22)',
            width: 'calc(var(--u) * 58)',
            height: 'calc(var(--u) * 36)'
          }}
        >
          <svg
            viewBox="0 0 58 36"
            className="w-full h-full text-[#08482D] stroke-current fill-none overflow-visible"
          >
            <path
              d="M 2 12 C 20 8, 38 14, 52 18"
              strokeWidth="2.2"
              strokeLinecap="round"
              className="animate-draw"
              style={{ animationDelay: '1s' }}
            />
            {/* Arrowhead pointing right towards button */}
            <path
              d="M 42 11 L 52 18 L 41 24"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="animate-draw"
              style={{ animationDelay: '1.2s' }}
            />
          </svg>
        </div>
      </div>
    </>
  );
};
