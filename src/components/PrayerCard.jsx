import { useRef, useState, useEffect } from "react";
import { Box, IconButton, Text, Stack, Image } from "@chakra-ui/react";
import { ArrowForwardIcon, ArrowBackIcon } from "@chakra-ui/icons";
import pauseIcon from "../assets/pause.svg";
import playIcon from "../assets/play.svg";
import bigAin from "../assets/font-inc.svg";
import smallAin from "../assets/font-dec.svg";
import pauseIconBlack from "../assets/pauseBlack.svg";
import playIconBlack from "../assets/playBlack.svg";
import bigAinBlack from "../assets/font-incBlack.svg";
import smallAinBlack from "../assets/font-decBlack.svg";

const PrayerCard = ({
  prayerData,
  lang,
  dir,
  cardTitle,
  mode,
  audioStart,
  audio,
}) => {
  const [page, setPage] = useState(0);
  const [fontSize, setFontSize] = useState("md");
  const [isPaused, setIsPaused] = useState(true);
  const totalPages = prayerData?.length - 1;
  const audioRef = useRef(null);
  const [audioSrc, setAudioSrc] = useState("");

  useEffect(() => {
    const loadAudio = async () => {
      if (audio && audioStart) {
        try {
          const audioPath = await import(`${audio}/${page + audioStart}.wav`);
          setAudioSrc(audioPath.default);
        } catch (error) {
          console.error("Error loading audio file:", error);
        }
      }
    };
    loadAudio();
  }, [page, audio, audioStart]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.load();
    }
  }, [audioSrc]);

  const togglePause = async () => {
    if (isPaused) {
      try {
        await audioRef.current.play();
        setIsPaused(false);
      } catch (error) {
        console.error("Error playing audio:", error);
      }
    } else {
      audioRef.current.pause();
      setIsPaused(true);
    }
  };

  const handleFontSizeChange = (size) => setFontSize(size);

  const navigatePage = (direction) => {
    if (direction === "next" && page < totalPages) {
      setPage(page + 1);
    } else if (direction === "prev" && page > 0) {
      setPage(page - 1);
    }
    setIsPaused(true);
  };

  const getIconSrc = (type) => {
    if (type === "playPause") {
      return isPaused
        ? mode === "dark"
          ? playIconBlack
          : playIcon
        : mode === "dark"
        ? pauseIconBlack
        : pauseIcon;
    } else if (type === "fontInc") {
      return mode === "dark" ? bigAinBlack : bigAin;
    } else if (type === "fontDec") {
      return mode === "dark" ? smallAinBlack : smallAin;
    }
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
      height="100%"
      position="relative"
      backgroundColor={mode === "dark" ? "#2C3743" : "#f5f5f5"}
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      _before={{
        content: `"${cardTitle}"`,
        bgColor: mode === "dark" ? "#232C35" : "#EBEBEB",
        position: "absolute",
        top: { base: "20px", md: "48px" },
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
    >
      <audio ref={audioRef} src={audioSrc} hidden />

      <Stack
        direction="row-reverse"
        mb={3}
        mt={{ base: 0, md: 5 }}
        spacing={2}
        style={{ direction: dir }}
      >
        <Image
          src={getIconSrc("fontDec")}
          alt="Decrease font size"
          onClick={() => handleFontSizeChange("md")}
          cursor="pointer"
          boxSize={{ base: "28px", md: "42px" }}
        />
        <Image
          src={getIconSrc("fontInc")}
          alt="Increase font size"
          onClick={() => handleFontSizeChange("lg")}
          cursor="pointer"
          boxSize={{ base: "28px", md: "42px" }}
        />
        {audio && (
          <Image
            src={getIconSrc("playPause")}
            alt="Toggle pause"
            onClick={togglePause}
            cursor="pointer"
            boxSize={{ base: "28px", md: "42px" }}
          />
        )}
      </Stack>
      <Stack>
        <Text
          margin={4}
          textAlign={dir === "ltr" ? "left" : "right"}
          color={mode === "dark" ? "white" : "#1F2A37"}
          fontSize={fontSize}
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
        <Text fontSize="lg" color={mode === "dark" ? "white" : "#333D49"}>
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
