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
    const { assignment, dispatch, text, bg, hoverBg} = props;
  
    return (
      <>
        <Button variant="explore" onClick={onOpen} bg={bg} _hover={{bg: hoverBg}}>
          {text}
        </Button>
        <ViewAssignment assignment={assignment} isOpen={isOpen} onClose={onClose} dispatch={dispatch} isApply={false}/>
      </>
    );
  }
  
  function mapStateToProps(state) {
    return {
        
    };
  }
  
  export default connect(mapStateToProps)(Apply);
  