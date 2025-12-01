import { ReadStream } from 'fs';

import { parseFile } from '../common/utilities';
import { parseLine, turnDial } from './utility';

export async function secretEntrance(puzzleInputFile: ReadStream): Promise<number> {
  let dial = 50;
  let zeroCounter = 0;

  await parseFile(puzzleInputFile, line => {
    if (line === '') return;

    const { direction, distance } = parseLine(line);
    const { dial: newDial } = turnDial(dial, direction, distance);
    dial = newDial;

    if (dial === 0) zeroCounter++;
  });

  return zeroCounter;
}
