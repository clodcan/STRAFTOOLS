import Pako from "pako";

export const encode = (obj) => {
  const json = JSON.stringify(obj);
  const bytes = new TextEncoder().encode(json);
  const compressed = Pako.gzip(bytes);
  return btoa(Array.from(compressed, (b) => String.fromCharCode(b)).join(""));
};

export const decode = (str) => {
  const binary = atob(str.trim());
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return JSON.parse(new TextDecoder().decode(Pako.ungzip(bytes)));
};
