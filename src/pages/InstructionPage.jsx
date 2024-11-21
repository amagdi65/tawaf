import { Accordion, Box } from "@chakra-ui/react";
import Separator from "../components/Separator";
import Item from "../components/Item";

import { useEffect, useState } from "react";
import { mainData } from "../data/metaData/mainData";
// import StepperComp from "../components/StepperComp";

import { items } from "../data/metaData/items";

function InstructionPage({ lang, dir, mode }) {
  const [index, setIndex] = useState(1);


  const [data,setData] = useState([]);
 
  useEffect(()=>{
    items('instructionsPage')({lang}).then((res)=>{
      setData(res);
    });
  },[lang])
  return (
    <Box height="100%" overflowY="auto">
      {/* <StepperComp
        steps={
          data &&
          data.map((item) => ({
            label: item.title,
            dir: dir,
            setIndex,
            icon: item.icon,
          }))
        }
      ></StepperComp> */}
      <Accordion
        allowToggle
        {...(index <= data.length && { index: [index] })}
        mt="90px"
        ml={5}
        mr={5}
        lang={lang}
      >
        <Item hidden="none" />
        {data &&
          data.map((item, idx) => (
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
                disableNext={item.disableNext}
                icon={item.icon}
              />
              {idx < data.length - 1 && <Separator dir={dir} />}
            </Box>
          ))}
      </Accordion>
    </Box>
  );
}

export default InstructionPage;
