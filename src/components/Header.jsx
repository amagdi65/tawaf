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
import { useNavigate, useLocation } from "react-router-dom";
import headerImg from "../assets/overlay-dark.svg";
import translateImage from "../assets/language.svg";
import colorMode from "../assets/color-mode.svg";
import { mainData } from "../data/mainData";
import { getbgColor, getBorder, getColor } from "../helper";

function Header({ setLang, dir, setDir, lang, mode, setMode }) {
  const navigate = useNavigate();
  const location = useLocation();

  const toggleMode = () => {
    setMode((prevMode) => (prevMode === "dark" ? "white" : "dark"));
  };

  const getButtonProps = (path) => {
    const isActive = location.pathname === path;
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
        <Heading fontSize={{ base: "medium", md: "x-large" }} color="white">
          {mainData[lang].headerTitle}
        </Heading>
        <Stack direction="row" spacing="32px">
          <Box
            bgColor="#28323F"
            padding={4}
            borderRadius={10}
            onClick={toggleMode}
            cursor="pointer" // Added cursor pointer to indicate clickability
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
              <MenuItem
                onClick={() => {
                  setLang("ar");
                  setDir("rtl");
                }}
              >
                عربي
              </MenuItem>
              <MenuItem
                onClick={() => {
                  setLang("en");
                  setDir("ltr");
                }}
              >
                English
              </MenuItem>
              <MenuItem
                onClick={() => {
                  setLang("ur");
                  setDir("rtl");
                }}
              >
                اردو
              </MenuItem>
              <MenuItem
                onClick={() => {
                  setLang("tr");
                  setDir("ltr");
                }}
              >
                Türkçe
              </MenuItem>
              <MenuItem
                onClick={() => {
                  setLang("fr");
                  setDir("ltr");
                }}
              >
                Français
              </MenuItem>
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
          {...getButtonProps("/")}
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
          onClick={() => navigate("/")}
        >
          {mainData[lang].manasekTitle}
        </Button>
        <Button
          {...getButtonProps("/instructions")}
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
          onClick={() => navigate("/instructions")}
        >
          {mainData[lang].adabTitle}
        </Button>
      </Box>
    </Box>
  );
}

export default Header;
