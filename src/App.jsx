import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import usePersistedState from "./hooks/usePersistedState";
import { Suspense, lazy } from "react";

const ManasekPage = lazy(() => import("./pages/ManasekPage"));
const InstructionPage = lazy(() => import("./pages/InstructionPage"));

function App() {
  const [lang, setLang] = usePersistedState("lang", "ar");
  const [dir, setDir] = usePersistedState("dir", "rtl");
  const [mode, setMode] = usePersistedState("mode", "light");

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <MainLayout
              setLang={setLang}
              dir={dir}
              setDir={setDir}
              lang={lang}
              mode={mode}
              setMode={setMode}
            />
          }
        >
          <Route
            index
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <ManasekPage lang={lang} dir={dir} mode={mode} />
              </Suspense>
            }
          />
          <Route
            path="instructions"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <InstructionPage lang={lang} dir={dir} mode={mode} />
              </Suspense>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
