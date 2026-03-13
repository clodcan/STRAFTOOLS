import { useState } from "react";
import Filters from "./Filters";
import MapBrowser from "./MapBrowser";
import PlaylistPanel from "./PlaylistPanel";

const PlaylistBuilder = () => {
  const [selectedMaps, setSelectedMaps] = useState([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeFamilies, setActiveFamilies] = useState([]);
  const [activeWeapons, setActiveWeapons] = useState([]);
  const [weaponFilterMode, setWeaponFilterMode] = useState("and");

  return (
    <div className="flex flex-1 overflow-hidden">
      <Filters
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        activeFamilies={activeFamilies}
        setActiveFamilies={setActiveFamilies}
        activeWeapons={activeWeapons}
        setActiveWeapons={setActiveWeapons}
        weaponFilterMode={weaponFilterMode}
        setWeaponFilterMode={setWeaponFilterMode}
      />
      <MapBrowser
        selectedMaps={selectedMaps}
        setSelectedMaps={setSelectedMaps}
        activeCategory={activeCategory}
        activeFamilies={activeFamilies}
        activeWeapons={activeWeapons}
        weaponFilterMode={weaponFilterMode}
      />
      <PlaylistPanel
        selectedMaps={selectedMaps}
        setSelectedMaps={setSelectedMaps}
      />
    </div>
  );
};

export default PlaylistBuilder;
