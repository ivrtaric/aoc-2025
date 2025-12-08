import type { ReadStream } from 'fs';

import { connectJunctionBoxes, getClosestCoordinatePairs, loadCoordinates } from './utility';

export async function playground(
  puzzleInputFile: ReadStream,
  pairCount: number,
  circuitCount: number
): Promise<number> {
  const [, distanceCache] = await loadCoordinates(puzzleInputFile);

  const shortestDistances = getClosestCoordinatePairs(distanceCache, pairCount);

  const circuits: Array<Set<string>> = [];
  for (const [key] of shortestDistances) {
    const [indexA, indexB] = key.split(',');

    connectJunctionBoxes(indexA, indexB, circuits);
  }

  const largestCircuits = circuits.sort((a, b) => b.size - a.size).slice(0, circuitCount);

  return largestCircuits.reduce((acc, curr) => acc * curr.size, 1);
}
