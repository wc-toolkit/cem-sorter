export const demoCem = {
  schemaVersion: "1.0.0",
  readme: "",
  modules: [
    {
      kind: "javascript-module",
      path: "src/components/z-component.js",
      declarations: [
        {
          kind: "class",
          name: "ZComponent",
          members: [
            {
              kind: "field",
              name: "zProperty",
              type: { text: "string" },
            },
            {
              kind: "field",
              name: "aProperty",
              type: { text: "number" },
              deprecated: true,
            },
            {
              kind: "method",
              name: "zMethod",
              parameters: [
                { name: "zParam", type: { text: "string" } },
                { name: "aParam", type: { text: "number" } },
              ],
            },
            {
              kind: "method",
              name: "aMethod",
              deprecated: "Use newMethod instead",
            },
          ],
          events: [
            { name: "z-event", type: { text: "CustomEvent" } },
            {
              name: "a-event",
              type: { text: "CustomEvent" },
              deprecated: true,
            },
          ],
          slots: [
            { name: "z-slot", description: "Z slot" },
            { name: "a-slot", description: "A slot" },
          ],
          cssCustomProperties: [
            { name: "--z-color", description: "Z color" },
            { name: "--a-color", description: "A color", deprecated: true },
          ],
          cssParts: [
            { name: "z-part", description: "Z part" },
            { name: "a-part", description: "A part" },
          ],
          dependencies: [
            { name: "ZDependency", description: "Z dependency" },
            { name: "ADependency", description: "A dependency" },
          ],
          tagName: "z-component",
          customElement: true,
        },
        {
          kind: "class",
          name: "AComponent",
          members: [
            {
              kind: "field",
              name: "property",
              type: { text: "string" },
            },
          ],
          tagName: "a-component",
          customElement: true,
        },
      ],
      exports: [
        {
          kind: "js",
          name: "ZComponent",
          declaration: {
            name: "ZComponent",
            module: "src/components/z-component.js",
          },
        },
        {
          kind: "js",
          name: "AComponent",
          declaration: {
            name: "AComponent",
            module: "src/components/z-component.js",
          },
        },
      ],
    },
    {
      kind: "javascript-module",
      path: "src/components/a-component.js",
      declarations: [
        {
          kind: "class",
          name: "AnotherComponent",
          members: [],
          tagName: "another-component",
          customElement: true,
        },
      ],
      exports: [],
    },
  ],
};
