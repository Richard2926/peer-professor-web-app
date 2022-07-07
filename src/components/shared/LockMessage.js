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
    IconButton,
    RadioGroup,
    Radio,
    Stack
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
  
  function LockMessage(props) {
    const { onClose, isOpen, milestones, current, lock } = props;
    const [waitForMilestone, setWaitForMilestone] = useState(current + "");
    const toast = useToast();
    console.log(current);
    return (
      <Modal
        onClose={onClose}
        isOpen={isOpen}
        isCentered
        preserveScrollBarGap={true}
        scrollBehavior="inside"
        size="lg"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <VStack spacing={1}>
              <Center>
                <Text variant="large">
                  Lock the next message with a milestone?
                </Text>
              </Center>
              <Center pl="3">
                <Text color="gray.400" fontSize={"sm"}>
                  The recipient wont be able to view the message until they pay
                  for the milestone
                </Text>
              </Center>
            </VStack>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Center>
              <RadioGroup
                onChange={setWaitForMilestone}
                value={waitForMilestone}
              >
                <Stack direction="column">
                  {milestones.map((milestone) => {
                    return (
                      <Radio value={milestone.id + ""} colorScheme='red'>
                        <Text>{milestone.title + " $" + milestone.price}</Text>
                      </Radio>
                    );
                  })}
                </Stack>
              </RadioGroup>
            </Center>
          </ModalBody>
          <ModalFooter>
            <Flex w="full">
              <Button
                variant="outline"
                onClick={(e) => {
                  lock(null);
                  toast({
                    position: "bottom-left",
                    title: "UnLocked",
                    status: "success",
                    duration: 4000,
                    isClosable: true,
                  });
                  onClose();
                }}
              >
                Unlock
              </Button>
              <Spacer />
              <Button
                variant="explore"
                onClick={(e) => {
                  let title;
                  for (const milestone of milestones) {
                    if (milestone.id == waitForMilestone) {
                      title = milestone.title
                    }
                  }
                  lock(waitForMilestone);
                  toast({
                    position: "bottom-left",
                    title: "Locked",
                    description: "Next message will be locked with " + title,
                    status: "success",
                    duration: 4000,
                    isClosable: true,
                  });
                  onClose();
                }}
              >
                Lock
              </Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  }
  
  export default LockMessage;
  