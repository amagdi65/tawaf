import { useEffect, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Progress,
  Box,
  Text,
  VStack,
  Divider,
} from "@chakra-ui/react";

const Popup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setIsOpen(true);

    const interval = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress >= 100) {
          clearInterval(interval);
          setIsOpen(false);
          return 100;
        }
        return Math.min(oldProgress + 2.5, 100);
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        isCentered
        size="2xl" // Adjust size for larger screens
      >
        <ModalOverlay bgColor={'black'} />
        <ModalContent
          borderRadius="lg"
          boxShadow="2xl"
          p={{ base: 4, md: 8 }}
          maxW={{ base: "90%", md: "80%", lg: "60%" }}
        >
          <ModalHeader
            textAlign="center"
            fontSize={{ base: "xl", md: "3xl" }} // Larger font on bigger screens
            fontWeight="bold"
            color="#252E39"
          >
            مساعدك في رحلة العمرة
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={6} align="stretch">
              <Text
                fontSize={{ base: "md", md: "lg" }}
                color="gray.700"
                textAlign="center"
              >
                مساعدك في رحلة العمرة مع ٢٠٠ دعاء نصي و مسموع في مرحلة الطواف
                والسعي.
              </Text>
              <Divider borderColor="#BC9761" />
              <Text
                fontSize={{ base: "md", md: "lg" }}
                color="gray.700"
                textAlign="center"
              >
                {` Assisting you at the Tawaf and Sa'i stage of your 'Umrah with
                200 supplications in textual and audio format.`}
              </Text>
              <Divider borderColor="#BC9761" />
              <Text
                fontSize={{ base: "md", md: "lg" }}
                color="gray.700"
                textAlign="center"
              >
                Durant le voyage de la Omra, une assistance virtuelle de 200
                invocations écrites et audios vous accompagne tout au long du
                Tawaf et du Sa’i.
              </Text>
              <Divider borderColor="#BC9761" />
              <Text
                fontSize={{ base: "md", md: "lg" }}
                color="gray.700"
                textAlign="center"
              >
                Tavâf ve Sa’y esnasında yazılı ve işitsel 200 dua ile umre
                yolculuğunda sizin yardımcınız olmaktadır.
              </Text>
              <Divider borderColor="#BC9761" />
              <Text
                fontSize={{ base: "md", md: "lg" }}
                color="gray.700"
                textAlign="center"
              >
                سفر عمرہ میں آپ کا معاون، طواف و سعی کے دوران ٹیکسٹ اور آڈیو کی
                شکل میں ۲۰۰ دعاؤں کے ساتھ
              </Text>
            </VStack>
            <Box mt={8}>
              <Progress
                value={progress}
                size="sm"
                borderRadius="md"
                sx={{
                  "& > div": {
                    backgroundColor: "#BC9761",
                  },
                }}
              />
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
  );
};

export default Popup;
