import { Box, Text, Flex } from "@chakra-ui/react";
import React from "react";
import checked from '../assets/check .svg'

const stepperIcons = import.meta.glob("../assets/stepperIcons/*.svg", {
  eager: true, 
  import: "default",
});
const StepperComp = ({ steps , mode}) => {
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
        style={{ direction: steps.length && steps[0].dir }}
        zIndex={0}
      >
        {steps.length &&
          steps.map((step, index) => (
            <React.Fragment key={index}>
              <StepCircle
                stepNumber={index + 1}
                label={step.label}
                onClick={() => {
                  steps[0].setIndex(index + 1);
                }}
                icon={steps[0].index >= index + 2   ? stepperIcons[checked] : stepperIcons[step.icon] }
              />
              {index < steps.length - 1 && <Line dim={steps[0].index >= index + 2} mode={mode}/>}
            </React.Fragment>
          ))}
      </Flex>
    </Flex>
  );
};

const StepCircle = ({ stepNumber, label, onClick, icon }) => (
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
      width={{ base: "50px", md: "60px" }}
      height={{ base: "50px", md: "60px" }}
      borderRadius="50%"
      bg="#BC9761"
      color="white"
      display="flex"
      alignItems="center"
      justifyContent="center"
      fontSize={{ base: "14px", md: "18px" }}
      zIndex="1"
    >
      {icon ? <img src={icon} /> : stepNumber}
    </Box>
    <Text
      position="absolute"
      top={{ base: "50px", md: "60px" }}
      fontSize={{ base: "10px", md: "14px" }}
      color="#BC9761"
      textAlign="center"
      width="300%"
      left="50%"
      transform="translateX(-50%)"
    >
      {label}
    </Text>
  </Box>
);

const Line = ({dim,mode}) => (
  <Box
    width={{ base: "45px", md: "180px" }}
    height="3px"
    bg={dim ? "#BC9761" : mode === 'dark' ? "#3A444F":"#ddd"}
    position="relative"
    top="0"
    flexShrink={0}
  />
);

export default StepperComp;
