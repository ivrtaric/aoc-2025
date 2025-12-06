import type { ReadStream } from 'fs';

import { loadData } from './utility';

export async function cafeteria(puzzleInputFile: ReadStream): Promise<number> {
  const database = await loadData(puzzleInputFile);

  let freshCount = 0;
  for (const id of database.ingredientIds) {
    for (const [from, to] of database.freshRanges) {
      if (id >= from && id <= to) {
        freshCount++;
        break;
      }
    }
  }

  return freshCount;
}
