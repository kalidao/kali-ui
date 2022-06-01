import React from 'react'
import { Spinner } from "../../elements/";
import Extensions from './Extensions';
import Governance from './Governance';
import Meta from './Meta';
import Docs from "./Docs";
import { Box } from '../../../styles/elements';

export default function InfoComponent({ info }) {
  return (
    <div>
        {info === undefined ? <Spinner /> : 
        <Box css={{
          display: 'grid',
          gap: '1rem',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gridTemplateRows: 'auto',
          '@media (max-width: 640px)': {
            gridTemplateColumns: 'repeat(1, 1fr)',
            gridTemplateRows: 'auto',
            marginRight: '1rem'
          },
        }}>
            <Meta info={info} />
            <Governance info={info}/>
            <Extensions info={info} />
            <Docs info={info} />
        </Box>}
    </div>
  )
}
