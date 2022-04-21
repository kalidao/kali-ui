import React, { useState } from 'react';
import { Button, HStack } from '@chakra-ui/react';

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
        <HStack align={"flex-end"}>
          <Button color={"green"} border="0" variant={"ghost"} h={"35px"} onClick={handleClick}>
            ✅
          </Button>
          <input
            style={{ width: "30px", display: "none" }}
            type="file"
            ref={hiddenFileInput}
            onChange={handleChange}
          />
        </HStack>
      ) : (
        <>
          <Button className="upload-btn" h={"35px"} onClick={handleClick}>
            Upload
          </Button>
          <input
            style={{ width: "30px", display: "none" }}
            type="file"
            ref={hiddenFileInput}
            onChange={handleChange}
          />
        </>
      )}
    </>
  );
};

export default FileUploader;