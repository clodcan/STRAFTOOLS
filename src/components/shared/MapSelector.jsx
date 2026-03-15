import { useState } from "react";
import Filters from "../playlist/Filters";
import MapBrowser from "../playlist/MapBrowser";
import MapModal from "../playlist/MapModal";

const MapSelector = ({ selectedMaps, setSelectedMaps }) => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeFamilies, setActiveFamilies] = useState([]);
  const [activeWeapons, setActiveWeapons] = useState([]);
  const [weaponFilterMode, setWeaponFilterMode] = useState("and");
  const [showMapModal, setShowMapModal] = useState(false);
  const [mapModalMap, setMapModalMap] = useState("");

  return (
    <div className="flex flex-1 overflow-hidden">
      {showMapModal && (
        <MapModal mapModalMap={mapModalMap} setShowMapModal={setShowMapModal} />
      )}
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
        setShowMapModal={setShowMapModal}
        setMapModalMap={setMapModalMap}
      />
    </div>
  );
};

export default MapSelector;
