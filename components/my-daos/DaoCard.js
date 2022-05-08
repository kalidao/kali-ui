import { styled } from "../../styles/stitches.config";
import { truncateAddress } from "../../utils/formatters";

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
    boxShadow: '3px 4px 5.5px #d2a8ff',
    borderRadius: '16px',
    lineHeight: '100%',

    textDecoration: 'none',

    '&:hover': { 
        backgroundColor: '$accent',
    },
});

export const Name = styled('div', {
    // TODO: Add font Monument Grotesk
    fontWeight: '700',
    size: '64px',
    lineHeight: '100%',
   
});

const Address = styled('div', {
    // TODO: Add font Px Grotesk
    fontSize: '16px',
    lineHeight: '100%',
});

export default function DaoCard({ dao }) {
    console.log('dao', dao)
    return <Card href={`../daos/${dao["id"]}`}>
        {/* Image */}
        <Name>{dao["token"]["name"]}</Name>
        <Address>{truncateAddress(dao["id"])}</Address>
    </Card>
};

