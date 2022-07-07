import React, { useRef, useState } from "react";
import { Button, Box, Flex, Text, Spacer, IconButton, Center, useToast } from "@chakra-ui/react";
import { FiDelete, FiTrash } from "react-icons/fi";

const FileUpload = (props) => {

  const fileInputRef = useRef();
  // const [files64, updateFiles] = useState([]);
  const toast = useToast();
  
  const {files64} = props;
  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file)
      fileReader.onload = () => {
        resolve(fileReader.result);
      }
      fileReader.onerror = (error) => {
        reject(error);
      }
    })
  }

  const uploadFile = async (event) => {

    const files = event.target.files;
    if (files.length + files64.length > 4) {
        toast({
            position: "bottom-left",
            title: "File limit exceeded",
            description: "You can only upload a maximum of 4 files!",
            status: "warning",
            duration: 3000,
            isClosable: true,
          });
        return;
    }
    let temp = [];

    for (let i = 0; i < files.length; i++) {
        const base64 = await convertBase64(files[i]);
        temp = [...temp, {name: files[i].name, base64: base64}];
    }

    temp = [...files64, ...temp];
    // updateFiles(temp);
    props.onFilesChange(temp);
  };
  return (
    <>
      {files64.map((file) => {
        return (
          <Box
            w="100%"
            borderWidth="1px"
            borderRadius="md"
            key={files64.indexOf(file)}
          >
            <Flex>
              <Center pl="3">
                <Text>{file.name}</Text>
              </Center>
              <Spacer />
              <IconButton
                onClick={() => {
                    // updateFiles((old) => old.filter(x => x !== file));
                    props.onFilesChange((files64.filter(x => x !== file)));
                }}
                aria-label="Remove File"
                variant="delete"
                icon={<FiTrash />}
              />
            </Flex>
          </Box>
        );
      })}
      <Button
        variant="outline"
        onClick={() => fileInputRef.current.click()}
        w="full"
      >
        Upload File/s ({files64.length}/4)
      </Button>
      <input
        onChange={(e) => uploadFile(e)}
        multiple={true}
        ref={fileInputRef}
        type="file"
        hidden
        accept=".jpeg, .png, .pdf"
      />
    </>
  );
}

export default FileUpload;