import { getLevelByScore } from "@/lib/domain/score/level";
import { Address } from "@/lib/domain/shared/types";
import { formatAddress } from "@/lib/utils";

interface ScoreSVGProps {
  score: number;
  address: Address;
}

export function ScoreSVG({ score, address }: ScoreSVGProps) {
  const formattedAddress = formatAddress(address);
  const level = getLevelByScore(score);
  const formattedScore = score.toLocaleString();

  return (
    <svg width="400" height="500" viewBox="0 0 400 500" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="coralGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FF6F61" />
          <stop offset="100%" stopColor="#FF8A7A" />
        </linearGradient>
        <linearGradient id="glassGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.12)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0.06)" />
        </linearGradient>
        <linearGradient id="darkBg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#19191A" />
          <stop offset="100%" stopColor="#1F1F20" />
        </linearGradient>
        <linearGradient id="accentBlue" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#70BAD2" />
          <stop offset="100%" stopColor="#7EAAD4" />
        </linearGradient>
        <filter id="glassEffect">
          <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
          <feColorMatrix
            in="blur"
            type="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.15 0"
            result="glass"
          />
        </filter>
        <pattern id="dots" width="20" height="20" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1" fill="rgba(255,111,97,0.05)" />
        </pattern>
      </defs>
      <rect width="400" height="500" fill="url(#darkBg)" />
      <rect width="400" height="500" fill="url(#dots)" />
      <circle cx="80" cy="120" r="60" fill="url(#coralGradient)" opacity="0.08" />
      <circle cx="320" cy="380" r="80" fill="url(#accentBlue)" opacity="0.06" />
      <g transform="translate(30, 30)">
        <rect width="340" height="440" rx="24" fill="rgba(255,255,255,0.08)" filter="url(#glassEffect)" />
        <rect width="340" height="440" rx="24" fill="url(#glassGradient)" />
        <rect width="340" height="440" rx="24" fill="none" stroke="url(#coralGradient)" strokeWidth="1" opacity="0.3" />
      </g>
      <text
        x="200"
        y="70"
        textAnchor="middle"
        fontFamily="Inter, sans-serif"
        fontWeight="600"
        fontSize="20"
        fill="url(#coralGradient)"
        letterSpacing="2"
      >
        MEGASCORE
      </text>
      <line x1="60" y1="90" x2="340" y2="90" stroke="url(#coralGradient)" strokeWidth="1" opacity="0.4" />
      <rect
        x="60"
        y="120"
        width="280"
        height="155"
        rx="20"
        fill="rgba(25,25,26,0.6)"
        stroke="url(#coralGradient)"
        strokeWidth="2"
        opacity="0.6"
      />
      <text
        x="200"
        y="200"
        textAnchor="middle"
        fontFamily="Inter, sans-serif"
        fontWeight="700"
        fontSize="72"
        fill="url(#coralGradient)"
        letterSpacing="-2"
      >
        {formattedScore}
      </text>
      <text
        x="200"
        y="240"
        textAnchor="middle"
        fontFamily="Inter, sans-serif"
        fontWeight="500"
        fontSize="16"
        fill="rgba(236,232,232,0.8)"
        letterSpacing="2"
      >
        REPUTATION SCORE
      </text>
      <g transform="translate(60, 290)">
        <rect
          width="280"
          height="55"
          rx="16"
          fill="rgba(25,25,26,0.5)"
          stroke="url(#accentBlue)"
          strokeWidth="1"
          opacity="0.5"
        />
        <text
          x="140"
          y="35"
          textAnchor="middle"
          fontFamily="Inter, sans-serif"
          fontWeight="600"
          fontSize="18"
          fill="url(#accentBlue)"
        >
          LEVEL {level.level}
        </text>
      </g>
      <g transform="translate(60, 360)">
        <rect width="280" height="60" rx="12" fill="rgba(25,25,26,0.4)" />
        <text
          x="140"
          y="25"
          textAnchor="middle"
          fontFamily="Inter, sans-serif"
          fontWeight="500"
          fontSize="14"
          fill="#DFD9D9"
        >
          {formattedAddress}
        </text>
        <text
          x="140"
          y="45"
          textAnchor="middle"
          fontFamily="Inter, sans-serif"
          fontWeight="300"
          fontSize="12"
          fill="rgba(223,217,217,0.7)"
        >
          MegaScore Reputation NFT
        </text>
      </g>
      <g transform="translate(200, 445)">
        <rect x="-100" y="-14" width="200" height="28" rx="14" ry="14" fill="url(#accentBlue)" opacity="0.9" />
        <text
          x="0"
          y="3"
          textAnchor="middle"
          fontFamily="Inter, sans-serif"
          fontWeight="600"
          fontSize="11"
          fill="#19191A"
          letterSpacing="1"
        >
          MEGAETH TESTNET
        </text>
      </g>
      <circle cx="360" cy="60" r="4" fill="url(#coralGradient)" opacity="0.6" />
      <circle cx="380" cy="80" r="3" fill="url(#accentBlue)" opacity="0.5" />
    </svg>
  );
}
