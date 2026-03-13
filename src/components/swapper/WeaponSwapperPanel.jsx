import { useEffect, useState } from "react";
import {
  MdContentCopy,
  MdContentPasteGo,
  MdOutlineSwapHoriz,
} from "react-icons/md";
import { decode, encode } from "../../utils/encoding";
import { errorToast, successToast } from "../../utils/toast";
import { buildPresetJson, parsePresetJson } from "../../utils/presetUtils";
import SwapEditor from "./SwapEditor";
import maps from "../../data/maps.json";

const WeaponSwapperPanel = ({ rules, setRules, selectedRule }) => {
  const [swapperName, setSwapperName] = useState("STRAFTOOLS Swapper");
  const selectedRuleObject = rules.find((r) => r.id === selectedRule) ?? null;

  const mapList = selectedRuleObject
    ? (selectedRuleObject.maps ?? [selectedRuleObject.mapString])
    : [];

  const mapWeapons = [
    ...new Set(
      mapList.flatMap((mapName) =>
        Object.values(maps[mapName]?.weapons ?? {}).flat(),
      ),
    ),
  ];

  const updateSwap = (id, result) => {
    setRules((prev) =>
      prev.map((r) =>
        r.id === selectedRule
          ? {
              ...r,
              swaps: r.swaps.map((s) => (s.id === id ? { ...s, result } : s)),
            }
          : r,
      ),
    );
  };

  const exportPreset = async () => {
    if (rules.length === 0) return errorToast("No rules to export");
    await navigator.clipboard.writeText(
      encode(buildPresetJson(rules, swapperName)),
    );
    successToast("Copied to clipboard", "📋");
  };

  const importPreset = async () => {
    try {
      const json = decode(await navigator.clipboard.readText());
      const { name, rules: imported } = parsePresetJson(json);
      setRules(imported);
      setSwapperName(name);
      successToast(`Imported "${name}"`, "📥");
    } catch (e) {
      console.error("decode failed:", e);
      errorToast("Invalid import string");
    }
  };

  useEffect(() => {
    if (!selectedRuleObject || selectedRuleObject.swaps.length > 0) return;
    setRules((prev) =>
      prev.map((r) =>
        r.id === selectedRule
          ? {
              ...r,
              swaps: mapWeapons.map((w) => ({
                id: crypto.randomUUID(),
                precursor: w,
                result: w,
              })),
            }
          : r,
      ),
    );
  }, [selectedRule]);

  return (
    <div className="flex flex-1 flex-col shrink-0 border-zinc-600">
      <div className="border-b border-zinc-600 p-3 flex items-center gap-1">
        <MdOutlineSwapHoriz />
        <p className="font-semibold">Weapon swaps</p>
      </div>
      <div className="flex flex-col gap-2 p-4 overflow-y-auto">
        {selectedRuleObject?.swaps.map((swap) => (
          <SwapEditor
            key={swap.id}
            swap={swap}
            updateSwap={updateSwap}
            mapWeapons={mapWeapons}
          />
        ))}
      </div>
      <div className="flex mt-auto p-5 justify-end gap-3">
        <div className="border border-zinc-600 w-full py-1 px-2 rounded-lg flex items-center">
          <input
            type="text"
            className="outline-none w-full"
            placeholder="Swapper name"
            onChange={(e) => setSwapperName(e.target.value)}
            value={swapperName}
          />
          <p className="text-xs font-geistMono text-zinc-400 ml-auto shrink-0">
            {`${rules.length} ${rules.length === 1 ? "Rule" : "Rules"}`}
          </p>
        </div>
        <button
          className="border border-zinc-600 rounded-lg px-3 flex items-center gap-1 cursor-pointer hover:bg-zinc-800 transition-all ease-in"
          onClick={exportPreset}
        >
          <MdContentCopy />
          Export
        </button>
        <button
          className="border border-zinc-600 rounded-lg px-3 flex items-center gap-1 cursor-pointer hover:bg-zinc-800 transition-all ease-in"
          onClick={importPreset}
        >
          <MdContentPasteGo />
          Import
        </button>
      </div>
    </div>
  );
};

export default WeaponSwapperPanel;
