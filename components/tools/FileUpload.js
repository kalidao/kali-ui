import React, { useState } from 'react';
import { Button, Flex } from '../../styles/elements';
import { UploadIcon } from '@radix-ui/react-icons';

const FileUploader = (props) => {
  const [hasFile, setHasFile] = useState(false);
  const hiddenFileInput = React.useRef(null);

  const handleClick = (e) => {
    e.preventDefault()
    hiddenFileInput.current.click();
  };
  const handleChange = (e) => {
    e.preventDefault()
    const fileUploaded = e.target.files[0];
    props.setFile(fileUploaded);
    setHasFile(true);
  };
  return (
    <>
      {hasFile ? (
        <Flex align="end">
          <Button>
            Got it!
          </Button>
          <input
            style={{ width: "30px", display: "none" }}
            type="file"
            ref={hiddenFileInput}
            onChange={handleChange}
          />
        </Flex>
      ) : (
        <>
          <Button variant="transparent" onClick={handleClick}>
            Upload <UploadIcon /> 
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