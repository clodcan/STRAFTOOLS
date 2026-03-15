import { useState } from "react";
import { MdAdd } from "react-icons/md";
import MapCard from "./MapCard";
import maps from "../../data/maps.json";

const MapBrowser = ({
  selectedMaps,
  setSelectedMaps,
  activeCategory,
  activeFamilies,
  activeWeapons,
  weaponFilterMode,
  setShowMapModal,
  setMapModalMap,
}) => {
  const [search, setSearch] = useState("");

  const filteredMaps = Object.keys(maps).filter((mapName) => {
    const map = maps[mapName];

    const searchMatch = mapName.toLowerCase().includes(search.toLowerCase());
    const categoryMatch =
      activeCategory === "all" || map.category === activeCategory;
    const familyMatch =
      activeFamilies.length === 0 || activeFamilies.includes(map.family);
    const weaponMatch =
      activeWeapons.length === 0 ||
      (weaponFilterMode === "and"
        ? activeWeapons.every((w) =>
            Object.values(map.weapons ?? {})
              .flat()
              .includes(w),
          )
        : activeWeapons.some((w) =>
            Object.values(map.weapons ?? {})
              .flat()
              .includes(w),
          ));

    return searchMatch && categoryMatch && familyMatch && weaponMatch;
  });

  return (
    <div className="flex flex-1 overflow-y-auto flex-col gap-5 px-5 pt-5 w-full">
      <div className="flex gap-3">
        <input
          type="text"
          className="border border-zinc-600 w-full outline-none py-1 px-2 rounded-lg"
          placeholder="Search..."
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          onClick={() =>
            setSelectedMaps((prev) => [
              ...prev,
              ...filteredMaps.filter((m) => !prev.includes(m)),
            ])
          }
          className="flex items-center gap-1 border border-zinc-600 rounded-lg px-2 shrink-0 hover:bg-zinc-800 transition-all ease-in cursor-pointer"
        >
          <MdAdd />
          <p className="text-sm">Add all</p>
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
    </div>
  );
};

export default MapBrowser;
