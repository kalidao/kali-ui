import { styled } from "../../styles/stitches.config";
import { truncateAddress } from "../../utils/formatters";
import { Box } from "../../styles/elements";

const Card = styled('a', {
    background: '$background',
    color: '$foreground',
    width: '250px',
    height: '300px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '0.2rem',
    boxShadow: '3px 4px 5.5px #fff',
    borderRadius: '16px',
    lineHeight: '100%',

    textDecoration: 'none',

    '&:hover': { 
        backgroundColor: '$foreground',
        color: '$background',
        boxShadow: '3px 4px 5.5px #08FF08',
    },
});

export const Name = styled('div', {
    // TODO: Add font Monument Grotesk
    fontWeight: '700',
    size: '64px',
    lineHeight: '100%',
   
});


export default function DaoCard({ dao }) {
    console.log('dao', dao)
    return <Card href={`../daos/${dao["id"]}`}>
        <Name>{dao["token"]["name"]}</Name>
        <Box css={{ fontSize: '16px'}}>{truncateAddress(dao["id"])}</Box>
    </Card>
};

