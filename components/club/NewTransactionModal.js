import React, { useState } from 'react'
import Menu from "./Menu";
import SendAssets from "./SendAssets";
import CallContract from "./CallContract";

export default function NewTransactionModal() {
  const [visible, setVisible] = useState(0);

  const views = [
    <Menu setVisible={setVisible} />,
    <SendAssets />,
    <CallContract />
  ]
  return (
    <>
      {views[visible]}
    </>
  )
}
