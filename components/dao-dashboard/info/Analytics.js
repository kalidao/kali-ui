import React from 'react'
import { Flex, Text } from '../../../styles/elements'
import { Spinner } from '../../elements'
import Info from '../../../styles/Info';
import { useRouter } from 'next/router'
import { getProposals } from '../../../graph/queries';
import { getMembers } from '../../../graph/queries';
import { useEffect, useState } from 'react';

export default function Engagement({ info }) {

    const router = useRouter();
    const daoChain = Number(router.query.chainId);
    const daoAddress = router.query.dao;

    //this is the number of votes that each of the current members have cast
    const [countedProposalVotes, setCountedProposalVotes] = useState(0);
    //this is the number of proposals that members have skipped
    const [missedProposalVotes, setMissedProposalVotes] = useState(0);
    //this is the number of proposals that members have voted on
    const [pastProposalCount, setPastProposalCount] = useState(0);
    const [currentProposalCount, setCurrentProposalCount] = useState(0);

    
    const fetchData = async () => {
        const proposals = await getProposals(daoChain, daoAddress);
        const members = await getMembers(daoChain, daoAddress);
        let pastProposals = 0;
        let currentProposals = 0;
        for(const proposal of proposals.data.daos[0].proposals) {

            if(proposal.status) {
                pastProposals++;
            } else {
                currentProposals++;
            }
            setPastProposalCount(pastProposals);
            setCurrentProposalCount(currentProposals);
        }

        let countedProposalVotes = 0;
        let missedProposalVotes = 0;

        for(const member of members.data.daos[0].members) {
            for(const proposal of proposals.data.daos[0].proposals) {
                if(proposal.status !== null) {
                    let found = false;
                    for(const vote of proposal.votes) {
                        if(vote.voter === member.address.toLowerCase()) {
                            found = true;
                        }
                    }
                    if(!found) {
                        missedProposalVotes++;
                    } else {
                        countedProposalVotes++;
                    }
                }
            }
        }
        setCountedProposalVotes(countedProposalVotes);
        setMissedProposalVotes(missedProposalVotes)
    }

    useEffect(() => {
        fetchData();
    }, []);


    return (
        <Info heading="Analytics">
        {info ? (
            <Flex gap="md" dir="col">
                <Flex gap="md" align="separate">
                    <Text>Current Proposals</Text>
                    <Text>
                        {currentProposalCount}
                    </Text>
                </Flex>
                <Flex gap="md" align="separate">
                    <Text>Past Proposals</Text>
                    <Text>
                        {pastProposalCount}
                    </Text>
                </Flex>
                <Flex gap="md" align="separate">
                    <Text>Member Vote Rate</Text>
                    <Text>
                        {(countedProposalVotes / (countedProposalVotes+missedProposalVotes))*100}%
                    </Text>
                </Flex>
            </Flex>
        ) : (
            <Spinner />
        )}
        </Info>
    )
}
