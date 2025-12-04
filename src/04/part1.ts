import type { ReadStream } from 'fs';
import { listAccessiblePaperRollLocations, loadBoard } from 'src/04/utility';

export async function printingDepartment(puzzleInputFile: ReadStream): Promise<number> {
  const storage = await loadBoard(puzzleInputFile);

  const accessiblePaperRolls = listAccessiblePaperRollLocations(storage);

  return accessiblePaperRolls.length;
}
