import maps from "../data/maps.json";
import { weaponNameToId, weaponIdToName } from "./weaponNames";
import { expandWildcard, normalizeMapString } from "./mapUtils";

export const buildPresetJson = (rules, swapperName) => ({
  type: "swap",
  Preset: {
    Name: swapperName,
    Maps: rules.flatMap((rule) => {
      const remaps = rule.swaps
        .filter((s) => s.precursor !== s.result)
        .map((s) => ({
          Precursor: weaponNameToId[s.precursor] ?? s.precursor,
          Result: weaponNameToId[s.result] ?? s.result,
        }));

      if (rule.pattern) {
        return [{ MapString: rule.pattern, WeaponRemaps: remaps }];
      }

      const mapStrings = rule.maps ?? [rule.mapString];
      return mapStrings.map((mapString) => ({
        MapString: mapString,
        WeaponRemaps: remaps,
      }));
    }),
  },
});

export const parsePresetJson = (json) => {
  if (json.type !== "swap") throw new Error("Invalid preset type");

  return {
    name: json.Preset.Name,
    rules: json.Preset.Maps.map((m) => {
      const importedSwaps = m.WeaponRemaps.map((r) => ({
        id: crypto.randomUUID(),
        precursor: weaponIdToName[r.Precursor] ?? r.Precursor,
        result: weaponIdToName[r.Result] ?? r.Result,
      }));

      const isPattern = m.MapString.includes("*") || m.MapString.includes("?");
      const normalizedMapString = isPattern
        ? m.MapString
        : normalizeMapString(m.MapString);
      if (!isPattern && !normalizedMapString) return null;

      const mapList = isPattern
        ? expandWildcard(m.MapString)
        : [normalizedMapString];

      const allWeapons = [
        ...new Set(
          mapList.flatMap((mapName) =>
            Object.values(maps[mapName]?.weapons ?? {}).flat(),
          ),
        ),
      ];

      const mergedSwaps = allWeapons.map((w) => {
        const override = importedSwaps.find(
          (imp) => imp.precursor.toLowerCase() === w.toLowerCase(),
        );
        return override
          ? { ...override, id: crypto.randomUUID() }
          : { id: crypto.randomUUID(), precursor: w, result: w };
      });

      if (isPattern) {
        return {
          id: crypto.randomUUID(),
          maps: mapList,
          pattern: m.MapString,
          swaps: mergedSwaps,
        };
      }

      return {
        id: crypto.randomUUID(),
        mapString: normalizedMapString,
        swaps: mergedSwaps,
      };
    }).filter(Boolean),
  };
};
