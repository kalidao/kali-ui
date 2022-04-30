import { styled } from "../../../styles/stitches.config"
import { truncateAddress } from "../../../utils/formatters";

const Card = styled('a', {
    background: '$lightgray',
    width: '250px',
    height: '300px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '0.2rem',
    borderRadius: '16px'
});

export const Name = styled('div', {
    // TODO: Add font Monument Grotesk
    fontWeight: '700',
    size: '24px',
    lineHeight: '100%',
    color: '$black'
});

const Address = styled('div', {
    // TODO: Add font Px Grotesk
    fontSize: '16px',
    lineHeight: '100%',
    color: '$black'
});

export default function DaoCard({ dao }) {
    console.log('dao', dao)
    return <Card href={`../daos/${dao["id"]}`}>
        {/* Image */}
        <Name>{dao["token"]["name"]}</Name>
        <Address>{truncateAddress(dao["id"])}</Address>
    </Card>
};

