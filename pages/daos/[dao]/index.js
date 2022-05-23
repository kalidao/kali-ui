import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { getDaoChain } from "../../../utils/";
import Layout from "../../../components/layout";
import { Dashboard } from "../../../components/dashboard/"
import { graph } from "../../../constants/graph";
import { useAccount } from "wagmi"
import updateAction from "../../../components/deploy-dao/updateAction"
import DaoContext from "../../../context/DaoContext";
import Sidebar from "../../../components/dashboard/sidebar";


export default function Dao() {
  // * get DAO address from route * //
  const router = useRouter();
  const daoAddress = router.query.dao;
  const [daoChain, setDaoChain] = useState(null);
  const { data: account } = useAccount();

  const [dao, setDao] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const chainId = await getDaoChain(daoAddress)
      setDaoChain(chainId)
    }
    fetchData();
  }, [daoAddress])

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await fetch(graph[daoChain], {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            query: `query {
                daos(where: {
                  id: "${daoAddress}"
                }) {
                  address
                  token {
                    id
                    name
                    symbol
                    paused
                    totalSupply
                  }
                  votingPeriod
                  gracePeriod
                  quorum
                  supermajority
                  docs
                  members {
                    address
                    shares
                  }
                  proposals {
                    id
                    proposer
                    proposalType
                    description
                    sponsor
                    sponsored
                    status
                    creationTime
                    votes {
                      voter
                      vote
                    }
                  }
                  redemption {
                    active
                    starts
                    redeemables
                    quit {
                      member {
                        address
                      }
                      amount
                    }
                  }
                  crowdsale {
                    version
                    active
                    listId
                    purchaseToken
                    purchaseMultiplier
                    purchaseLimit
                    saleEnds
                    details
                    amountPurchased
                    personalLimit
                    purchase {
                      purchaser
                      purchased
                    }
                  }
                  tribute {
                    active
                    proposal {
                      proposer
                      asset
                      isNFT
                      value
                      status
                    }
                  }
                }
              }`,
          }),
        }).then((res) => res.json());
        
        updateAction(result["data"]["daos"][0])
        setDao(result["data"]["daos"][0])
      } catch (e) {
        console.log('error', e);
      }
    }
    
    fetchData()
  }, [daoChain])

  return (
    <DaoContext.Provider
      value={{
        state: {
          dao: dao
        },
        setDao: setDao
      }
    }
    >
      <Layout heading={dao?.token?.name}>
        <Sidebar />
        <Dashboard dao={dao} />
      </Layout>
    </DaoContext.Provider>
  );
}
