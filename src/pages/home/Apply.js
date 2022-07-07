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
import ViewAssignment from "components/shared/ViewAssignment";

function Apply(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { assignment, isLoading, dispatch, isError, error} = props;

  useEffect(() => {
    if (isError) {
      if (error.status == 452) {
        onClose();
        dispatch(clearApply());
      }
    }
  }, [isError]);

  return (
    <>
      <Button variant="explore" onClick={onOpen}>
        Apply Now
      </Button>
      <ViewAssignment assignment={assignment} isApply={true} isOpen={isOpen} onClose={onClose} isLoading={isLoading} dispatch={dispatch}/>
    </>
  );
}

function mapStateToProps(state) {
  return {
    isLoading: state.apply.isLoading,
    isError: state.apply.isError,
    error: state.apply.error,
  };
}

export default connect(mapStateToProps)(Apply);
