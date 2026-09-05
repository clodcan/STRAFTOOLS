export const MAX_IMPORT_PAYLOAD_LENGTH = 64 * 1024;

const supportedImportKinds = new Set(["playlist", "swapper"]);

export const parseDeepLinkImport = (hash) => {
  const params = new URLSearchParams(hash.startsWith("#") ? hash.slice(1) : hash);

  if (!params.has("import") && !params.has("data")) return null;

  const kind = params.get("import");

  return {
    kind: supportedImportKinds.has(kind) ? kind : null,
    data: params.get("data") ?? "",
  };
};

export const validateImportPayload = (encoded) => {
  if (typeof encoded !== "string") throw new Error("Missing import payload");

  const trimmed = encoded.trim();
  if (trimmed.length === 0) throw new Error("Missing import payload");
  if (trimmed.length > MAX_IMPORT_PAYLOAD_LENGTH) {
    throw new Error("Import payload is too large");
  }

  return trimmed;
};
