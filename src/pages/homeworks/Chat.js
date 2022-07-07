import {
    Box,
    Flex,
    Text,
    Center,
    Input,
    InputGroup,
    InputLeftElement,
    HStack,
    Spacer,
    Button,
    Select,
    VStack,
    IconButton,
    Wrap,
    WrapItem,
    List,
    ListItem,
    Spinner,
    Alert,
    AlertIcon,
    useToast,  
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    UnorderedList,
    Textarea,
    useDisclosure
  } from "@chakra-ui/react";
import { useEffect } from "react";
import { Route, useParams } from "react-router-dom";
import { getAssignmentData, getChatData } from "redux/actions/chat";
import { connect } from "react-redux";
import { sendMessage } from "redux/actions/chat";
import { FiLock, FiSearch, FiUnlock } from "react-icons/fi";
import { useState } from "react";
import React from "react";
import FileUpload from "components/shared/FileUpload";
import Message from "components/shared/Message";
import LockMessage from "components/shared/LockMessage";

function Chat(props) {
  const {
    dispatch,
    isLoading,
    isLoadingMore,
    isError,
    assignment,
    fromID,
    helperMode,
    more,
    messages,
    user,
  } = props;

  const [files, updateFiles] = useState([]);
  const [text, setText] = useState("");
  const [waitForMilestone, setWaitForMilestone] = useState(null);

  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (fromID !== undefined) {
      dispatch(getChatData(assignment.assignmentID, fromID, 0, user.id));
    }
  }, [fromID]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  const messagesEndRef = React.createRef();

  const scrollToBottom = () => {
    if (messages.current !== null) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const send = () => {
    if (text.trim() === "" && files.length === 0) return;
    dispatch(
      sendMessage({
        assignmentID: assignment.assignmentID,
        recipientID: fromID,
        text: text,
        fileBase64: files,
        waitForMilestone: waitForMilestone,
      })
    );
    setText("");
    updateFiles([]);
    scrollToBottom();
    setWaitForMilestone(null);
  };
  return fromID === undefined ? (
    <Flex
      w="100%"
      h={{ base: "70vh", md: "77vh" }}
      bg="white"
      borderRadius={"md"}
      direction="column"
    >
      <Spacer />
      <Flex w="full">
        <Spacer />
        <Center w={{ base: "50%", md: "40%" }}>
          <Alert status="info" borderRadius={"md"}>
            <AlertIcon />
            Pick an Applicant To Chat with them !
          </Alert>
        </Center>
        <Spacer />
      </Flex>
      <Spacer />
    </Flex>
  ) : (
    <Flex
      w="full"
      h={{ base: "70vh", md: "77vh" }}
      bg="white"
      borderRadius={"md"}
      direction="column"
    >
      <Flex
        direction="column"
        pl={4}
        pr={2}
        pt={2}
        overflowY="scroll"
        h="full"
        mb="2"
      >
        {messages.map((message, index) => {
          return fromID === message.sender_id ? (
            <Flex key={index} my="0.5">
              <Message
                color="gray.100"
                message={message}
                milestones={assignment.milestones}
                userID={user.id}
                dispatch={dispatch}
              />
              <Spacer />
            </Flex>
          ) : (
            <Flex key={index} my="0.5">
              <Spacer />
              <Message
                color="blue.100"
                message={message}
                milestones={assignment.milestones}
                userID={user.id}
              />
            </Flex>
          );
        })}
        <div ref={messagesEndRef} />
      </Flex>
      <Spacer />
      <Flex px="4" pb="4" align="end" direction={{ base: "column", sm: "row" }}>
        <VStack
          w={{ base: "100%", sm: "30%" }}
          pr={{ base: "0", sm: "4" }}
          pb={{ base: "4", sm: "0" }}
        >
          <FileUpload
            files64={files}
            onFilesChange={(files) => {
              updateFiles(files);
              scrollToBottom();
            }}
          />
        </VStack>
        <Flex w="full">
        {user.id === assignment.helperID && <><IconButton
            size={"md"}
            mr="4"
            onClick={onOpen}
            variant={waitForMilestone == null ? "outline" : "explore"}
            icon={waitForMilestone == null ? <FiUnlock /> : <FiLock />}
          />
           <LockMessage
            isOpen={isOpen}
            onClose={onClose}
            milestones={assignment.milestones}
            current={waitForMilestone == null ? assignment.milestones[0].id: waitForMilestone}
            lock={(id) => setWaitForMilestone(id)}
          /></>}
          <InputGroup pr="4">
            <Input
              type="tel"
              placeholder="Send a message . . ."
              fontFamily="monospace"
              fontSize={{ base: "md", md: "md" }}
              onChange={(e) => {
                setText(e.target.value);
              }}
              value={text}
            />
          </InputGroup>
          <Button
            variant={"outline"}
            onClick={(e) => {
              e.preventDefault();
              send();
            }}
          >
            Send
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
}

function mapStateToProps(state) {
  return {
    helperMode: state.auth.helperMode,
    isLoading: state.chat.chatLoading,
    isLoadingMore: state.chat.chatLoadingMore,
    isError: state.chat.chatError,
    assignment: state.chat.assignment,
    more: state.chat.more,
    messages: state.chat.messages,
    user: state.auth.user
  };
}

export default connect(mapStateToProps)(Chat);