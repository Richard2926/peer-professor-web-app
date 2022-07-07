import {
  Stack,
  Box,
  FormControl,
  Text,
} from "@chakra-ui/react";
import "styles/layout.sass";
import React from "react";
import {
  MotionInput,
  MotionButton,
  MotionBox,
} from "components/shared/MotionComponents";
import { AnimatePresence, motion } from "framer-motion";
import { connect } from "react-redux";
import {
  checkEmail,
  login,
  register,
  verifyEmail,
  clearLoginError,
  moveToForgotState,
  moveToEmailState,
  forgot
} from "redux/actions/auth";
import { MotionVerificationInput } from "components/shared/MotionComponents";

function Test(props) {
  const [email, setEmail] = React.useState("rarockiasamy3@gatech.edu");
  const [password, setPassword] = React.useState("1");
  const { loginError, isLoginLoading, loginState, dispatch } = props;

  const stateTitles = [
    "Lets go",
    "Login",
    "Register",
    "Send New Password",
    "Resend Code",
  ];
  const heights = [8.5, 11.5, 11.75, 8.5, 10.5];
  const emailStates = [0, 1, 2, 3];
  const passwordStates = [1, 2];
  const height =
    (heights[loginState] + (loginError === "" ? 0 : 1.75)).toString() + "rem";
  const topPadding = [1, 1, 1, 1, 2];

  return (
    <>
      <MotionBox
        initial={{ height: "9rem" }}
        animate={{ height: height }}
        bg={"background.900"}
        boxShadow={"lg"}
        px={8}
        py={6}
        rounded={"md"}
      >
        <Stack>
          <Stack>
            <FormControl id="email">
              <AnimatePresence>
                {emailStates.includes(loginState) && (
                  <MotionInput
                    isDisabled={loginState === 1 || loginState === 3}
                    isInvalid={loginError !== ""}
                    exit={{ scale: 0 }}
                    transition={{ type: "tween", duration: 0.005 }}
                    type="email"
                    value={email}
                    placeholder={"example@gatech.edu"}
                    borderColor={"secondary.900"}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      props.dispatch(clearLoginError());
                    }}
                  />
                )}
              </AnimatePresence>
            </FormControl>
            <AnimatePresence>
              {passwordStates.includes(loginState) && (
                <MotionInput
                  initial={{ scale: 0, y: -50 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0 }}
                  transition={{ type: "tween", duration: 0.005 }}
                  type="password"
                  value={password}
                  isInvalid={loginError !== ""}
                  placeholder={"Password"}
                  borderColor={"secondary.900"}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    props.dispatch(clearLoginError());
                  }}
                />
              )}
            </AnimatePresence>
            <AnimatePresence>
              {loginState === 4 && (
                <motion.div>
                  <MotionVerificationInput
                    placeholder="_"
                    removeDefaultStyles
                    onChange={(value) => {
                      props.dispatch(clearLoginError());
                      if (value.length === 6) {
                        props.dispatch(verifyEmail(value, email, password));
                      }
                    }}
                    classNames={{
                      container: "h-full",
                      character:
                        "bg-white first-child:ml-0 rounded-md leading-12 ml-3 text-lg",
                      characterInactive: "bg-gray-300 text-gray-300",
                      characterSelected: "bg-teal-200 text-black",
                    }}
                  />
                </motion.div>
              )}
            </AnimatePresence>
            {loginError !== "" && (
              <Stack align={"center"}>
                <Box color={"pink.400"} fontSize={"sm"}>
                  {props.loginError}
                </Box>
              </Stack>
            )}
          </Stack>
          <Stack pt={topPadding[loginState]}>
            <MotionButton
              layout={"position"}
              transition={{ type: "spring", duration: 0.005 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.997 }}
              variant={"landing"}
              isLoading={isLoginLoading}
              onClick={() => {
                switch (loginState) {
                  case 0:
                    dispatch(checkEmail(email));
                    break;
                  case 1:
                    dispatch(login(email, password));
                    break;
                  case 2:
                    dispatch(register(email, password));
                    break;
                  case 3:
                    dispatch(forgot(email));
                    break;
                  case 4:
                    dispatch(register(email, password));
                    break;
                  default:
                    console.log(loginState, "bruh");
                    break;
                }
              }}
            >
              {stateTitles[loginState]}
            </MotionButton>
          </Stack>
        </Stack>
      </MotionBox>
      {/* <AnimatePresence>
        {loginState === 1 && (
          <motion.div>
            <Stack align={"center"}>
              <Text
                variant="link"
                color={"white"}
                fontSize={'sm'}
                as="u"
                _hover={{ color: "secondary.900" }}
                onClick={() => {
                  props.dispatch(moveToForgotState())
                }}
              >
                Forgot Password?
              </Text>{" "}
            </Stack>
          </motion.div>
        )}
      </AnimatePresence> */}
      <AnimatePresence>
        {!(loginState === 1 || loginState === 0) && (
          <motion.div>
            <Stack align={"center"}>
              {/* <Link> */}
              <Text
                variant="link"
                color={"white"}
                fontSize={'sm'}
                as="u"
                _hover={{ color: "secondary.900" }}
                onClick={() => {
                  props.dispatch(moveToEmailState())
                }}
              >
                Back
              </Text>{" "}
              {/* </Link> */}
            </Stack>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function mapStateToProps(state) {
  return {
    loginState: state.auth.loginState,
    isLoginLoading: state.auth.isLoginLoading,
    loginError: state.auth.loginError,
  };
}

export default connect(mapStateToProps)(Test);
