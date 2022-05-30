import { useRouter } from "next/router";
import { getDaoChain } from "../../../../utils/"
import Layout from "../../../../components/dao-dashboard/layout/"
import { Dashboard } from "../../../../components/dao-dashboard"
import { getTokenName } from "../../../../utils/fetchTokenInfo";
import { SWRConfig, useSWR } from "swr";
import { useFetch } from "../../../../components/hooks/useFetch";
import getDao from "../../../../graph/queries/getDao";

// export const getServerSideProps = async ({ query }) => {
//   return {
//     props: {
//       fallback: {
//         [`/api/daos/${query.chainId}/${query.dao}`]: (await getDao(
//           query.chainId,
//           query.dao
//         )),
//       },
//     },
//   }
// }

export default function Dao({ fallback }) {
  // * get DAO address from route * //
  // const router = useRouter();
  // const dao = router.query.dao;
  // const chainId = router.query.chainId;
  
  // const { data, error } = useFetch(`/api/daos/${chainId}/${dao}`)
  
  return (
    <SWRConfig value={fallback}>
      <Layout>
        <Dashboard />
      </Layout>
    </SWRConfig>
  );
}
