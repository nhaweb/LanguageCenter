export type SceneId =
  | 'hero-class'
  | 'hero-talk'
  | 'hero-room'
  | 'explorers'
  | 'stars'
  | 'cambridge'
  | 'ielts-base'
  | 'ielts-high'
  | 'speak'
  | 'age-kids'
  | 'age-primary'
  | 'age-secondary'
  | 'age-ielts'
  | 'age-work'
  | 'role-young'
  | 'role-academic'
  | 'role-exam'
  | 'role-speech'
  | 'space-class'
  | 'space-books'
  | 'space-club'
  | 'space-play'
  | 'space-why'
  | 'path-play'
  | 'path-exam'
  | 'path-work'
  | 'start-visit'
  | 'contact-hall'

type Motif = 'class' | 'talk' | 'room' | 'play' | 'books' | 'shield' | 'exam' | 'speech' | 'work' | 'building'

const SCENES: Record<SceneId, { sky: string; hill: string; accent: string; motif: Motif }> = {
  'hero-class': { sky: '#EEF2FF', hill: '#4F46E5', accent: '#D97706', motif: 'class' },
  'hero-talk': { sky: '#F8FAFC', hill: '#111B3C', accent: '#22D3EE', motif: 'talk' },
  'hero-room': { sky: '#FFF7ED', hill: '#D97706', accent: '#4F46E5', motif: 'room' },
  explorers: { sky: '#FFFBEB', hill: '#F59E0B', accent: '#4F46E5', motif: 'play' },
  stars: { sky: '#EEF2FF', hill: '#6366F1', accent: '#D97706', motif: 'books' },
  cambridge: { sky: '#F8FAFC', hill: '#111B3C', accent: '#D97706', motif: 'shield' },
  'ielts-base': { sky: '#F5F3FF', hill: '#6D28D9', accent: '#F59E0B', motif: 'exam' },
  'ielts-high': { sky: '#EEF2FF', hill: '#312E81', accent: '#D97706', motif: 'exam' },
  speak: { sky: '#ECFDF5', hill: '#047857', accent: '#D97706', motif: 'speech' },
  'age-kids': { sky: '#FFF7ED', hill: '#EA580C', accent: '#4F46E5', motif: 'play' },
  'age-primary': { sky: '#EEF2FF', hill: '#4F46E5', accent: '#F59E0B', motif: 'books' },
  'age-secondary': { sky: '#F5F3FF', hill: '#5B21B6', accent: '#22D3EE', motif: 'talk' },
  'age-ielts': { sky: '#F8FAFC', hill: '#1E1B4B', accent: '#D97706', motif: 'exam' },
  'age-work': { sky: '#F0FDFA', hill: '#0F766E', accent: '#4F46E5', motif: 'work' },
  'role-young': { sky: '#FFFBEB', hill: '#D97706', accent: '#4F46E5', motif: 'play' },
  'role-academic': { sky: '#EEF2FF', hill: '#312E81', accent: '#22D3EE', motif: 'class' },
  'role-exam': { sky: '#F5F3FF', hill: '#4C1D95', accent: '#F59E0B', motif: 'exam' },
  'role-speech': { sky: '#ECFEFF', hill: '#0E7490', accent: '#D97706', motif: 'speech' },
  'space-class': { sky: '#EEF2FF', hill: '#4338CA', accent: '#FBBF24', motif: 'room' },
  'space-books': { sky: '#FFF7ED', hill: '#9A3412', accent: '#4F46E5', motif: 'books' },
  'space-club': { sky: '#F0FDF4', hill: '#166534', accent: '#D97706', motif: 'talk' },
  'space-play': { sky: '#FFFBEB', hill: '#B45309', accent: '#6366F1', motif: 'play' },
  'space-why': { sky: '#F8FAFC', hill: '#1E293B', accent: '#4F46E5', motif: 'building' },
  'path-play': { sky: '#FFF7ED', hill: '#C2410C', accent: '#4F46E5', motif: 'play' },
  'path-exam': { sky: '#EEF2FF', hill: '#3730A3', accent: '#D97706', motif: 'exam' },
  'path-work': { sky: '#F0FDFA', hill: '#115E59', accent: '#F59E0B', motif: 'work' },
  'start-visit': { sky: '#EEF2FF', hill: '#1E1B4B', accent: '#22D3EE', motif: 'building' },
  'contact-hall': { sky: '#F8FAFC', hill: '#111B3C', accent: '#D97706', motif: 'building' },
}

function Figure({ x, y, shirt }: { x: number; y: number; shirt: string }) {
  return (
    <g>
      <circle cx={x} cy={y} r="18" fill="#F8D7B5" />
      <rect x={x - 16} y={y + 16} width="32" height="36" rx="12" fill={shirt} />
    </g>
  )
}

export function SceneArt({
  scene,
  alt,
  className = 'h-full w-full',
}: {
  scene: SceneId
  alt: string
  className?: string
}) {
  const tone = SCENES[scene]
  return (
    <svg
      viewBox="0 0 640 480"
      width="640"
      height="480"
      role="img"
      aria-label={alt}
      preserveAspectRatio="xMidYMid slice"
      className={className}
    >
      <title>{alt}</title>
      <rect width="640" height="480" fill={tone.sky} />
      <circle cx="520" cy="78" r="36" fill={tone.accent} opacity="0.9" />
      <rect x="0" y="300" width="640" height="180" fill={tone.hill} />
      <rect x="70" y="250" width="220" height="150" rx="18" fill="#FFFFFF" />
      <rect x="92" y="272" width="176" height="78" rx="10" fill="#E0E7FF" />
      {tone.motif === 'books' && (
        <g>
          <rect x="360" y="250" width="36" height="120" rx="6" fill="#FDE68A" />
          <rect x="404" y="220" width="36" height="150" rx="6" fill="#FFFFFF" />
          <rect x="448" y="236" width="36" height="134" rx="6" fill={tone.accent} />
        </g>
      )}
      {tone.motif === 'shield' && (
        <path d="M470 150 l70 24 v70 c0 48-32 78-70 92-38-14-70-44-70-92 v-70 z" fill="#FFFFFF" />
      )}
      {tone.motif === 'speech' && (
        <g>
          <rect x="360" y="170" width="180" height="90" rx="22" fill="#FFFFFF" />
          <path d="M400 260 l20 28 24-28" fill="#FFFFFF" />
        </g>
      )}
      {tone.motif === 'exam' && (
        <g>
          <rect x="360" y="180" width="170" height="130" rx="16" fill="#FFFFFF" />
          <rect x="382" y="206" width="126" height="12" rx="6" fill="#C7D2FE" />
          <rect x="382" y="230" width="90" height="12" rx="6" fill="#FDE68A" />
        </g>
      )}
      {tone.motif === 'building' && (
        <g>
          <rect x="380" y="150" width="160" height="230" rx="12" fill="#FFFFFF" />
          <rect x="404" y="176" width="28" height="28" rx="4" fill={tone.accent} />
          <rect x="446" y="176" width="28" height="28" rx="4" fill="#C7D2FE" />
          <rect x="488" y="176" width="28" height="28" rx="4" fill={tone.accent} />
        </g>
      )}
      {tone.motif === 'room' && <rect x="108" y="288" width="144" height="46" rx="8" fill={tone.accent} />}
      {(tone.motif === 'class' || tone.motif === 'talk' || tone.motif === 'play' || tone.motif === 'work') && (
        <Figure x={tone.motif === 'play' ? 250 : 430} y={250} shirt={tone.accent} />
      )}
      <Figure x={180} y={268} shirt="#FFFFFF" />
      {tone.motif !== 'building' && <Figure x={300} y={278} shirt="#111B3C" />}
    </svg>
  )
}
