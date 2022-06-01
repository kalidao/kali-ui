import Layout from "../../../../components/dao-dashboard/layout/"
import { Dashboard } from "../../../../components/dao-dashboard"
import { useGraph } from "../../../../components/hooks";
import { useRouter } from "next/router";
import { DAO_TOKEN } from "../../../../graph";
import { useContractRead } from "wagmi";
import DAO_ABI from "../../../../abi/KaliDAO.json";

export default function Dao() {
  const router = useRouter()
  const { data } = useContractRead(
    {
      addressOrName: router.query.dao,
      contractInterface: DAO_ABI,
    },
    'name',
    {
      chainId: router.query.chainId
    }
  )

  return (
      <Layout heading={data}>
        <Dashboard />
      </Layout>
  );
}
