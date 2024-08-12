import {
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  Box,
  Text,
  Button,
  Flex,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import styled from "@emotion/styled";
import CounterCard from "./CounterCard";
import PrayerCard from "./PrayerCard";
import usePersistedState from "../hooks/usePersistedState";
import icon from "../assets/2.svg";

const Icon = styled.img`
  width: 48px;
  height: 48px;
`;

const IconContainer = styled.div`
  position: relative;
  &::before {
    content: "${(props) => props.number}";
    position: absolute;
    left: 38%;
    top: 20%;
    font-size: 20px;
    font-weight: 400;
    color: #cbaf86;
  }
`;

const buttonHoverStyle = { bgColor: "#BC9761", color: "white", border: "none" };

function Item({
  setIndex,
  index,
  title,
  number,
  prayerData,
  useCount,
  counterName,
  hidden,
  lang,
  dir,
  cardCounterTitle,
  cardPrayerTitle,
  prevButton,
  nextButton,
  mode,
  curIndex,
  audio,
  audioStart,
  autoPlay,
}) {
  const [count, setCount] = usePersistedState(counterName, 0);
  const renderContent = (dir) => {
    if (dir === "ltr") {
      return (
        <>
          <Text
            fontSize={{ base: "13px", md: "24px" }}
            fontWeight={{ base: "700", md: "400px" }}
            {...(dir === "ltr" ? { ml: 4 } : { mr: 4 })}
            color={
              index <= curIndex + 1
                ? "#BC9761"
                : mode === "dark"
                ? "white"
                : "black"
            }
          >
            {title}
          </Text>
          <IconContainer number={number} dir={dir}>
            <Icon src={icon} />
          </IconContainer>
        </>
      );
    }
    return (
      <>
        <IconContainer number={number} dir={dir}>
          <Icon src={icon} />
        </IconContainer>
        <Text
          fontSize={{ base: "13px", md: "24px" }}
          fontWeight={{ base: "700", md: "400px" }}
          {...(dir === "ltr" ? { ml: 4 } : { mr: 4 })}
          color={
            index <= curIndex + 1
              ? "#BC9761"
              : mode === "dark"
              ? "white"
              : "black"
          }
        >
          {title}
        </Text>
      </>
    );
  };

  const handlePrevClick = () => {
    if (index > 2) setIndex((prevIndex) => prevIndex - 1);
  };

  const handleNextClick = () => {
    if ((count === 7 || !useCount) && setIndex(index)) setIndex(index);
  };

  return (
    <AccordionItem
      {...(mode === "dark" && { border: "1px solid #3A444F" })}
      borderRadius="10px"
      style={{ display: hidden }}
      backgroundColor={mode === "dark" ? "#28323F" : ""}
    >
      <AccordionButton
        justifyContent="space-between"
        style={{ direction: dir }}
        bgColor={mode === "dark" ? "#2C3743" : "#F8F8F8"}
        {...(mode === "dark" && { border: "1px solid #3A444F" })}
        borderRadius="10px"
        onClick={() => setIndex(index - 1)}
      >
        <Box display="flex" alignItems="center" justifyContent="center">
          {renderContent(dir)}
        </Box>
        <ChevronDownIcon
          boxSize="24px"
          fontWeight="400"
          {...(mode === "dark" && { color: "white" })}
        />
      </AccordionButton>
      <AccordionPanel>
        <Flex
          direction={{ base: "column", md: "row" }}
          align="stretch"
          margin={{ base: 0, md: 10 }}
          gap={8}
          alignItems="stretch"
          style={{ direction: dir }}
        >
          {useCount && (
            <Box flex={1}>
              <CounterCard
                count={count}
                setCount={setCount}
                dir={dir}
                cardTitle={cardCounterTitle}
                mode={mode}
              />
            </Box>
          )}
          <Box flex={2}>
            <PrayerCard
              prayerData={prayerData}
              lang={lang}
              dir={dir}
              cardTitle={cardPrayerTitle}
              mode={mode}
              audio={audio}
              audioStart={audioStart}
              autoPlay={autoPlay}
            />
          </Box>
        </Flex>
        <Box
          display="flex"
          justifyContent="space-between"
          margin={{ base: 0, md: 10 }}
          marginTop={{ base: 10, md: 10 }}
          style={{ direction: dir }}
        >
          <Button
            size="lg"
            color={mode === "dark" ? "white" : "#BC9761"}
            border={mode === "dark" ? "1px solid #aaa" : "1px solid #BC9761"}
            bgColor={mode === "dark" ? "#1F2A37" : "white"}
            _hover={buttonHoverStyle}
            onClick={handlePrevClick}
          >
            {prevButton}
          </Button>
          <Button
            size="lg"
            color={mode === "dark" ? "white" : "#BC9761"}
            border={mode === "dark" ? "1px solid #aaa" : "1px solid #BC9761"}
            bgColor={mode === "dark" ? "#1F2A37" : "white"}
            _hover={buttonHoverStyle}
            _active={buttonHoverStyle}
            isActive={(count === 7 || !useCount) && "active"}
            onClick={handleNextClick}
            mb={{ base: 4, md: 0 }}
          >
            {nextButton}
          </Button>
        </Box>
      </AccordionPanel>
    </AccordionItem>
  );
}

export default Item;
