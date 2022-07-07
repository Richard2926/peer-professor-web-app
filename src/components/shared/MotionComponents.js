import { motion } from "framer-motion";
import {
    Box,
    FormControl,
    Input,
    Heading,
    Button,
    Flex
  } from "@chakra-ui/react";
import VerificationInput from "react-verification-input";

export const MotionVerificationInput = motion(VerificationInput);
export const MotionInput = motion(Input);
export const MotionButton = motion(Button);
export const MotionBox = motion(Box);
export const MotionFormControl = motion(FormControl);
export const MotionHeading = motion(Heading);
export const MotionFlex = motion(Flex);