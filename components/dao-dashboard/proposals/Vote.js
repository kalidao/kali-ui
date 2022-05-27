import React from 'react'
import { Box } from '../../../styles/elements'
import { BsFillHandThumbsUpFill, BsFillHandThumbsDownFill} from 'react-icons/bs'

export default function Vote({ proposal }) {
  return (
    <>
        <Box css={{
                  borderRadius: '100%',
                  padding: '0.2rem 0.3rem',
                  '&:hover': {
                    background: '$green800'
                  }
                }}>
            <BsFillHandThumbsUpFill color={'hsl(0, 0%, 90%)'}/>
        </Box>
        <Box css={{
            borderRadius: '100%',
            padding: '0.2rem 0.3rem',
            '&:hover': {
            background: '$red800'
            }
        }}>
            <BsFillHandThumbsDownFill color={'hsl(0, 0%, 90%)'} />
        </Box>
    </>
  )
}
