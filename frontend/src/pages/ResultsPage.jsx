import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import VerdictBadge from '../components/VerdictBadge';
import ConfidenceMeter from '../components/ConfidenceMeter';
import EvidenceCard from '../components/EvidenceCard';

export default function ResultsPage() {
  const [result, setResult] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = sessionStorage.getItem('memelens_result');
    if (stored) {
      setResult(JSON.parse(stored));
    } else {
      navigate('/');
    }
  }, [navigate]);

  if (!result) {
    return (
      <div style={{ display: 'flex', minHeight: '60vh', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: '40px', height: '40px', border: '4px solid rgba(168, 85, 247, 0.3)', borderTopColor: '#a855f7', borderRadius: '50%' }} />
      </div>
    );
  }

  const { context, claim, satire, fact_check } = result;

  const InfoRow = ({ label, value, highlight }) => (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
      <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#94a3b8' }}>{label}</span>
      <span style={{ fontSize: '0.92rem', fontWeight: 700, color: highlight ? '#c084fc' : '#ffffff' }}>
        {value}
      </span>
    </div>
  );

  return (
    <div className="app-container" style={{ padding: '40px 24px' }}>
      
      {/* Back button */}
      <button onClick={() => navigate('/')} className="btn-secondary-dark" style={{ marginBottom: '32px' }}>
        ← Analyze Another Meme
      </button>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '32px' }}>
        
        {/* Left Column (4 cols) */}
        <div style={{ gridColumn: 'span 4', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          <div className="modern-card">
            <h3 style={{ fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', color: '#94a3b8', marginBottom: '16px', letterSpacing: '0.05em' }}>
              Meme Preview
            </h3>
            {result.meme_preview && (
              <img src={result.meme_preview} alt="Analyzed meme" style={{ width: '100%', borderRadius: '12px', maxHeight: '350px', objectFit: 'contain', background: '#000' }} />
            )}
          </div>

          <div className="modern-card">
            <h3 style={{ fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', color: '#94a3b8', marginBottom: '16px', letterSpacing: '0.05em' }}>
              Satire Analysis
            </h3>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '0.92rem', fontWeight: 600, color: '#cbd5e1' }}>
                {satire.is_satire ? '🎭 Satirical Content' : '📋 Standard Content'}
              </span>
              <span style={{ padding: '4px 12px', borderRadius: '20px', fontSize: '0.78rem', fontWeight: 800, background: 'rgba(168, 85, 247, 0.15)', color: '#c084fc', border: '1px solid rgba(168, 85, 247, 0.3)' }}>
                {Math.round(satire.probability * 100)}% Satire
              </span>
            </div>
          </div>

        </div>

        {/* Right Column (8 cols) */}
        <div style={{ gridColumn: 'span 8', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Verdict Box */}
          <div className="modern-card" style={{ padding: '36px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '24px' }}>
              <div>
                <h3 style={{ fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', color: '#94a3b8', marginBottom: '12px', letterSpacing: '0.05em' }}>
                  Fact Check Verdict
                </h3>
                <VerdictBadge verdict={fact_check.verdict} size="lg" />
              </div>
              <ConfidenceMeter value={fact_check.confidence} />
            </div>
          </div>

          {/* Context Details */}
          <div className="modern-card">
            <h3 style={{ fontSize: '0.85rem', fontWeight: 800, textTransform: 'uppercase', color: '#c084fc', marginBottom: '16px', letterSpacing: '0.05em' }}>
              Meme Context Classification
            </h3>
            <InfoRow label="Communication Mode" value={context.communication_mode.replace(/_/g, ' ')} />
            <InfoRow label="Meme Intent" value={context.intent.replace(/_/g, ' ')} highlight />
            <InfoRow label="Image-Text Relationship" value={context.image_text_relationship.replace(/_/g, ' ')} />
          </div>

          {/* Claim Breakdown */}
          <div className="modern-card">
            <h3 style={{ fontSize: '0.85rem', fontWeight: 800, textTransform: 'uppercase', color: '#c084fc', marginBottom: '16px', letterSpacing: '0.05em' }}>
              Factual Claim Extraction
            </h3>
            <InfoRow label="Factual Claim Present" value={claim.detected ? 'Yes' : 'No'} highlight={claim.detected} />
            <InfoRow label="Claim Modality" value={claim.modality.replace(/_/g, ' ')} />

            {claim.extracted && (
              <div style={{ marginTop: '16px', padding: '16px', borderRadius: '12px', background: 'rgba(168, 85, 247, 0.1)', border: '1px solid rgba(168, 85, 247, 0.25)' }}>
                <p style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: '#c084fc', marginBottom: '4px' }}>Extracted Implied Claim</p>
                <p style={{ fontSize: '0.95rem', fontStyle: 'italic', fontWeight: 600, color: '#ffffff', margin: 0 }}>"{claim.extracted}"</p>
              </div>
            )}
          </div>

          {/* Explanation */}
          <div className="modern-card">
            <h3 style={{ fontSize: '0.85rem', fontWeight: 800, textTransform: 'uppercase', color: '#c084fc', marginBottom: '12px', letterSpacing: '0.05em' }}>
              Verdict Explanation
            </h3>
            <p style={{ fontSize: '0.95rem', color: '#cbd5e1', lineHeight: 1.6, margin: 0 }}>
              {fact_check.explanation}
            </p>
          </div>

          {/* Evidence */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h3 style={{ fontSize: '0.85rem', fontWeight: 800, textTransform: 'uppercase', color: '#94a3b8', letterSpacing: '0.05em' }}>
              Retrieved Evidence Sources
            </h3>
            {fact_check.evidence.map((ev) => (
              <EvidenceCard key={ev.id} {...ev} />
            ))}
          </div>

        </div>

      </div>
    </div>
  );
}
