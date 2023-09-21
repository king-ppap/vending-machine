const rootApiUrl = process.env.NEXT_PUBLIC_API_ROOT

export const fetcher = async (url: string, option?: RequestInit) => {
    const response = await fetch(`${rootApiUrl}${url}`, option)

    if (!response.ok) {
        throw response;
    }
    return response.json()
}