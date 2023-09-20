import useSWR from 'swr';
import { fetcher } from ".";

export const useStock = (uuid: string) => {
    const url = `/stock/${uuid}/`;
    return useSWR(url, (url) => fetcher(url));
}
