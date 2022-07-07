import { Outlet } from "react-router-dom";
import { Box, Flex, Text, Spacer, VStack } from "@chakra-ui/react";
function AssignmentHeader(props) {
  const { assignment } = props;
  return (
    <Box
      // as="button"
      w="100%"
      bg="white"
      borderRadius={"md"}
      minHeight={"10rem"}
      display={{ base: "flex", md: "flex" }}
    >
      <VStack spacing="0" m="3" w="full" display="flex">
        <Flex w="full" align={"center"}>
          <Text color="gray.700" variant="large">
            {assignment.assignmentName}
          </Text>
          <Text
            color="gray.500"
            variant="medium"
            pl="3"
            pt="1"
            display={{ base: "none", md: "flex" }}
          >
            ({assignment.courseDepartment} {assignment.courseNumber}{" "}
            {assignment.courseName})
          </Text>
          <Spacer />
          <Text color="gray.700" variant="large">
            ${assignment.price}
          </Text>
        </Flex>
        <Flex w="full" display={{ base: "flex", md: "none" }}>
          <Text color="gray.500" fontSize={"sm"}>
            ({assignment.courseNumber} {assignment.courseName})
          </Text>
          <Spacer />
        </Flex>
        <Flex w="full">
          <Text color="gray.500" fontSize={"sm"}>
            Deadline: {new Date(assignment.assignmentDeadline).toLocaleString()}
          </Text>
          <Spacer />
        </Flex>
        <Spacer />
        {props.children}
      </VStack>
    </Box>
  );
}

export default AssignmentHeader;
