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
  Textarea,
  IconButton,
  Wrap,
  WrapItem
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import { useState } from "react";
import {
  FiBook,
  FiDollarSign,
  FiGlobe,
  FiPlusCircle,
  FiRefreshCcw,
  FiSearch,
  FiX
} from "react-icons/fi";
import { connect } from "react-redux";
import {
  clearCreateSuggestions,
  getCourses
} from "redux/actions/createAssignment";
import { DateTimePickerComponent } from "@syncfusion/ej2-react-calendars";
import FileUpload from "components/shared/FileUpload";
import { useEffect } from "react";
import { becomeHelper, clearHelper, getOnboardLink } from "redux/actions/helper";

function HelperOnboard(props) {
  const {
    isOpen,
    onClose,
    dispatch,
    isLoading,
    isSuccess,
    isError,
    user,
    createSuggestions,
    edit,
    preBio,
    preHistory,
    onboardLink,
  } = props;

  const [bio, setBio] = useState("");
  const [courseHistory, updateCourseHistory] = useState([]);
  const [courseField, setCourseField] = useState("");
  const [override, setOverride] = useState(false);
  const toast = useToast();

  useEffect(() => {
    if (edit) {
      setBio(preBio);
      updateCourseHistory(preHistory);
    }
  }, [edit]);

  useEffect(()=> {
    if(isError) {
      dispatch(clearHelper());
      toast({
        position: "bottom-left",
        title: "Sorry!",
        description: "Looks like we ran into an issue, please try again later!",
        status: "error",
        duration: 4000,
        isClosable: true,
      })
    } 
    if (isSuccess) {
      dispatch(clearHelper());
      toast({
        position: "bottom-left",
        title: edit ? "Success" : "Welcome!",
        description: edit
          ? "Updated Your Profile"
          : "You are now a Designated Homework Helper :)",
        status: "success",
        duration: 4000,
        isClosable: true,
      });
      onClose()
    }
  }, [isError, isSuccess])

  const getLink = () => {
    dispatch(getOnboardLink())
  }

  useEffect(() => {
    if (onboardLink.url !== null) {
      window.open(onboardLink.url, "_self");
    }
  }, [onboardLink]);

 return (
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
           <Text variant="large">
             {edit ? "Edit Profile Details" : "Become a Helper!"}
           </Text>
         </Center>
       </ModalHeader>
       <ModalCloseButton />
       <ModalBody>
         <VStack>
           {!edit && (
             <Flex
               w="full"
               pl="2"
               pt="2"
               direction={{ base: "column", md: "row" }}
             >
               <Text variant={"medium"} pr="2" pt="2">
                 Your Payout Method:
               </Text>
               <Spacer />
               <Button
                 variant={user.payouts_enabled ? "plain" : "outline"}
                 isLoading={isLoading}
                 isDisabled={user.payouts_enabled}
                 onClick={getLink}
               >
                 {user.payouts_enabled ? "Connected" : "Connect Stripe"}
                 
               </Button>
             </Flex>
           )}
           <Flex w="full" pl="2" pt="2">
             <Text variant={"medium"} pr="2">
               Your Anonymous Alias:
             </Text>
             <Spacer />
           </Flex>
           <Box
             w="100%"
             borderWidth="1px"
             borderRadius="md"
             minH="2rem"
             display={"flex"}
           >
             <Flex align="center">
               <Center pl="3">
                 <Text color="gray.500">{user.username}</Text>
               </Center>
               <Spacer />
               {/* <IconButton
                 size="sm"
                 m="2"
                 aria-label="Remove File"
                 variant="outline"
                 icon={<FiRefreshCcw />}
               /> */}
             </Flex>
           </Box>
           <Flex w="full" pl="2" pt="2">
             <Text variant={"medium"} pr="2">
               Bio:
             </Text>
             <Spacer />
           </Flex>
           <Textarea
             fontFamily="monospace"
             fontSize={{ base: "xs", md: "xs" }}
             placeholder="I have a solid background in math and I can help with upper level . . ."
             size="sm"
             resize={"vertical"}
             value={bio}
             onChange={(e) => setBio(e.target.value)}
           />
           <Flex w="full" pl="2" pt="2">
             <Text variant={"medium"} pr="2">
               Course History:
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
             {createSuggestions.map((suggestion, index) => (
               <ListItem
                 key={index}
                 fontFamily="monospace"
                 fontSize={{ base: "xs", md: "xs" }}
                 pl="2"
                 py="2"
                 _hover={{ bg: "gray.300" }}
                 as="button"
                 w="100%"
                 onClick={() => {
                   const contains = courseHistory.some((course) => {
                     if (course.course_id === suggestion.course_id) {
                       return true;
                     }
                   });
                   if (contains) return;
                   updateCourseHistory((old) => [...old, suggestion]);
                   setCourseField("");
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
           <Wrap w="100%" pt="2">
             {courseHistory.map((course, index) => (
               <WrapItem
                 key={index}
                 width="-moz-fit-content"
                 bg={"gray.200"}
                 borderRadius="3xl"
                 py="2"
                 px={"5"}
                 mr="0.75rem"
               >
                 <HStack>
                   <Text variant="medium" fontSize={{ base: "xs", md: "xs" }}>
                     {course.text}
                   </Text>
                   <IconButton
                     disabled={isLoading}
                     size={"xs"}
                     bg="white"
                     color={"black"}
                     borderRadius={"full"}
                     aria-label="Remove Course"
                     icon={<FiX />}
                     onClick={(e) => {
                       let temp = [];
                       for (let i in courseHistory) {
                         if (courseHistory[i].course_id !== course.course_id) {
                           temp = [...temp, courseHistory[i]];
                         }
                       }
                       updateCourseHistory(temp);
                     }}
                   />
                 </HStack>
               </WrapItem>
             ))}
           </Wrap>
         </VStack>
       </ModalBody>
       <ModalFooter>
         <Flex w="full">
           <Spacer />
           <Button
             variant="explore"
             isDisabled={bio.trim() === "" || !user.payouts_enabled}
             isLoading={isLoading && user.payouts_enabled}
             onClick={(e) => {
               bio.trim();
               let courseHistoryIds = courseHistory.map((course) => {
                 return course.course_id;
               });
               dispatch(
                 becomeHelper({
                   bio,
                   courseHistoryIds,
                 })
               );
             }}
           >
             {edit ? "Save Changes" : "Join Peer Professor"}
           </Button>
           <Spacer />
         </Flex>
       </ModalFooter>
     </ModalContent>
   </Modal>
 );
}

function mapStateToProps(state) {
  return {
    isLoading: state.helper.isLoading,
    isSuccess: state.helper.isSuccess,
    isError: state.helper.isError,
    onboardLink: state.helper.onboardLink,
    user: state.auth.user,
    createSuggestions: state.createAssignment.createSuggestions,
  };
}

export default connect(mapStateToProps)(HelperOnboard);