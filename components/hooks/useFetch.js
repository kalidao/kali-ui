
import useSWR from 'swr';

const fetcher = (...args) => fetch(...args).then((res) => res.json())

export const useFetch = (URL) => {
    const { data, isLoading, error } = useSWR(
        'https://gateway.pinata.cloud/ipfs/QmW9asQXxL1zozwZsPNPFWh7x8qsL5SgM5i8dhh7wqbL4Q',
        fetcher
    );

    return { data, isLoading, error};
};
  
