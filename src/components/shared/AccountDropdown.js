import { Box, Text } from "@chakra-ui/react";

function AccountDropdown(props) {
  return (
    <>
    <Box display={"flex"} justifyContent={"end"}>
      <Text>{props.user.email}</Text>
    </Box>
    </>
  );
}

export default AccountDropdown;
