/**
 * Simple API client for Wellness Hub.
 * Uses environment variable REACT_APP_API_BASE (default http://localhost:3001).
 */
const BASE_URL = process.env.REACT_APP_API_BASE || 'http://localhost:3001';

async function request(path, options = {}) {
  const url = `${BASE_URL}${path}`;
  const headers = { 'Content-Type': 'application/json', ...(options.headers || {}) };

  try {
    const res = await fetch(url, { ...options, headers });
    const contentType = res.headers.get('content-type') || '';
    const isJson = contentType.includes('application/json');

    if (!res.ok) {
      const errBody = isJson ? await res.json().catch(() => ({})) : await res.text();
      const message = typeof errBody === 'string' ? errBody : (errBody.message || 'Request failed');
      throw new Error(`${res.status} ${res.statusText}: ${message}`);
    }

    return isJson ? res.json() : res.text();
  } catch (err) {
    // Re-throw with a cleaner message
    throw new Error(`Network/API error: ${err.message}`);
  }
}

// PUBLIC_INTERFACE
export async function getHealth() {
  /** Returns service health object from "/" endpoint. */
  return request('/');
}

// PUBLIC_INTERFACE
export async function getResources() {
  /** Fetch list of wellness resources from /wellness/resources. */
  return request('/wellness/resources');
}

// PUBLIC_INTERFACE
export async function getTrackedActivities({ limit = 20, offset = 0 } = {}) {
  /** Fetch paginated tracked activities. */
  const params = new URLSearchParams({ limit, offset });
  return request(`/wellness/track?${params.toString()}`);
}

// PUBLIC_INTERFACE
export async function postTrackActivity(payload) {
  /** Post a new tracked activity per TrackRequest schema. */
  return request('/wellness/track', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export { BASE_URL };
