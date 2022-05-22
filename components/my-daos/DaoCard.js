import { styled } from "../../styles/stitches.config";
import { truncateAddress } from "../../utils/formatters";
import { Box } from "../../styles/elements";


const Name = styled('div', {

})

const Address = styled('div', {
    fontFamily: 'Screen'
})

export default function DaoCard({ dao, props }) {
    return <Box 
            as="a" 
            href={`../daos/${dao["id"]}`} 
            {...props} 
            variant="card"
            >
        <Name>{dao["token"]["name"]}</Name>
        {dao["members"] != undefined && <Name>{dao["members"].length} Members</Name>}
        <Address>{truncateAddress(dao["id"])}</Address>
    </Box>
};

