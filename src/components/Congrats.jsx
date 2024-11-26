import {
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Image,
  Stack,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
const congrats = {
  ar: "../assets/congrats.svg",
  en: "../assets/popup haramin 2English.svg",
  fr: "../assets/popup haramin 2French.svg",
  tr: "../assets/popup haramin 2Turkish.svg",
  in: "../assets/popup haramin 2Indoonicya.svg",
  mal:"../assets/popup haramin 2 Malawi.svg",
  ur: "../assets/popup haramin 2Urdu.svg",
};

const congratsSvg = import.meta.glob("../assets/*.svg", {
  eager: true, 
  import: "default",
});
const Congrats = ({ isOpen, setIsOpen, lang }) => {
  const closeModal = () => {
    setIsOpen(false)
    window.location.reload()
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
            <Stack spacing={6} align="center" textAlign="center">
              <Image src={lang && congratsSvg[congrats[lang]]} alt="congrats" />
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Congrats;
