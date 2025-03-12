import {
  Box,
  Text,
  Button,
  Flex,
  useToast,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Image,
} from "@chakra-ui/react";
import styled from "@emotion/styled";
import CounterCard from "./CounterCard";
import PrayerCard from "./PrayerCard";
import usePersistedState from "../hooks/usePersistedState";
import { useState } from "react";
import AddressesList from "./AddressesList";

import { CustomToast } from "./CustomTwist";
import LocationIcon from "../assets/Location.svg";
import { mainData } from "../data/metaData/mainData";

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

function CardSection({
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
  setIsOpen,
}) {
  const [count, setCount] = usePersistedState(counterName, 0);
  const [page, setPage] = useState(0);
  const [fontSize, setFontSize] = useState(18);
  const [isPaused, setIsPaused] = useState(true);

  const totalPages = prayerData?.length - 1;
  const toast = useToast();

  const renderContent = (dir) => (
    <Flex align="center">
      {dir !== "ltr" && (
        <IconContainer number={number}>
          <Icon src={icon} />
        </IconContainer>
      )}
      <Text
        fontSize={{ base: "13px", md: "24px" }}
        fontWeight="700"
        mx={4}
        style={{ direction: dir }}
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
      {dir === "ltr" && (
        <IconContainer number={number}>
          <Icon src={icon} />
        </IconContainer>
      )}
    </Flex>
  );

  const handlePrevClick = () => {
    setIndex((prevIndex) => prevIndex - 1);
    console.log(index);
  };

  const handleNextClick = () => {
    if ((count === 7 || !useCount) && setIndex) {
      setIndex((prevIndex) => prevIndex + 1);
      console.log(index);
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
    <>
      <Card
        borderRadius="lg"
        boxShadow="md"
        overflow="hidden"
        mt={15}
        w="100%"
        style={{ display: hidden }}
        bgColor={mode === "dark" ? "#28323F" : "#EDEDED"}
        border={mode === "dark" ? "1px solid #3A444F" : "1px solid #E2E8F0"}
      >
        <CardHeader p={0}>
          <Heading
            style={{ direction: dir }}
            display="flex"
            alignItems="center"
            size="md"
            p={2}
            bgColor={mode === "dark" ? "#2C3743" : "#F8F8F8"}
          >
            {renderContent(dir)}
          </Heading>
        </CardHeader>

        <CardBody>
          <Flex direction={{ base: "column", md: "row" }} gap={8}>
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
          <Accordion allowToggle w="100%">
            <AccordionItem border="none">
              <h2>
                <AccordionButton
                  mt={20}
                  py={5}
                  borderRadius="md"
                  bgColor={mode === "dark" ? "#2C3743" : "#F8F8F8"}
                  justifyContent="space-between"
                  style={{ direction: dir }}
                >
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    textAlign={dir === "ltr" ? "left" : "right"}
                    fontWeight="bold"
                  >
                    <Flex alignItems="center" style={{ direction: dir }}>
                      <Image
                        src={LocationIcon}
                        boxSize={{ base: "16px", md: "24px" }}
                        borderRadius={10}
                      />
                      <Text color="#BC9761">
                        {mainData[lang].intersetLocations}
                      </Text>
                    </Flex>
                  </Box>
                  <Box
                    display="flex"
                    flexDir={dir === "ltr" ? "row-reverse" : "row"}
                  >
                    <AccordionIcon />
                  </Box>
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4} px={4} borderRadius="md">
                <AddressesList
                  addresses={addresses}
                  lang={lang}
                  dir={dir}
                  mode={mode}
                  modalBody={modalBody}
                />
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </CardBody>
      </Card>
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
    </>
  );
}

export default CardSection;
