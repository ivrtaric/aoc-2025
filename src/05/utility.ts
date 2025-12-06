import type { ReadStream } from 'fs';
import { parseFile } from 'src/common/utilities';

import { Database, FreshRange } from './types';

const FRESH_RANGE_REGEX = /^(?<from>\d+)-(?<to>\d+)$/;
const INGREDIENT_ID_REGEX = /^(?<id>\d+)$/;

const parseFreshRange = (line: string): FreshRange => {
  const result = FRESH_RANGE_REGEX.exec(line);
  if (!result || !result.groups) throw new Error(`Couldn't parse line "${line}"`);

  return [BigInt(result.groups.from), BigInt(result.groups.to)];
};

const parseIngredientId = (line: string): bigint => {
  const result = INGREDIENT_ID_REGEX.exec(line);
  if (!result || !result.groups) throw new Error(`Couldn't parse line "${line}"`);

  return BigInt(result.groups.id);
};

export const loadData = async (puzzleInputFile: ReadStream): Promise<Database> => {
  const database: Database = {
    freshRanges: [],
    ingredientIds: []
  };

  let stage = 'FRESH_RANGES';
  await parseFile(puzzleInputFile, line => {
    if (line === '') {
      if (stage === 'FRESH_RANGES') stage = 'INGREDIENT_IDS';
      return;
    }

    switch (stage) {
      case 'FRESH_RANGES': {
        database.freshRanges.push(parseFreshRange(line));
        break;
      }
      case 'INGREDIENT_IDS': {
        database.ingredientIds.push(parseIngredientId(line));
        break;
      }
      default:
        throw new Error(`Invalid stage: ${stage}`);
    }
  });

  return database;
};
