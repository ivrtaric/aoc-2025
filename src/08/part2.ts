import type { ReadStream } from 'fs';

import { connectJunctionBoxes, getClosestCoordinatePairs, loadCoordinates } from './utility';

export async function playground(puzzleInputFile: ReadStream): Promise<number> {
  const [coordinates, distanceCache] = await loadCoordinates(puzzleInputFile);

  const shortestDistances = getClosestCoordinatePairs(distanceCache);

  const circuits: Array<Set<string>> = [];
  for (const [key] of shortestDistances) {
    const [indexA, indexB] = key.split(',');

    connectJunctionBoxes(indexA, indexB, circuits);

    if (circuits.length === 1 && circuits[0].size === coordinates.length) {
      const [a, b] = [Number(indexA), Number(indexB)];
      const [[ax], [bx]] = [coordinates[a], coordinates[b]];

      return ax * bx;
    }
  }
}
