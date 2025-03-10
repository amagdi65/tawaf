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
    conditionsStatment: `ضيوف الرحمن الكرام،
حرصًا على راحتكم وسهولة أداء مناسككم، نرجو الالتزام بالإرشادات التالية:`,
    firstConds: `إصدار تصريح العمرة عبر تطبيق "نسك" قبل التوجه إلى المسجد الحرام.`,
    secndConds: `استخدام سماعة الأذن عند الاستماع للأدعية، حفاظًا على راحة المصلين والمعتمرين.`,
    thirdConds: `تجنب استخدام برامج ترجمة الشاشة لضمان جودة عرض المحتوى أثناء تصفح الخدمة.`,
    consclusion: `نسأل الله لكم عمرة مقبولة وسعيًا مشكورًا`,
  },
  en: {
    header: "Your Assistant for the Umrah Journey",
    description:
      "Assisting you at the Tawaf and Sa'i stage of your 'Umrah with more than 170 supplications in textual and audio format . ",
    confirmLabel: "Begin your ‘Umrah",
    conditionsStatment: `Dear Guests of Ar-Rahman To ensure your comfort and to ease the performance of your rites of worship, please adhere to the following guidelines: `,
    firstConds: `Obtain the ‘Umrah permit via the ‘Nusk’ app before heading to the Grand Mosque.`,
    secndConds: `Please use earphones when listening to supplications or adhkar to maintain the comfort of pilgrims and those who have come to pray.`,
    thirdConds: `Please avoid the use of screen translation programs to ensure optimal content quality during your browsing of this service.`,
    consclusion: `We ask Allah to accept your ‘Umrah and reward you for your efforts.`,
  },
  fr: {
    header: "Votre Assistant pour le Voyage de la Omra",
    description: `Durant le voyage de la Omra, une assistance virtuelle de plus de 170 invocations écrites et audios vous accompagne tout au long du Tawaf et du Sa’i.`,
    confirmLabel: "Commencez la Omra",
    conditionsStatment: `Chers hôtes du Tout Miséricordieux,
Pour votre confort et afin de faciliter l’accomplissement de vos rites, nous vous prions de bien respecter les directives suivantes :`,
    firstConds: `Obtenez votre permis de la Omra via l’application Nusuk avant de vous rendre à la Mosquée Sacrée.`,
    secndConds: `Utilisez des écouteurs pour écouter les invocations, afin de préserver la sérénité des lieux pour les fidèles et les pèlerins.`,
    thirdConds: `Pour profiter pleinement du contenu de la plateforme, nous vous recommandons de ne pas utiliser d'applications de traduction d'écran.`,
    consclusion: `Qu’Allah accepte votre Omra et récompense votre effort !`,
  },
  tr: {
    header: "Umre Yolculuğunuzda Yardımcınız",
    description: `Tavâf ve Sa’y esnasında yazılı ve işitsel 170'ten fazla dua ile umre yolculuğunda sizin yardımcınız olmaktadır.`,
    confirmLabel: "Umreye Başla",
    conditionsStatment: `Rahman olan Allah’ın Kıymetli Misafirleri,
Rahatınızı ve ibadetlerinizi kolaylıkla yerine getirebilmenizi sağlamak için lütfen aşağıdaki kurallara uyunuz:`,
    firstConds: `Mescid-i Haram’a gitmeden önce umre izninizi “Nusuk” uygulaması üzerinden çıkartınız.`,
    secndConds: `Cemaatin ve umrecilerin huzurunu korumak adına duaları dinlerken kulaklık kullanınız. `,
    thirdConds: `Hizmet hakkında sunulan içeriğin kalitesini korumak için göz gezdirirken ekran çeviri programlarını kullanmaktan kaçınınız.`,
    consclusion: `Allah’tan umrenizi kabul etmesini ve gayretlerinizin karşılığını vermesini niyaz ederiz.`,
  },
  ur: {
    header: "سفر عمرہ میں آپ کا معاون",
    description:
      " سفر عمرہ میں آپ کا معاون، طواف و سعی کے دوران ٹیکسٹ اور آڈیو کی شکل میں 170 سے زیادہ دعاؤں کے ساتھ .",
    confirmLabel: "عمرہ شروع کریں",
    conditionsStatment: `رحمن کے مہمانو!
 آپ اپنی راحت اور عبادت کی ادائیگی میں سہولت کے پیش نظرہم امید کرتے ہیں کہ درج ذیل تعلمیات کی پابندی کریں:`,
    firstConds: `مسجد حرام جانے سے پہلے "نسک" ایپ کے ذریعہ عمرہ کی  تصریح (پرمیشن) نکال لیں۔`,
    secndConds: `دعاؤں کو سنتے وقت ایئرفون کا استعمال کریں؛ تاکہ دیگر نمازیوں اور عمرہ کرنے والوں کی راحت کا خیال رکھا جايے۔`,
    thirdConds: `خدمت کو براؤز کرتے وقت مواد کے معیاری ڈسپلے کو یقینی بنانے کے لیے اسکرین ٹرانسلیشن پروگراموں کے استعمال سے گریز کریں۔`,
    consclusion: `ہم اللہ سے آپ کے لیے مقبول عمرہ اور قابل قدر کوشش کی دعا کرتے ہیں۔`,
  },
  in: {
    header: "Bahasa Indonesia Assistant",
    description: `Membantu anda dalam perjalanan umrah dengan himpunan lebih dari 170 doa, baik teks maupun audio saat melakukan tawaf dan sai.`,
    confirmLabel: "Silakan memulai ibadah umrah",
    conditionsStatment: `Para tamu Allah yang terhormat
Demi kenyamanan dan kemudahan dalam melaksanakan ibadah anda, kami mohon untuk mengikuti petunjuk-petunjuk berikut:`,
    firstConds: `Menerbitkan izin umrah melalui aplikasi "Nusuk" sebelum menuju Masjidil Haram.`,
    secndConds: `Menggunakan earphone saat mendengarkan doa-doa, demi kenyamanan jamaah shalat dan umrah.`,
    thirdConds: `Hindari penggunaan aplikasi penerjemah layar untuk memastikan kualitas tampilan konten saat mengakses layanan ini.`,
    consclusion: `Kami memohon kepada Allah agar menerima umrah anda dan memberikan pahala yang besar.`,
  },
  mal: {
    header: "Bahasa Melayu Assistant",
    description: `Panduan Perjalanan Umrah Anda semasa tawaf dan sa'i yang dilengkapi dengan lebih 170 jenis doa berbentuk teks dan audio.`,
    confirmLabel: "Sila mulakan ibadat umrah anda",
    conditionsStatment: `Para Dhuyufurrahman,
bagi memastikan pelaksanaan ibadah umrah anda berjalan dengan mudah dan lancar, anda boleh:`,
    firstConds: `Memohon permit umrah melalui aplikasi "Nusuk" sebelum anda menuju ke Masjidil Haram.`,
    secndConds: `Anda juga boleh menggunakan fon telinga (earphone) untuk mendengar pelbagai jenis doa, bagi memastikan keselesaan para jemaah yang lain.`,
    thirdConds: `Elakkan daripada menggunakan aplikasi terjemahan skrin bagi memastikan kualiti kandungan perkhidmatan semasa anda menggunakan perkhidmatan ini.`,
    consclusion: `Semoga Allah menerima ibadah umrah anda dan memberkati segala usaha anda.`,
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

const Popup = ({ setLang, lang, setDir, dir: pageDir }) => {
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
              style={{ direction: pageDir }}
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
              fontSize="sm"
              fontWeight="bold"
              textAlign="center"
              color="gray.800"
              px={4}
              lineHeight="1.5"
              style={{ direction: pageDir }}
            >
              {textContent[lang].conditionsStatment}
            </Text>
            <Text
              fontSize="xs"
              color="gray.600"
              px={4}
              lineHeight="1.5"
              style={{ direction: pageDir }}
              textAlign="justify"
            >
              <ol style={{ direction: pageDir }}>
                <li style={{ direction: pageDir }}>
                  {textContent[lang].firstConds}
                </li>
                <li style={{ direction: pageDir }}>
                  {textContent[lang].secndConds}
                </li>
                <li style={{ direction: pageDir }}>
                  {textContent[lang].thirdConds}
                </li>
              </ol>
            </Text>
            <Text
              fontSize="sm"
              textAlign="center"
              color="gray.600"
              px={4}
              lineHeight="1.5"
              style={{ direction: pageDir }}
            >
              {textContent[lang].consclusion}
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
