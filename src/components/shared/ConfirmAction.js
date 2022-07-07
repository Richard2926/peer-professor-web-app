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
  
  function ConfirmAction(props) {
    const { onClose, isOpen, question, confirm, isLoading } = props;
  
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
                  <Text variant="large">Are you sure?</Text>
                </Center>
              </VStack>
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                <Center>
                  <Text variant="large">{question}</Text>
                </Center>
            </ModalBody>
            <ModalFooter>
              <Flex w="full">
                <Spacer />
                <Button
                  variant="explore"
                  onClick={(e) => {
                    confirm()
                  }}
                  isLoading={isLoading}
                >
                  Confirm
                </Button>
              </Flex>
            </ModalFooter>
          </ModalContent>
        </Modal>
    );
  }
  
  export default ConfirmAction;
  