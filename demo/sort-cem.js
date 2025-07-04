/* eslint-disable no-undef */
import manifest from './shoelace-cem.json' with { type: 'json' };
import { sortCem } from '../dist/index.js';

const start = performance.now();
sortCem(manifest, {
  fileName: 'sorted-custom-elements.json',
  outdir: './demo',
});
const end = performance.now();
console.log(`Sorting took ${end - start} milliseconds.`);