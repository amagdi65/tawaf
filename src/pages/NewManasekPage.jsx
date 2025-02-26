import { Accordion, Box } from "@chakra-ui/react";
import CardSection from "../components/CardSection";
import Separator from "../components/Separator";
import { useEffect, useState } from "react";
import { mainData } from "../data/metaData/mainData";
import StepperComp from "../components/StepperComp";
import icon from "../assets/2.svg";

import { items } from "../data/metaData/items";

function NewManasekPage({ lang, dir, mode }) {
  const [index, setIndex] = useState(1);
  const [data, setData] = useState([]);
  useEffect(() => {
    items("manasekPage")({ lang }).then((res) => {
      setData(res);
    });
  }, [lang, dir]);

  return (
    <Box height="100%" overflowY="auto" dir={dir}>
      <StepperComp mode={mode} index={index} dir={dir}></StepperComp>

      <Box mt="50px" ml={5} mr={5} lang={lang} mode={mode}>
        {data &&
          data.map(
            (item, idx) =>
              index + 1 == item.index && (
                <Box key={item.index}>
                  <CardSection
                    index={item.index}
                    setIndex={setIndex}
                    title={item.title}
                    number={idx + 1}
                    prayerData={item.prayerData}
                    useCount={item.useCount}
                    cardCounterTitle={item.cardCounterTitle}
                    cardPrayerTitle={item.title}
                    counterName={item.counterName}
                    lang={lang}
                    dir={dir}
                    prevButton={mainData[lang]["previous"]}
                    nextButton={
                      item.showFinalMessage
                        ? mainData[lang]["endUmrah"]
                        : mainData[lang]["next"]
                    }
                    mode={mode}
                    curIndex={index}
                    audio={item.audio}
                    autoPlay={item.autoPlay}
                    modalBody={item.modalBody}
                    modalTitle={item.modalTitle}
                    closeTitle={item.closeTitle}
                    addresses={item.addresses}
                    disableNext={item.disableNext}
                    disablePrev={item.disablePrev}
                    type={item.type}
                    icon={icon}
                    showFinalMessage={item.showFinalMessage}
                  />
                  {idx < data.length - 1 && <Separator dir={dir} />}
                </Box>
              )
          )}
      </Box>
    </Box>
  );
}

export default NewManasekPage;
