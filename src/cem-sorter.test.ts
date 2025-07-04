/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect } from "vitest";
import { sortCem } from "./cem-sorter.js";
import { demoCem } from "./demo-cem.js";

describe("sortCustomElementsManifest", () => {
  // Mock manifest data for testing
  const createMockManifest = () => (demoCem);

  it("should sort modules by path", () => {
    const manifest = createMockManifest();
    const sorted = sortCem(manifest);

    expect(sorted.modules![0].path).toBe("src/components/a-component.js");
    expect(sorted.modules![1].path).toBe("src/components/z-component.js");
  });

  it("should sort exports alphabetically", () => {
    const manifest = createMockManifest();
    const sorted = sortCem(manifest);

    const exports = sorted.modules![1].exports!;
    expect(exports[0].name).toBe("AComponent");
    expect(exports[1].name).toBe("ZComponent");
  });

  it("should sort declarations alphabetically", () => {
    const manifest = createMockManifest();
    const sorted = sortCem(manifest);

    const declarations = sorted.modules![1].declarations!;
    expect(declarations[0].name).toBe("AComponent");
    expect(declarations[1].name).toBe("ZComponent");
  });

  it("should sort members alphabetically", () => {
    const manifest = createMockManifest();
    const sorted = sortCem(manifest);

    const members = (sorted.modules![1].declarations![1] as any).members!;
    expect(members[0].name).toBe("aMethod");
    expect(members[1].name).toBe("aProperty");
    expect(members[2].name).toBe("zMethod");
    expect(members[3].name).toBe("zProperty");
  });

  it("should sort events alphabetically", () => {
    const manifest = createMockManifest();
    const sorted = sortCem(manifest);

    const events = (sorted.modules![1].declarations![1] as any).events;
    expect(events[0].name).toBe("a-event");
    expect(events[1].name).toBe("z-event");
  });

  it("should sort slots alphabetically", () => {
    const manifest = createMockManifest();
    const sorted = sortCem(manifest);

    const slots = (sorted.modules![1].declarations![1] as any).slots;
    expect(slots[0].name).toBe("a-slot");
    expect(slots[1].name).toBe("z-slot");
  });

  it("should sort CSS custom properties alphabetically", () => {
    const manifest = createMockManifest();
    const sorted = sortCem(manifest);

    const cssProps = (sorted.modules![1].declarations![1] as any)
      .cssCustomProperties;
    expect(cssProps[0].name).toBe("--a-color");
    expect(cssProps[1].name).toBe("--z-color");
  });

  it("should sort CSS parts alphabetically", () => {
    const manifest = createMockManifest();
    const sorted = sortCem(manifest);

    const cssParts = (sorted.modules![1].declarations![1] as any).cssParts;
    expect(cssParts[0].name).toBe("a-part");
    expect(cssParts[1].name).toBe("z-part");
  });

  it("should sort dependencies alphabetically", () => {
    const manifest = createMockManifest();
    const sorted = sortCem(manifest);

    const dependencies = (sorted.modules![1].declarations![1] as any)
      .dependencies;
    expect(dependencies[0].name).toBe("ADependency");
    expect(dependencies[1].name).toBe("ZDependency");
  });

  it("should not mutate the original manifest", () => {
    const manifest = createMockManifest();
    const originalPath = manifest.modules![0].path;
    const sorted = sortCem(manifest);

    expect(manifest.modules![0].path).toBe(originalPath);
    expect(sorted.modules![0].path).not.toBe(originalPath);
  });

  describe("deprecated items handling", () => {
    it("should move deprecated items to the end when deprecatedLast is true", () => {
      const manifest = createMockManifest();
      const sorted = sortCem(manifest, {
        deprecatedLast: true,
      });

      const members = (sorted.modules![1].declarations![1] as any).members!;
      // Non-deprecated items should come first
      expect(members[0].name).toBe("zMethod");
      expect(members[1].name).toBe("zProperty");
      // Deprecated items should come last
      expect(members[2].name).toBe("aMethod");
      expect(members[3].name).toBe("aProperty");
    });

    it("should handle boolean deprecated values", () => {
      const manifest = createMockManifest();
      const sorted = sortCem(manifest, {
        deprecatedLast: true,
      });

      const events = (sorted.modules![1].declarations![1] as any).events;
      expect(events[0].name).toBe("z-event");
      expect(events[1].name).toBe("a-event"); // deprecated: true
    });

    it("should handle string deprecated values", () => {
      const manifest = createMockManifest();
      const sorted = sortCem(manifest, {
        deprecatedLast: true,
      });

      const members = (sorted.modules![1].declarations![1] as any).members!;
      const aMethod = members.find((m: any) => m.name === "aMethod");
      expect(aMethod?.deprecated).toBe("Use newMethod instead");
    });

    it("should sort deprecated items alphabetically among themselves", () => {
      const manifestWithMultipleDeprecated = {
        schemaVersion: "1.0.0",
        readme: "",
        modules: [
          {
            kind: "javascript-module",
            path: "test.js",
            declarations: [
              {
                kind: "class",
                name: "TestComponent",
                members: [
                  {
                    kind: "field",
                    name: "normalProp",
                    type: { text: "string" },
                  },
                  {
                    kind: "field",
                    name: "zDeprecated",
                    type: { text: "string" },
                    deprecated: true,
                  },
                  {
                    kind: "field",
                    name: "aDeprecated",
                    type: { text: "string" },
                    deprecated: true,
                  },
                  {
                    kind: "field",
                    name: "anotherNormal",
                    type: { text: "string" },
                  },
                ],
              },
            ],
            exports: [],
          },
        ],
      };

      const sorted = sortCem(
        manifestWithMultipleDeprecated,
        { deprecatedLast: true }
      );
      const members = (sorted.modules![0].declarations![0] as any).members!;

      expect(members[0].name).toBe("anotherNormal");
      expect(members[1].name).toBe("normalProp");
      expect(members[2].name).toBe("aDeprecated");
      expect(members[3].name).toBe("zDeprecated");
    });
  });

  describe("edge cases", () => {
    it("should handle empty manifest", () => {
      const emptyManifest = {
        schemaVersion: "1.0.0",
        readme: "",
        modules: [],
      };

      const sorted = sortCem(emptyManifest);
      expect(sorted.modules).toEqual([]);
    });

    it("should handle manifest with no modules", () => {
      const noModulesManifest = {
        schemaVersion: "1.0.0",
        readme: "",
      };

      const sorted = sortCem(noModulesManifest);
      expect(sorted.modules).toBeUndefined();
    });

    it("should handle modules with no declarations", () => {
      const noDeclarationsManifest = {
        schemaVersion: "1.0.0",
        readme: "",
        modules: [
          {
            kind: "javascript-module",
            path: "empty.js",
            exports: [],
          },
        ],
      };

      const sorted = sortCem(noDeclarationsManifest);
      expect(sorted.modules![0].declarations).toBeUndefined();
    });

    it("should handle declarations with no members", () => {
      const noMembersManifest = {
        schemaVersion: "1.0.0",
        readme: "",
        modules: [
          {
            kind: "javascript-module",
            path: "simple.js",
            declarations: [
              {
                kind: "class",
                name: "SimpleComponent",
              },
            ],
            exports: [],
          },
        ],
      };

      const sorted = sortCem(noMembersManifest);
      expect(
        (sorted.modules![0].declarations![0] as any).members
      ).toBeUndefined();
    });

    it("should handle items with no names", () => {
      const noNamesManifest = {
        schemaVersion: "1.0.0",
        readme: "",
        modules: [
          {
            kind: "javascript-module",
            path: "unnamed.js",
            declarations: [
              {
                kind: "class",
                members: [
                  { kind: "field", type: { text: "string" } }, // no name
                  {
                    kind: "field",
                    name: "namedField",
                    type: { text: "string" },
                  },
                ],
              },
            ],
            exports: [],
          },
        ],
      };

      const sorted = sortCem(noNamesManifest);
      const members = (sorted.modules![0].declarations![0] as any).members!;
      expect(members[0].name).toBe(""); // unnamed item should sort first
      expect(members[1].name).toBe("namedField");
    });
  });

  describe("logging", () => {
    it("should accept debug option", () => {
      const manifest = createMockManifest();

      // Should not throw with debug enabled
      expect(() => {
        sortCem(manifest, { debug: true });
      }).not.toThrow();
    });

    it("should use default options when none provided", () => {
      const manifest = createMockManifest();

      expect(() => {
        sortCem(manifest);
      }).not.toThrow();
    });
  });

  describe("file output", () => {
    it("should not write file when fileName or outdir is not provided", () => {
      const manifest = createMockManifest();

      // Should not throw and should return sorted manifest
      expect(() => {
        const result = sortCem(manifest, { debug: false });
        expect(result).toBeDefined();
        expect(result.modules).toBeDefined();
      }).not.toThrow();
    });

    it("should accept fileName and outdir options without throwing", () => {
      const manifest = createMockManifest();

      // Should not throw with file output options
      expect(() => {
        sortCem(manifest, { 
          fileName: "test-output.json",
          outdir: "./test-temp",
          debug: false 
        });
      }).not.toThrow();
    });
  });
});
