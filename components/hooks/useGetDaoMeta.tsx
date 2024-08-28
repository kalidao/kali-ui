import { useQuery } from '@tanstack/react-query'

export const useGetDaoMeta = (chainId: number, address: string) => {
  return useQuery(
    ['getDaoMeta', chainId, address],
    async () => {
      const data = await fetch(`https://imxoahmacbkavjzdzzoz.supabase.co/rest/v1/DAO?address=eq.${address}&select=*`, {
        headers: {
          apiKey: process.env.NEXT_PUBLIC_DAO_API_KEY as string,
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_DAO_API_KEY as string}`,
          Range: '0-9',
        },
      }).then((res) => res.json())
      const meta = await fetch(data?.[0]?.uri).then((res) => res.json())

      return meta
    },
    {
      enabled: chainId !== undefined && address !== undefined ? true : false,
    },
  )
}
