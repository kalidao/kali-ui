import GiveTribute from "./GiveTribute"
import SendAssets from "./SendAssets";

export const proposals = {
    giveTribute: {
        title: "Give Tribute",
        component: <GiveTribute />,
      },
    send: {
      title: "Send Assets",
      component: <SendAssets />
    }
  }