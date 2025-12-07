import { ReadStream } from 'node:fs';

import { parseFile } from 'src/common/utilities';

import { ManifoldLine, ManifoldSpot, TachyonManifold } from './types';

const LINE_PARSE_REGEX = /^[.S^]+$/;
export const parseLine = (line: string): ManifoldLine => {
  if (!LINE_PARSE_REGEX.test(line)) throw new Error(`Invalid line: ${line}`);
  return line.split('') as ManifoldLine;
};
export const loadManifold = async (puzzleInputFile: ReadStream): Promise<TachyonManifold> => {
  const manifold: TachyonManifold = [];

  await parseFile(puzzleInputFile, line => {
    if (line === '') return;
    manifold.push(parseLine(line));
  });

  return manifold;
};

export const countSplitsAndUpdateManifold = (line: number, manifold: TachyonManifold): number => {
  // First line should contain only Empty and Start spots
  if (line === 0) return 0;

  let splits: number = 0;
  for (let i = 0; i < manifold[line].length; i++) {
    const spotAbove = manifold[line - 1][i];

    switch (manifold[line][i]) {
      case ManifoldSpot.EMPTY: {
        if (spotAbove === ManifoldSpot.START || spotAbove === ManifoldSpot.BEAM) {
          manifold[line][i] = ManifoldSpot.BEAM;
        }
        break;
      }
      case ManifoldSpot.SPLITTER: {
        if (spotAbove === ManifoldSpot.START || spotAbove === ManifoldSpot.BEAM) {
          if (i - 1 >= 0) manifold[line][i - 1] = ManifoldSpot.BEAM;
          if (i + 1 < manifold[line].length) manifold[line][i + 1] = ManifoldSpot.BEAM;
          splits++;
        }
        break;
      }
      case ManifoldSpot.START:
      case ManifoldSpot.BEAM: {
        break;
      }
      default: {
        throw new Error(`Ran into invalid spot: ${manifold[line][i]}, on line ${line}, index ${i}`);
      }
    }
  }

  console.log(`Line ${line}: ${splits} splits`);
  return splits;
};

const PATHS_MAP: Map<string, number> = new Map<string, number>();
// Dynamic Programming 101:
// Recursively call the countTachyonPaths() function with reduced manifold line count;
// Cache already resolved paths in a map for faster lookup
export const countTachyonPaths = (
  manifold: TachyonManifold,
  fromLine: number = 0,
  beamIndex: number = -1
): number => {
  if (beamIndex === -1 && fromLine === 0) {
    beamIndex = manifold[0].indexOf(ManifoldSpot.START);
  }

  const mapKey = `${fromLine},${beamIndex}`;
  if (PATHS_MAP.has(mapKey)) return PATHS_MAP.get(mapKey)!;

  const manifoldWidth = manifold[0].length;
  let currentLine = fromLine + 1;
  while (true) {
    if (manifold[currentLine][beamIndex] === ManifoldSpot.SPLITTER) {
      // Found splitter on the beam index
      if (beamIndex - 1 >= 0 && beamIndex + 1 < manifoldWidth) {
        // The beam can continue on two paths
        break;
      }

      if (beamIndex - 1 >= 0) {
        // The beam can continue on the left path only
        beamIndex--;
      } else if (beamIndex + 1 < manifoldWidth) {
        // The beam can continue on the right path only
        beamIndex++;
      }
    }

    currentLine++;
    if (currentLine >= manifold.length) return 1;
  }

  // Found splitter on the beam index, and the beam can continue on two paths
  // Split the beam in two
  // For each split beam, reduce the manifold size and count the paths for each sub-manifold
  const paths =
    countTachyonPaths(manifold, currentLine, beamIndex - 1) +
    countTachyonPaths(manifold, currentLine, beamIndex + 1);
  PATHS_MAP.set(`${fromLine},${beamIndex}`, paths);

  return paths;
};
