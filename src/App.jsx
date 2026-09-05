import { useCallback, useEffect, useRef, useState } from "react";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/layout/Navbar";
import PlaylistBuilder from "./components/playlist/PlaylistBuilder";
import SwapperBuilder from "./components/swapper/SwapperBuilder";
import { parseDeepLinkImport } from "./utils/deepLinkImport";
import { errorToast } from "./utils/toast";

const App = () => {
  const [deepLinkImport] = useState(() =>
    parseDeepLinkImport(window.location.hash),
  );
  const invalidImportHandled = useRef(false);
  const [selectedMode, setSelectedMode] = useState(() =>
    deepLinkImport?.kind === "swapper"
      ? "swapperBuilder"
      : "playlistBuilder",
  );
  const modeClass = (mode) =>
    selectedMode === mode ? "flex flex-1 overflow-hidden" : "hidden";

  const finishDeepLinkImport = useCallback(() => {
    window.history.replaceState(
      window.history.state,
      "",
      `${window.location.pathname}${window.location.search}`,
    );
  }, []);

  useEffect(() => {
    if (
      !deepLinkImport ||
      deepLinkImport.kind !== null ||
      invalidImportHandled.current
    )
      return;

    invalidImportHandled.current = true;
    errorToast("Invalid import string");
    finishDeepLinkImport();
  }, [deepLinkImport, finishDeepLinkImport]);

  return (
    <div className="h-screen bg-zinc-950 text-white flex flex-col font-geist glassBg">
      <Toaster position="top-right" />
      <Navbar selectedMode={selectedMode} setSelectedMode={setSelectedMode} />
      <div className="flex flex-1 overflow-hidden">
        <div className={modeClass("playlistBuilder")}>
          <PlaylistBuilder
            initialImport={
              deepLinkImport?.kind === "playlist" ? deepLinkImport.data : null
            }
            onInitialImportProcessed={finishDeepLinkImport}
          />
        </div>
        <div className={modeClass("swapperBuilder")}>
          <SwapperBuilder
            initialImport={
              deepLinkImport?.kind === "swapper" ? deepLinkImport.data : null
            }
            onInitialImportProcessed={finishDeepLinkImport}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
