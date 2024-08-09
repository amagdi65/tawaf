import { Accordion, Box } from "@chakra-ui/react";
import Item from "../components/Item";
import Separator from "../components/Separator";
import { data as seeks } from "../data/doaa/seeks";
import { data as tawaf } from "../data/doaa/tawaf";
import { data as shaving } from "../data/doaa/shaving";
import { data as pray } from "../data/doaa/pray";
import { useState } from "react";
import { mainData } from "../data/mainData";

function ManasekPage({ lang, dir, mode }) {
  const [index, setIndex] = useState(1);

  const items = [
    {
      index: 2,
      title: mainData[lang]["tawaf"],
      prayerData: tawaf,
      useCount: true,
      cardCounterTitle: mainData[lang]["circuits"],
      cardPrayerTitle: mainData[lang]["supplications"],
      counterName: `manasekCounter_${lang}`,
      audio: "assets/tawaf",
      audioStart: 1,
    },
    {
      index: 3,
      title: mainData[lang]["prayingTwoRakahs"],
      cardPrayerTitle: mainData[lang]["prayingTwoRakahsTitle"],
      prayerData: pray,
    },
    {
      index: 4,
      title: mainData[lang]["sai"],
      prayerData: seeks,
      useCount: true,
      cardCounterTitle: mainData[lang]["circuits"],
      cardPrayerTitle: mainData[lang]["supplications"],
      counterName: `manasek2Counter_${lang}`,
      audio: "assets/sai",
      audioStart: 81,
    },
    {
      index: 5,
      title: mainData[lang]["shavingOrTrimming"],
      prayerData: shaving,
      cardPrayerTitle: mainData[lang]["shavingOrTrimmingTitle"],
    },
  ];

  return (
    <Box height="100%" overflowY="auto">
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
            />
            {idx < items.length - 1 && <Separator dir={dir} />}
          </Box>
        ))}
      </Accordion>
    </Box>
  );
}

export default ManasekPage;
