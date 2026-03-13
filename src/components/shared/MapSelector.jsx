import { useState } from "react";
import Filters from "../playlist/Filters";
import MapBrowser from "../playlist/MapBrowser";

const MapSelector = ({ selectedMaps, setSelectedMaps }) => {
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
    </div>
  );
};

export default MapSelector;
