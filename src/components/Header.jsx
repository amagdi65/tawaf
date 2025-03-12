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
  Link,
  Text,
} from "@chakra-ui/react";
import headerImg from "../assets/header.svg";
import logo from "../assets/logo_icon.png";
import translateImage from "../assets/language.svg";
import colorMode from "../assets/color-mode.svg";
import { mainData } from "../data/metaData/mainData";
import { getbgColor, getBorder, getColor } from "../helper";
import { log } from "../logRequest";

function Header({
  setLang,
  dir,
  setDir,
  lang,
  mode,
  setMode,
  setCurrentPage,
  currentPage,
}) {
  const toggleMode = () => {
    log(6, JSON.parse(localStorage.getItem("uuid")), lang);
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
      flagUrl:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Flag_of_Saudi_Arabia.svg/20px-Flag_of_Saudi_Arabia.svg.png",
    },
    {
      code: "en",
      name: "English",
      dir: "ltr",
      flagUrl:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Flag_of_the_United_States.svg/20px-Flag_of_the_United_States.svg.png",
    },
    {
      code: "ur",
      name: "اردو",
      dir: "rtl",
      flagUrl:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Flag_of_Pakistan.svg/20px-Flag_of_Pakistan.svg.png",
    },
    {
      code: "tr",
      name: "Türkçe",
      dir: "ltr",
      flagUrl:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Flag_of_Turkey.svg/20px-Flag_of_Turkey.svg.png",
    },
    {
      code: "fr",
      name: "Français",
      dir: "ltr",
      flagUrl:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Flag_of_France.svg/20px-Flag_of_France.svg.png",
    },
    {
      code: "in",
      name: "Bahasa Indonesia",
      dir: "ltr",
      flagUrl:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Flag_of_Indonesia.svg/20px-Flag_of_Indonesia.svg.png",
    },
    {
      code: "mal",
      name: "Bahasa Melayu",
      dir: "ltr",
      flagUrl:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Flag_of_Malaysia.svg/20px-Flag_of_Malaysia.svg.png",
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
      height={{ base: "365px", md: "535px" }}
      justifyContent="space-around"
      flexDirection="column"
    >
      <Stack
        spacing="80px"
        textAlign="right"
        marginX={{ base: 5, md: 20 }}
        marginY={{ base: 5, md: 5 }}
        // mb={{ base: "230px", md: "300px" }}
        flexDirection="column"
        alignItems="center"
        justifyContent="space-between"
        style={{ direction: dir }}
      >
        <Link
          href="https://alharamain.gov.sa/public/?page=Home"
          alignSelf={"start"}
          isExternal
        >
          <Image src={logo} alt="Description" width="105px" />
        </Link>
        <Stack
          direction="column"
          alignSelf="start"
          spacing="5px"
          paddingX="10px"
          borderBottomRadius="2px"
          borderTopRadius="2px"
          borderRight={
            dir === "ltr" ? "none" : "3px solid rgba(219, 161, 2, 1)"
          }
          borderLeft={dir === "ltr" ? "3px solid rgba(219, 161, 2, 1)" : "none"}
          borderColor="rgba(219, 161, 2, 1)"
        >
          <Heading as="h1" fontSize="18px" alignSelf="start" color="white">
            {mainData[lang].headerTitle}
          </Heading>
          <Text fontSize="14px" color="white">
            {mainData[lang].pTitle}
          </Text>
        </Stack>

        <Stack direction="row" alignSelf={"end"} spacing="5px">
          <Box
            bgColor="#28323F"
            padding={2}
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
                padding={2}
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
                    if (code == "ur") {
                      document.body.classList.add("urdu-font");
                    } else {
                      document.body.classList.remove("urdu-font");
                    }
                  }}
                >
                  <Box display="flex" alignItems="center">
                    <Image src={flagUrl} alt={`${name} Flag`} boxSize="20px" />
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
          {...getButtonProps("NewManasekPage")}
          width={{ base: "50%", md: "196px" }}
          height={{ base: "70px" }}
          fontSize="14px"
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
          onClick={() => setCurrentPage("NewManasekPage")}
        >
          {mainData[lang].manasekTitle}
        </Button>
        <Button
          {...getButtonProps("InstructionPage")}
          width={{ base: "50%", md: "196px" }}
          height={{ base: "70px" }}
          fontSize="14px"
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
