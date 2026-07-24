const VERDICT_CONFIG = {
  TRUE: { color: '#22c55e', bg: 'rgba(34,197,94,0.1)', border: 'rgba(34,197,94,0.3)', icon: '✓', label: 'True' },
  FALSE: { color: '#ef4444', bg: 'rgba(239,68,68,0.1)', border: 'rgba(239,68,68,0.3)', icon: '✕', label: 'False' },
  MISLEADING: { color: '#f59e0b', bg: 'rgba(245,158,11,0.1)', border: 'rgba(245,158,11,0.3)', icon: '⚠', label: 'Misleading' },
  SATIRE: { color: '#a855f7', bg: 'rgba(168,85,247,0.1)', border: 'rgba(168,85,247,0.3)', icon: '🎭', label: 'Satire' },
  UNVERIFIABLE: { color: '#6b7280', bg: 'rgba(107,114,128,0.1)', border: 'rgba(107,114,128,0.3)', icon: '?', label: 'Unverifiable' },
  'NO FACTUAL CLAIM': { color: '#3b82f6', bg: 'rgba(59,130,246,0.1)', border: 'rgba(59,130,246,0.3)', icon: '○', label: 'No Claim' },
};

export default function VerdictBadge({ verdict, size = 'md' }) {
  const config = VERDICT_CONFIG[verdict] || VERDICT_CONFIG['UNVERIFIABLE'];
  const sizes = {
    sm: { padding: '0.25rem 0.75rem', fontSize: '0.75rem', iconSize: '0.85rem' },
    md: { padding: '0.5rem 1.25rem', fontSize: '1rem', iconSize: '1.1rem' },
    lg: { padding: '0.75rem 2rem', fontSize: '1.5rem', iconSize: '1.6rem' },
  };
  const s = sizes[size] || sizes.md;

  return (
    <span
      className="inline-flex items-center gap-2 rounded-full font-bold uppercase tracking-wide"
      style={{
        padding: s.padding,
        fontSize: s.fontSize,
        color: config.color,
        background: config.bg,
        border: `1px solid ${config.border}`,
      }}
    >
      <span style={{ fontSize: s.iconSize }}>{config.icon}</span>
      {config.label}
    </span>
  );
}
