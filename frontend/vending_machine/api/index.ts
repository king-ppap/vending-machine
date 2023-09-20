const rootApiUrl = process.env.NEXT_PUBLIC_API_ROOT

export const fetcher = (url: string, option?: RequestInit) => fetch(`${rootApiUrl}${url}`, option).then((r) => r.json());
