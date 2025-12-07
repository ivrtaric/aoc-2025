import type { ReadStream } from 'fs';

import { countSplitsAndUpdateManifold, loadManifold } from './utility';

export async function laboratories(puzzleInputFile: ReadStream): Promise<number> {
  const manifold = await loadManifold(puzzleInputFile);

  let total = 0;
  for (let line = 0; line < manifold.length; line++) {
    const subTotal = countSplitsAndUpdateManifold(line, manifold);
    total += subTotal;
  }

  return total;
}
