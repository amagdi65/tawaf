import { Accordion, Box } from "@chakra-ui/react";
import Item from "../components/Item";
import Separator from "../components/Separator";
import { data as seeks } from "../data/doaa/seeks";
import { data as tawaf } from "../data/doaa/tawaf";
import { shuffle } from "lodash";
import { data as shaving } from "../data/doaa/shaving";
import { data as pray } from "../data/doaa/pray";
import { useState } from "react";
import { mainData } from "../data/mainData";
import StepperComp from "../components/StepperComp";
import Halq from "../assets/halq icon.svg";
import Saay from "../assets/saay icon.svg";
import Tawaf from "../assets/tawaf icon.svg";
import Makam from "../assets/makam icon.svg";
import { addresses } from "../data/addressesData";
import halq from '../assets/halq.svg';
import sai from '../assets/saay.svg';
import tawa from '../assets/tawaf.svg';
import makam from '../assets/makam.svg';

function ManasekPage({ lang, dir, mode }) {
  const [index, setIndex] = useState(1);

  const items = [
    {
      index: 2,
      title: mainData[lang]["tawaf"],
      prayerData: shuffle(tawaf),
      useCount: true,
      cardCounterTitle: mainData[lang]["circuits"],
      cardPrayerTitle: mainData[lang]["supplications"],
      counterName: `manasekCounter_${lang}`,
      audio: "assets/tawaf",
      audioStart: 1,
      autoPlay: mainData[lang]["autoPlay"],
      icon: Tawaf,
      modalTitle: mainData[lang]["location"],
      closeTitle: mainData[lang]["closeTitle"],
      modalBody: tawa,
      addresses: addresses.tawaf
    },
    {
      index: 3,
      title: mainData[lang]["prayingTwoRakahs"],
      cardPrayerTitle: mainData[lang]["prayingTwoRakahsTitle"],
      prayerData: pray,
      icon: Makam,
      modalTitle: mainData[lang]["location"],
      closeTitle: mainData[lang]["closeTitle"],
      modalBody: makam,
      addresses: addresses.pray

    },
    {
      index: 4,
      title: mainData[lang]["sai"],
      prayerData: shuffle(seeks),
      useCount: true,
      cardCounterTitle: mainData[lang]["circuits"],
      cardPrayerTitle: mainData[lang]["supplications"],
      counterName: `manasek2Counter_${lang}`,
      audio: "assets/sai",
      audioStart: 81,
      autoPlay: mainData[lang]["autoPlay"],
      icon: Saay,
      modalTitle: mainData[lang]["location"],
      closeTitle: mainData[lang]["closeTitle"],
      modalBody: sai,
      addresses: addresses.sai

    },
    {
      index: 5,
      title: mainData[lang]["shavingOrTrimming"],
      prayerData: shaving,
      cardPrayerTitle: mainData[lang]["shavingOrTrimmingTitle"],
      icon: Halq,
      modalTitle: mainData[lang]["location"],
      closeTitle:mainData[lang]["closeTitle"],
      modalBody: halq,
      addresses: addresses.halq

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
        {...(index <= 4 && { index: [index] })}
        mt="90px"
        ml={5}
        mr={5}
        lang={lang}
        mode={mode}
      >
        <Item hidden="none" />

        {items.map((item, idx) => (
          <Box key={item.index}>
            <Item
              index={item.index}
              setIndex={setIndex}
              title={item.title}
              number={idx + 1}
              prayerData={item.prayerData}
              useCount={item.useCount}
              cardCounterTitle={item.cardCounterTitle}
              cardPrayerTitle={item.cardPrayerTitle}
              counterName={item.counterName}
              lang={lang}
              dir={dir}
              prevButton={mainData[lang]["previous"]}
              nextButton={mainData[lang]["next"]}
              mode={mode}
              curIndex={index}
              audio={item.audio}
              audioStart={item.audioStart}
              autoPlay={item.autoPlay}
              modalBody={item.modalBody}
              modalTitle={item.modalTitle}
              closeTitle={item.closeTitle}
              addresses={item.addresses}
            />
            {idx < items.length - 1 && <Separator dir={dir} />}
          </Box>
        ))}
      </Accordion>
    </Box>
  );
}

export default ManasekPage;
