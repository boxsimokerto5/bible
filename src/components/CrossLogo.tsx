import React from 'react';

interface CrossLogoProps {
  className?: string;
  size?: number | string;
  showText?: boolean;
  variant?: 'full' | 'cross-only' | 'badge';
}

export const CrossLogo: React.FC<CrossLogoProps> = ({
  className = 'w-8 h-8',
  size,
  showText = false,
  variant = 'badge',
}) => {
  const style = size ? { width: size, height: size } : undefined;

  return (
    <div className={`inline-flex items-center gap-2 ${className}`} style={style}>
      <svg
        viewBox="0 0 512 512"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-sm select-none shrink-0"
      >
        <defs>
          <filter id="vintageCrossGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="10" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          <filter id="vintageCrossShadow" x="-15%" y="-15%" width="130%" height="130%">
            <feDropShadow dx="0" dy="6" stdDeviation="8" floodColor="#5c3818" floodOpacity="0.25" />
          </filter>

          <radialGradient id="vintageParchmentBg" cx="50%" cy="42%" r="62%">
            <stop offset="0%" stopColor="#fffef7" />
            <stop offset="45%" stopColor="#faf2df" />
            <stop offset="78%" stopColor="#ebd9b5" />
            <stop offset="100%" stopColor="#dac092" />
          </radialGradient>

          <radialGradient id="vintageHaloGlow" cx="50%" cy="38%" r="50%">
            <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.4" />
            <stop offset="55%" stopColor="#d97706" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#b45309" stopOpacity="0" />
          </radialGradient>

          <linearGradient id="vintageGoldLight" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fffef0" />
            <stop offset="25%" stopColor="#fde047" />
            <stop offset="60%" stopColor="#d97706" />
            <stop offset="100%" stopColor="#b45309" />
          </linearGradient>

          <linearGradient id="vintageGoldDark" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="35%" stopColor="#b45309" />
            <stop offset="75%" stopColor="#78350f" />
            <stop offset="100%" stopColor="#451a03" />
          </linearGradient>

          <linearGradient id="vintageRingGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="30%" stopColor="#d97706" />
            <stop offset="70%" stopColor="#854d0e" />
            <stop offset="100%" stopColor="#fef9c3" />
          </linearGradient>
        </defs>

        {variant !== 'cross-only' && (
          <>
            <rect width="512" height="512" rx="112" fill="url(#vintageParchmentBg)" stroke="#c29b68" strokeWidth="2" />
            <rect x="20" y="20" width="472" height="472" rx="96" fill="none" stroke="url(#vintageRingGold)" strokeWidth="3" strokeOpacity="0.85" />
            <rect x="28" y="28" width="456" height="456" rx="88" fill="none" stroke="#a16207" strokeWidth="1.2" strokeOpacity="0.4" strokeDasharray="6 6" />
            
            {/* Corner Antique Filigree */}
            <g stroke="#92400e" strokeWidth="1.8" fill="none" opacity="0.75">
              <path d="M 44 68 L 68 44 L 92 44" />
              <circle cx="68" cy="68" r="3.5" fill="#b45309" />
              <path d="M 468 68 L 444 44 L 420 44" />
              <circle cx="444" cy="68" r="3.5" fill="#b45309" />
              <path d="M 44 444 L 68 468 L 92 468" />
              <circle cx="68" cy="444" r="3.5" fill="#b45309" />
              <path d="M 468 444 L 444 468 L 420 468" />
              <circle cx="444" cy="444" r="3.5" fill="#b45309" />
            </g>
          </>
        )}

        {/* Halo Glow */}
        <circle cx="256" cy="196" r="148" fill="url(#vintageHaloGlow)" />

        {/* Radiance Rays */}
        <g stroke="#b45309" strokeWidth="1.2" opacity="0.35" strokeLinecap="round">
          <line x1="256" y1="196" x2="160" y2="100" />
          <line x1="256" y1="196" x2="352" y2="100" />
          <line x1="256" y1="196" x2="160" y2="292" />
          <line x1="256" y1="196" x2="352" y2="292" />
          <line x1="256" y1="196" x2="256" y2="56" opacity="0.55" strokeWidth="1.6" />
          <line x1="256" y1="196" x2="116" y2="196" opacity="0.55" strokeWidth="1.6" />
          <line x1="256" y1="196" x2="396" y2="196" opacity="0.55" strokeWidth="1.6" />
          <line x1="256" y1="196" x2="256" y2="336" opacity="0.55" strokeWidth="1.6" />
        </g>

        {/* Celestial Circle */}
        <circle cx="256" cy="196" r="88" fill="none" stroke="url(#vintageRingGold)" strokeWidth="3" opacity="0.85" filter="url(#vintageCrossShadow)" />
        <circle cx="256" cy="196" r="96" fill="none" stroke="#b45309" strokeWidth="1" strokeDasharray="3 6" opacity="0.4" />

        {/* 3D Beveled Golden Cross */}
        <g filter="url(#vintageCrossShadow)">
          {/* Light Side */}
          <path d="M 256 80 L 232 96 L 232 172 L 256 196 Z" fill="url(#vintageGoldLight)" />
          <path d="M 256 196 L 232 220 L 232 408 L 256 424 Z" fill="url(#vintageGoldLight)" />
          <path d="M 128 196 L 144 172 L 232 172 L 256 196 Z" fill="url(#vintageGoldLight)" />
          <path d="M 128 196 L 144 220 L 232 220 L 256 196 Z" fill="url(#vintageGoldDark)" />

          {/* Shaded Side */}
          <path d="M 256 80 L 280 96 L 280 172 L 256 196 Z" fill="url(#vintageGoldDark)" />
          <path d="M 256 196 L 280 220 L 280 408 L 256 424 Z" fill="url(#vintageGoldDark)" />
          <path d="M 256 196 L 280 172 L 368 172 L 384 196 Z" fill="url(#vintageGoldLight)" />
          <path d="M 256 196 L 280 220 L 368 220 L 384 196 Z" fill="url(#vintageGoldDark)" />

          {/* Apex Endings */}
          <polygon points="256,64 232,96 256,80" fill="url(#vintageGoldLight)" />
          <polygon points="256,64 280,96 256,80" fill="url(#vintageGoldDark)" />
          <polygon points="112,196 144,172 128,196" fill="url(#vintageGoldLight)" />
          <polygon points="112,196 144,220 128,196" fill="url(#vintageGoldDark)" />
          <polygon points="400,196 368,172 384,196" fill="url(#vintageGoldLight)" />
          <polygon points="400,196 368,220 384,196" fill="url(#vintageGoldDark)" />
          <polygon points="256,440 232,408 256,424" fill="url(#vintageGoldLight)" />
          <polygon points="256,440 280,408 256,424" fill="url(#vintageGoldDark)" />

          {/* Center Gleam Lines */}
          <line x1="256" y1="64" x2="256" y2="440" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" opacity="0.95" />
          <line x1="112" y1="196" x2="400" y2="196" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" opacity="0.95" />

          {/* Outer Bevel Border */}
          <polygon points="256,64 280,96 280,172 368,172 400,196 368,220 280,220 280,408 256,440 232,408 232,220 144,220 112,196 144,172 232,172 232,96" 
                   fill="none" stroke="url(#vintageRingGold)" strokeWidth="1.8" strokeLinejoin="round" opacity="0.9" />

          {/* Diamond Center */}
          <g transform="translate(256, 196)">
            <polygon points="0,-16 16,0 0,16 -16,0" fill="url(#vintageGoldLight)" stroke="#ffffff" strokeWidth="1.2" />
            <polygon points="0,-10 10,0 0,10 -10,0" fill="#ffffff" opacity="0.95" />
            <circle cx="0" cy="0" r="3.5" fill="#f59e0b" />
          </g>
        </g>

        {/* Central Bethlehem Star Sparkle */}
        <g transform="translate(256, 196)" opacity="0.95">
          <path d="M 0,-34 Q 0,0 34,0 Q 0,0 0,34 Q 0,0 -34,0 Q 0,0 0,-34 Z" fill="#ffffff" opacity="0.9" />
          <circle cx="0" cy="0" r="5.5" fill="#ffffff" filter="url(#vintageCrossGlow)" />
        </g>

        {/* Alpha & Omega */}
        <g transform="translate(188, 150)" opacity="0.5">
          <text fontFamily="'Cinzel', serif" fontSize="20" fontWeight="700" fill="#78350f" textAnchor="middle">Α</text>
        </g>
        <g transform="translate(324, 150)" opacity="0.5">
          <text fontFamily="'Cinzel', serif" fontSize="20" fontWeight="700" fill="#78350f" textAnchor="middle">Ω</text>
        </g>

        {/* Bottom Banner */}
        {variant === 'full' && (
          <g transform="translate(256, 474)">
            <text fontFamily="'Cinzel', serif" fontSize="14" fontWeight="800" fill="#78350f" letterSpacing="6" textAnchor="middle" opacity="0.9">
              ALKITAB
            </text>
          </g>
        )}
      </svg>

      {showText && (
        <span className="font-serif-bible font-bold text-base tracking-tight text-[#2c180e]">
          Alkitab
        </span>
      )}
    </div>
  );
};
