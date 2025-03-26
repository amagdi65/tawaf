import { Image, Stack, Switch } from "@chakra-ui/react";
import pauseIcon from "../assets/pause.svg";
import playIcon from "../assets/headphones.svg";

import pauseIconBlack from "../assets/pauseBlack.svg";
import playIconBlack from "../assets/headphones-black.svg";
import bigAinBlack from "../assets/font-incBlack.svg";
import smallAinBlack from "../assets/font-decBlack.svg";
import bigAin from "../assets/font-inc.svg";
import smallAin from "../assets/font-dec.svg";

import bigAinBlackEn from "../assets/font-incBlack-en.svg";
import smallAinBlackEn from "../assets/font-decBlack-en.svg";
import bigAinEn from "../assets/font-inc-en.svg";
import smallAinEn from "../assets/font-dec-en.svg";

import { useRef, useState, useEffect } from "react";
import { log } from "../logRequest";

const saiAudioFiles = import.meta.glob("../assets/3/*.wav");
const tawafAudioFiles = import.meta.glob("../assets/1/*.wav");
function PrayerIcons({
  mode,
  dir,
  lang,
  autoPlay,
  setFontSize,
  page,
  audio,
  isPaused,
  setIsPaused,
  totalPages,
  setPage,
  prayerData,
}) {
  const audioRef = useRef(null);
  const [audioSrc, setAudioSrc] = useState("");
  const [isAutoplay, setIsAutoplay] = useState(false);

  const getAudioMap = (audioPath) => {
    if (audioPath.includes("3")) {
      return saiAudioFiles;
    } else if (audioPath.includes("1")) {
      return tawafAudioFiles;
    } else {
      return null;
    }
  };

  const togglePause = async () => {
    if (isPaused) {
      try {
        log(
          2,
          JSON.parse(localStorage.getItem("uuid")),
          lang,
          prayerData[page]["doaa_id"]
        );
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
    if (size > 0) {
      log(4, JSON.parse(localStorage.getItem("uuid")), lang);
    } else {
      log(5, JSON.parse(localStorage.getItem("uuid")), lang);
    }
    setFontSize((prevSize) => Math.max(14, prevSize + size));
  };

  const handleAutoplay = () => {
    if (isAutoplay) {
      setIsAutoplay(false);
      audioRef.current.pause();
      setIsPaused(true);
    } else {
      log(
        2,
        JSON.parse(localStorage.getItem("uuid")),
        lang,
        prayerData[page]["doaa_id"]
      );
      setIsAutoplay(true);
      setIsPaused(false);
      audioRef.current.play();
    }
  };

  const onAudioEnded = () => {
    log(
      2,
      JSON.parse(localStorage.getItem("uuid")),
      lang,
      prayerData[page]["doaa_id"]
    );
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
      if (mode === "dark") {
        if (dir === "ltr") {
          return bigAinBlackEn;
        } else {
          return bigAinBlack;
        }
      } else {
        if (dir === "ltr") {
          return bigAinEn;
        } else {
          return bigAin;
        }
      }
    } else if (type === "fontDec") {
      if (mode === "dark") {
        if (dir === "ltr") {
          return smallAinBlackEn;
        } else {
          return smallAinBlack;
        }
      } else {
        if (dir === "ltr") {
          return smallAinEn;
        } else {
          return smallAin;
        }
      }
    }
  };

  useEffect(() => {
    const loadAudio = async () => {
      if (audio !== undefined) {
        const audioMap = getAudioMap(audio);
        if (!audioMap) {
          console.error("Invalid audio path:", audio);
          return;
        }
        const audioFileKey = `../${audio}/${prayerData[page]["audioNumber"]}`;
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
  }, [page, audio, isAutoplay, totalPages, prayerData, setPage]);

  useEffect(() => {
    if (audioRef.current && audioSrc) {
      audioRef.current.load();
      if (!isPaused) {
        audioRef.current.play();
      }
    }
  }, [audioSrc, isPaused]);

  return (
    <>
      <audio ref={audioRef} src={audioSrc} hidden onEnded={onAudioEnded} />

      <Stack
        direction="row-reverse"
        spacing={2}
        style={{ direction: dir }}
        alignItems="center"
        justifyContent="flex-start"
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

        {audio && (
          <Image
            src={getIconSrc("playPause")}
            alt="Toggle pause"
            onClick={togglePause}
            cursor="pointer"
            boxSize={{ base: "28px", md: "42px" }}
          />
        )}

        {autoPlay && (
          <Stack direction="row" alignItems="center">
            <Switch
              id="autoplay-switch"
              isChecked={isAutoplay}
              onChange={handleAutoplay}
              size="lg"
              dir="rtl"
              position="relative"
              sx={{
                "& .chakra-switch__track": {
                  bg: mode === "dark" ? "#232C35" : "",
                },
                "& .chakra-switch__track[data-checked]": {
                  bg: mode === "dark" ? "#BC9761" : "#BC9761",
                },
              }}
              _before={{
                content: `'${autoPlay}'`,
                position: "absolute",
                top: 3,
                width: "300px",
                display: "inline-block",
                color: mode === "dark" ? "white" : "#333D49",
                fontSize: "11px",
                right: dir === "rtl" ? "-67px" : "55px",
              }}
            />
          </Stack>
        )}
      </Stack>
    </>
  );
}

export default PrayerIcons;
