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
    outline: 'solid 0.25em #000',
    boxShadow: 'inset .313em .313em 0 rgba(0,0,0,0.4), inset -.313em -.313em 0 rgba(255,255,255,0.4), 0 1em 0.625em -.4em rgba(0,0,0,0.8)',
    transition: 'linear .1s',
    lineHeight: '100%',
    textDecoration: 'none',

    '&:hover': { 
        background: '$foreground',
        color: '$background',
        boxShadow: 'inset .313em .313em 0 rgba(0,0,0,0.8), inset -.313em -.313em 0 rgba(255,255,255,0.6), 0 1em 0.625em -.4em rgba(255,255,255,0.8)',
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

