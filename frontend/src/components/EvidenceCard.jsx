export default function EvidenceCard({ source_name, source_url, snippet, relevance }) {
  const relevancePercent = Math.round((relevance || 0) * 100);

  return (
    <div className="glass-card p-5 animate-fade-in-up">
      <div className="flex items-start justify-between gap-4 mb-3">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg"
            style={{ background: 'rgba(59, 130, 246, 0.1)' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2">
              <path d="M9 12h6M9 16h6M17 21H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <span className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>
            {source_name}
          </span>
        </div>
        <span
          className="tag"
          style={{
            color: relevancePercent >= 80 ? '#22c55e' : '#f59e0b',
            borderColor: relevancePercent >= 80 ? 'rgba(34,197,94,0.3)' : 'rgba(245,158,11,0.3)',
            background: relevancePercent >= 80 ? 'rgba(34,197,94,0.08)' : 'rgba(245,158,11,0.08)',
          }}
        >
          {relevancePercent}% match
        </span>
      </div>
      <p className="text-sm leading-relaxed mb-3" style={{ color: 'var(--text-secondary)' }}>
        "{snippet}"
      </p>
      {source_url && (
        <a
          href={source_url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-xs font-medium hover:underline"
          style={{ color: 'var(--accent-blue)' }}
        >
          View source →
        </a>
      )}
    </div>
  );
}
