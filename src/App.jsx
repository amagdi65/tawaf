import { useState, Suspense, lazy, useEffect } from "react";
import MainLayout from "./layout/MainLayout";
import usePersistedState from "./hooks/usePersistedState";
import Popup from "./components/Popup";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';

const ManasekPage = lazy(() => import("./pages/ManasekPage"));
const InstructionPage = lazy(() => import("./pages/InstructionPage"));

function App() {
  const [lang, setLang] = usePersistedState("lang", "ar");
  const [dir, setDir] = usePersistedState("dir", "rtl");
  const [mode, setMode] = usePersistedState("mode", "light");
  const [uuid,] = usePersistedState('uuid',uuidv4())
  const [currentPage, setCurrentPage] = useState("ManasekPage");

  useEffect(() => {
      axios.post('/index.php',{
        language: lang,
        uuid
      })
    
  }, [lang]);
  const renderPage = () => {
    switch (currentPage) {
      case "ManasekPage":
        return (
          <Suspense fallback={<div>Loading...</div>}>
            <ManasekPage lang={lang} dir={dir} mode={mode} />
          </Suspense>
        );
      case "InstructionPage":
        return (
          <Suspense fallback={<div>Loading...</div>}>
            <InstructionPage lang={lang} dir={dir} mode={mode} />
          </Suspense>
        );
      default:
        return (
          <Suspense fallback={<div>Loading...</div>}>
            <ManasekPage lang={lang} dir={dir} mode={mode} />
          </Suspense>
        );
    }
  };

  return (
    <>
      <MainLayout
        setLang={setLang}
        dir={dir}
        setDir={setDir}
        lang={lang}
        mode={mode}
        setMode={setMode}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      >
        {renderPage()}
      </MainLayout>
      <Popup />
    </>
  );
}

export default App;
