import {
  Box,
  Stack,
  Heading,
  Button,
  Image,
  MenuButton,
  MenuList,
  MenuItem,
  Menu,
} from "@chakra-ui/react";
import headerImg from "../assets/overlay-dark.svg";
import translateImage from "../assets/language.svg";
import colorMode from "../assets/color-mode.svg";
import { mainData } from "../data/metaData/mainData";
import { getbgColor, getBorder, getColor } from "../helper";

function Header({ setLang, dir, setDir, lang, mode, setMode, setCurrentPage, currentPage }) {

  const toggleMode = () => {
    setMode((prevMode) => (prevMode === "dark" ? "white" : "dark"));
  };

  const getButtonProps = (path) => {
    const isActive = currentPage === path;
    return {
      bgColor: getbgColor(mode),
      borderBottom: isActive ? "none" : getBorder(mode),
      borderTop: isActive ? "5px solid #b08f62" : "none",
      color: isActive ? "#b08f62" : getColor(mode),
      _hover: {
        bgColor: getbgColor(mode),
        ...(mode === "dark" && {
          color: "#b08f62",
        }),
      },
    };
  };

  const languages = [
    {
      code: "ar",
      name: "عربي",
      dir: "rtl",
      flagUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Flag_of_Saudi_Arabia.svg/20px-Flag_of_Saudi_Arabia.svg.png",
    },
    {
      code: "en",
      name: "English",
      dir: "ltr",
      flagUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Flag_of_the_United_States.svg/20px-Flag_of_the_United_States.svg.png",
    },
    {
      code: "ur",
      name: "اردو",
      dir: "rtl",
      flagUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Flag_of_Pakistan.svg/20px-Flag_of_Pakistan.svg.png",
    },
    {
      code: "tr",
      name: "Türkçe",
      dir: "ltr",
      flagUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Flag_of_Turkey.svg/20px-Flag_of_Turkey.svg.png",
    },
    {
      code: "fr",
      name: "Français",
      dir: "ltr",
      flagUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Flag_of_France.svg/20px-Flag_of_France.svg.png",
    },
    {
      code: "in",
      name: "Bahasa Indonesia",
      dir: "ltr",
      flagUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Flag_of_Indonesia.svg/20px-Flag_of_Indonesia.svg.png",
    },
    {
      code: "mal",
      name: "Bahasa Melayu",
      dir: "ltr",
      flagUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Flag_of_Malaysia.svg/20px-Flag_of_Malaysia.svg.png",
    },
  ];  

  return (
    <Box
      bgImage={headerImg}
      bgSize="cover"
      bgPosition="center"
      bgRepeat="no-repeat"
      backgroundColor="rgba(10, 10, 10, 0.3)"
      backgroundBlendMode="multiply"
      w="100%"
      display="flex"
      height={{ base: "80px", md: "268px" }}
      justifyContent="space-around"
      flexDirection="column"
    >
      <Stack
        spacing="50px"
        textAlign="right"
        margin={{ base: 5, md: 20 }}
        mb={{ base: "3", md: "60px" }}
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        style={{ direction: dir }}
      >
        <Heading fontSize={{ base: "sm", md: "x-large" }} color="white">
          {mainData[lang].headerTitle}
        </Heading>
        <Stack direction="row" spacing="32px">
          <Box
            bgColor="#28323F"
            padding={4}
            borderRadius={10}
            onClick={toggleMode}
            cursor="pointer"
          >
            <Image
              src={colorMode}
              boxSize={{ base: "16px", md: "24px" }}
              borderRadius={10}
            />
          </Box>
          <Menu>
            <MenuButton>
              <Box
                bgColor="#28323F"
                padding={4}
                borderRadius={10}
                cursor="pointer"
              >
                <Image
                  src={translateImage}
                  boxSize={{ base: "16px", md: "24px" }}
                />
              </Box>
            </MenuButton>
            <MenuList>
              {languages.map(({ code, name, dir, flagUrl }) => (
                <MenuItem
                  key={code}
                  onClick={() => {
                    setLang(code);
                    setDir(dir);
                  }}
                >
                  <Box display="flex" alignItems="center">
                    <Image
                      src={flagUrl}
                      alt={`${name} Flag`}
                      boxSize="20px"
                      marginRight="8px"
                      ml={3}
                    />
                    {name}
                  </Box>
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
        </Stack>
      </Stack>
      <Box
        display="flex"
        mr={{ base: 0, md: 20 }}
        {...(dir === "ltr" && {
          style: { direction: "ltr" },
          ml: { base: 0, md: 20 },
        })}
      >
        <Button
          {...getButtonProps("ManasekPage")}
          width={{ base: "50%", md: "196px" }}
          height={{ base: "70px" }}
          borderRadius="0"
          {...(dir === "ltr"
            ? {
                borderTopLeftRadius: 10,
                borderRight: "none",
                borderLeft: getBorder(mode),
              }
            : {
                borderTopRightRadius: 10,
                borderLeft: "none",
                borderRight: getBorder(mode),
              })}
          onClick={() => setCurrentPage("ManasekPage")}
        >
          {mainData[lang].manasekTitle}
        </Button>
        <Button
          {...getButtonProps("InstructionPage")}
          width={{ base: "50%", md: "196px" }}
          height={{ base: "70px" }}
          borderRadius="0"
          {...(dir === "ltr"
            ? {
                borderTopRightRadius: 10,
                borderLeft: "none",
                borderRight: getBorder(mode),
              }
            : {
                borderTopLeftRadius: 10,
                borderRight: "none",
                borderLeft: getBorder(mode),
              })}
          onClick={() => setCurrentPage("InstructionPage")}
        >
          {mainData[lang].adabTitle}
        </Button>
      </Box>
    </Box>
  );
}

export default Header;
