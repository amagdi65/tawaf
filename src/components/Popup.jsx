import { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Text,
  VStack,
  Divider,
  Box,
  Image,
} from "@chakra-ui/react";

const Popup = ({ setLang, lang,setDir}) => {
  const [isOpen, setIsOpen] = useState(true);

  const textContent = {
    ar: {
      header: "مساعدك في رحلة العمرة",
      description:
        "مساعدك في رحلة العمرة مع 180 دعاء نصي و مسموع في مرحلة الطواف والسعي.",
      confirmLabel: "تأكيد الاختيار",
    },
    en: {
      header: "Your Assistant for the Umrah Journey",
      description:
        "Assisting you at the Tawaf and Sa'i stage of your 'Umrah with 180 supplications in textual and audio format.",
      confirmLabel: "Confirm Selection",
    },
    fr: {
      header: "Votre Assistant pour le Voyage de la Omra",
      description:
        "Durant le voyage de la Omra, une assistance virtuelle de 180 invocations écrites et audios vous accompagne tout au long du Tawaf et du Sa’i.",
      confirmLabel: "Confirmer la sélection",
    },
    tr: {
      header: "Umre Yolculuğunuzda Yardımcınız",
      description:
        "Tavâf ve Sa’y esnasında yazılı ve işitsel 180 dua ile umre yolculuğunda sizin yardımcınız olmaktadır.",
      confirmLabel: "Seçimi Onayla",
    },
    ur: {
      header: "سفر عمرہ میں آپ کا معاون",
      description:
        "سفر عمرہ میں آپ کا معاون، طواف و سعی کے دوران ٹیکسٹ اور آڈیو کی شکل میں 180 دعاؤں کے ساتھ",
      confirmLabel: "انتخاب کی تصدیق کریں",
    },
    in: {
      header: "Bahasa Indonesia Assistant",
      description:
        "Assisting you during Umrah with 180 written and audio prayers.",
      confirmLabel: "Konfirmasi Pilihan",
    },
    mal: {
      header: "Bahasa Melayu Assistant",
      description:
        "Assisting you during Umrah with 180 written and audio prayers.",
      confirmLabel: "Sahkan Pemilihan",
    },
  };

  const languages = [
    {
      code: "ar",
      name: "عربي",
      dir: "rtl",
      flagUrl:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Flag_of_Saudi_Arabia.svg/20px-Flag_of_Saudi_Arabia.svg.png",
    },
    {
      code: "en",
      name: "English",
      dir: "ltr",
      flagUrl:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Flag_of_the_United_States.svg/20px-Flag_of_the_United_States.svg.png",
    },
    {
      code: "ur",
      name: "اردو",
      dir: "rtl",
      flagUrl:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Flag_of_Pakistan.svg/20px-Flag_of_Pakistan.svg.png",
    },
    {
      code: "tr",
      name: "Türkçe",
      dir: "ltr",
      flagUrl:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Flag_of_Turkey.svg/20px-Flag_of_Turkey.svg.png",
    },
    {
      code: "fr",
      name: "Français",
      dir: "ltr",
      flagUrl:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Flag_of_France.svg/20px-Flag_of_France.svg.png",
    },
    {
      code: "in",
      name: "Bahasa Indonesia",
      dir: "ltr",
      flagUrl:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Flag_of_Indonesia.svg/20px-Flag_of_Indonesia.svg.png",
    },
    {
      code: "mal",
      name: "Bahasa Melayu",
      dir: "ltr",
      flagUrl:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Flag_of_Malaysia.svg/20px-Flag_of_Malaysia.svg.png",
    },
  ];

 
  const handleLanguageSelect = (languageCode,dir) => {
    setLang(languageCode);
    setDir(dir)
    setIsOpen(false);
  };


  return (
    <Modal
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      isCentered
      size="2xl"
    >
      <ModalOverlay bg="rgba(0, 0, 0, 0.7)" />
      <ModalContent
        borderRadius="lg"
        boxShadow="2xl"
        p={{ base: 6, md: 8 }}
        maxW={{ base: "90%", md: "80%", lg: "60%" }}
        bg="#f9fafb"
      >
        <ModalHeader
          textAlign="center"
          fontSize={{ base: "xl", md: "3xl" }}
          fontWeight="bold"
          color="#2c3e50"
          mb={4}
        >
          {textContent[lang].header}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4} align="stretch">
            {languages.map((language) => (
              <Box
                key={language.code}
                onClick={() => handleLanguageSelect(language.code,language.dir)}
                borderWidth={2}
                borderColor={lang === language.code ? "#BC9761" : "gray.300"}
                borderRadius="md"
                p={4}
                textAlign="center"
                cursor="pointer"
                _hover={{ borderColor: "#BC9761" }} // Change border color on hover
              >
                <Image
                  src={language.flagUrl}
                  alt={language.name}
                  boxSize="20px"
                  mb={2}
                />
                <Text fontWeight="bold" color={lang === language.code ? "#BC9761" : "gray.700"}>
                  {language.name}
                </Text>
                <Text fontSize={{ base: "sm", md: "md" }} color="gray.500">
                  {textContent[language.code].description}
                </Text>
              </Box>
            ))}
            <Divider borderWidth="2px" borderColor="#BC9761" />
        
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default Popup;
