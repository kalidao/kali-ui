import { VictoryPie, VictoryLabel, VictoryTooltip } from 'victory'
import { ethers } from 'ethers'

export default function Pie({ member, totalSupply }) {
  const share = member && parseInt(ethers.utils.formatEther(ethers.BigNumber.from(member?.shares)))
  const supply =
    totalSupply &&
    member &&
    parseInt(ethers.utils.formatEther(ethers.BigNumber.from(totalSupply).sub(ethers.BigNumber.from(member?.shares))))

  return (
    <>
      {totalSupply && member && (
        <VictoryPie
          style={{ labels: { fill: 'white' } }}
          innerRadius={100}
          labelRadius={120}
          labels={({ datum }) => `${datum.x}`}
          labelComponent={<CustomLabel />}
          data={[
            { x: 'Member', y: share },
            { x: 'Total Supply', y: supply },
          ]}
        />
      )}
    </>
  )
}

function CustomLabel(props) {
  return (
    <g>
      {/* <VictoryLabel {...props}/> */}
      <VictoryTooltip
        {...props}
        x={200}
        y={250}
        orientation="top"
        pointerLength={0}
        cornerRadius={50}
        flyoutWidth={100}
        flyoutHeight={100}
        flyoutStyle={{ fill: 'black' }}
      />
    </g>
  )
}

CustomLabel.defaultEvents = VictoryTooltip.defaultEvents
