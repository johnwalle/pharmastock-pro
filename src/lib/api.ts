export class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

export async function apiRequest<T = any>(
  url: string,
  options?: RequestInit
): Promise<{ data: T | null; status: number; error: string | null }> {
  const response = await fetch(url, options);
  const data = await response.json();

  if (!response.ok) {
    let message: string;

    switch (response.status) {
      case 401:
        message = 'Invalid credentials';
        break;
      case 429:
        message = data?.error || 'Conflict error';
        break;
      default:
        message = data?.message || 'Something went wrong';
        break;
    }

    return { data: null, status: response.status, error: message };
  }

  return { data, status: response.status, error: null };
}
