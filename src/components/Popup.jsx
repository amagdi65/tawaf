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
  Box,
  Image,
  Button,
  Grid,
  HStack,
} from "@chakra-ui/react";

const textContent = {
  ar: {
    header: "مساعدك في رحلة العمرة",
    description:
      "مساعدك في رحلة العمرة مع اكثر من 170 دعاء نصي و مسموع في مرحلة الطواف والسعي.",
    confirmLabel: "ابدأ العمرة",
    conditionsStatment:"لتأدية العمرة بكل يسر وسهولة، أحرص على التعليمات التالية:",
    firstConds:"أصدر تصريح أداء العمرة عبر تطبيق \"نسك\".",
    secndConds:"إستخدم سماعة الأذن في حال رغبت بالإستماع للأدعية.",
    thirdConds:"تجنب استخدام برامج ترجمة الشاشة لضمان جودة المحتوى أثناء تصفح الخدمة.",
  },
  en: {
    header: "Your Assistant for the Umrah Journey",
    description:
      "Assisting you at the Tawaf and Sa'i stage of your 'Umrah with more than 170 supplications in textual and audio format . ",
    confirmLabel: "Begin your ‘Umrah",
  },
  fr: {
    header: "Votre Assistant pour le Voyage de la Omra",
    description: `Durant le voyage de la Omra, une assistance virtuelle de plus de 170 invocations écrites et audios vous accompagne tout au long du Tawaf et du Sa’i.`,
    confirmLabel: "Commencez la Omra",
  },
  tr: {
    header: "Umre Yolculuğunuzda Yardımcınız",
    description: `Tavâf ve Sa’y esnasında yazılı ve işitsel 170'ten fazla dua ile umre yolculuğunda sizin yardımcınız olmaktadır.`,
    confirmLabel: "Umreye Başla",
  },
  ur: {
    header: "سفر عمرہ میں آپ کا معاون",
    description:
      " سفر عمرہ میں آپ کا معاون، طواف و سعی کے دوران ٹیکسٹ اور آڈیو کی شکل میں 170 سے زیادہ دعاؤں کے ساتھ .",
    confirmLabel: "عمرہ شروع کریں",
  },
  in: {
    header: "Bahasa Indonesia Assistant",
    description: `Membantu anda dalam perjalanan umrah dengan himpunan lebih dari 170 doa, baik teks maupun audio saat melakukan tawaf dan sai.`,
    confirmLabel: "Silakan memulai ibadah umrah",
  },
  mal: {
    header: "Bahasa Melayu Assistant",
    description: `Panduan Perjalanan Umrah Anda semasa tawaf dan sa'i yang dilengkapi dengan lebih 170 jenis doa berbentuk teks dan audio.`,
    confirmLabel: "Sila mulakan ibadat umrah anda",
  },
};

const languages = [
  {
    code: "ar",
    name: "عربي",
    dir: "rtl",
    flagUrl: "https://flagcdn.com/w40/sa.png",
  },
  {
    code: "ur",
    name: "اردو",
    dir: "rtl",
    flagUrl: "https://flagcdn.com/w40/pk.png",
  },
  {
    code: "in",
    name: "Indonesia",
    dir: "ltr",
    flagUrl: "https://flagcdn.com/w40/id.png",
  },
  {
    code: "en",
    name: "English",
    dir: "ltr",
    flagUrl: "https://flagcdn.com/w40/us.png",
  },
  {
    code: "tr",
    name: "Türkçe",
    dir: "ltr",
    flagUrl: "https://flagcdn.com/w40/tr.png",
  },
  {
    code: "fr",
    name: "Français",
    dir: "ltr",
    flagUrl: "https://flagcdn.com/w40/fr.png",
  },
  {
    code: "mal",
    name: "Malaysia",
    dir: "ltr",
    flagUrl: "https://flagcdn.com/w40/my.png",
  },
];

const Popup = ({ setLang, lang, setDir , dir: pageDir}) => {
  const [isOpen, setIsOpen] = useState(true);

  const handleLanguageSelect = (languageCode, dir) => {
    setLang(languageCode);
    setDir(dir);
  };

  return (
    <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} isCentered>
      <ModalOverlay bg="rgba(0, 0, 0, 0.7)" />
      <ModalContent
        borderRadius="lg"
        boxShadow="2xl"
        bg="white"
        maxW="sm"
        p={4}
      >
        <ModalHeader
          fontSize="xl"
          fontWeight="bold"
          textAlign="center"
          color="black"
        >
          {textContent[lang].header}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4}>
          <Text
              fontSize="sm"
              textAlign="center"
              color="gray.600"
              px={4}
              lineHeight="1.5"
              style={{direction: pageDir}}
            >
              {textContent[lang].description}
            </Text>
            <Grid
              templateColumns="repeat(3, 1fr)"
              gap={3}
              justifyContent="center"
              alignItems="center"
            >
              {languages.map((language) => (
                <Box
                  key={language.code}
                  onClick={() =>
                    handleLanguageSelect(language.code, language.dir)
                  }
                  borderWidth="1px"
                  borderColor={lang === language.code ? "#BC9761" : "gray.300"}
                  borderRadius="lg"
                  bgColor="#eee"
                  p={2}
                  cursor="pointer"
                  textAlign="center"
                  _hover={{ borderColor: "#BC9761" }}
                  h="60px"
                  w="110px"
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="center"
                >
                  <HStack spacing={2}>
                    <Image
                      src={language.flagUrl}
                      alt={language.name}
                      boxSize="24px"
                    />
                    <Text fontSize="sm" fontWeight="bold" color="gray.700">
                      {language.name}
                    </Text>
                  </HStack>
                </Box>
              ))}
            </Grid>
        
            <Text
              fontSize="xs"
              textAlign="right"
              color="gray.600"
              px={4}
              lineHeight="1.5"
              style={{direction: pageDir}}
            >
              {textContent[lang].conditionsStatment}
              <ol>
                <li>
                {textContent[lang].firstConds}

                </li>
                <li>
                {textContent[lang].secndConds}
                  </li>
                <li>
                {textContent[lang].thirdConds}
                  </li>
              </ol>
            </Text>

            <Button
              colorScheme="yellow"
              bg="#BC9761"
              color="white"
              width="100%"
              size="lg"
              onClick={() => setIsOpen(false)}
              _hover={{ bg: "#A67F3E" }}
            >
              {textContent[lang].confirmLabel}
            </Button>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default Popup;
