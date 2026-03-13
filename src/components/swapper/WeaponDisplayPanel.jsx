import maps from "../../data/maps.json";
import { RiCrosshair2Fill } from "react-icons/ri";

const WeaponDisplayCard = ({ mapName, swaps }) => {
  const weapons = Object.values(maps[mapName]?.weapons ?? {}).flat();

  return (
    <div className="flex flex-col gap-1 bg-zinc-900 border-zinc-600 border rounded-lg p-4 font-geistMono select-none">
      <p>{mapName}</p>
      <div className="flex flex-wrap gap-2">
        {weapons.map((weapon, index) => {
          const isSwapped = swaps.some(
            (s) => s.precursor === weapon && s.result !== weapon,
          );
          return (
            <span
              key={`${weapon}-${index}`}
              className={`text-xs px-2 py-1 rounded transition-colors duration-200 border ${
                isSwapped
                  ? "bg-emerald-900 border-emerald-700"
                  : "bg-zinc-800 border-zinc-600"
              }`}
            >
              {weapon}
            </span>
          );
        })}
      </div>
    </div>
  );
};

const WeaponDisplayPanel = ({ rules, selectedRule }) => {
  const selectedRuleObject = rules.find((r) => r.id === selectedRule) ?? null;
  const swaps = selectedRuleObject?.swaps ?? [];

  const displayMaps = selectedRuleObject
    ? (selectedRuleObject.maps ?? [selectedRuleObject.mapString])
    : [];

  return (
    <div className="flex flex-col w-96 shrink-0 border-r border-zinc-600">
      <div className="border-b border-zinc-600 p-3 flex items-center gap-1">
        <RiCrosshair2Fill />
        <p className="font-semibold">Weapon spawners</p>
      </div>
      <div className="flex flex-col gap-2 p-4 overflow-y-auto">
        {displayMaps.map((mapName) => (
          <WeaponDisplayCard key={mapName} mapName={mapName} swaps={swaps} />
        ))}
      </div>
    </div>
  );
};

export default WeaponDisplayPanel;
