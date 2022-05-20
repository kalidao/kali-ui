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
    border: '1px solid $gray800',
    boxShadow: 'rgba(242, 154, 13, 0.4) 5px 5px, rgba(242, 154, 13, 0.3) 10px 10px, rgba(242, 154, 13, 0.2)15px 15px, rgba(242, 154, 13, 0.1) 20px 20px, rgba(242, 154, 13, 0.05) 25px 25px',
    transition: 'linear 0.4s',
    lineHeight: '100%',
    textDecoration: 'none',

    '&:hover': { 
        background: '$background',
        color: '$foreground',
        border: '1px solid $gray800',
        boxShadow: 'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px',
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
        {dao["members"] != undefined && <Name>{dao["members"].length} Members</Name>}
        <Address>{truncateAddress(dao["id"])}</Address>
    </Card>
};

