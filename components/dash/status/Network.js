import { NetworkBox, Dot } from '../../../styles/User'
import { getNetworkName } from "../../../utils/formatters";

export default function Network({ chainId }) {

  // TODO: Add Connecting state
  // TODO: Add Switch Network
  return (
    <>
      {chainId == null ? 
        <NetworkBox color="red">
          <Dot color="red" />Not Connected
        </NetworkBox> : 
        <NetworkBox color="green">
          <Dot color="green"/>{getNetworkName(chainId)}
        </NetworkBox>}
    </>
  );
}
