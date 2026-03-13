const Navbar = ({ selectedMode, setSelectedMode }) => {
  return (
    <div className="flex gap-10 py-2 px-9 border-b border-zinc-600 w-screen items-center">
      <h1 className="text-lg font-semibold italic">STRAFTOOLS</h1>
      <div className="flex gap-2 text-sm font-medium">
        <button
          onClick={() => setSelectedMode("playlistBuilder")}
          className={`${selectedMode === "playlistBuilder" ? "bg-zinc-800" : "hover:bg-zinc-800"} px-2.5 py-2 rounded-lg cursor-pointer transition-all ease-in`}
        >
          Playlist Builder
        </button>
        <button
          onClick={() => setSelectedMode("swapperBuilder")}
          className={`${selectedMode === "swapperBuilder" ? "bg-zinc-800" : "hover:bg-zinc-800"} px-2.5 py-2 rounded-lg cursor-pointer transition-all ease-in`}
        >
          Swapper Builder
        </button>
      </div>
    </div>
  );
};

export default Navbar;
