import { styled } from "../../styles/stitches.config";
import { truncateAddress } from "../../utils/formatters";
import { Box, Text } from "../../styles/elements";

const Card = styled(Box, {
    background: '$background',
    color: '$foreground',
    width: '180px',
    height: '180px',
    
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    
    gap: '1rem',
    boxShadow: '3px 4px 5.5px #fff',

    lineHeight: '100%',
    textDecoration: 'none',

    '&:hover': { 
        background: '$foreground',
        color: '$background',
        boxShadow: '3px 4px 5.5px #08FF08',
    },
});

const Name = styled('div', {

})

const Address = styled('div', {
    fontFamily: 'Screen'
})

export default function DaoCard({ dao, props }) {
    return <Card 
            as="a" 
            href={`../daos/${dao["id"]}`} 
            {...props} 
            >
        <Name>{dao["token"]["name"]}</Name>
        <Address>{truncateAddress(dao["id"])}</Address>
    </Card>
};

