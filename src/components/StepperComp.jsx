import { Box, Text, Flex } from "@chakra-ui/react";
import React from "react";
const StepperComp = ({ steps }) => {
  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      mt={{ base: "120px", md: "80px" }}
    >
      <Flex
        align="center"
        justify="center"
        position="relative"
        style={{ direction: steps[0].dir }}
      >
        {steps.map((step, index) => (
          <React.Fragment key={index}>
            <StepCircle
              stepNumber={index + 1}
              label={step.label}
              onClick={() => {
                steps[0].setIndex(index + 1);
              }}
            />
            {index < steps.length - 1 && <Line />}
          </React.Fragment>
        ))}
      </Flex>
    </Flex>
  );
};

const StepCircle = ({ stepNumber, label, onClick }) => (
  <Box
    position="relative"
    display="flex"
    alignItems="center"
    justifyContent="center"
    mx="0"
    onClick={onClick}
    cursor="pointer"
  >
    <Box
      width={{ base: "30px", md: "40px" }}
      height={{ base: "30px", md: "40px" }}
      borderRadius="50%"
      bg="#BC9761"
      color="white"
      display="flex"
      alignItems="center"
      justifyContent="center"
      fontSize={{ base: "14px", md: "18px" }}
      zIndex="1"
    >
      {stepNumber}
    </Box>
    <Text
      position="absolute"
      top={{ base: "40px", md: "50px" }} // Positioning the text directly below the circle
      fontSize={{ base: "10px", md: "14px" }} // Small font size for the text
      color="#BC9761"
      textAlign="center"
      width="300%"
      left="50%"
      transform="translateX(-50%)" // Center the text below the circle
    >
      {label}
    </Text>
  </Box>
);

const Line = () => (
  <Box
    width={{ base: "60px", md: "180px" }} // Increased line width
    height="2px"
    bg="#BC9761"
    position="relative"
    top="0"
    flexShrink={0}
  />
);

export default StepperComp;
