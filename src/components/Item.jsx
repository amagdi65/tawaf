import {
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  Box,
  Text,
  Button,
  Flex,
  useToast,
  AccordionIcon,
} from "@chakra-ui/react";
import styled from "@emotion/styled";
import CounterCard from "./CounterCard";
import PrayerCard from "./PrayerCard";
import usePersistedState from "../hooks/usePersistedState";
import { useState } from "react";
import Location from "./Location";
import Congrats from "./Congrats";
import { CustomToast } from "./CustomTwist";
const Icon = styled.img`
  width: 48px;
  height: 48px;
`;

const IconContainer = styled.div`
  position: relative;
  &::before {
    content: "${(props) => (props.number ? props.number : "")}";
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
  prevButton,
  nextButton,
  mode,
  curIndex,
  audio,
  autoPlay,
  modalTitle,
  closeTitle,
  modalBody,
  addresses,
  disableNext,
  type,
  icon,
  cardPrayerTitle,
  showFinalMessage,
  disablePrev,
  toggleIndex,
  setToggleIndex,
  // pageName,
}) {
  const [count, setCount] = usePersistedState(counterName, 0);
  const [page, setPage] = useState(0);
  const [fontSize, setFontSize] = useState(18);
  const [isPaused, setIsPaused] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const totalPages = prayerData?.length - 1;
  const toast = useToast();
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
          <Icon src={icon} />
          {/* <IconContainer number={number} dir={dir}>
          </IconContainer> */}
        </>
      );
    }
    return (
      <>
        {/* <IconContainer number={number} dir={dir}> */}
        <Icon src={icon} />
        {/* </IconContainer> */}
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
    if (toggleIndex > 2) {
      setToggleIndex(toggleIndex - 2);
      setIndex(() => toggleIndex - 2);
    }
  };

  const handleNextClick = () => {
    if ((count === 7 || !useCount) && setIndex) {
      setIndex(toggleIndex);
      setToggleIndex(toggleIndex);
    } else {
      const toastId = `custom-toast-${Date.now()}`;
      toast({
        id: toastId,
        render: (props) => (
          <CustomToast
            {...props}
            dir={dir}
            mode={mode}
            lang={lang}
            messageKey="counterError"
          />
        ),
        duration: 3000,
        isClosable: true,
        position: dir === "ltr" ? "top" : "top",
      });

      setTimeout(() => toast.close(toastId), 3000);
    }

    if (showFinalMessage) {
      setIsOpen(true);

      const keysToKeep = ["uuid", "mode", "lang", "dir"];

      const preservedData = {};
      keysToKeep.forEach((key) => {
        preservedData[key] = localStorage.getItem(key);
      });

      localStorage.clear();

      Object.keys(preservedData).forEach((key) => {
        localStorage.setItem(key, preservedData[key]);
      });
    }
  };

  return (
    <AccordionItem
      {...(mode === "dark" && { border: "1px solid #1a232d" })}
      borderRadius="10px"
      style={{ display: hidden }}
      backgroundColor={mode === "dark" ? "#1a232d" : ""}
    >
      <AccordionButton
        justifyContent="space-between"
        style={{ direction: dir }}
        bgColor={mode === "dark" ? "#2C3743" : "#F8F8F8"}
        {...(mode === "dark" && { border: "1px solid #3A444F" })}
        borderRadius="10px"
        onClick={() => {
          setToggleIndex((prevToggleIndex) => {
            return prevToggleIndex === toggleIndex - 1 ? 0 : toggleIndex - 1;
          });
        }}
      >
        <Box
          display="flex"
          alignItems="center"
          justifyContent={dir === "rtl" ? "flex-end" : "flex-start"} // Align based on direction
          textAlign={dir === "rtl" ? "right" : "left"}
        >
          {renderContent(dir)}
        </Box>
        <Box display="flex" flexDir={dir === "ltr" ? "row-reverse" : "row"}>
          <Location
            modalTitle={modalTitle}
            closeTitle={closeTitle}
            modalBody={modalBody}
            addresses={addresses}
            lang={lang}
            mode={mode}
            dir={dir}
            stepId={index - 1}
          />
          <AccordionIcon
            boxSize="24px"
            fontWeight="400"
            {...(mode === "dark" && { color: "white" })}
          />
        </Box>
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
          {useCount === 1 && (
            <Box flex={1}>
              <CounterCard
                count={count}
                setCount={setCount}
                dir={dir}
                cardTitle={cardCounterTitle}
                mode={mode}
                type={type}
                lang={lang}
              />
            </Box>
          )}

          <Box flex={2}>
            <PrayerCard
              prayerData={prayerData}
              lang={lang}
              dir={dir}
              mode={mode}
              page={page}
              setPage={setPage}
              fontSize={fontSize}
              setIsPaused={setIsPaused}
              totalPages={totalPages}
              autoPlay={autoPlay}
              modalTitle={modalTitle}
              closeTitle={closeTitle}
              modalBody={modalBody}
              addresses={addresses}
              setFontSize={setFontSize}
              isPaused={isPaused}
              audio={audio}
              cardPrayerTitle={cardPrayerTitle}
            />
          </Box>
        </Flex>
        <Box
          display="flex"
          justifyContent="space-between"
          margin={{ base: 0, md: 10 }}
          marginTop={{ base: 10, md: 10 }}
          flexDir={
            disablePrev
              ? dir === "ltr"
                ? "row"
                : "row-reverse"
              : dir === "ltr"
              ? "row-reverse"
              : "row"
          }
        >
          {!disablePrev && (
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
          )}
          {(!disableNext || showFinalMessage) && (
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
          )}
        </Box>
        {isOpen && (
          <Congrats
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            lang={lang}
            dir={dir}
            mode={mode}
          />
        )}
      </AccordionPanel>
    </AccordionItem>
  );
}

export default Item;
