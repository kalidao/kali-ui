import React from 'react'
import { Spinner } from "../../elements/";
import Extensions from './Extensions';
import Governance from './Governance';
import Meta from './Meta';
import Docs from "./Docs";
import { Box } from '../../../styles/elements';

export default function InfoComponent({ info }) {
  return (
    <Box css={{
      display: 'grid',
      gap: '3rem',
      minWidth: '90vw',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gridTemplateRows: 'auto',
      '@media (max-width: 640px)': {
        gridTemplateColumns: 'repeat(1, 1fr)',
        gridTemplateRows: 'auto',
        marginRight: '1rem',
        gap: '2rem',
      },
    }}>
        {info === undefined ? <Spinner /> : 
        (<>
          <Meta info={info} />
          <Governance info={info}/>
          <Extensions info={info} />
          <Docs info={info} />
        </>)}
    </Box>
  )
}
