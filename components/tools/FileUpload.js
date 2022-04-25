import React, { useState } from 'react';
import { Button, VStack } from '@chakra-ui/react';

const FileUploader = (props) => {
  const [hasFile, setHasFile] = useState(false);
  const hiddenFileInput = React.useRef(null);

  const handleClick = (e) => {
    hiddenFileInput.current.click();
  };
  const handleChange = (e) => {
    const fileUploaded = e.target.files[0];
    props.setFile(fileUploaded);
    setHasFile(true);
  };
  return (
    <>
      {hasFile ? (
        <VStack align={"flex-end"}>
          <Button color={"green.500"} border="0" variant={"ghost"} h={"35px"} onClick={handleClick}>
            Got it!
          </Button>
          <input
            style={{ width: "30px", display: "none" }}
            type="file"
            ref={hiddenFileInput}
            onChange={handleChange}
          />
        </VStack>
      ) : (
        <VStack align={"flex-end"}>
          <Button className="hollow-btn" h={"35px"} onClick={handleClick}>
            Upload
          </Button>
          <input
            style={{ width: "30px", display: "none" }}
            type="file"
            ref={hiddenFileInput}
            onChange={handleChange}
          />
        </VStack>
      )}
    </>
  );
};

export default FileUploader;