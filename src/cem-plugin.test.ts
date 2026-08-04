import fs from "fs";
import os from "os";
import path from "path";
import { cemSorterPlugin } from "./cem-plugin";
import { DEFAULT_SORT_OPTIONS } from "./default-options.js";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

describe("cemSorterPlugin", () => {
  let tempDir: string;

  beforeEach(() => {
    tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "cem-sorter-"));
  });

  afterEach(() => {
    vi.restoreAllMocks();
    fs.rmSync(tempDir, { recursive: true, force: true });
  });

  it("should return a plugin object with name and packageLinkPhase", () => {
    const plugin = cemSorterPlugin();
    expect(plugin).toHaveProperty("name", "@wc-toolkit/cem-sorter");
    expect(typeof plugin.packageLinkPhase).toBe("function");
  });

  it("should not write a file when fileName is omitted", () => {
    const plugin = cemSorterPlugin({
      outdir: tempDir,
    });

    plugin.packageLinkPhase({
      customElementsManifest: { modules: [] },
    });

    expect(fs.readdirSync(tempDir)).toEqual([]);
  });

  it("should write a file when fileName is explicitly provided", () => {
    const plugin = cemSorterPlugin({
      fileName: "out.json",
      outdir: tempDir,
    });

    plugin.packageLinkPhase({
      customElementsManifest: { modules: [] },
    });

    expect(fs.existsSync(path.join(tempDir, "out.json"))).toBe(true);
  });

  it("should suppress output and warn when fileName matches the default CEM file", () => {
    const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

    const plugin = cemSorterPlugin({
      fileName: DEFAULT_SORT_OPTIONS.fileName,
      outdir: tempDir,
    });

    plugin.packageLinkPhase({
      customElementsManifest: { modules: [] },
    });

    expect(fs.readdirSync(tempDir)).toEqual([]);

    expect(warnSpy).toHaveBeenCalledOnce();
    expect(warnSpy).toHaveBeenCalledWith(
      expect.stringContaining(DEFAULT_SORT_OPTIONS.fileName),
    );
  });
});
