import { Box, Image } from "@chakra-ui/react";
import icon1En from "../assets/stepper/icon_1_en.svg";
import icon1Ar from "../assets/stepper/icon_1_ar.svg";
import icon2En from "../assets/stepper/icon_2_en.svg";
import icon2Ar from "../assets/stepper/icon_2_ar.svg";
import icon3En from "../assets/stepper/icon_3_en.svg";
import icon3Ar from "../assets/stepper/icon_3_ar.svg";
import icon4En from "../assets/stepper/icon_4_en.svg";
import icon4Ar from "../assets/stepper/icon_4_ar.svg";
import icon5En from "../assets/stepper/icon_5_en.svg";
import icon5Ar from "../assets/stepper/icon_5_ar.svg";

const stepperIconsMapper = [
  {
    ltr: icon1En,
    rtl: icon1Ar,
  },
  {
    ltr: icon2En,
    rtl: icon2Ar,
  },
  {
    ltr: icon3En,
    rtl: icon3Ar,
  },
  {
    ltr: icon4En,
    rtl: icon4Ar,
  },
  {
    ltr: icon5En,
    rtl: icon5Ar,
  },
];

const StepperComp = ({ index, dir }) => {
  return (
    <Box
      h="170px"
      display="flex"
      justifyContent="flex-end"
      alignItems="center"
      flexDir="column"
      p={4}
    >
      <Image
        src={stepperIconsMapper[index === 0 ? index : index -1][dir]}
        alt="Step Icon"
        maxW="100%"
        maxH="100%"
        objectFit="contain"
      />
    </Box>
  );
};

export default StepperComp;
