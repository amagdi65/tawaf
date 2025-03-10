import {
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Image,
  Stack,
  VStack,
  Button,
  Text,
  Flex,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import ArrowButton from "../assets/Arrowbtn.svg";
import closeButton from "../assets/close.svg";
import { congratsData } from "../data/metaData/congratsData";
const congrats = {
  ar: "../assets/congrats.svg",
  en: "../assets/popup haramin 2English.svg",
  fr: "../assets/popup haramin 2French.svg",
  tr: "../assets/popup haramin 2Turkish.svg",
  in: "../assets/popup haramin 2Indoonicya.svg",
  mal: "../assets/popup haramin 2 Malawi.svg",
  ur: "../assets/popup haramin 2Urdu.svg",
};

const congratsSvg = import.meta.glob("../assets/*.svg", {
  eager: true,
  import: "default",
});
const Congrats = ({ isOpen, setIsOpen, lang }) => {
  const closeModal = () => {
    setIsOpen(false);
    window.location.reload();
  };

  return (
    <Box textAlign="center">
      <Modal isOpen={isOpen} onClose={closeModal} isCentered>
        <ModalOverlay bg="rgba(0, 0, 0, .9)" />
        <ModalContent
          as={motion.div}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3 }}
          bg="transparent"
          borderRadius="lg"
          overflow="hidden"
          shadow="lg"
        >
          <ModalBody>
            <Stack gap={0}>
              <Box
                padding={2}
                cursor="pointer"
                onClick={closeModal}
                alignItems={"center"}
              >
                <Image src={closeButton} w="20px" />
              </Box>
              <Image src={lang && congratsSvg[congrats[lang]]} alt="congrats" />
              <Stack alignItems="center" alignContent="center" gap={0}>
                <Box
                  color="white"
                  background="rgba(183,153,103,1);"
                  padding="0.20rem"
                  gap="0.50rem"
                  textAlign="center"
                  border="1px solid #BC9761"
                  borderTopRadius="16px"
                  shadow="lg"
                  marginTop="-9px"
                  w={100}
                >
                  <Text
                    fontSize="xs"
                    color="white"
                    fontWeight="900"
                    textAlign="center"
                  >
                    {congratsData[lang].exploreServices}
                  </Text>
                </Box>
              </Stack>
              <Stack
                color="white"
                background="linear-gradient(195deg, rgba(31,42,55,0.8799894957983193) 47%, rgba(183,153,103,0.88) 93%);"
                padding="1rem"
                gap="0.50rem"
                alignItems="right"
                alignContent="right"
                border="1px solid #BC9761"
                borderRadius="16px"
                shadow="lg"
              >
                <Text
                  fontSize="xs"
                  color="rgba(187, 150, 97, 1)"
                  fontWeight="900"
                  textAlign="right"
                >
                  {congratsData[lang].musaliyaatTitle}
                </Text>
                <Text fontSize="xs" textAlign="justify">
                  {congratsData[lang].musaliyaatDesc}
                </Text>

                <Button
                  size="xs"
                  color="white"
                  border="1px solid #BC9761"
                  bgColor="#BC9761"
                  _hover={{ bg: "#A67F3E" }}
                  w={90}
                  gap="5px"
                >
                  <a href="https://musaliyaat.alharamain.gov.sa/">
                    <Flex gap={0.5}>
                      {congratsData[lang].makeRequest}
                      <Image src={ArrowButton} />
                    </Flex>
                  </a>
                </Button>
              </Stack>
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Congrats;
