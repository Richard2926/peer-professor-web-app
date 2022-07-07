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
  Textarea,  
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
import { getBalanceData } from "redux/actions/balance";

function Balance(props) {
  const { isLoading, isError, balanceData } = props;
  const dispatch = useDispatch();
  const [request, setRequest] = useState(true);
  const makeRequest = () => {
    dispatch(getBalanceData());
  };
  useEffect(() => {
    if (request) {
      makeRequest();
      setRequest(false);
    }
  }, [request]);

  return (
    <Flex justifyContent={"center"} w="100%">
      <VStack w="100%" pb="5rem">
        <VStack spacing="4" pt="1rem" w="90%" pb="4">
          {isError && (
            <Alert status="error">
              <AlertIcon />
              Hmmm. There was an error while getting your balance! Please Try
              Again Later
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
                  <Box p={6} align="center">
                  <Stack spacing={10} align={"center"} mb={5} mt="5">
                    <Heading
                      fontSize={"5xl"}
                      fontWeight={'light'}
                      fontFamily={"monospace"}
                    >
                      Balance: ${balanceData.helper.balance}
                    </Heading>
                    <Button variant={"explore"}>
                        Cashout
                    </Button>
                  </Stack>
                </Box>
              </Box>
              {balanceData.paymentHistory.length > 0 && (
                <>
                  <Box w="95%">
                    <Flex w="100%">
                      <Text fontSize="xl" fontWeight="bold">
                        Transaction History
                      </Text>
                      <Spacer />
                    </Flex>
                  </Box>
                  <Box
                    w="100%"
                    bg="white"
                    borderRadius={"md"}
                    display={{ base: "flex", md: "flex" }}
                    flexDirection={"column"}
                    overflow={"hidden"}
                  >
                    <TableContainer>
                      <Table variant="striped" colorScheme="purple">
                        <Thead>
                          <Tr>
                            <Th><Text>Milestone Title</Text></Th>
                            <Th><Text>Transaction Timestamp</Text></Th>
                            <Th isNumeric><Text>Milestone Price</Text></Th>
                            <Th isNumeric><Text>HH Fees (6%)</Text></Th>
                            <Th isNumeric><Text>Payout</Text></Th>
                          </Tr>
                        </Thead>
                        <Tbody>
                          {balanceData.paymentHistory.map((payment, index) => (
                            <Tr key={index}>
                              <Td><Text>{payment.title}</Text></Td>
                              <Td><Text>{payment.created_at}</Text></Td>
                              <Td isNumeric><Text>$ {payment.amount}</Text></Td>
                              <Td isNumeric><Text>$ {Math.round(Number(payment.amount * (6))) / 100}</Text></Td>
                              <Td isNumeric><Text>$ {Math.round(Number(payment.amount * (94))) / 100}</Text></Td>
                            </Tr>
                          ))}
                        </Tbody>
                      </Table>
                    </TableContainer>
                  </Box>
                </>
              )}
            </>
          )}
        </VStack>
      </VStack>
    </Flex>
  );
}

function mapStateToProps(state) {
  return {
    isLoading: state.balance.isLoading,
    isError: state.balance.isError,
    balanceData: state.balance.balanceData,
  };
}

export default connect(mapStateToProps)(Balance);
