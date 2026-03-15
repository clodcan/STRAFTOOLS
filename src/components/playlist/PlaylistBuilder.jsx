import { useState } from "react";
import MapModal from "./MapModal";
import Filters from "./Filters";
import MapBrowser from "./MapBrowser";
import PlaylistPanel from "./PlaylistPanel";

const PlaylistBuilder = () => {
  const [selectedMaps, setSelectedMaps] = useState([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeFamilies, setActiveFamilies] = useState([]);
  const [activeWeapons, setActiveWeapons] = useState([]);
  const [weaponFilterMode, setWeaponFilterMode] = useState("and");
  const [showMapModal, setShowMapModal] = useState(false);
  const [mapModalMap, setMapModalMap] = useState("");

  return (
    <div className="flex flex-1 overflow-hidden">
      {showMapModal && (
        <MapModal setShowMapModal={setShowMapModal} mapModalMap={mapModalMap} />
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
      <PlaylistPanel
        selectedMaps={selectedMaps}
        setSelectedMaps={setSelectedMaps}
        setShowMapModal={setShowMapModal}
        setMapModalMap={setMapModalMap}
      />
    </div>
  );
};

export default PlaylistBuilder;
