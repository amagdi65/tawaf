import { Accordion, Box } from "@chakra-ui/react";
import Separator from "../components/Separator";
import Item from "../components/Item";
import { data as tahya } from "../data/adaab/tahyetMasged";
import { data as ihram } from "../data/adaab/ihram";
import { data as zamzam } from "../data/adaab/zamzam";
import { data as sonan } from "../data/adaab/sonan";
import { data as mahzorat } from "../data/adaab/mahzorat";
import { useState } from "react";
import { mainData } from "../data/mainData";
import StepperComp from "../components/StepperComp";

import Ihram from '../assets/ihram icon.svg';
import Mahzor from '../assets/mahzorat icon.svg';
import Sonan from '../assets/sonan icon.svg';
import tahiat from '../assets/tahit masged icon.svg';
import Zam from '../assets/zamzan icon.svg';

function InstructionPage({ lang, dir, mode }) {
  const [index, setIndex] = useState(1);

  const items = [
    {
      index: 2,
      title: mainData[lang]["ihram"],
      prayerData: ihram,
      number: 1,
      icon: Ihram

    },
    {
      index: 3,
      title: mainData[lang]["sunnah"],
      prayerData: sonan,
      number: 2,
      icon: Sonan

    },
    {
      index: 4,
      title: mainData[lang]["prohibitions"],
      prayerData: mahzorat,
      number: 3,
      icon: Mahzor

    },
    {
      index: 5,
      title: mainData[lang]["greetingPrayer"],
      prayerData: tahya,
      number: 4,
      icon: tahiat
    },
    {
      index: 6,
      title: mainData[lang]["zamzam"],
      prayerData: zamzam,
      number: 5,
      icon: Zam
    },
  ];

  return (
    <Box height="100%" overflowY="auto">
      <StepperComp
        steps={items.map((item) => ({
          label: item.title,
          dir: dir,
          setIndex,
          icon: item.icon,
        }))}
      ></StepperComp>
      <Accordion
        allowToggle
        {...(index <= 5 && { index: [index] })}
        mt="90px"
        ml={5}
        mr={5}
        lang={lang}
      >
        <Item hidden="none" />
        {items.map((item, idx) => (
          <Box key={item.index}>
            <Item
              index={item.index}
              setIndex={setIndex}
              title={item.title}
              cardPrayerTitle={item.title}
              number={item.number}
              prayerData={item.prayerData}
              lang={lang}
              dir={dir}
              prevButton={mainData[lang]["previous"]}
              nextButton={mainData[lang]["next"]}
              mode={mode}
              curIndex={index}
            />
            {idx < items.length - 1 && <Separator dir={dir} />}
          </Box>
        ))}
      </Accordion>
    </Box>
  );
}

export default InstructionPage;
