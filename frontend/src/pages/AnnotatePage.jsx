import { useState, useEffect } from 'react';
import { getAnnotationMeme, saveAnnotation } from '../services/api';

const SELECT_OPTIONS = {
  communication_mode: ['', 'TEXT_DOMINANT', 'VISUAL_DOMINANT', 'MULTIMODAL'],
  meme_intent: ['', 'FACTUAL_CLAIM', 'SATIRE', 'HUMOR', 'OPINION', 'POTENTIAL_MISINFORMATION', 'MANIPULATED_CONTEXT', 'VISUAL_MISINFORMATION', 'UNCERTAIN'],
  claim_present: ['', 'CLAIM_PRESENT', 'NO_CLAIM', 'UNCERTAIN'],
  claim_modality: ['', 'TEXTUAL_CLAIM', 'VISUAL_CLAIM', 'MULTIMODAL_CLAIM'],
  image_text_relationship: ['', 'SUPPORTING', 'CONTRADICTORY', 'UNRELATED', 'CONTEXT_DEPENDENT', 'SATIRICAL_COMBINATION'],
  fact_check_label: ['', 'TRUE', 'FALSE', 'MISLEADING', 'SATIRE', 'UNVERIFIABLE', 'NO_CLAIM'],
};

export default function AnnotatePage() {
  const [memeIndex, setMemeIndex] = useState(0);
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  async function loadMeme(index) {
    setLoading(true);
    setSaved(false);
    const data = await getAnnotationMeme(index);
    setForm({ ...data });
    setLoading(false);
  }

  useEffect(() => {
    loadMeme(0);
  }, []);

  function handleChange(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
    setSaved(false);
  }

  function handleImageUpload(e) {
    const file = e.target.files?.[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  }

  async function handleSave() {
    setLoading(true);
    await saveAnnotation(form.meme_id, form);
    setSaved(true);
    setLoading(false);
  }

  function handleNext() {
    const next = memeIndex + 1;
    setMemeIndex(next);
    setImagePreview(null);
    loadMeme(next);
  }

  function handlePrev() {
    if (memeIndex <= 0) return;
    const prev = memeIndex - 1;
    setMemeIndex(prev);
    setImagePreview(null);
    loadMeme(prev);
  }

  const Select = ({ label, field, options }) => (
    <div className="form-group">
      <label className="form-label">{label}</label>
      <select
        value={form[field] || ''}
        onChange={(e) => handleChange(field, e.target.value)}
        className="form-select"
      >
        {options.map((opt) => (
          <option key={opt} value={opt} style={{ background: '#0b0f19', color: '#ffffff' }}>
            {opt ? opt.replace(/_/g, ' ') : '— Select Option —'}
          </option>
        ))}
      </select>
    </div>
  );

  const TextInput = ({ label, field, multiline = false }) => {
    const Tag = multiline ? 'textarea' : 'input';
    return (
      <div className="form-group">
        <label className="form-label">{label}</label>
        <Tag
          value={form[field] || ''}
          onChange={(e) => handleChange(field, e.target.value)}
          rows={multiline ? 3 : undefined}
          className={multiline ? 'form-textarea' : 'form-input'}
        />
      </div>
    );
  };

  return (
    <div className="app-container" style={{ padding: '40px 24px' }}>
      {/* Header Bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '20px',
        marginBottom: '32px',
        paddingBottom: '24px',
        borderBottom: '1px solid rgba(255, 255, 255, 0.12)'
      }}>
        <div>
          <h1 className="brand-text" style={{ fontSize: '2.2rem', margin: 0 }}>Dataset Annotator</h1>
          <p style={{ fontSize: '0.88rem', fontWeight: 700, color: '#c084fc', marginTop: '4px', margin: 0 }}>
            Annotating Meme #{String(memeIndex + 1).padStart(5, '0')}
          </p>
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <button onClick={handlePrev} disabled={memeIndex <= 0} className="btn-secondary-dark">
            ← Previous
          </button>
          <button onClick={handleNext} className="btn-secondary-dark">
            Next Meme →
          </button>
        </div>
      </div>

      {/* Grid Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '32px' }}>
        
        {/* Left Column (4 cols) */}
        <div style={{ gridColumn: 'span 4', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          <div className="modern-card">
            <h3 style={{ fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', color: '#94a3b8', marginBottom: '16px', letterSpacing: '0.05em' }}>
              Meme Image
            </h3>
            {imagePreview ? (
              <img src={imagePreview} alt="Meme" style={{ width: '100%', borderRadius: '12px', maxHeight: '300px', objectFit: 'contain', background: '#000' }} />
            ) : (
              <div style={{ padding: '32px 16px', border: '2px dashed rgba(255,255,255,0.15)', borderRadius: '16px', textAlignment: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <span style={{ fontSize: '2rem', marginBottom: '8px' }}>🖼️</span>
                <p style={{ fontSize: '0.82rem', color: '#64748b', marginBottom: '16px' }}>No image loaded</p>
                <label className="btn-secondary-dark" style={{ cursor: 'pointer', padding: '8px 16px', fontSize: '0.82rem' }}>
                  Upload Image
                  <input type="file" accept=".jpg,.jpeg,.png,.webp" style={{ display: 'none' }} onChange={handleImageUpload} />
                </label>
              </div>
            )}
          </div>

          <div className="modern-card">
            <h3 style={{ fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', color: '#94a3b8', marginBottom: '16px', letterSpacing: '0.05em' }}>
              OCR Text Extraction
            </h3>
            <TextInput label="Raw OCR Text" field="raw_ocr_text" multiline />
            <TextInput label="Cleaned OCR Text" field="cleaned_ocr_text" multiline />
          </div>
        </div>

        {/* Right Column (8 cols) */}
        <div style={{ gridColumn: 'span 8', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          <div className="modern-card">
            <h3 style={{ fontSize: '0.85rem', fontWeight: 800, textTransform: 'uppercase', color: '#c084fc', marginBottom: '20px', letterSpacing: '0.05em' }}>
              1. Multimodal Classification
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <Select label="Communication Mode" field="communication_mode" options={SELECT_OPTIONS.communication_mode} />
              <Select label="Meme Intent" field="meme_intent" options={SELECT_OPTIONS.meme_intent} />
              <Select label="Claim Presence" field="claim_present" options={SELECT_OPTIONS.claim_present} />
              <Select label="Claim Modality" field="claim_modality" options={SELECT_OPTIONS.claim_modality} />
              <Select label="Image-Text Relationship" field="image_text_relationship" options={SELECT_OPTIONS.image_text_relationship} />
              <Select label="Fact Check Verdict Label" field="fact_check_label" options={SELECT_OPTIONS.fact_check_label} />
            </div>
          </div>

          <div className="modern-card">
            <h3 style={{ fontSize: '0.85rem', fontWeight: 800, textTransform: 'uppercase', color: '#c084fc', marginBottom: '20px', letterSpacing: '0.05em' }}>
              2. Semantic & Implied Claim
            </h3>
            <TextInput label="Visual Description" field="visual_description" multiline />
            <TextInput label="Extracted Claim" field="extracted_claim" multiline />
            <TextInput label="Topic / Domain" field="topic" />
          </div>

          <div className="modern-card">
            <h3 style={{ fontSize: '0.85rem', fontWeight: 800, textTransform: 'uppercase', color: '#c084fc', marginBottom: '20px', letterSpacing: '0.05em' }}>
              3. Satire & Evidence Source
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div className="form-group">
                <label className="form-label">Satire Classification</label>
                <div style={{ display: 'flex', gap: '10px' }}>
                  {[true, false].map((val) => (
                    <button
                      key={String(val)}
                      type="button"
                      onClick={() => handleChange('satire_label', val)}
                      className={form.satire_label === val ? 'btn-secondary-dark' : 'btn-secondary-dark'}
                      style={{
                        flex: 1,
                        background: form.satire_label === val ? 'rgba(168, 85, 247, 0.25)' : '#0b0f19',
                        borderColor: form.satire_label === val ? '#a855f7' : 'rgba(255,255,255,0.12)',
                        color: form.satire_label === val ? '#c084fc' : '#94a3b8'
                      }}
                    >
                      {val ? '🎭 Satire' : '📋 Not Satire'}
                    </button>
                  ))}
                </div>
              </div>
              <TextInput label="Satire Confidence (0 - 1)" field="satire_confidence" />
            </div>

            <TextInput label="Evidence Text Snippet" field="evidence_text" multiline />
            <TextInput label="Evidence URL Citation" field="evidence_url" />
          </div>

          {/* Action Bar */}
          <div style={{ display: 'flex', gap: '16px', marginTop: '12px' }}>
            <button onClick={handleSave} disabled={loading} className="btn-primary-neon">
              {loading ? 'Saving...' : saved ? '✓ Entry Saved!' : '💾 Save Entry'}
            </button>
            <button onClick={handleNext} className="btn-secondary-dark">
              Skip & Next →
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
