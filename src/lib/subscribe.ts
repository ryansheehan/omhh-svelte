export interface Subscriber {
  name: string;
  email: string;
}

export async function subscribe(source: string, sub: Subscriber) {
  const params: RequestInit = {
    headers: {'Content-Type': 'application/json'},
    method: 'POST',
    body: JSON.stringify(sub),
  };

  const res = await fetch(`/api/subscribe/${source}`, params);
  const result = await res.json();
  return result;
}