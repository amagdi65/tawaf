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
  ar: "src/assets/congrats.svg",
  en: "src/assets/popup haramin 2English.svg",
  fr: "src/assets/popup haramin 2French.svg",
  tr: "src/assets/popup haramin 2Turkish.svg",
  in: "src/assets/popup haramin 2Indoonicya.svg",
  mal:"src/assets/popup haramin 2 Malawi.svg",
  ur: "src/assets/popup haramin 2Urdu.svg",
};
const Congrats = ({ isOpen, setIsOpen, lang }) => {
  const closeModal = () => setIsOpen(false);
  console.log(lang);
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
              <Image src={lang && congrats[lang]} alt="congrats" />
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Congrats;
