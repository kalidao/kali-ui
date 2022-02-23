import React, { useState, useEffect } from "react";
import { usePDF } from "@react-pdf/renderer";
import DelawareOAtemplate from "../legal/DelawareOAtemplate";
import DelawareInvestmentClubTemplate from "../legal/DelawareInvestmentClubTemplate";
import DelawareUNAtemplate from "../legal/DelawareUNAtemplate";
import WyomingOAtemplate from "../legal/WyomingOAtemplate";
import SwissVerein from "../legal/SwissVerein";
import fleek from "@fleekhq/fleek-storage-js";

export default function uploadDoc({ doc, inputs }) {
    const [instance, updateInstance] = usePDF({document: DelawareOAtemplate(inputs.name, inputs.chain)})

    console.log("uploadDoc", doc, inputs)
   
    const construct = () => {
        switch (doc) {
            case "0":
                
            case "1":
              setDelawareLlc({
                name: values.name,
                chain: values.chain,
              });
            case "2":
              setDelawareIc({
                name: values.name,
                chain: values.chain,
              });
            case "3":
                updateInstance(DelawareInvestmentClubTemplate(inputs.name, inputs.chain))
            case "4":
              setWyomingLlc({
                name: values.name,
                chain: values.chain,
              });
              setWyLlcForm(true);
            case "5":
              setSwissVerein({
                name: values.name,
                city: values.city,
                project: values.project,
                purpose: values.purpose,
              })
          }
    }

    useEffect(() =>{
        construct()
    })

//   const upload = async () => {
//     const input = {
//       apiKey: process.env.NEXT_PUBLIC_FLEEK_API_KEY,
//       apiSecret: process.env.NEXT_PUBLIC_FLEEK_API_SECRET,
//       bucket: "f4a2a9f1-7442-4cf2-8b0e-106f14be163b-bucket",
//       key: "hello",
//       data: instance.blob,
//       httpUploadProgressCallback: (event) => {
//         console.log(Math.round((event.loaded / event.total) * 100) + "% done");
//       },
//     };

//     try {
//       const result = await fleek.upload(input);
//       console.log("Image hash from Fleek: " + result.hash);
//     } catch (e) {
//       console.log(e);
//     }
//   };

    return <></>
}

