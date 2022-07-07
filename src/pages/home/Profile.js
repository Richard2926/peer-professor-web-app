import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import {
  Box,
  Flex,
  Text,
  VStack,
  Spinner,
  Alert,
  AlertIcon,
  Spacer,
  Heading,
  Avatar,
  Center,
  Image,
  Stack,
  Button,
  useColorModeValue,
  useToast,
  Wrap,
  WrapItem,
  HStack,
  Textarea
} from "@chakra-ui/react";
import { clear, getProfileData, reviewHelper } from "redux/actions/profile";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import AssignmentHeader from "components/shared/AssignmentHeader";
import Apply from "./Apply";
import HelperOnboard from "components/shared/HelperOnboard";
import { clearApply } from "redux/actions/apply";
import { useDisclosure } from "@chakra-ui/react";
import ReactStars from "react-rating-stars-component";
import Report from "components/shared/Report";
import { useNavigate } from "react-router-dom";
function Profile(props) {
  const { username } = useParams();
  const { user, isLoading, isError, profileData, applyError, isApplyError, isApplySuccess, isEditSuccess, reviewError } = props;
  const [request, setRequest] = useState(true);
  const dispatch = useDispatch();
  const isHelper = profileData.helper?.student_id !== undefined;
  const edit = (user.username === username && isHelper);
  const navigate = useNavigate();
  const [text, setText] = useState("");
  const [rating, setRating] = useState(0);

  const makeRequest = () => {
    dispatch(getProfileData(username));
  };

  const review = () => {
    if (text.trim() === "" || rating == 0) return;
    dispatch(reviewHelper({
      text, rating, helperID: profileData.helper?.student_id
    }, username))
  }

  const toast = useToast();

  const {
    isOpen: onboardOpen,
    onOpen: onOpenOnboard,
    onClose: onCloseOnboard,
  } = useDisclosure();

  useEffect(() => {
    if (request) {
      makeRequest();
      setRequest(false);
    }
  }, [request]);

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);

    if (query.get("onboard")) {
      onOpenOnboard()
    }
  }, []);

  useEffect(() => {
    if(edit) {
        setRequest(true)
    }
  }, [isEditSuccess])

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

useEffect(() => {
  if (reviewError !== null) {
    toast({
      position: "bottom-left",
      title: "Something went wrong :(",
      description: reviewError,
      status: "error",
      duration: 4000,
      isClosable: true,
    });
    dispatch(clear());
  }
}, [reviewError]);

  return (
    <Flex justifyContent={"center"} w="100%">
      <VStack w="100%" pb="5rem">
        <VStack spacing="4" pt="1rem" w="90%" pb="4">
          {isError && (
            <Alert status="error">
              <AlertIcon />
              Hmmm. There was an error while getting {username}'s profile.
              Please try again later!
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
              <Box
                // as="button"
                w="100%"
                bg="white"
                borderRadius={"md"}
                minHeight={"10rem"}
                display={{ base: "flex", md: "flex" }}
                flexDirection={"column"}
                overflow={"hidden"}
              >
                <Image
                  h={"120px"}
                  w={"full"}
                  src={
                    "https://www.chickensmoothie.com/oekaki/image/image.php?id=1182379&size=large&format=auto&rev=1348262230"
                  }
                  objectFit={"cover"}
                />
                <Flex justify={"center"} mt={-12} key={username}>
                  <Avatar
                    size={"xl"}
                    src={"https://cataas.com/cat/says/" + username}
                    alt={"Author"}
                    css={{
                      border: "2px solid white",
                    }}
                  />
                </Flex>
                <Box p={6} align="center">
                  <Stack spacing={0} align={"center"} mb={5}>
                    <Heading
                      fontSize={"2xl"}
                      fontWeight={500}
                      fontFamily={"body"}
                    >
                      {username}
                    </Heading>
                    <Text color={"gray.500"}>
                      Joined{" "}
                      {new Date(
                        profileData.student.created_at
                      ).toLocaleString()}
                    </Text>

                    {isHelper && (
                      <Text color={"gray.500"} pt={4}>
                        {profileData.helper.bio}
                      </Text>
                    )}
                  </Stack>

                  <Stack
                    direction={{ base: "column", md: "row" }}
                    justify={"center"}
                    spacing={6}
                  >
                    <Stack spacing={0} align={"center"}>
                      <Text fontWeight={600}>
                        {profileData.student.hangover_score}
                      </Text>
                      <Text fontSize={"sm"} color={"gray.500"}>
                        Hangover_Score
                      </Text>
                    </Stack>
                    <Stack spacing={0} align={"center"}>
                      <Text fontWeight={600}>
                        {profileData.student.completed_requests}
                      </Text>
                      <Text fontSize={"sm"} color={"gray.500"}>
                        Completed_Requests
                      </Text>
                    </Stack>
                    <Stack spacing={0} align={"center"}>
                      <Text fontWeight={600}>
                        {profileData.student.completed_homeworks}
                      </Text>
                      <Text fontSize={"sm"} color={"gray.500"}>
                        Completed_Homeworks
                      </Text>
                    </Stack>
                  </Stack>

                  <Wrap w="50%" pt="6">
                    {profileData.helper.courseHistory.map((course) => (
                      <WrapItem
                        key={course.text}
                        width="-moz-fit-content"
                        bg={"gray.100"}
                        borderRadius="3xl"
                        py="2"
                        px={"5"}
                        mr="0.75rem"
                      >
                        <HStack>
                          <Text variant="small">{course.text}</Text>
                        </HStack>
                      </WrapItem>
                    ))}
                  </Wrap>
                  {edit && (
                    <Flex w="100%">
                      <Button
                        variant="plain"
                        borderColor="primary.900"
                        onClick={() => window.open(profileData.helper.loginLink.url)}
                      >
                        Balance: ${profileData.helper.balance.toFixed(2)}
                      </Button>
                      <Spacer />
                      <Button
                        variant="plain"
                        borderColor="primary.900"
                        onClick={onOpenOnboard}
                      >
                        Edit
                      </Button>
                    </Flex>
                  )}
                  {user.username !== username && (
                    <Flex w="100%">
                      <Spacer />
                      <Report
                        toStudentID={profileData.student.id}
                        username={username}
                      />
                    </Flex>
                  )}
                </Box>
              </Box>
              {profileData.activeAssignments.length > 0 && (
                <>
                  <Box w="95%">
                    <Flex w="100%">
                      <Text fontSize="xl" fontWeight="bold">
                        Active Assignments:
                      </Text>
                      <Spacer />
                    </Flex>
                  </Box>
                  {profileData.activeAssignments.map((assignment) => (
                    <AssignmentHeader
                      assignment={assignment}
                      key={assignment.assignmentID}
                    >
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
                  ))}{" "}
                </>
              )}
              {isHelper && (
                <>
                  <Box w="95%">
                    <Flex w="100%">
                      <Text fontSize="xl" fontWeight="bold">
                        Reviews:
                      </Text>
                      <Spacer />
                    </Flex>
                  </Box>

                  <Box
                    w="100%"
                    bg="white"
                    borderRadius={"md"}
                    minHeight={"10rem"}
                    display={{ base: "flex", md: "flex" }}
                    flexDirection={"column"}
                    overflow={"hidden"}
                  >
                    <Flex w="100%">
                      <Spacer />
                      <Textarea
                        align="center"
                        placeholder="Write/Update Review"
                        w="95%"
                        mt="5"
                        resize="vertical"
                        fontFamily={"monospace"}
                        onChange={(e) => setText(e.target.value)}
                      />
                      <Spacer />
                    </Flex>

                    <Flex
                      w="full"
                      pt="4"
                      direction={{ base: "column", md: "row" }}
                    >
                      <Box mt="-1" pl="10">
                        <ReactStars
                          count={5}
                          onChange={(new_rating) => setRating(new_rating)}
                          size={30}
                          activeColor="#ffd700"
                        />
                      </Box>
                      <Spacer />
                      <Button variant="explore" mx="4" mb="4" onClick={review}>
                        Review
                      </Button>
                    </Flex>
                  </Box>

                  {profileData.helper.reviews.map((review, index) => (
                    <Box
                      key={index}
                      w="100%"
                      bg="white"
                      borderRadius={"md"}
                      display={{ base: "flex", md: "flex" }}
                      flexDirection={"column"}
                      overflow={"hidden"}
                    >
                      <Flex w="100%">
                        <Spacer />
                        <Textarea
                          align="center"
                          placeholder="Write/Update Review"
                          w="95%"
                          mt="5"
                          resize="vertical"
                          fontFamily={"monospace"}
                          disabled={true}
                          value={review.text}
                        />
                        <Spacer />
                      </Flex>

                      <Flex
                        w="full"
                        pt="4"
                        direction={{ base: "column", md: "row" }}
                      >
                        <Box mt="-1" pl="10">
                          <ReactStars
                            edit={false}
                            count={5}
                            value={review.rating}
                            size={30}
                            activeColor="#ffd700"
                          />
                        </Box>
                        <Spacer />
                        <Button
                          variant="plain"
                          mx="4"
                          mb="4"
                          onClick={() =>
                            window.open("/home/user/" + review.username)
                          }
                        >
                          - {review.username}
                        </Button>
                      </Flex>
                    </Box>
                  ))}
                </>
              )}
            </>
          )}
        </VStack>

        <HelperOnboard
          isOpen={onboardOpen}
          onClose={onCloseOnboard}
          dispatch={dispatch}
          edit={edit}
          preBio={profileData.helper?.bio}
          preHistory={profileData.helper?.courseHistory}
        />
      </VStack>
    </Flex>
  );
}

function mapStateToProps(state) {
  return {
    user: state.auth.user,
    isLoading: state.profile.isLoading,
    isError: state.profile.isError,
    profileData: state.profile.profileData,
    reviewError: state.profile.reviewError,
    isApplySuccess: state.apply.isSuccess,
    isApplyError: state.apply.isError,
    applyError: state.apply.error,
    isEditSuccess: state.helper.isSuccess,
  };
}

export default connect(mapStateToProps)(Profile);
