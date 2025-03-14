import { Accordion, Box } from "@chakra-ui/react";
import Separator from "../components/Separator";
import Item from "../components/Item";

import { useEffect, useState } from "react";
import { mainData } from "../data/metaData/mainData";


import { items } from "../data/metaData/items";

function InstructionPage({ lang, dir, mode }) {

  const [index, setIndex] = useState(0);
  const [toggleIndex , setToggleIndex] = useState(0);

  const [data,setData] = useState([]);
  const stepperIcons = import.meta.glob("../assets/stepperIcons/*.svg", {
    eager: true, 
    import: "default",
  });
  useEffect(()=>{
    items('instructionsPage')({lang}).then((res)=>{
      setData(res);
    });
  },[lang])
  return (
    <Box height="100%" overflowY="auto">
      <Accordion
        allowToggle
        index={toggleIndex}
        mt="90px"
        ml={5}
        mr={5}
        mb={10}
        lang={lang}
      >
        <Item hidden="none" />
        {data &&
          data.map((item, idx) => (
            <Box key={item.index}>
              <Item
                index={item.index}
                setIndex={setIndex}
                setToggleIndex={setToggleIndex}
                toggleIndex={item.index}
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
                disablePrev={item.disablePrev}
                icon={stepperIcons[item.icon]}
                pageName='instructions'
              />
              {idx < data.length - 1 && <Separator dir={dir} />}
            </Box>
          ))}
      </Accordion>
    </Box>
  );
}

export default InstructionPage;
