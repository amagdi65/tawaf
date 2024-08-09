import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Box } from "@chakra-ui/react";
import background from "../assets/overlay-dark.svg";

function MainLayout({ setLang, dir, setDir, lang, mode, setMode }) {
  return (
    <Box
      display="flex"
      flexDirection="column"
      height="100%"
      overflowY="auto"
      bg={mode === "dark" ? `url(${background})` : "initial"} 
      backgroundRepeat={mode === "dark" ? "no-repeat" : undefined}
      backgroundSize={mode === "dark" ? "cover" : undefined}
      backgroundPosition={mode === "dark" ? "center" : undefined}
    >
      <Header
        setLang={setLang}
        dir={dir}
        lang={lang}
        setDir={setDir}
        mode={mode}
        setMode={setMode}
      />
      <Box flex="1">
        <Outlet />
        <Footer mode={mode} />
      </Box>
    </Box>
  );
}

export default MainLayout;
