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
  Textarea,
  Radio,
  Stack,
  RadioGroup
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
import ViewAssignment from "components/shared/ViewAssignment";
import { useDispatch } from "react-redux";
import { report } from "redux/actions/report";

function Report(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const toast = useToast();
  const [text, setText] = useState("");
  const [reportTypeID, setReportTypeID] = useState(1);
  const { isLoading, isError, isSuccess, username, toStudentID } = props;

  useEffect(() => {
    if (isSuccess) {
      toast({
        position: "bottom-left",
        title: "Reported",
        description: "Your case is under review and we will try to address it ASAP",
        status: "success",
        duration: 4000,
        isClosable: true,
      });
      onClose();
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      toast({
        position: "bottom-left",
        title: "Ouch!",
        description:
          "Looks like we ran into an issue, please try again",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
  }, [isError]);

  const report_now = () => {
    if (text.trim() === "") return;
    dispatch(
      report({
        reportTypeID,
        toStudentID,
        text,
      })
    );
  };

  return (
    <>
      <Button variant="plain" onClick={onOpen}>
        Report
      </Button>
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
                <Text variant="large">Report {username}</Text>
              </Center>
            </VStack>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack>
              <Textarea
                align="center"
                placeholder="Please describe the issue with as much context as you can . . ."
                w="95%"
                mt="5"
                resize="vertical"
                fontFamily={"monospace"}
                onChange={(e) => setText(e.target.value)}
              />
              <Flex w="85%" pt="5">
                <RadioGroup
                  defaultValue="1"
                  onChange={(type) => setReportTypeID(type)}
                >
                  <Stack>
                    <Radio value="1">
                      <Text>Spam</Text>
                    </Radio>

                    <Radio value="2">
                      <Text>Did not give correct homework</Text>
                    </Radio>

                    <Radio value="3">
                      <Text>Plagirized work</Text>
                    </Radio>

                    <Radio value="4">
                      <Text>Bullying or harassment</Text>
                    </Radio>

                    <Radio value="5">
                      <Text>Other</Text>
                    </Radio>
                  </Stack>
                </RadioGroup>
                <Spacer />
              </Flex>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Flex w="full">
              <Spacer />
              <Button
                variant="outline"
                isLoading={isLoading}
                onClick={report_now}
              >
                Report
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
    isLoading: state.report.isLoading,
    isError: state.report.isError,
    isSuccess: state.report.isSuccess,
  };
}

export default connect(mapStateToProps)(Report);
