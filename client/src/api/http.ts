export async function http<T>(
  path: string,
  init?: RequestInit
): Promise<T> {
  const res = await fetch(path, {
    headers: { "Content-Type": "application/json", ...init?.headers },
    ...init,
  });

  if (!res.ok) {
    let msg = res.statusText;
    try {
      const body = (await res.json()) as { error?: string };
      if (body.error) msg = body.error;
    } catch {
      /* keep statusText */
    }
    throw new Error(msg);
  }

  if (res.status === 204) return undefined as T;
  return res.json() as Promise<T>;
}
