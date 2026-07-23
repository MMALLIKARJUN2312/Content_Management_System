const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

export async function getJSON(path) {
  const res = await fetch(`${API_URL}${path}`, { cache: 'no-store' });
  if (!res.ok) {
    if (res.status === 404) return null;
    throw new Error(`Request failed: ${path} (${res.status})`);
  }
  const body = await res.json();
  return body.data;
}
