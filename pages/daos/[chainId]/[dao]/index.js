import { useRouter } from "next/router";
import { getDaoChain } from "../../../../utils/"
import Layout from "../../../../components/dao-dashboard/layout/"
import { Dashboard } from "../../../../components/dao-dashboard"
import { getTokenName } from "../../../../utils/fetchTokenInfo";


export default function Dao() {
  // * get DAO address from route * //
  const router = useRouter();
  const daoAddress = router.query.dao;
  const daoChain = getDaoChain(daoAddress);
  const daoName = getTokenName(daoChain, daoAddress)
  
  return (
    <Layout heading={daoName}>
      <Dashboard />
    </Layout>
  );
}
