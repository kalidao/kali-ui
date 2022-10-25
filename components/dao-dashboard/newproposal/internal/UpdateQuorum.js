import React, { useState } from 'react'
import { useContractRead, useContractWrite } from 'wagmi'
import { Warning } from '../../../../styles/elements'
import { Label } from '../../../../styles/form-elements'
import DAO_ABI from '../../../../abi/KaliDAO.json'
import { useRouter } from 'next/router'
import { AddressZero } from '@ethersproject/constants'
import Back from '../../../../styles/proposal/Back'
import { useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import styles from '../../../editor'
import Editor from '../../../editor'
import { createProposal } from '../utils/'
import ChainGuard from '@components/dao-dashboard/ChainGuard'
import { FieldSet, Text, Input, Button, Stack, Box } from '@kalidao/reality'

export default function UpdateQuorum({ setView }) {
  const router = useRouter()
  const { dao, chainId } = router.query
  const [content, setContent] = useState()
  const [title, setTitle] = useState(null)
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        HTMLAttributes: {
          class: styles.editor,
        },
      }),
    ],
    content: '',
    injectCSS: false,
  })
  const { data: currentQuorum } = useContractRead({
    addressOrName: dao ? dao : AddressZero,
    contractInterface: DAO_ABI,
    functionName: 'quorum',
    chainId: Number(chainId),
  })

  const {
    isSuccess: isProposeSuccess,
    isError: isProposeError,
    isLoading: isProposePending,
    write: propose,
  } = useContractWrite({
    mode: 'recklesslyUnprepared',
    addressOrName: dao ? dao : AddressZero,
    contractInterface: DAO_ABI,
    functionName: 'propose',
  })

  // form
  const [quorum, setQuorum] = useState(null)
  const [warning, setWarning] = useState(null)

  // TODO: Popup to change network if on different network from DAO
  const submit = async (e) => {
    if (!propose || !dao || !chainId) return
    if (quorum === 0) {
      setWarning('Participation must be greater than 0')
      return
    }

    e.preventDefault()

    let docs
    try {
      docs = await createProposal(dao, chainId, 5, title, content)
    } catch (e) {
      console.error(e)
      setWarning('There was an error in submitting this proposal.')
      return
    }

    console.log('Proposal Params - ', 5, docs, [AddressZero], [quorum], [Array(0)])

    if (quorum) {
      try {
        const tx = propose({
          recklesslySetUnpreparedArgs: [
            5, // QUORUM prop
            docs,
            [AddressZero],
            [quorum],
            [Array(0)],
          ],
        })
        console.log('tx', tx)
      } catch (e) {
        console.log('error', e)
      }
    } else {
      setWarning('Please set a quorum.')
    }
  }

  return (
    <Box width={'full'}>
      <Stack>
        <Box width={'full'}>
          <Stack>
            <Label>Title</Label>
            <Input
              name="id"
              maxLength={30}
              placeholder={'Proposal for...'}
              onChange={(e) => setTitle(e.target.value)}
              css={{
                minWidth: '39vw',
              }}
            />
            <Box width={'full'}>
              <Label>Description (Optional)</Label>
              <Editor setContent={setContent} />
            </Box>
          </Stack>
        </Box>

        <FieldSet
          legend="Update Participation Percentage"
          description="This will create a proposal to update participation percentage"
        >
          <Input
            label="Participation"
            description={`Current participation percentage: ${currentQuorum ? currentQuorum : 'fething...'}%`}
            name="amount"
            type="number"
            inputMode="decimal"
            placeholder="51"
            suffix="%"
            min={0}
            value={quorum}
            onChange={(e) => setQuorum(Number(e.target.value))}
          />
        </FieldSet>
        {warning && <Warning warning={warning} />}
        <Stack direction={'horizontal'} justify={'space-between'}>
          <Back onClick={() => setView(0)} />

          <ChainGuard>
            <Button
              center
              variant="primary"
              onClick={submit}
              loading={isProposePending}
              disabled={!propose || isProposePending || isProposeSuccess}
            >
              {isProposePending ? 'Submitting...' : 'Submit'}
            </Button>
            <Text>
              {isProposeSuccess ? 'Proposal submitted on chain!' : isProposeError && `Error submitting proposal`}
            </Text>
          </ChainGuard>
        </Stack>
      </Stack>
    </Box>
  )
}
