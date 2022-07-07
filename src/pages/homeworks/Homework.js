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
  Switch,
  FormControl,
  FormLabel
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { logout } from "redux/actions/auth";
import { Link as ReachLink } from "react-router-dom";
import { FiBook, FiPlusCircle, FiX } from "react-icons/fi";
import {
  autoComplete,
  clearSuggestions,
  getAssignments,
} from "redux/actions/explore";
import { connect } from "react-redux";
import { FiSearch } from "react-icons/fi";
import { useState, useEffect } from "react";
import CreateAssignment from "components/shared/CreateAssignment";
import Apply from "../home/Apply";
import HelperOnboard from "components/shared/HelperOnboard";
import { useDisclosure } from "@chakra-ui/react";
import { clearApply } from "redux/actions/apply";
import StudentHomework from "./StudentHomework";
import { switchMode } from "redux/actions/auth";
import HelperHomework from "./HelperHomework";
import { clearAssignmentsError } from "redux/actions/assignment";

function Homework(props) {
  const {dispatch, helperMode} = props;

  return (
    <VStack>
      <Center mt="2rem">
        <FormControl display="flex" alignItems="center">
          <FormLabel htmlFor="helper-mode" mb="0">
            <Text>
            Someone Help Me!
            </Text>
          </FormLabel>
          <Switch isChecked={helperMode} id="helper-mode" mt={1} onChange={(e) => {
            dispatch(clearAssignmentsError())
            dispatch(switchMode(!helperMode))}}/>
          <FormLabel htmlFor="helper-mode" mb="0" ml={4}>
            <Text>
            I want to Help!
            </Text>
          </FormLabel>
        </FormControl>
      </Center>
      {helperMode && <HelperHomework dispatch={dispatch} />}
      {!helperMode && <StudentHomework dispatch={dispatch} />}
    </VStack>
  );
}

function mapStateToProps(state) {
  return {
    helperMode: state.auth.helperMode
  };
}

export default connect(mapStateToProps)(Homework);
  