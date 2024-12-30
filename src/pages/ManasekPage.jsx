import { Accordion, Box } from "@chakra-ui/react";
import Item from "../components/Item";
import Separator from "../components/Separator";
import { useEffect, useState } from "react";
import { mainData } from "../data/metaData/mainData";
import StepperComp from "../components/StepperComp";
import icon from "../assets/2.svg";

import { items } from "../data/metaData/items";

function ManasekPage({ lang, dir, mode }) {
  const [index, setIndex] = useState(0);
  const [data, setData] = useState([]);
  const [toggleIndex , setToggleIndex] = useState(0);
  useEffect(() => {
    items("manasekPage")({ lang }).then((res) => {
      setData(res);
    });
  }, [lang, dir]);

  return (
    <Box height="100%" overflowY="auto">
      <StepperComp mode={mode} index={index} dir={dir}></StepperComp>
      <Accordion
        allowToggle
        collapsible
        index={toggleIndex}
        mt="20px"
        ml={5}
        mr={5}
        lang={lang}
        mode={mode}
      >
        <Item hidden="none" index={0}/>

        {data &&
          data.map((item, idx) => (
            <Box key={item.index}>
              <Item
                index={item.index}
                setIndex={setIndex}
                setToggleIndex={setToggleIndex}
                toggleIndex={item.index}
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
          ))}
      </Accordion>
    </Box>
  );
}

export default ManasekPage;
