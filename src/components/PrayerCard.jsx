import { useRef, useState, useEffect } from "react";
import {
  Box,
  IconButton,
  Text,
  Stack,
  Image,
  Switch,
  useDisclosure,
  Tooltip,
} from "@chakra-ui/react";
import { ArrowForwardIcon, ArrowBackIcon } from "@chakra-ui/icons";
import pauseIcon from "../assets/pause.svg";
import playIcon from "../assets/headphones.svg";
import bigAin from "../assets/font-inc.svg";
import smallAin from "../assets/font-dec.svg";
import pauseIconBlack from "../assets/pauseBlack.svg";
import playIconBlack from "../assets/headphones-black.svg";
import bigAinBlack from "../assets/font-incBlack.svg";
import smallAinBlack from "../assets/font-decBlack.svg";
import location from "../assets/location-dot-solid.svg";
import locationBlack from "../assets/location-black.svg";
import SimpleModal from "./Modal";

// Import maps for each directory
const saiAudioFiles = import.meta.glob("../assets/sai/*.wav");
const tawafAudioFiles = import.meta.glob("../assets/tawaf/*.wav");

// Function to select the correct map based on the `audio` prop
const getAudioMap = (audioPath) => {
  if (audioPath.includes("sai")) {
    return saiAudioFiles;
  } else if (audioPath.includes("tawaf")) {
    return tawafAudioFiles;
  } else {
    return null; // Handle cases where the path doesn't match
  }
};

const PrayerCard = ({
  prayerData,
  lang,
  dir,
  cardTitle,
  mode,
  audioStart,
  audio,
  autoPlay,
  modalTitle,
  closeTitle,
  modalBody,
  addresses
}) => {
  const [page, setPage] = useState(0);
  const [fontSize, setFontSize] = useState(18);
  const [isPaused, setIsPaused] = useState(true);
  const [isAutoplay, setIsAutoplay] = useState(false);
  const totalPages = prayerData?.length - 1;
  const audioRef = useRef(null);
  const [audioSrc, setAudioSrc] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const loadAudio = async () => {
      if (audio && audioStart !== undefined) {
        const audioMap = getAudioMap(audio);
        if (!audioMap) {
          console.error("Invalid audio path:", audio);
          return;
        }
        const audioFileKey = `../${audio}/${prayerData[page]["audioNumber"]}.wav`;
        if (audioMap[audioFileKey]) {
          try {
            const audioModule = await audioMap[audioFileKey]();
            setAudioSrc(audioModule.default);
          } catch (error) {
            console.error("Error loading audio file:", error);
          }
        } else {
          console.error("Audio file not found:", audioFileKey);
          if (isAutoplay && page < totalPages) {
            setPage(page + 1);
          }
        }
      }
    };
    loadAudio();
  }, [page, audio, audioStart, isAutoplay, totalPages]);

  useEffect(() => {
    if (audioRef.current && audioSrc) {
      audioRef.current.load();
      if (!isPaused) {
        audioRef.current.play();
      }
    }
  }, [audioSrc, isPaused]);

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

  const handleFontSizeChange = (size) => {
    setFontSize((prevSize) => Math.max(14, prevSize + size));
  };

  const navigatePage = (direction) => {
    if (direction === "next" && page < totalPages) {
      setPage(page + 1);
    } else if (direction === "prev" && page > 0) {
      setPage(page - 1);
    }
    setIsPaused(true);
  };

  const handleAutoplay = () => {
    if (isAutoplay) {
      setIsAutoplay(false);
      audioRef.current.pause();
      setIsPaused(true);
    } else {
      setIsAutoplay(true);
      setIsPaused(false);
      audioRef.current.play();
    }
  };

  const onAudioEnded = () => {
    if (isAutoplay && page < totalPages) {
      setPage((prevPage) => prevPage + 1);
    } else {
      setIsAutoplay(false);
      setIsPaused(true);
    }
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
      height={{ base: "400px", md: "258px" }}
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
      <audio ref={audioRef} src={audioSrc} hidden onEnded={onAudioEnded} />

      <Stack
        direction="row-reverse"
        mb={3}
        mt={{ base: 0, md: 5 }}
        spacing={2}
        style={{ direction: dir }}
        alignItems="center"
      >
        <Image
          src={getIconSrc("fontDec")}
          alt="Decrease font size"
          onClick={() => handleFontSizeChange(-2)}
          cursor="pointer"
          boxSize={{ base: "28px", md: "42px" }}
        />
        <Image
          src={getIconSrc("fontInc")}
          alt="Increase font size"
          onClick={() => handleFontSizeChange(2)}
          cursor="pointer"
          boxSize={{ base: "28px", md: "42px" }}
        />
        {modalBody && (
          <Image
            src={mode === "dark" ? locationBlack : location}
            alt="Decrease font size"
            onClick={onOpen}
            cursor="pointer"
            boxSize={{ base: "28px", md: "42px" }}
          />
        )}
        <SimpleModal
          onClose={onClose}
          isOpen={isOpen}
          mode={mode}
          modalBody={modalBody}
          modalTitle={modalTitle}
          closeTitle={closeTitle}
          addresses={addresses}
          lang={lang}
          dir={dir}
        ></SimpleModal>
        {audio && (
          <Image
            src={getIconSrc("playPause")}
            alt="Toggle pause"
            onClick={togglePause}
            cursor="pointer"
            boxSize={{ base: "28px", md: "42px" }}
          />
        )}

        {/* New Autoplay toggle */}
        {autoPlay && (
          <Stack direction="row" alignItems="center">
            <Text
              fontSize={{ base: "12px", md: "md" }}
              fontWeight="bold"
              color={mode === "dark" ? "white" : "#333D49"}
              htmlFor="autoplay-switch"
            >
              {/* {autoPlay} */}
            </Text>
            <Tooltip label={autoPlay} placement='top' defaultIsOpen>
            <Switch
              id="autoplay-switch"
              isChecked={isAutoplay}
              onChange={handleAutoplay}
              size="lg"
              dir="rtl"
              sx={{
                "& .chakra-switch__track": {
                  bg: mode === "dark" ? "#232C35" : "",
                },
                "& .chakra-switch__track[data-checked]": {
                  bg: mode === "dark" ? "#BC9761" : "#BC9761",
                },
              }}
            />
            </Tooltip>
            
          </Stack>
        )}
      </Stack>
      <Stack
        justifyContent={"center"}
        alignItems="center"
        height={{ base: "200px", md: "110px" }}
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
