import { useRouter } from "next/router";
import { styled } from "../../styles/stitches.config";
import { truncateAddress } from "../../utils/formatters";
import { Box } from "../../styles/elements";
import { getDaoChain } from "../../utils";
import { useState, useEffect } from "react";


const Name = styled('div', {

})

const Address = styled('div', {
    fontFamily: 'Screen'
})

// disable when not active chain
export default function DaoCard({ dao }) {
    const router = useRouter()
    
    const gotoDAO = async () => {
        const chainId = await getDaoChain(dao["id"])
        if (chainId) {
            router.push(`/daos/${chainId}/${dao["id"]}`)
        }
    }
    
    return <Box 
            as="a" 
            // href={`../daos/${chain}/${dao["id"]}`} 
            variant="card"
            onClick={gotoDAO}
            >
        <Name>{dao["token"]["name"]}</Name>
        {dao["members"] != undefined && <Name>{dao["members"].length} Members</Name>}
        <Address>{truncateAddress(dao["id"])}</Address>
    </Box>
};

