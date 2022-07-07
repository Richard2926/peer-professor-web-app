import {
  Flex,
  Stack,
  Heading,
  useColorModeValue
} from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import "styles/layout.sass";
import { motion } from "framer-motion";

function AuthLayout(props) {
  console.log("Hit Auth Layout");

  return (
      <Flex
        minH={"100vh"}
        align={"center"}
        justify={"center"}
        bg={useColorModeValue("primary.900", "gray.800")}
      >
        <motion.div
          initial={{ scale: 0 }}
          exit={{ scale: 0, rotate: 360*2 }}
          animate={{ scale: 1, rotate: 360 }}
          layout={"position"}
        >
          <Stack mx={"auto"} maxW={"lg"} py={12}>
            <Stack align={"center"}>
              <Heading
                fontSize={"4xl"}
                fontWeight={"normal"}
                fontFamily="monospace"
                color={"white"}
                mb={6}
              >
                Peer Professor
              </Heading>
            </Stack>
            <Outlet />
          </Stack>
        </motion.div>
      </Flex>
  );
}

export default AuthLayout;
