import { Box, Heading } from "@chakra-ui/react";

function Footer({ mode }) {
  return (
    <Box
      h="10vh"
      w="100%"
      display="flex"
      justifyContent="center"
      alignItems="center"
      backgroundColor="#1F2A37"
      position="relative"
      bottom="0px"
      {...(mode === "dark" ? { opacity: 0.1, backgroundColor: "white" } : {})}
    >
      <Heading size="md" color="white"></Heading>
    </Box>
  );
}

export default Footer;
