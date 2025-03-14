import { Box, IconButton, Text, Stack } from "@chakra-ui/react";
import { ArrowForwardIcon, ArrowBackIcon } from "@chakra-ui/icons";
import PrayerIcons from "./PrayerIcons";
import { log } from "../logRequest";

const PrayerCard = ({
  prayerData,
  lang,
  dir,
  mode,
  page,
  setPage,
  fontSize,
  totalPages,
  setIsPaused,
  autoPlay,
  modalTitle,
  closeTitle,
  modalBody,
  addresses,
  setFontSize,
  isPaused,
  audio,
  cardPrayerTitle,
}) => {
  const navigatePage = (direction) => {
    log(
      1,
      JSON.parse(localStorage.getItem("uuid")),
      lang,
      prayerData[page]["doaa_id"]
    );
    if (direction === "next" && page < totalPages) {
      setPage(page + 1);
    } else if (direction === "prev" && page > 0) {
      setPage(page - 1);
    }
    setIsPaused(true);
  };

  const backForIconStyle = {
    boxSize: 8,
    color: "#BC9761",
  };

  return (
    <Box
      padding="20px"
      boxShadow="md"
      borderRadius="md"
      width="100%"
      height={{ base: "400px", md: "258px" }}
      position="relative"
      backgroundColor={mode === "dark" ? "#2C3743" : "#f5f5f5"}
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      _before={{
        content: `"${
          (prayerData && prayerData[page]["subtitle"][lang]) || cardPrayerTitle
        }"`,
        bgColor: mode === "dark" ? "#232C35" : "#EBEBEB",
        position: "absolute",
        top: { base: "50px", md: "48px" },
        ...(dir === "ltr" ? { left: 0 } : { right: 0 }),
        padding: "5px 10px",
        borderRadius: "5px 0 0 5px",
        fontSize: { base: "11px", md: "lg" },
        fontWeight: "bold",
        height: { base: "24px", md: "32px" },
        textAlign: "center",
        color: mode === "dark" ? "white" : "#1F2A37",
      }}
      style={{ direction: dir }}
      sx={{
        /* Custom scrollbar for dark mode */
        "&::-webkit-scrollbar": {
          width: "8px",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: mode === "dark" ? "#555" : "#ccc",
          borderRadius: "4px",
        },
        "&::-webkit-scrollbar-track": {
          backgroundColor: mode === "dark" ? "#2C3743" : "#f5f5f5",
        },
      }}
    >
      <PrayerIcons
        autoPlay={autoPlay}
        modalTitle={modalTitle}
        closeTitle={closeTitle}
        modalBody={modalBody}
        addresses={addresses}
        setFontSize={setFontSize}
        page={page}
        isPaused={isPaused}
        audio={audio}
        setIsPaused={setIsPaused}
        totalPages={totalPages}
        setPage={setPage}
        prayerData={prayerData}
        lang={lang}
        dir={dir}
        mode={mode}
      />
      <Stack
        justifyContent={"center"}
        alignItems="center"
        height={{ base: "230px", md: "260px" }}
      >
        <Text
          margin={{ base: 0, md: 4 }}
          marginTop={4}
          marginBottom={4}
          textAlign={dir === "ltr" ? "left" : "right"}
          color={mode === "dark" ? "white" : "#1F2A37"}
          fontSize={`${fontSize}px`}
          lineHeight="1.8"
          overflowY="auto"
          sx={{
            "&::-webkit-scrollbar": {
              width: "6px",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: mode === "dark" ? "#555" : "#ccc",
              borderRadius: "3px",
            },
            "&::-webkit-scrollbar-track": {
              backgroundColor: mode === "dark" ? "#2C3743" : "#f5f5f5",
            },
          }}
          style={{
            direction: dir,
          }}
        >
          {prayerData && prayerData[page][lang]}
        </Text>
      </Stack>

      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        style={{ direction: dir }}
      >
        <IconButton
          icon={
            dir === "ltr" ? (
              <ArrowBackIcon {...backForIconStyle} />
            ) : (
              <ArrowForwardIcon {...backForIconStyle} />
            )
          }
          aria-label="Previous"
          onClick={() => navigatePage("prev")}
          size="lg"
          isDisabled={page === 0}
          {...(mode === "dark" && { backgroundColor: "transparent" })}
        />
        <Text
          fontSize="lg"
          color={mode === "dark" ? "white" : "#333D49"}
          style={{
            direction: dir,
          }}
        >
          {page + 1} / {totalPages + 1}
        </Text>
        <IconButton
          icon={
            dir === "ltr" ? (
              <ArrowForwardIcon {...backForIconStyle} />
            ) : (
              <ArrowBackIcon {...backForIconStyle} />
            )
          }
          aria-label="Next"
          onClick={() => navigatePage("next")}
          size="lg"
          {...(mode === "dark" && { backgroundColor: "transparent" })}
          isDisabled={page === totalPages}
        />
      </Box>
    </Box>
  );
};

export default PrayerCard;
