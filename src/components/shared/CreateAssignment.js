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
  ListItem,
  Flex,
  Spacer,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import { useState } from "react";
import { FiBook, FiDollarSign, FiGlobe, FiPlusCircle, FiSearch } from "react-icons/fi";
import { connect } from "react-redux";
import { clearCreateSuggestions, getCourses, createAssignment, clearCreate } from "redux/actions/createAssignment";
import { DateTimePickerComponent } from '@syncfusion/ej2-react-calendars';
import FileUpload from "components/shared/FileUpload";
import { useEffect } from "react";

function CreateAssignment(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const [course, setCourse] = useState("");
  const [courseField, setCourseField] = useState("");

  const [acceptByDate, setAcceptBy] = useState();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [milestoneName, setMilestoneName] = useState("");
  const [milestoneDescription, setMilestoneDescription] = useState("");
  const [milestoneDeadline, setMilestoneDeadline] = useState();
  const [price, setPrice] = useState("");

  const [milestones, updateMilestones] = useState([]);
  const [files, updateFiles] = useState([]);

  const { createSuggestions, isCreateAutoLoading, dispatch, isLoading, isSuccess, isError, user } = props;
  
  useEffect(() => {
    if (isSuccess) {
      dispatch(clearCreate());
      updateMilestones([]);
      onClose();
      toast({
        position: "bottom-left",
        title: "Assignment Posted!",
        description: "You can view applicants under 'Homeworks'",
        status: "success",
        duration: 4000,
        isClosable: true,
      })
    }
    if (isError) {
      dispatch(clearCreate());
      toast({
        position: "bottom-left",
        title: "Ouch!",
        description: "Looks like we ran into an issue, please check your inputs again",
        status: "error",
        duration: 4000,
        isClosable: true,
      })
    }
  });
  

  return (
    <>
      <Box
        w="90%"
        mt="8"
        as="button"
        to="homework"
        onClick={onOpen}
      >
        <Center
          bg="primary.900"
          minHeight={"8rem"}
          color="white"
          borderRadius={"md"}
          fontSize={"xl"}
        >
          <HStack>
            <FiPlusCircle />
            <Text variant="large">Post Homework</Text>
          </HStack>
        </Center>
      </Box>

      <Modal
        onClose={onClose}
        isOpen={isOpen}
        isCentered
        preserveScrollBarGap={true}
        scrollBehavior="inside"
        size="xl"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Center>
              <Text variant="large">Create a new Post!</Text>
            </Center>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<FiGlobe color="gray.300" />}
                />
                <Input
                  type="tel"
                  placeholder="Assignment Name"
                  fontFamily="monospace"
                  fontSize={{ base: "xs", md: "xs" }}
                  onChange={(e) => setName(e.target.value)}
                />
              </InputGroup>

              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<FiBook color="gray.300" />}
                />
                <Input
                  type="tel"
                  placeholder="Assignment Description"
                  fontFamily="monospace"
                  fontSize={{ base: "xs", md: "xs" }}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </InputGroup>
              <Flex w="full" pl="2" pt="2">
                <Text variant={"medium"} pr="2">
                  Accept By:
                </Text>
                <Spacer />
              </Flex>
              <Flex w="full">
                <Box w="100%" borderWidth="1px" borderRadius="md">
                  <Center>
                    <Box w="95%" m="0.5">
                      <DateTimePickerComponent
                        id="datetimepicker"
                        change={(e) => setAcceptBy(e.value)}
                      />
                    </Box>
                  </Center>
                </Box>
              </Flex>
              <Flex w="full" pl="2" pt="2">
                <Text variant={"medium"} pr="2">
                  Course:
                </Text>
                <Text variant={"medium"} color="primary.900">
                  {course.text}
                </Text>
                <Spacer />
              </Flex>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<FiSearch color="gray.300" />}
                />
                <Input
                  type="tel"
                  placeholder="CS 4001 or MATH 4230"
                  fontFamily="monospace"
                  fontSize={{ base: "xs", md: "xs" }}
                  onChange={(e) => {
                    setCourseField(e.target.value);
                    dispatch(getCourses(e.target.value));
                  }}
                  value={courseField}
                />
              </InputGroup>
              <List spacing={3} bg="gray.100" w="100%" borderRadius={"5"}>
                {createSuggestions.map((suggestion) => (
                  <ListItem
                    key={suggestion.course_id}
                    fontFamily="monospace"
                    fontSize={{ base: "xs", md: "xs" }}
                    pl="2"
                    py="2"
                    _hover={{ bg: "gray.300" }}
                    as="button"
                    w="100%"
                    onClick={() => {
                      setCourseField("");
                      setCourse(suggestion);
                      dispatch(clearCreateSuggestions());
                    }}
                  >
                    <Flex>
                      <Text pl="2rem">{suggestion.text}</Text>
                      <Spacer />
                    </Flex>
                  </ListItem>
                ))}
              </List>
              <Flex w="full" pl="2" pt="2">
                <Text variant={"medium"} pr="2">
                  Files:
                </Text>
                <Spacer />
              </Flex>
              <FileUpload files64={files} onFilesChange={(files) => updateFiles(files)} />
              <Flex w="full" pl="2" pt="2">
                <Text variant={"medium"}>Milestones:</Text>
                <Spacer />
              </Flex>
              {milestones.map((milestone) => {
                return (
                  <Box
                    w="100%"
                    bg="gray.100"
                    borderRadius={"md"}
                    minHeight={"10rem"}
                    key={milestone.title}
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
                      <Flex w="full" pt="3">
                        <Spacer />
                        <Button
                          variant="delete"
                          mr="4"
                          onClick={() => {
                            let newStones = milestones.filter(
                              (stone) => stone !== milestone
                            );
                            updateMilestones(newStones);
                          }}
                        >
                          Delete
                        </Button>
                      </Flex>
                    </VStack>
                  </Box>
                );
              })}
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<FiGlobe color="gray.300" />}
                />
                <Input
                  type="tel"
                  placeholder="Milestone Title"
                  fontFamily="monospace"
                  fontSize={{ base: "xs", md: "xs" }}
                  onChange={(e) => setMilestoneName(e.target.value)}
                  value={milestoneName}
                />
              </InputGroup>

              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<FiBook color="gray.300" />}
                />
                <Input
                  type="tel"
                  placeholder="Milestone description"
                  fontFamily="monospace"
                  fontSize={{ base: "xs", md: "xs" }}
                  onChange={(e) => setMilestoneDescription(e.target.value)}
                  value={milestoneDescription}
                />
              </InputGroup>
              <Flex w="full" pl="2" pt="2">
                <VStack w="full">
                  <Flex w="full">
                    <Text variant={"medium"} pr="2">
                      Milestone Deadline:
                    </Text>
                    <Spacer />
                  </Flex>
                  <Flex w="full">
                    <Box w="95%" borderWidth="1px" borderRadius="md">
                      <Center>
                        <Box w="95%" m="0.5">
                          <DateTimePickerComponent
                            id="datetimepicker"
                            change={(e) => setMilestoneDeadline(e.value)}
                          />
                        </Box>
                      </Center>
                    </Box>
                  </Flex>
                </VStack>
                <VStack w="full">
                  <Flex w="full">
                    <Text variant={"medium"} pr="2">
                      Milestone Price:
                    </Text>
                    <Spacer />
                  </Flex>
                  <Flex w="full">
                    <InputGroup>
                      <InputLeftElement
                        pointerEvents="none"
                        children={<FiDollarSign color="gray.300" />}
                      />
                      <Input
                        type="tel"
                        placeholder="USD"
                        fontFamily="monospace"
                        fontSize={{ base: "xs", md: "xs" }}
                        onChange={(e) => setPrice(e.target.value)}
                        value={price}
                      />
                    </InputGroup>
                  </Flex>
                </VStack>
                <Spacer />
              </Flex>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Flex w="full">
              <Button
                variant="explore"
                isDisabled={
                  milestoneDeadline == null ||
                  milestoneDescription === "" ||
                  milestoneName === "" ||
                  price < 3 ||
                  price == null 
                }
                onClick={(e) => {
                  updateMilestones([
                    ...milestones,
                    {
                      price,
                      title: milestoneName,
                      description: milestoneDescription,
                      deadline: milestoneDeadline.toString(),
                    },
                  ]);
                  setPrice("");
                  setMilestoneDeadline(null);
                  setMilestoneName("");
                  setMilestoneDescription("");
                }}
              >
                Add Milestone
              </Button>
              <Spacer />
              <Button
                variant="explore"
                isDisabled={
                  milestones.length < 1 ||
                  name === "" ||
                  description === "" ||
                  acceptByDate === null ||
                  course.text === ""
                }
                isLoading={isLoading}
                onClick={(e) => {
                  dispatch(createAssignment({
                    name,
                    description,
                    acceptByDate,
                    course_id: course.course_id,
                    files64: files,
                    milestones,
                    collegeID: user.college.id
                  }))
                }}
              >
                Post
              </Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

function mapStateToProps(state) {
  return {
    createSuggestions: state.createAssignment.createSuggestions,
    isCreateAutoLoading: state.createAssignment.isCreateAutoLoading,
    isLoading: state.createAssignment.isLoading,
    isSuccess: state.createAssignment.isSuccess,
    isError: state.createAssignment.isError,
    user: state.auth.user
  };
}

export default connect(mapStateToProps)(CreateAssignment);
