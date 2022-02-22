import React, { useState, useEffect, useRef } from "react";
import {
  Button,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  FormControl,
  FormLabel,
  Input,
  DrawerFooter,
  Stack,
  useDisclosure,
  Textarea,
  Select,
  VStack,
  Link,
  Text,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { PDFDownloadLink, usePDF } from "@react-pdf/renderer";
import DelawareOAtemplate from "../legal/DelawareOAtemplate";
import DelawareInvestmentClubTemplate from "../legal/DelawareInvestmentClubTemplate";
import DelawareUNAtemplate from "../legal/DelawareUNAtemplate";
import WyomingOAtemplate from "../legal/WyomingOAtemplate";
import SwissVerein from "../legal/SwissVerein";
import fleek from "@fleekhq/fleek-storage-js";


function UploadDoc() {
    const [instance, updateInstance] = usePDF({ document: DelawareInvestmentClubTemplate("hi", "hi")})

    const upload = async () => {
        const input = {
          apiKey: process.env.NEXT_PUBLIC_FLEEK_API_KEY,
          apiSecret: process.env.NEXT_PUBLIC_FLEEK_API_SECRET,
          bucket: "f4a2a9f1-7442-4cf2-8b0e-106f14be163b-bucket",
          key: instance.url,
          data: instance,
          httpUploadProgressCallback: (event) => {
            console.log(Math.round((event.loaded / event.total) * 100) + "% done");
          },
        };
    
        try {
          const result = await fleek.upload(input);
          console.log("Image hash from Fleek: " + result.hash);
    
          return metadata;
          value.setLoading(false);
        } catch (e) {
          console.log(e);
        }
      };

    useEffect(() => {
        upload()
    }, )

    return (
    <>
      Hello
    </>
  );
}

export default UploadDoc;
