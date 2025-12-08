import { ReadStream } from 'node:fs';

import { parseFile } from 'src/common/utilities';

import { Coordinate3D } from './types';

const LINE_PARSE_REGEX = /^(?<x>\d+),(?<y>\d+),(?<z>\d+)$/;
export const parseLine = (line: string): Coordinate3D => {
  const result = LINE_PARSE_REGEX.exec(line);
  if (!result || !result.groups) throw new Error(`Couldn't parse line "${line}"`);

  return [
    parseInt(result.groups.x, 10),
    parseInt(result.groups.y, 10),
    parseInt(result.groups.z, 10)
  ];
};

export const calculateCoordinateDistance = (
  indexA: number,
  indexB: number,
  coordinateList: Array<Coordinate3D>,
  cache: Map<string, number>
): number => {
  const [ax, ay, az] = coordinateList[indexA];
  const [bx, by, bz] = coordinateList[indexB];

  const value = Math.sqrt(
    Math.pow(Math.abs(bx - ax), 2) + Math.pow(Math.abs(by - ay), 2) + Math.pow(Math.abs(bz - az), 2)
  );
  cache.set(`${indexA},${indexB}`, value);

  return value;
};

export const loadCoordinates = async (
  puzzleInputFile: ReadStream
): Promise<[Array<Coordinate3D>, Map<string, number>]> => {
  const coordinates: Array<Coordinate3D> = [];
  const coordinateDistanceCache = new Map<string, number>();

  await parseFile(puzzleInputFile, line => {
    if (line === '') return;

    coordinates.push(parseLine(line));
    if (coordinates.length < 2) return;

    const lastCoordinateIndex = coordinates.length - 1;

    for (let index = 0; index < lastCoordinateIndex; index++) {
      calculateCoordinateDistance(index, lastCoordinateIndex, coordinates, coordinateDistanceCache);
    }
  });

  return [coordinates, coordinateDistanceCache];
};

export const getClosestCoordinatePairs = (
  distances: Map<string, number>,
  pairCount?: number
): Array<[string, number]> => {
  const shortestDistances = [...distances.entries()].sort(([, a], [, b]) => a - b);

  return pairCount ? shortestDistances.slice(0, pairCount) : shortestDistances;
};

export const connectJunctionBoxes = (
  mapIndexA: string,
  mapIndexB: string,
  circuits: Array<Set<string>>
) => {
  let nodesAdded = false;
  const circuitsToMerge: Array<[number, number]> = [];
  for (const [index, circuit] of circuits.entries()) {
    if (circuit.has(mapIndexA) && circuit.has(mapIndexB)) {
      // Both nodes are already in a circuit
      nodesAdded = true;
    } else if (circuit.has(mapIndexA)) {
      circuit.add(mapIndexB);
      nodesAdded = true;
    } else if (circuit.has(mapIndexB)) {
      circuit.add(mapIndexA);
      nodesAdded = true;
    }

    if (nodesAdded) {
      for (let i = circuits.length - 1; i > index; i--) {
        if (circuits[i].has(mapIndexA) || circuits[i].has(mapIndexB))
          circuitsToMerge.push([i, index]);
      }
      break;
    }
  }

  if (circuitsToMerge.length) {
    for (const [from, to] of circuitsToMerge) {
      circuits[to] = new Set([...circuits[from], ...circuits[to]]);
      circuits.splice(from, 1);
    }
  }

  if (!nodesAdded) circuits.push(new Set([mapIndexA, mapIndexB]));

  return nodesAdded;
};
