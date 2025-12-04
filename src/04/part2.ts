import type { ReadStream } from 'fs';
import {
  listAccessiblePaperRollLocations,
  loadBoard,
  removeAccessiblePaperRolls
} from 'src/04/utility';

export async function printingDepartment(puzzleInputFile: ReadStream): Promise<number> {
  const storage = await loadBoard(puzzleInputFile);

  let total = 0;
  while (true) {
    const accessiblePaperRolls = listAccessiblePaperRollLocations(storage);
    if (accessiblePaperRolls.length === 0) break;

    total += accessiblePaperRolls.length;
    removeAccessiblePaperRolls(storage, accessiblePaperRolls);
  }

  return total;
}
