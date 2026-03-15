import { useState } from "react";
import { MdContentCopy, MdContentPasteGo, MdDelete } from "react-icons/md";
import { encode, decode } from "../../utils/encoding";
import { successToast, errorToast } from "../../utils/toast";
import MapCard from "./MapCard";

const PlaylistPanel = ({
  selectedMaps,
  setSelectedMaps,
  setShowMapModal,
  setMapModalMap,
}) => {
  const [playlistName, setPlaylistName] = useState("STRAFTOOLS Playlist");
  const [search, setSearch] = useState("");

  const filteredMaps = selectedMaps.filter((mapName) =>
    mapName.toLowerCase().includes(search.toLowerCase()),
  );

  const importPlaylist = async () => {
    const playlistCode = await navigator.clipboard.readText();

    try {
      const json = decode(playlistCode);

      if (json.type === "playlist" && Array.isArray(json.maps)) {
        setSelectedMaps(json.maps);
        setPlaylistName(json.name);
        successToast(`Imported "${json.name}"`, "📥");
      } else {
        errorToast("Pasted invalid import string");
      }
    } catch (e) {
      errorToast("Pasted invalid import string");
    }
  };

  const exportPlaylist = () => {
    const playlistCode = encode({
      name: playlistName,
      maps: selectedMaps,
      type: "playlist",
    });
    navigator.clipboard.writeText(playlistCode);
    successToast("Copied playlist to clipboard", "📋");
  };

  return (
    <div className="flex flex-1 overflow-y-auto border-l border-l-zinc-600 flex-col gap-5 p-5">
      <div className="flex gap-3">
        <input
          type="text"
          className="border border-zinc-600 w-full outline-none py-1 px-2 rounded-lg"
          placeholder="Search..."
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          onClick={() => setSelectedMaps([])}
          className="flex items-center gap-1 border border-zinc-600 rounded-lg px-2 hover:bg-zinc-800 transition-all ease-in cursor-pointer"
        >
          <MdDelete />
          <p className="text-sm">Clear</p>
        </button>
      </div>
      <div className="gap-5 overflow-y-auto grid grid-cols-3 h-full content-start justify-stretch p-1">
        {filteredMaps.map((mapName) => (
          <MapCard
            key={mapName}
            mapName={mapName}
            selectedMaps={selectedMaps}
            setSelectedMaps={setSelectedMaps}
            setShowMapModal={setShowMapModal}
            setMapModalMap={setMapModalMap}
          />
        ))}
      </div>
      <div className="flex gap-3">
        <div className="border border-zinc-600 w-full py-1 px-2 rounded-lg flex items-center">
          <input
            type="text"
            className="outline-none w-full"
            placeholder="Playlist name"
            onChange={(e) => setPlaylistName(e.target.value)}
            value={playlistName}
          />
          <p className="text-xs font-geistMono text-zinc-400 ml-auto shrink-0">
            {selectedMaps.length} {selectedMaps.length === 1 ? "Map" : "Maps"}
          </p>
        </div>
        <button
          className="border border-zinc-600 rounded-lg px-3 flex items-center gap-1 cursor-pointer hover:bg-zinc-800 transition-all ease-in"
          onClick={exportPlaylist}
        >
          <MdContentCopy />
          Export
        </button>
        <button
          className="border border-zinc-600 rounded-lg px-3 flex items-center gap-1 cursor-pointer hover:bg-zinc-800 transition-all ease-in"
          onClick={importPlaylist}
        >
          <MdContentPasteGo />
          Import
        </button>
      </div>
    </div>
  );
};

export default PlaylistPanel;
