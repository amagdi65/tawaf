import Header from "../components/Header";
import Footer from "../components/Footer";
import { Box } from "@chakra-ui/react";
import background from "../assets/overlay-dark.svg";

function MainLayout({
  setLang,
  dir,
  setDir,
  lang,
  mode,
  setMode,
  setCurrentPage,
  children,
  currentPage,
}) {
  return (
    <Box
      display="flex"
      flexDirection="column"
      height="100%"
      overflowY="auto"
      bg={mode === "dark" ? `#1a232d` : "initial"}
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
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />
      <Box flex="1">
        {children}
        {/* <Footer mode={mode} /> */}
      </Box>
    </Box>
  );
}

export default MainLayout;
