import maps from "../../data/maps.json";

const MapCard = ({ mapName, selectedMaps, setSelectedMaps }) => {
  const isSelected = selectedMaps.includes(mapName);
  const weaponCount = Object.values(maps[mapName]?.weapons ?? {}).flat().length;

  const toggleMap = () =>
    setSelectedMaps((prev) =>
      prev.includes(mapName)
        ? prev.filter((m) => m !== mapName)
        : [...prev, mapName],
    );

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
        src={`/images/maps/${mapName}.png`}
        alt={mapName}
        className="rounded-t-lg border-b border-zinc-600 h-32 w-full object-cover"
        draggable="false"
      />
      <div className="py-1 px-2 flex flex-col font-geistMono">
        <p className="overflow-hidden text-sm">{mapName}</p>
        <p className="text-xs text-zinc-400">
          {weaponCount} {weaponCount === 1 ? "Weapon" : "Weapons"}
        </p>
      </div>
    </div>
  );
};

export default MapCard;
