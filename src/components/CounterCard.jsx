import { Box, IconButton, Stack, CircularProgress } from "@chakra-ui/react";
import { AddIcon, MinusIcon, RepeatIcon } from "@chakra-ui/icons";

const CounterCard = ({ count, setCount, dir, cardTitle, mode }) => {
  const increment = () => {
    if (count < 7) {
      setCount(count + 1);
    }
  };

  const decrement = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };

  const reset = () => setCount(0);

  const progress = (count / 7) * 100;

  const baseButtonStyles = {
    width: ["30px", "40px", "50px"],
    height: ["30px", "40px", "50px"],
    fontSize: ["15px", "20px", "25px"],
  };

  const iconButtonStyles = {
    color: "white",
    bgColor: "#BC9761",
    _hover: { color: "white", bgColor: "#BC9761" },
  };

  const iconButtonStylesTwo = {
    color: "#BC9761",
    bgColor: mode === "dark" ? "#232C35" : "#EDEDED",
    _hover: {
      bgColor: mode === "dark" ? "#232C35" : "#EDEDED",
    },
  };

  const disabledIconButtonStyles = {
    color: mode === "dark" ? "#38414C" : "#C9C9C9",
    bgColor: mode === "dark" ? "#232C35" : "#EDEDED",
    _hover: {
      color: mode === "dark" ? "#38414C" : "#C9C9C9",
      bgColor: mode === "dark" ? "#232C35" : "#EDEDED",
    },
    cursor: "not-allowed",
  };

  return (
    <Box
      padding="20px"
      boxShadow="md"
      borderRadius="md"
      width="100%"
      position="relative"
      backgroundColor={mode === "dark" ? "#2C3743" : "#f5f5f5"}
      _before={{
        content: `"${cardTitle}"`,
        bgColor: mode === "dark" ? "#232C35" : "#EBEBEB",
        position: "absolute",
        top: { base: "20px", md: "48px" },
        ...(dir === "ltr" ? { left: 0 } : { right: 0 }),
        padding: "5px 10px",
        borderRadius: "5px 0px 0px 5px",
        fontSize: { base: "md", md: "lg" },
        fontWeight: "bold",
        textAlign: "center",
        color: mode === "dark" ? "white" : "#1F2A37",
      }}
    >
      <Stack>
        <IconButton
          position="absolute"
          top={{ base: "20px", md: "48px" }}
          {...(dir === "ltr" ? { right: "16px" } : { left: "16px" })}
          icon={<RepeatIcon />}
          aria-label="Reset"
          onClick={reset}
          size="lg"
          {...(count === 0 ? { ...disabledIconButtonStyles, ...baseButtonStyles } : { ...iconButtonStylesTwo, ...baseButtonStyles })}
        />
      </Stack>
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={8}
        mt="80px"
        style={{ direction: dir }}
      >
        <IconButton
          icon={<AddIcon />}
          aria-label="Increment"
          onClick={increment}
          {...(count === 7 ? { ...disabledIconButtonStyles, ...baseButtonStyles } : { ...iconButtonStyles, ...baseButtonStyles })}
        />
        <Box position="relative" display="inline-flex" fontSize={100}>
          <CircularProgress
            value={progress}
            thickness="8px"
            color="#BC9761"
            size="100%"
            {...(mode === 'dark' && { trackColor: "#3D4652" })}
          />
          <Box
            position="absolute"
            top="0"
            left="0"
            right="0"
            bottom="0"
            display="flex"
            alignItems="center"
            justifyContent="center"
            fontSize={{ base: "30px", md: "64px" }}
            fontWeight="bold"
            color="#BC9761"
          >
            {count}
          </Box>
        </Box>
        <IconButton
          icon={<MinusIcon />}
          aria-label="Decrement"
          onClick={decrement}
          {...(count === 0 ? { ...disabledIconButtonStyles, ...baseButtonStyles } : { ...iconButtonStylesTwo, ...baseButtonStyles })}
        />
      </Stack>
    </Box>
  );
};

export default CounterCard;
