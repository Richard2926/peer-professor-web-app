import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  Image,
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
} from "@chakra-ui/react";
import { useEffect } from "react";
import { Route, useParams } from "react-router-dom";
import { clearChat, getAssignmentData } from "redux/actions/chat";
import { connect } from "react-redux";
import Chat from "./Chat";
import { useState } from "react";
import { FiArrowDown, FiX, FiEye } from "react-icons/fi";
import ViewAssignment from "components/shared/ViewAssignment";
import { useDisclosure } from "@chakra-ui/react";
import ConfirmAction from "components/shared/ConfirmAction";
import { acceptHelper, clearHelper } from "redux/actions/helper";
import { useNavigate } from "react-router-dom";

function ChatWrapper(props) {
  const {
    dispatch,
    isLoading,
    isError,
    assignment,
    applicants,
    helperMode,
    fromDataServer,
    acceptError,
    acceptSuccess,
    acceptLoading
  } = props;
  const { homeworkID } = useParams();
  const [fromData, setfromData] = useState();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const {
    isOpen: isConfirmOpen,
    onOpen: onOpenConfirm,
    onClose: onCloseConfirm,
  } = useDisclosure();

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(clearChat());
    dispatch(getAssignmentData(homeworkID));
  }, []);

  useEffect(() => {
    setfromData(fromDataServer);
  }, [assignment]);

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);

    if (query.get("success")) {
      toast({
        position: "bottom-left",
        title: "Success",
        description: "You can also review/report the helper now via their profile!",
        status: "success",
        duration: 4000,
        isClosable: true,
      });
    }

    if (query.get("cancelled")) {
      toast({
        position: "bottom-left",
        title: "Cancelled",
        status: "warning",
        duration: 4000,
        isClosable: true,
      })
    }
  }, []);

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const applicant_username = query.get("applicant");
    if (applicants === undefined) return;
    for (const applicant of applicants) {
      if (applicant.helperUsername === applicant_username) {
        setfromData({
          username: applicant.helperUsername,
          id: applicant.helperID,
          pendingApplicationID:
            applicant.pendingApplicationID,
        });
      }
    }
  }, [applicants]);

  useEffect(()=> {
    if(acceptError) {
      dispatch(clearHelper());
      toast({
        position: "bottom-left",
        title: "Sorry!",
        description: "Looks like we ran into an issue, please try again later!",
        status: "error",
        duration: 4000,
        isClosable: true,
      })
    } 
    if (acceptSuccess) {
      dispatch(clearHelper());
      toast({
        position: "bottom-left",
        title: "Hooray!",
        description: "You now have a helper for this assignment!",
        status: "success",
        duration: 4000,
        isClosable: true,
      });
      dispatch(getAssignmentData(homeworkID));
    }
    onCloseConfirm()
  }, [acceptError, acceptSuccess])

  return (
    <Flex justifyContent={"center"}>
      <VStack w="100%">
        <VStack spacing="4" pt="1rem" w="95%" pb="4">
          {isError && (
            <Alert status="error">
              <AlertIcon />
              Hmmm. There was an error while getting this homework, please try
              again !
            </Alert>
          )}
          {isLoading && !isError && (
            <Box pt="3rem">
              {" "}
              <Spinner size="xl" color="primary.900" />{" "}
            </Box>
          )}
          {!isLoading && !isError && (
            <>
              <Flex w="100%">
                <Flex direction={{ base: "column", md: "row" }}>
                  <Menu>
                    <MenuButton
                      disabled={helperMode || assignment.helperID !== null}
                      as={Button}
                      textTransform="none"
                      color="black"
                      bg="white"
                      rightIcon={<FiArrowDown color="black" />}
                      minH="6vh"
                    >
                      {fromData !== undefined ? (
                        <Flex>
                          <Image
                            boxSize="2rem"
                            borderRadius="full"
                            src={"https://cataas.com/cat/says/" + fromData.username}
                            mr="12px"
                          />
                          <Center>
                            <Text variant="small" fontWeight={"normal"}>
                              {fromData.username}
                            </Text>
                          </Center>
                        </Flex>
                      ) : (
                        <Center>
                          <Text variant="small" fontWeight={"normal"}>
                            Pick an Applicant
                          </Text>
                        </Center>
                      )}
                    </MenuButton>
                    {!(helperMode || assignment.helperID !== null) && (
                      <MenuList>
                        {applicants.map((applicant) => {
                          return (
                            <MenuItem
                              key={applicant.helperID}
                              minH="48px"
                              onClick={() => {
                                if (fromData?.id !== applicant.helperID) {
                                  dispatch(clearChat());
                                  setfromData({
                                    username: applicant.helperUsername,
                                    id: applicant.helperID,
                                    pendingApplicationID:
                                      applicant.pendingApplicationID,
                                  });
                                }
                              }}
                            >
                              <Image
                                boxSize="2rem"
                                borderRadius="full"
                                src={"https://cataas.com/cat/says/" + applicant.helperUsername}
                                alt="Fluffybuns the destroyer"
                                mr="12px"
                              />
                              <Center>
                                <Text variant="small" fontWeight={"normal"}>
                                  {applicant.helperUsername}
                                </Text>
                              </Center>
                            </MenuItem>
                          );
                        })}
                      </MenuList>
                    )}
                  </Menu>
                  {fromData && (
                    <Button
                      variant={"plain"}
                      onClick={() => window.open("/home/user/" + fromData.username)}
                      minH="6vh"
                      ml={{ base: "0", md: "2" }}
                      mt={{ base: "2", md: "0" }}
                      pt="4"
                    >
                      View Profile
                    </Button>
                  )}
                </Flex>
                <Spacer />

                <Flex direction={{ base: "column", md: "row" }}>

                <Button
                      ml={{ base: "0", md: "2" }}
                      mt={{ base: "0", md: "0" }}
                    variant={"plain"}
                    onClick={onOpen}
                    display={{ base: "flex", md: "none" }}
                    minH="6vh"
                  >
                    Details
                  </Button>
                  {applicants?.length > 0 && fromData && (
                    <Button
                      variant={"plain"}
                      onClick={onOpenConfirm}
                      minH="6vh"
                      ml={{ base: "0", md: "2" }}
                      mt={{ base: "2", md: "0" }}
                      pt="4"
                    >
                      Accept {fromData?.username}
                    </Button>
                  )}
                </Flex>
              </Flex>
              <ConfirmAction
                isOpen={isConfirmOpen}
                onClose={onCloseConfirm}
                isLoading={acceptLoading}
                confirm={() => {
                  dispatch(acceptHelper(fromData?.pendingApplicationID));
                }}
                question={
                  "You are about to accept " +
                  fromData?.username +
                  " for " +
                  assignment.assignmentName +
                  ". NOTE: All other applicants will be rejected"
                }
              />
              <ViewAssignment
                assignment={assignment}
                isApply={false}
                isOpen={isOpen}
                onClose={onClose}
                dispatch={dispatch}
              />
              <Flex w="100%">
                <Chat fromID={fromData?.id} dispatch={dispatch} />
                <Box
                  w="40%"
                  h="77vh"
                  bg="white"
                  ml="5"
                  borderRadius={"md"}
                  display={{ base: "none", md: "block" }}
                >
                  <Flex direction="column" h="full">
                    <VStack spacing={1} pt={3}>
                      <Center>
                        <Text variant="medium">
                          {assignment.assignmentName}
                        </Text>
                      </Center>

                      <Center>
                        <Text color="gray.400" fontSize={"sm"}>
                          Course: {assignment.courseDepartment}{" "}
                          {assignment.courseNumber} {assignment.courseName}
                        </Text>
                      </Center>
                      <Center>
                        <Text color="gray.400" fontSize={"sm"}>
                          Deadline:{" "}
                          {new Date(
                            assignment.assignmentDeadline
                          ).toLocaleString()}
                        </Text>
                      </Center>
                      <Flex w="100%" pl={4} pt={5}>
                        <Text
                          color="gray.600"
                          variant="medium"
                          fontWeight={"bold"}
                        >
                          {assignment.milestones.length} Milestones ($
                          {assignment.price}
                          ):
                        </Text>
                        <Spacer />
                      </Flex>
                      {assignment.milestones.map((milestone) => {
                        return (
                          <Flex w="full" key={milestone.title} px="2">
                            <Box
                              w="full"
                              bg={
                                milestone.completed ? "green.100" : "gray.100"
                              }
                              borderRadius={"md"}
                              display={{ base: "flex", md: "flex" }}
                            >
                              <VStack spacing="0" m="3" w="full" display="flex">
                                <Flex w="full" align={"center"}>
                                  <Text color="gray.700" variant="sm">
                                    {milestone.title}
                                  </Text>
                                  <Spacer />
                                  <Text color="gray.700" variant="sm">
                                    ${milestone.price}
                                  </Text>
                                </Flex>
                                <Flex w="full" pt="2">
                                  <Text color="gray.500" fontSize={"xs"}>
                                    Deadline:{" "}
                                    {new Date(
                                      milestone.deadline
                                    ).toLocaleString()}
                                  </Text>
                                  <Spacer />
                                </Flex>
                              </VStack>
                            </Box>
                            <Spacer />
                          </Flex>
                        );
                      })}

                      {assignment.files64.length > 0 && (
                        <>
                          <Flex w="100%" pl={4} pt={5}>
                            <Text
                              color="gray.600"
                              variant="medium"
                              fontWeight={"bold"}
                            >
                              Homework Files:
                            </Text>
                            <Spacer />
                          </Flex>
                          {assignment.files64.map((file, index) => {
                            return (
                              <Flex w="full" key={file.id} px="2">
                                <Box
                                  w="100%"
                                  borderWidth="1px"
                                  borderRadius="md"
                                  bg="gray.100"
                                >
                                  <Flex>
                                    <Center pl="3">
                                      <Text color="gray.700" variant="xs">
                                        {file.name}
                                      </Text>
                                    </Center>
                                    <Spacer />
                                    <IconButton
                                      m="2"
                                      onClick={() => {
                                        window.open(file.url, "_blank");
                                      }}
                                      aria-label="Remove File"
                                      variant="outline"
                                      icon={<FiEye />}
                                    />
                                  </Flex>
                                </Box>
                                <Spacer />
                              </Flex>
                            );
                          })}
                        </>
                      )}
                    </VStack>
                    <Spacer />
                    <Button variant="outline" onClick={onOpen} m={4}>
                      Full Assignment Details
                    </Button>
                  </Flex>
                </Box>
              </Flex>
            </>
          )}
        </VStack>
      </VStack>
    </Flex>
  );
}

function mapStateToProps(state) {
  return {
    isLoading: state.chat.initLoading,
    isError: state.chat.initError,
    assignment: state.chat.assignment,
    applicants: state.chat.applicants,
    fromDataServer: state.chat.fromDataServer,
    helperMode: state.auth.helperMode,
    acceptLoading: state.helper.acceptLoading,
    acceptSuccess: state.helper.acceptSuccess,
    acceptError: state.helper.acceptError,
  };
}

export default connect(mapStateToProps)(ChatWrapper);
