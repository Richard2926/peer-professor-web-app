import {
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    Box,
    Center,
    HStack,
    Text,
    useToast,
    VStack,
    Input,
    InputGroup,
    InputLeftElement,
    InputRightElement,
    List,
    Link,
    ListItem,
    Flex,
    Spacer,
    IconButton,
  } from "@chakra-ui/react";
  import { useDisclosure } from "@chakra-ui/react";
  import { useState } from "react";
  import {
    FiBook,
    FiDollarSign,
    FiGlobe,
    FiPlusCircle,
    FiSearch,
  } from "react-icons/fi";
  import { connect } from "react-redux";
  import {
    clearCreateSuggestions,
    getCourses,
    createAssignment,
    clearCreate,
  } from "redux/actions/createAssignment";
  import { DateTimePickerComponent } from "@syncfusion/ej2-react-calendars";
  import FileUpload from "components/shared/FileUpload";
  import { useEffect } from "react";
  import { applyAssignment, clearApply } from "redux/actions/apply";
  import { FiEye } from "react-icons/fi";
  import HelperOnboard from "components/shared/HelperOnboard";
  import { useRef } from "react";
  
  function ViewAssignment(props) {
    const { assignment, isLoading, dispatch, onClose, isOpen, isApply} = props;
    
    return (
      <Modal
        onClose={onClose}
        isOpen={isOpen}
        isCentered
        preserveScrollBarGap={true}
        scrollBehavior="inside"
        size="3xl"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <VStack spacing={1}>
              <Center>
                <Text variant="large">{assignment.assignmentName}</Text>
              </Center>

              <Center>
                <Text color="gray.400" fontSize={"sm"}>
                  Request By:{" "}
                  <Link color="primary.900" href={("/home/user/" + assignment.creatorUsername)} isExternal>
                    {assignment.creatorUsername}
                  </Link>
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
                  {new Date(assignment.assignmentDeadline).toLocaleString()}
                </Text>
              </Center>
            </VStack>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack>
              <Flex w="full" align={"center"}>
                <Text color="gray.600" variant="large" fontWeight={"bold"}>
                  Description :
                </Text>
              </Flex>
              <Flex w="full" pb="3" pl="3">
                <Text color="gray.700" fontSize={"sm"}>
                  {assignment.assignmentDescription}
                </Text>
                <Spacer />
              </Flex>
              <Flex w="full" align={"center"}>
                <Text color="gray.600" variant="large" fontWeight={"bold"}>
                  {assignment.milestones.length} Milestones (${assignment.price}
                  ):
                </Text>
              </Flex>
              {assignment.milestones.map((milestone) => {
                return (
                  <Flex w="full" key={milestone.title} pl="2">
                    <Box
                      w="full"
                      bg="gray.100"
                      borderRadius={"md"}
                      display={{ base: "flex", md: "flex" }}
                    >
                      <VStack spacing="0" m="3" w="full" display="flex">
                        <Flex w="full" align={"center"}>
                          <Text color="gray.700" variant="large">
                            {milestone.title}
                          </Text>
                          <Spacer />
                          <Text color="gray.700" variant="large">
                            ${milestone.price}
                          </Text>
                        </Flex>
                        <Flex w="full">
                          <Text color="gray.500" fontSize={"sm"}>
                            Deadline:{" "}
                            {new Date(milestone.deadline).toLocaleString()}
                          </Text>
                          <Spacer />
                        </Flex>
                        <Spacer />
                        <Flex w="full" pt="4">
                          <Text color="gray.700" fontSize={"sm"}>
                            {milestone.description}
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
                  <Flex w="full" align={"center"}>
                    <Text color="gray.600" variant="large" fontWeight={"bold"}>
                      Homework Files :
                    </Text>
                  </Flex>
                  {assignment.files64.map((file, index) => {
                    return (
                      <Flex w="full" key={file.id} pl="2">
                        <Box
                          w="100%"
                          borderWidth="1px"
                          borderRadius="md"
                          bg="gray.100"
                        >
                          <Flex>
                            <Center pl="3">
                              <Text color="gray.700" variant="small">
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
          </ModalBody>
          <ModalFooter>
            {isApply && (
              <Flex w="full">
                <Spacer />
                <Button
                  variant="explore"
                  isLoading={isLoading}
                  onClick={(e) => {
                    dispatch(applyAssignment(assignment.assignmentID));
                  }}
                >
                  Apply
                </Button>
              </Flex>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  }
  
  export default ViewAssignment;
  