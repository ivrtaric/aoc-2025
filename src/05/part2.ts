import type { ReadStream } from 'fs';
import { inRange } from 'src/common/utilities';

import type { FreshRange } from './types';
import { loadData } from './utility';

export async function cafeteria(puzzleInputFile: ReadStream): Promise<bigint> {
  const database = await loadData(puzzleInputFile);

  let ranges = database.freshRanges;
  while (true) {
    const joinedRanges: Array<FreshRange> = [];

    for (const currentRange of ranges) {
      if (!joinedRanges.length) {
        joinedRanges.push(currentRange);
        continue;
      }

      let rangeJoined = false;
      const indexesToRemove: Array<number> = []; // Indexes are pushed in reverse order so that we can safely remove items
      for (const [index, existingRange] of joinedRanges.entries()) {
        if (!inRange(currentRange[0], existingRange) && !inRange(currentRange[1], existingRange)) {
          // The current and the existing ranges don't overlap at all, so we can skip to the next existing range
          continue;
        }
        if (inRange(currentRange[0], existingRange) && inRange(currentRange[1], existingRange)) {
          // The existing range completely contains the current range, so we can ignore the current range
          rangeJoined = true;
          break;
        } else if (
          inRange(existingRange[0], currentRange) &&
          inRange(existingRange[1], currentRange)
        ) {
          // The current range completely contains the existing range, so we can remove the existing range
          indexesToRemove.unshift(index);
        } else if (inRange(currentRange[0], existingRange)) {
          // Ranges overlap, join them together
          currentRange[0] = existingRange[0];
          indexesToRemove.unshift(index);
        } else if (inRange(currentRange[1], existingRange)) {
          // Ranges overlap, join them together
          currentRange[1] = existingRange[1];
          indexesToRemove.unshift(index);
        }
      }

      // Remove the ranges joined with the current range
      if (indexesToRemove.length) {
        indexesToRemove.forEach(index => joinedRanges.splice(index, 1));
      }

      if (!rangeJoined) joinedRanges.push(currentRange);
    }

    // Break if no ranges could be joined or removed
    if (joinedRanges.length === ranges.length) break;

    // Retry the join process in the opposite direction
    ranges = joinedRanges.reverse();
  }

  let count = 0n;
  for (const [from, to] of ranges) {
    count += to - from + 1n;
  }

  return count;
}
