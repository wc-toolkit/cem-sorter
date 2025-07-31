import { describe, it, expect, vi } from "vitest";
import { cemSorterPlugin } from "./cem-plugin";
import * as sorter from "./cem-sorter";
import type { Package } from "custom-elements-manifest";

describe("cemSorterPlugin", () => {
  it("should return a plugin object with name and packageLinkPhase", () => {
    const plugin = cemSorterPlugin();
    expect(plugin).toHaveProperty("name", "@wc-toolkit/cem-sorter");
    expect(typeof plugin.packageLinkPhase).toBe("function");
  });


  it("should preserve fileName option when passed", () => {
    const spy = vi.spyOn(sorter, "sortCem").mockImplementation((manifest, options) => {
      expect(options?.fileName).toBe("out.json");
      return manifest as Package;
    });

    const plugin = cemSorterPlugin({
      fileName: "out.json",
      outdir: "./",
    });

    plugin.packageLinkPhase({ customElementsManifest: { modules: [] } });

    spy.mockRestore();
  });
});
