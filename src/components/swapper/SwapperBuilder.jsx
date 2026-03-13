import { useState } from "react";
import { successToast, errorToast } from "../../utils/toast";
import { decode } from "../../utils/encoding";
import Modal from "./Modal";
import RulesPanel from "./RulesPanel";
import WeaponDisplayPanel from "./WeaponDisplayPanel";
import WeaponSwapperPanel from "./WeaponSwapperPanel";
import maps from "../../data/maps.json";

const SwapperBuilder = () => {
  const [isModalActive, setIsModalActive] = useState(false);
  const [rules, setRules] = useState([]);
  const [selectedRule, setSelectedRule] = useState("");

  const handleCreateRules = (selectedMaps, asGroup = false) => {
    if (asGroup) {
      const newRule =
        selectedMaps.length === 1
          ? { id: crypto.randomUUID(), mapString: selectedMaps[0], swaps: [] }
          : { id: crypto.randomUUID(), maps: selectedMaps, swaps: [] };
      setRules((prev) => [...prev, newRule]);
      setSelectedRule(newRule.id);
    } else {
      const newRules = selectedMaps.map((mapString) => ({
        id: crypto.randomUUID(),
        mapString,
        swaps: [],
      }));
      setRules((prev) => [...prev, ...newRules]);
      setSelectedRule(newRules[newRules.length - 1].id);
    }
    setIsModalActive(false);
  };

  const handleAddAllMaps = () => {
    const newRule = {
      id: crypto.randomUUID(),
      maps: Object.keys(maps),
      pattern: "*",
      swaps: [],
    };
    setRules((prev) => [...prev, newRule]);
    setSelectedRule(newRule.id);
  };

  const deleteRule = (id) => {
    setRules((prev) => prev.filter((r) => r.id !== id));
  };

  const moveRule = (id, direction) => {
    setRules((prev) => {
      const index = prev.findIndex((r) => r.id === id);
      const newIndex = direction === "up" ? index - 1 : index + 1;
      if (newIndex < 0 || newIndex >= prev.length) return prev;
      const next = [...prev];
      [next[index], next[newIndex]] = [next[newIndex], next[index]];
      return next;
    });
  };

  const importPlaylist = async () => {
    const playlistCode = await navigator.clipboard.readText();

    try {
      const json = decode(playlistCode);
      if (json.type !== "playlist") return errorToast("Invalid playlist");

      const newRules = json.maps.map((mapString) => ({
        id: crypto.randomUUID(),
        mapString,
        swaps: [],
      }));

      setRules((prev) => [...prev, ...newRules]);
      successToast(`Imported ${newRules.length} maps`, "📥");
    } catch (e) {
      errorToast("Invalid import string");
    }
  };

  return (
    <>
      {isModalActive ? (
        <Modal
          setIsModalActive={setIsModalActive}
          handleCreateRules={handleCreateRules}
        />
      ) : null}
      <div className="flex flex-1 overflow-hidden">
        <RulesPanel
          setIsModalActive={setIsModalActive}
          rules={rules}
          setRules={setRules}
          selectedRule={selectedRule}
          setSelectedRule={setSelectedRule}
          deleteRule={deleteRule}
          importPlaylist={importPlaylist}
          handleAddAllMaps={handleAddAllMaps}
          moveRule={moveRule}
        />
        <WeaponDisplayPanel rules={rules} selectedRule={selectedRule} />
        <WeaponSwapperPanel
          rules={rules}
          setRules={setRules}
          selectedRule={selectedRule}
        />
      </div>
    </>
  );
};

export default SwapperBuilder;
