import { useState } from "react";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/layout/Navbar";
import PlaylistBuilder from "./components/playlist/PlaylistBuilder";
import SwapperBuilder from "./components/swapper/SwapperBuilder";

const App = () => {
  const [selectedMode, setSelectedMode] = useState("playlistBuilder");
  const modeClass = (mode) =>
    selectedMode === mode ? "flex flex-1 overflow-hidden" : "hidden";

  return (
    <div className="h-screen bg-zinc-950 text-white flex flex-col font-geist">
      <Toaster position="top-right" />
      <Navbar selectedMode={selectedMode} setSelectedMode={setSelectedMode} />
      <div className="flex flex-1 overflow-hidden">
        <div className={modeClass("playlistBuilder")}>
          <PlaylistBuilder />
        </div>
        <div className={modeClass("swapperBuilder")}>
          <SwapperBuilder />
        </div>
      </div>
    </div>
  );
};

export default App;
