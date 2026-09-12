import test from "node:test";
import assert from "node:assert/strict";
import {
  MAX_IMPORT_PAYLOAD_LENGTH,
  parseDeepLinkImport,
  validateImportPayload,
} from "./deepLinkImport.js";

test("parses a playlist URL generated with URLSearchParams", () => {
  const encoded = "base64+with/slashes==";
  const params = new URLSearchParams({ import: "playlist", data: encoded });

  assert.deepEqual(parseDeepLinkImport(`#${params.toString()}`), {
    kind: "playlist",
    data: encoded,
  });
});

test("parses a swapper import", () => {
  assert.deepEqual(parseDeepLinkImport("#import=swapper&data=payload"), {
    kind: "swapper",
    data: "payload",
  });
});

test("ignores fragments unrelated to imports", () => {
  assert.equal(parseDeepLinkImport("#about"), null);
});

test("returns invalid and missing import parameters for error handling", () => {
  assert.deepEqual(parseDeepLinkImport("#import=other&data=payload"), {
    kind: null,
    data: "payload",
  });
  assert.deepEqual(parseDeepLinkImport("#import=playlist"), {
    kind: "playlist",
    data: "",
  });
});

test("validates and trims payloads up to 64 KiB", () => {
  assert.equal(validateImportPayload("  payload\n"), "payload");
  assert.equal(
    validateImportPayload("a".repeat(MAX_IMPORT_PAYLOAD_LENGTH)).length,
    MAX_IMPORT_PAYLOAD_LENGTH,
  );
});

test("rejects empty and oversized payloads", () => {
  assert.throws(() => validateImportPayload(" \n"), /Missing/);
  assert.throws(
    () => validateImportPayload("a".repeat(MAX_IMPORT_PAYLOAD_LENGTH + 1)),
    /too large/,
  );
});
