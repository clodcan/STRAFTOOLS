import maps from "../data/maps.json";

export const expandWildcard = (pattern) => {
  const regex = new RegExp(
    "^" + pattern.replace(/\?/g, ".").replace(/\*/g, ".*") + "$",
    "i",
  );
  return Object.keys(maps).filter((m) => regex.test(m));
};

export const normalizeMapString = (mapString) =>
  Object.keys(maps).find((m) => m.toLowerCase() === mapString.toLowerCase()) ??
  null;
