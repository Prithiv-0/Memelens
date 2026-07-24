/**
 * MemeLens API Client
 * Stubbed implementation — returns mock data until the FastAPI backend is connected.
 */

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8000/api';

// ── Simulated latency ──
const delay = (ms) => new Promise((r) => setTimeout(r, ms));

// ── Mock analysis result ──
const MOCK_RESULT = {
  id: 'demo-001',
  meme_preview: null, // will be set from uploaded file
  context: {
    communication_mode: 'MULTIMODAL',
    intent: 'POTENTIAL_MISINFORMATION',
    image_text_relationship: 'CONTEXT_DEPENDENT',
  },
  claim: {
    detected: true,
    modality: 'MULTIMODAL_CLAIM',
    extracted: 'This photograph shows flooding occurring in Paris today.',
  },
  satire: {
    is_satire: false,
    probability: 0.08,
  },
  fact_check: {
    verdict: 'FALSE',
    confidence: 0.91,
    explanation:
      'The photograph does show a flooding event, but available evidence indicates that the image was taken during a different event and does not show Paris in 2026.',
    evidence: [
      {
        id: 'ev-1',
        source_name: 'Reuters Fact Check',
        source_url: 'https://www.reuters.com/fact-check',
        snippet: 'Reverse image search reveals this photo was originally published in 2019 covering flooding in Jakarta, Indonesia.',
        relevance: 0.94,
      },
      {
        id: 'ev-2',
        source_name: 'AFP Fact Check',
        source_url: 'https://factcheck.afp.com',
        snippet: 'No credible news outlet has reported any flooding event in Paris on the date indicated by the meme.',
        relevance: 0.87,
      },
    ],
  },
};

/**
 * Upload and analyze a meme image.
 * @param {File} file - The image file
 * @returns {Promise<object>} Analysis result
 */
export async function analyzeMeme(file) {
  // In production, this would POST to the backend:
  // const formData = new FormData();
  // formData.append('file', file);
  // const res = await fetch(`${API_BASE}/analyze`, { method: 'POST', body: formData });
  // return res.json();

  await delay(2500); // simulate processing time
  return {
    ...MOCK_RESULT,
    meme_preview: URL.createObjectURL(file),
  };
}

/**
 * Get analysis result by ID.
 */
export async function getResult(id) {
  await delay(500);
  return MOCK_RESULT;
}

/**
 * Health check.
 */
export async function healthCheck() {
  try {
    const res = await fetch(`${API_BASE}/health`);
    return res.ok;
  } catch {
    return false;
  }
}

/**
 * Get meme for annotation.
 */
export async function getAnnotationMeme(index = 0) {
  await delay(300);
  return {
    meme_id: `MEME_${String(index + 1).padStart(5, '0')}`,
    image_url: null,
    raw_ocr_text: 'Paris today',
    cleaned_ocr_text: 'Paris today',
    has_text: true,
    communication_mode: '',
    meme_intent: '',
    claim_present: '',
    claim_modality: '',
    extracted_claim: '',
    visual_description: '',
    image_text_relationship: '',
    topic: '',
    satire_label: false,
    satire_confidence: 0,
    fact_check_label: '',
    evidence_text: '',
    evidence_url: '',
    annotation_status: 'PENDING',
  };
}

/**
 * Save annotation.
 */
export async function saveAnnotation(memeId, annotation) {
  await delay(400);
  return { success: true, meme_id: memeId };
}
