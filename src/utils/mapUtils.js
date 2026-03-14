import maps from "../data/maps.json";

export const expandPattern = (pattern) => {
  const regexPattern = pattern.replace(/\*/g, ".*").replace(/\?/g, ".");

  try {
    const regex = new RegExp("^" + regexPattern + "$", "i");
    return Object.keys(maps).filter((m) => regex.test(m));
  } catch {
    return [];
  }
};

export const normalizeMapString = (mapString) =>
  Object.keys(maps).find((m) => m.toLowerCase() === mapString.toLowerCase()) ??
  null;
