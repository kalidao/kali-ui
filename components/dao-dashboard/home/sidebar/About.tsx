import Link from "next/link";
import {
  Avatar,
  ButtonCard,
  Heading,
  Stat,
  Skeleton,
  Stack,
  SkeletonGroup,
} from "@kalidao/reality";
import { ethers } from "ethers";
import { useBalance, useContractReads } from "wagmi";
import DAO_ABI from "@abi/KaliDAO.json";

type Props = {
  address: string;
  chainId: string;
};

const About = ({ address, chainId }: Props) => {
  const contract = {
    addressOrName: address,
    contractInterface: DAO_ABI,
    chainId: Number(chainId),
  };
  const {
    data: reads,
    isLoading: isLoadingReads,
    isFetched,
  } = useContractReads({
    contracts: [
      {
        ...contract,
        functionName: "name",
      },
      {
        ...contract,
        functionName: "proposalCount",
      },
    ],
  });
  const { data: balance, isLoading: isLoadingBalance } = useBalance({
    addressOrName: address,
    chainId: Number(chainId),
    watch: true,
  });

  return (
    <Link
      href={{
        pathname: "/daos/[chainId]/[dao]/info",
        query: {
          dao: address,
          chainId: chainId,
        },
      }}
      passHref
    >
      <ButtonCard
        buttonText="Learn More"
        prefix={<Avatar label={"DAO Image"} address={address} placeholder />}
        as="a"
      >
        <Stack>
          <Skeleton loading={!isFetched}>
            <Heading>{reads?.[0]}</Heading>
          </Skeleton>
          <Skeleton loading={!isFetched}>
            <Stat
              label={"Proposals"}
              value={
                reads &&
                ethers.BigNumber.isBigNumber(reads?.[1]) &&
                ethers.utils.formatUnits(ethers.BigNumber.from(reads?.[1]), 0)
              }
            />
          </Skeleton>
          <Skeleton loading={isLoadingBalance}>
            <Stat
              label={"Balance"}
              value={`${
                balance
                  ? Number(
                      ethers.utils.formatUnits(balance.value, balance.decimals)
                    ).toFixed(2)
                  : ""
              } ${balance ? balance?.symbol : ""}`}
            />
          </Skeleton>
        </Stack>
      </ButtonCard>
    </Link>
  );
};

export default About;
