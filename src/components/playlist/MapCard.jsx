import maps from "../../data/maps.json";
import { MdInfoOutline } from "react-icons/md";

const MapCard = ({
  mapName,
  selectedMaps,
  setSelectedMaps,
  setShowMapModal,
  setMapModalMap,
}) => {
  const isSelected = selectedMaps.includes(mapName);
  const weaponCount = Object.values(maps[mapName]?.weapons ?? {}).flat().length;

  const toggleMap = () =>
    setSelectedMaps((prev) =>
      prev.includes(mapName)
        ? prev.filter((m) => m !== mapName)
        : [...prev, mapName],
    );

  const openMapModal = (e) => {
    e.stopPropagation();
    setMapModalMap(mapName);
    setShowMapModal(true);
  };

  return (
    <div
      className={`flex flex-col rounded-lg select-none cursor-pointer hover:scale-101 transition-all ease-in
    ${
      isSelected
        ? "border border-white bg-zinc-800"
        : "border border-zinc-600 hover:bg-zinc-800 bg-zinc-900"
    }`}
      onClick={toggleMap}
    >
      <img
        src={`/images/maps/${mapName}.webp`}
        alt={mapName}
        className="rounded-t-lg border-b border-zinc-600 h-32 w-full object-cover"
        draggable="false"
      />
      <div className="flex justify-between py-1 px-2 items-center">
        <div className="flex flex-col font-geistMono overflow-hidden pr-2">
          <p className="overflow-hidden text-sm">{mapName}</p>
          <p className="text-xs text-zinc-400">
            {weaponCount} {weaponCount === 1 ? "Weapon" : "Weapons"}
          </p>
        </div>
        <button
          className="border border-zinc-600 p-1 rounded-lg hover:bg-zinc-600 transition-all ease-in cursor-pointer flex items-center gap-1 justify-center"
          onClick={(e) => openMapModal(e)}
        >
          <MdInfoOutline />
        </button>
      </div>
    </div>
  );
};

export default MapCard;
