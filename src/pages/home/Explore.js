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
  useToast
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
import Apply from "./Apply";
import HelperOnboard from "components/shared/HelperOnboard";
import { useDisclosure } from "@chakra-ui/react";
import { clearApply } from "redux/actions/apply";
import AssignmentHeader from "components/shared/AssignmentHeader";

function Explore(props) {
  const {
    assignments,
    isLoading,
    isError,
    dispatch,
    filters,
    isAutoLoading,
    suggestions,
    user,
    more,
    isLoadingMore,
    isApplyError,
    isApplySuccess,
    applyError
  } = props;
  const [sortType, setSort] = useState(filters.sortType);
  const [fullCourseNames, updateCourses] = useState(filters.fullCourseNames);
  const [departmentNames, updateDepartments] = useState(
    filters.departmentNames
  );
  const [course, setCourse] = useState("");

  const [request, setRequest] = useState(true);
  const [loadMore, setLoadMore] = useState(false);
  const toast = useToast();
  const {
    isOpen: onboardOpen,
    onOpen: onOpenOnboard,
    onClose: onCloseOnboard,
  } = useDisclosure();

  const makeRequest = (loadMore) => {
    dispatch(
      getAssignments({
        sortType,
        fullCourseNames,
        departmentNames,
        collegeID: user.college.id,
        offset: loadMore ? assignments.length : 0,
      })
    );
  };

  useEffect(() => {
    if (request || loadMore) {
      makeRequest(loadMore);
      setRequest(false);
      setLoadMore(false);
    }
  });

  useEffect(() => {
      if (isApplyError) {
        if (applyError.status == 452) {
          onOpenOnboard();
        } else {
          dispatch(clearApply());
          toast({
            position: "bottom-left",
            title: "Something went wrong :(",
            description: applyError?.data?.error,
            status: "error",
            duration: 4000,
            isClosable: true,
          });
        }
      }
      if (isApplySuccess) {
        dispatch(clearApply());
        toast({
          position: "bottom-left",
          title: "Applied!",
          description: "You can check your pending applications under 'Homeworks'",
          status: "success",
          duration: 4000,
          isClosable: true,
        });
      }
  }, [isApplyError, isApplySuccess]);

  return (
    <Flex justifyContent={"center"}>
      <VStack w="100%" pb="5rem">
        <CreateAssignment dispatch={dispatch} />
        <Box minH="5rem" w="90%" pt="1.75rem" pb="1rem">
          <Flex w="100%">
            <Text fontSize="3xl" fontWeight="bold">
              @{user.college.domain_name.split(".edu")[0]}
            </Text>
            <Spacer />
          </Flex>
        </Box>
        <Flex w="90%">
          <VStack w="100%">
            <InputGroup size="lg" w="full">
              <InputLeftElement
                pointerEvents="none"
                children={<FiSearch color="gray.300" />}
              />
              <Input
                disabled={isLoading}
                bg="white"
                type="tel"
                placeholder="MATH or MATH 4230"
                pt="1"
                fontFamily="monospace"
                fontSize={{ base: "sm", md: "md" }}
                borderRadius={"5"}
                onChange={(e) => {
                  setCourse(e.target.value);
                  dispatch(autoComplete(e.target.value));
                }}
                value={course}
              />
            </InputGroup>
            <List spacing={3} bg="white" w="100%" borderRadius={"5"}>
              {suggestions.map((suggestion) => (
                <ListItem
                  key={suggestion}
                  fontFamily="monospace"
                  fontSize={{ base: "sm", md: "md" }}
                  pl="2"
                  py="2"
                  _hover={{ bg: "gray.200" }}
                  as="button"
                  w="100%"
                  onClick={() => {
                    if (
                      fullCourseNames.includes(suggestion) ||
                      departmentNames.includes(suggestion)
                    )
                      return;
                    if (suggestion.split(" ").length > 1) {
                      updateCourses((old) => [...old, suggestion]);
                    } else {
                      updateDepartments((old) => [...old, suggestion]);
                    }
                    setCourse("");
                    dispatch(clearSuggestions());
                    setRequest(true);
                  }}
                >
                  <Flex>
                    <Text pl="2.5rem">{suggestion}</Text>
                    <Spacer />
                  </Flex>
                </ListItem>
              ))}
            </List>
            <Wrap w="100%" pt="2">
              {departmentNames.map((department) => (
                <WrapItem
                  key={department}
                  width="-moz-fit-content"
                  bg={"white"}
                  borderRadius="3xl"
                  py="2"
                  px={"5"}
                  mr="0.75rem"
                >
                  <HStack>
                    <Text variant="medium">{department}</Text>
                    <IconButton
                      disabled={isLoading}
                      size={"xs"}
                      bg="white"
                      color={"gray.700"}
                      borderRadius={"full"}
                      aria-label="Remove Department"
                      icon={<FiX />}
                      onClick={(e) => {
                        departmentNames.splice(
                          departmentNames.indexOf(department),
                          1
                        );
                        setRequest(true);
                      }}
                    />
                  </HStack>
                </WrapItem>
              ))}
              {fullCourseNames.map((course) => (
                <WrapItem
                  key={course}
                  width="-moz-fit-content"
                  bg={"white"}
                  borderRadius="3xl"
                  py="2"
                  px={"5"}
                  mr="0.75rem"
                >
                  <HStack>
                    <Text variant="medium">{course}</Text>
                    <IconButton
                      disabled={isLoading}
                      size={"xs"}
                      bg="white"
                      color={"gray.700"}
                      borderRadius={"full"}
                      aria-label="Remove Course"
                      icon={<FiX />}
                      onClick={(e) => {
                        fullCourseNames.splice(
                          fullCourseNames.indexOf(course),
                          1
                        );
                        setRequest(true);
                      }}
                    />
                  </HStack>
                </WrapItem>
              ))}
            </Wrap>
          </VStack>
        </Flex>
        <VStack spacing="4" pt="2rem" w="90%" pb="4">
          <Flex w="full">
            <Spacer />
            <Select
              value={sortType}
              onChange={(e) => {
                setSort(e.target.value);
                setRequest(true);
              }}
              bg="white"
              isFullWidth={false}
              width="-moz-fit-content"
              fontFamily="monospace"
              fontSize="sm"
              isDisabled={isLoading}
            >
              <option value={"LOW_TO_HIGH_PRICE"}>Price: Low to High</option>
              <option value={"HIGH_TO_LOW_PRICE"}>Price: High to Low</option>
            </Select>
          </Flex>
          {isError && (
            <Alert status="error">
              <AlertIcon />
              Hmmm. There was an error while getting homeworks, please try again
              !
            </Alert>
          )}
          {isLoading && !isError && (
            <Box pt="3rem">
              {" "}
              <Spinner size="xl" color="primary.900" />{" "}
            </Box>
          )}
          {!isLoading &&
            !isError &&
            assignments.map((assignment) => (
              <AssignmentHeader assignment={assignment} key={assignment.assignmentID}>
                <Flex w="full" pt="4">
                    <Text color="gray.700" fontSize={"sm"}>
                      {assignment.assignmentDescription}
                    </Text>
                    <Spacer />
                  </Flex>
                  <Flex w="full" pt="3">
                    <Spacer />
                    <Button variant="outline" mr="4">
                      View More
                    </Button>
                    <Apply assignment={assignment} dispatch={dispatch} />
                  </Flex>
              </AssignmentHeader>
            ))}
          {more && !isLoadingMore && (
            <Button variant="explore" onClick={() => setLoadMore(true)}>
              Load More
            </Button>
          )}
          {isLoadingMore && (
            <Box pt="3rem">
              {" "}
              <Spinner size="xl" color="primary.900" />{" "}
            </Box>
          )}
          {!isLoading && !isError && !more && (
            <Button variant="outline" disabled={true}>
              No More Posts
            </Button>
          )}
        </VStack>
        <HelperOnboard
          isOpen={onboardOpen}
          onClose={onCloseOnboard}
          dispatch={dispatch}
          edit={false}
        />
      </VStack>
    </Flex>
  );
}

function mapStateToProps(state) {
  return {
    isLoading: state.explore.isLoading,
    isError: state.explore.isError,
    isInitial: state.explore.isInitial,
    assignments: state.explore.assignments,
    filters: state.explore.filters,
    suggestions: state.explore.suggestions,
    isAutoLoading: state.explore.isAutoLoading,
    more: state.explore.more,
    isLoadingMore: state.explore.isLoadingMore,
    user: state.auth.user,
    isApplySuccess: state.apply.isSuccess,
    isApplyError: state.apply.isError,
    applyError: state.apply.error,
  };
}

export default connect(mapStateToProps)(Explore);