import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MemeUpload from '../components/MemeUpload';
import { analyzeMeme } from '../services/api';

export default function HomePage() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleAnalyze() {
    if (!file) return;
    setLoading(true);
    try {
      const result = await analyzeMeme(file);
      sessionStorage.setItem('memelens_result', JSON.stringify(result));
      navigate('/results/demo');
    } catch (err) {
      console.error('Analysis failed:', err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 'calc(100vh - 72px)', padding: '60px 24px', textAlign: 'center' }}>
      
      {/* Badge */}
      <div style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        padding: '6px 16px',
        borderRadius: '30px',
        background: 'rgba(168, 85, 247, 0.12)',
        border: '1px solid rgba(168, 85, 247, 0.3)',
        marginBottom: '24px'
      }}>
        <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#c084fc' }} />
        <span style={{ fontSize: '0.78rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#c084fc' }}>
          Multimodal Meme Fact-Checking System
        </span>
      </div>

      {/* Hero Title */}
      <h1 style={{ fontSize: '3.8rem', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: '16px' }}>
        <span className="brand-text" style={{ fontSize: '3.8rem' }}>MemeLens</span>
      </h1>
      
      <p style={{ fontSize: '1.25rem', color: '#cbd5e1', maxWidth: '600px', margin: '0 auto 12px auto', lineHeight: 1.5, fontWeight: 500 }}>
        Understand the meme. Check the claim.
      </p>
      
      <p style={{ fontSize: '0.92rem', color: '#64748b', maxWidth: '550px', margin: '0 auto 40px auto', lineHeight: 1.5 }}>
        Multimodal reasoning combining OCR, vision embeddings, context classification, and NLI verification.
      </p>

      {/* Meme Upload Box */}
      <div style={{ width: '100%', maxWidth: '600px', marginBottom: '32px' }}>
        <MemeUpload onFileSelect={setFile} disabled={loading} />
      </div>

      {/* Analyze Button */}
      {file && (
        <div style={{ marginBottom: '60px' }}>
          <button
            onClick={handleAnalyze}
            disabled={loading}
            className="btn-primary-neon"
          >
            {loading ? (
              <>Processing Multimodal Inference...</>
            ) : (
              <>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <circle cx="11" cy="11" r="8" />
                  <path d="M21 21l-4.35-4.35" />
                </svg>
                Analyze Meme
              </>
            )}
          </button>
        </div>
      )}

      {/* Features Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        gap: '24px',
        width: '100%',
        maxWidth: '960px',
        marginTop: '32px'
      }}>
        {[
          { icon: '🧠', title: 'Multimodal Understanding', desc: 'Combines text OCR and visual embeddings to detect implied claims' },
          { icon: '🔍', title: 'Evidence Retrieval', desc: 'Queries vector database (FAISS) for fact-checking evidence' },
          { icon: '💡', title: 'Explainable Verdicts', desc: 'Natural Language Inference generates transparent evidence-based explanations' },
        ].map((f) => (
          <div key={f.title} className="modern-card" style={{ padding: '28px', textAlign: 'center' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '16px' }}>{f.icon}</div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#ffffff', marginBottom: '8px' }}>{f.title}</h3>
            <p style={{ fontSize: '0.85rem', color: '#94a3b8', lineHeight: 1.6, margin: 0 }}>{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
