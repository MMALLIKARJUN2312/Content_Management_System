const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

const MAX_RETRIES = 2;
const RETRY_DELAY_MS = 300;

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Retries transient network/server failures with backoff. 404 resolves to
// null (a normal "not found" case, not an error); other 4xx responses throw
// immediately since retrying won't fix a bad request.
export async function getJSON(path) {
  let lastError;

  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    try {
      const res = await fetch(`${API_URL}${path}`, { cache: 'no-store' });

      if (res.status === 404) return null;

      if (!res.ok) {
        if (res.status < 500) {
          throw new Error(`Request failed: ${path} (${res.status})`);
        }
        lastError = new Error(`Request failed: ${path} (${res.status})`);
      } else {
        const body = await res.json();
        return body.data;
      }
    } catch (err) {
      lastError = err;
    }

    if (attempt < MAX_RETRIES) {
      await wait(RETRY_DELAY_MS * 2 ** attempt);
    }
  }

  throw lastError;
}
