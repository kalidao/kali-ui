import { Flex } from "../../styles/elements";

export default function Display({ daos }) {
    return <Flex>
        {daos.map(dao => <Flex key={dao?.id}>
            {dao?.name}
        </Flex>)}
    </Flex>
}