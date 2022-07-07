import {
  Flex,
  Stack,
  Heading,
  useColorModeValue,
  Button,
  Box,
  Text,
  Center, Spacer,
  IconButton
} from "@chakra-ui/react";
import { connect } from "react-redux";
import { FiEye, FiLock } from "react-icons/fi";
import { initiateCheckout } from "redux/actions/helper";
import { useEffect } from "react";
import { useState } from "react";

function Message(props) {
  const [clicked, setClicked] = useState(false);
  const { message, color, milestones, userID, url, dispatch } = props;
  let locked = true;
  let locked_for_other = true;

  let locked_milestone;
  if (message.wait_for_completion == null) {
    locked = false;
    locked_for_other = false;
  }

  for (const milestone of milestones) {
    if (milestone.completed && milestone.id == message.wait_for_completion) {
      locked = false;
      locked_for_other = false;
    }
    if (!milestone.completed && milestone.id == message.wait_for_completion) {
      locked_milestone = milestone;
    }
  }

  if (locked && message.sender_id === userID) {
    locked = false;
  }

  if (locked && message.sender_id !== userID) {
    locked_for_other = false;
  }

    useEffect(() => {
      if (clicked) {
        window.open(url, "_self");
        setClicked(false);
      }
    }, [url]);

  const initiate = () => {
    dispatch(initiateCheckout(locked_milestone.id));
    setClicked(true);
  }
  return (
    <Box bg={color} borderRadius="md" px="3" py="1">
      {message.assetID == null ? (
        locked ? (
          <Button leftIcon={<FiLock />} variant="outline" m="2" size="sm" onClick={initiate}>
            {"Unlock with " +
              locked_milestone.title +
              " - $" +
              locked_milestone.price}
          </Button>
        ) : (
          <Text color="black" variant="medium">
            {message.text} {locked_for_other && 
          <Center><Text color="navy" fontSize={"xs"}>(Locked for other person with {locked_milestone.title})</Text></Center>}
          </Text>
        )
      ) : (
        <Flex>
          <Center pl="3">
            <Text color="black" variant="small">
              {message.assetName}
            </Text>
          </Center>
          <Spacer />
          {!locked && (
            <IconButton
              size={"sm"}
              m="2"
              onClick={() => {
                window.open(message.url, "_blank");
              }}
              aria-label="Remove File"
              variant="outline"
              icon={<FiEye />}
            />
          )}
          {locked && (
            <Button leftIcon={<FiLock />} variant="outline" m="2" size="sm" onClick={initiate}>
              {"Unlock with " +
                locked_milestone.title +
                " - $" +
                locked_milestone.price}
            </Button>
          )}
          {locked_for_other && 
          <Center><Text color="navy">(Locked for other person with {locked_milestone.title})</Text></Center>}
        </Flex>
      )}
    </Box>
  );
}

function mapStateToProps(state) {
  return {
    url: state.helper.url
  };
}

export default connect(mapStateToProps)(Message);
