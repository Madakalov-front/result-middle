export async function http<T>(url: string, init?: RequestInit): Promise<T> {
  try {
    const res = await fetch(url, init);
    if (!res.ok) {
      throw new Response("Request failed", {
        status: res.status,
        statusText: res.statusText,
      });
    }
    return await res.json();
  } catch (error) {
    if (error instanceof Response) {
      throw error;
    }
    throw new Response("Network error", { status: 500 });
  }
}
