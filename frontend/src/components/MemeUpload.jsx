import { useState, useRef } from 'react';

const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const MAX_SIZE = 10 * 1024 * 1024;

export default function MemeUpload({ onFileSelect, disabled }) {
  const [dragActive, setDragActive] = useState(false);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState('');
  const inputRef = useRef(null);

  function validateFile(file) {
    if (!ACCEPTED_TYPES.includes(file.type)) {
      return 'Unsupported format. Please use JPG, PNG, or WEBP.';
    }
    if (file.size > MAX_SIZE) {
      return 'File size exceeds 10 MB limit.';
    }
    return null;
  }

  function handleFile(file) {
    setError('');
    const err = validateFile(file);
    if (err) {
      setError(err);
      return;
    }
    setPreview(URL.createObjectURL(file));
    onFileSelect?.(file);
  }

  function handleDrag(e) {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') setDragActive(true);
    else if (e.type === 'dragleave') setDragActive(false);
  }

  function handleDrop(e) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files?.[0]) handleFile(e.dataTransfer.files[0]);
  }

  function handleChange(e) {
    if (e.target.files?.[0]) handleFile(e.target.files[0]);
  }

  function clearPreview(e) {
    e.stopPropagation();
    setPreview(null);
    setError('');
    onFileSelect?.(null);
    if (inputRef.current) inputRef.current.value = '';
  }

  return (
    <div style={{ width: '100%', maxWidth: '600px', margin: '0 auto' }}>
      {!preview ? (
        <div
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          className={`upload-drop-zone ${dragActive ? 'active' : ''}`}
        >
          <div className="upload-icon-circle">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
          </div>

          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#f8fafc', marginBottom: '8px' }}>
            {dragActive ? 'Drop image here' : 'Upload Meme Image'}
          </h3>
          
          <p style={{ fontSize: '0.88rem', color: '#94a3b8', margin: 0 }}>
            Drag & drop or click to browse · JPG, PNG, WEBP · Max 10 MB
          </p>

          <input
            ref={inputRef}
            type="file"
            accept=".jpg,.jpeg,.png,.webp"
            onChange={handleChange}
            style={{ display: 'none' }}
          />
        </div>
      ) : (
        <div className="modern-card" style={{ position: 'relative', padding: '24px', textAlign: 'center' }}>
          <div style={{ position: 'relative', borderRadius: '16px', overflow: 'hidden', background: '#0b0f19', padding: '16px', border: '1px solid rgba(255,255,255,0.1)' }}>
            <img src={preview} alt="Meme preview" style={{ maxHeight: '380px', width: 'auto', maxWidth: '100%', borderRadius: '10px', objectFit: 'contain' }} />
            <button
              onClick={clearPreview}
              style={{
                position: 'absolute',
                top: '12px',
                right: '12px',
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: 'rgba(15, 23, 42, 0.9)',
                color: '#ffffff',
                border: '1px solid rgba(255,255,255,0.2)',
                cursor: 'pointer',
                fontSize: '1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              title="Remove image"
            >
              ✕
            </button>
          </div>
        </div>
      )}
      {error && (
        <p style={{ marginTop: '12px', textAlign: 'center', fontSize: '0.88rem', fontWeight: 600, color: '#f87171' }}>
          {error}
        </p>
      )}
    </div>
  );
}
