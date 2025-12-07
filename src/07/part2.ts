import type { ReadStream } from 'fs';

import { countTachyonPaths, loadManifold } from './utility';

export async function laboratories(puzzleInputFile: ReadStream): Promise<number> {
  const manifold = await loadManifold(puzzleInputFile);

  const paths = countTachyonPaths(manifold);

  return paths;
}
