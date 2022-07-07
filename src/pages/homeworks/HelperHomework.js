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
  } from "@chakra-ui/react";
  import { motion } from "framer-motion";
  import { logout } from "redux/actions/auth";
  import { Link as ReachLink, useNavigate } from "react-router-dom";
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
  import { getHelperAssignments, getUserAssignments } from "redux/actions/assignment";
import ColoredStateButton from "./ColoredStateButton";
  import AssignmentHeader from "components/shared/AssignmentHeader";
import { getAppplicants } from "redux/actions/chat";

  function HelperHomework(props) {
    const {dispatch, assignments, isLoading, isError} = props;
    const [request, setRequest] = useState(true);

    const [activeApplications, updateActiveApplications] = useState([]);
    const [inprogressAssignments, updateInprogressAssignments] = useState([]);
    const [inactiveAssignments, updateInactiveAssignments] = useState([]);

    const navigate = useNavigate();

    const makeRequest = () => {
      dispatch(getHelperAssignments());
    };
  
    useEffect(() => {
      if (request) {
        makeRequest();
        setRequest(false);
      }
    }, [request]);

    useEffect(() => {
      let temp = [];
      temp = assignments.filter((assignment) => {
        return (assignment.isActive && assignment.helperID == null)
      });
      updateActiveApplications(temp);

      temp = [];
      temp = assignments.filter((assignment) => {
        return (assignment.isActive && assignment.helperID !== null)
      });
      updateInprogressAssignments(temp);
      
      temp = [];
      temp = assignments.filter((assignment) => {
        return (!assignment.isActive)
      });
      updateInactiveAssignments(temp);
      
    }, [assignments]);

    return (
      <Flex justifyContent={"center"} w="100%">
        <VStack w="100%" pb="5rem">
          <VStack spacing="4" pt="1rem" w="90%" pb="4">
            {isError && (
              <Alert status="error">
                <AlertIcon />
                Hmmm. There was an error while getting your homeworks, please
                try again !
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
              {assignments.length === 0 && (
                  <Alert status="info">
                    <AlertIcon />
                    Your Applications and posts you help with will be here !
                  </Alert>
                )}
                {activeApplications.map((assignment) => {
                  return (
                    <AssignmentHeader
                      assignment={assignment}
                      key={assignment.assignmentID}
                    >
                      <Flex w="full" pt="4">
                        <Spacer />
                        <Button
                          variant="outline"
                          mr="4"
                          borderColor={"green.300"}
                          color="green.300"
                          onClick={() => {
                            navigate(assignment.assignmentID.toString());
                          }}
                        >
                          Chat with Requestor
                        </Button>
                        <ColoredStateButton
                          assignment={assignment}
                          dispatch={dispatch}
                          text="Active Application"
                          bg="green.300"
                          hoverBg={"green.500"}
                        />
                      </Flex>
                    </AssignmentHeader>
                  );
                })}
                {inprogressAssignments.map((assignment) => {
                  return (
                    <AssignmentHeader assignment={assignment} 
                    key={assignment.assignmentID}>
                    <Flex w="full" pt="4">
                      <Spacer />
                      <Button
                        variant="outline"
                        mr="4"
                        borderColor={"yellow.400"}
                        color="yellow.400"
                        onClick={() => {
                          navigate(assignment.assignmentID.toString());
                        }}
                      >
                        Chat with Requestor
                      </Button>
                        <ColoredStateButton
                          assignment={assignment}
                          dispatch={dispatch}
                          text="In Progress"
                          bg="yellow.400"
                          hoverBg={"yellow.600"}
                        />
                      </Flex>
                    </AssignmentHeader>
                  );
                })}

{inactiveAssignments.map((assignment) => {
                  return (
                    <AssignmentHeader assignment={assignment} 
                    key={assignment.assignmentID}>
                      <Flex w="full" pt="4">
                        <Spacer />
                        <Button
                          variant="outline"
                          mr="4"
                          borderColor={"primary.900"}
                          color="primary.900"
                          onClick={() => {
                            navigate(assignment.assignmentID.toString());
                          }}
                        >
                          Chat
                        </Button>
                        <ColoredStateButton
                          assignment={assignment}
                          dispatch={dispatch}
                          text="Completed"
                          bg="primary.900"
                          hoverBg={"primary.900"}
                        />
                      </Flex>
                    </AssignmentHeader>
                  );
                })}
              </>
            )}
          </VStack>
        </VStack>
      </Flex>
    );
  }
  
  function mapStateToProps(state) {
    return {
      isLoading: state.assignment.isLoading,
      isError: state.assignment.isError,
      assignments: state.assignment.assignments,
    };
  }
  
  export default connect(mapStateToProps)(HelperHomework);
    