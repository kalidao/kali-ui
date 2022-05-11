import { useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { chainId, useContract } from "wagmi";
import { ethers } from "ethers";
import { getDaoChain } from "../../utils/";

export default function Dao() {
  // const value = useContext(AppContext);
  // const { visibleView, daoChain, account } = value.state;
  // console.log("account", account);
  // * get DAO address from route * //
  const router = useRouter();
  const address = router.query.dao 

  const daoAddress = router.query.dao;
  const [daoChain, setDaoChain] = useState(null);
  // const dao = useContract({
  //   addressOrName: '0xf8b7d9ce43d6168bcc82d8e5204c8f545707fa7a',
  //   contractInterface: kaliDaoABI
  // })

  useEffect(() => {
    async function fetchData() {
      const chainId = await getDaoChain(daoAddress)
      setDaoChain(chainId)
    }
    fetchData();
  }, [daoAddress])

  console.log(daoChain)

  return (
    <>
      
    </>
  );
}
