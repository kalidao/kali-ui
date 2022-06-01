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
    const [chain, setChain] = useState();
    
    useEffect(async () => {
        const res = await getDaoChain(dao["id"])
        setChain(res)
    }, [])
    console.log(chain)
    return <Box 
            as="a" 
            href={`../daos/${chain}/${dao["id"]}`} 
            variant="card"
            >
        <Name>{dao["token"]["name"]}</Name>
        {dao["members"] != undefined && <Name>{dao["members"].length} Members</Name>}
        <Address>{truncateAddress(dao["id"])}</Address>
    </Box>
};

