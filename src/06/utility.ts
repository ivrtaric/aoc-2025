import { ReadStream } from 'node:fs';

import { Worksheet } from 'src/06/types';
import { parseFile } from 'src/common/utilities';

BigInt.prototype['toJSON'] = function () {
  return this.toString();
};

const CHECK_WORKSHEET_NUMBERS = /(^|\s+)?(\d+(\s+|$))+/;
const CHECK_WORKSHEET_OPERATIONS = /(^|\s+)?([+*](\s+|$))+/;

export const parseWorksheetNumbers = (line: string): Array<bigint> => {
  const isValid = CHECK_WORKSHEET_NUMBERS.test(line);
  if (!isValid) throw new Error(`Couldn't parse line "${line}"`);

  return line
    .trim()
    .split(/\s+/)
    .map(n => BigInt(n));
};

export const parseWorksheetOperations = (line: string): Array<string> => {
  const isValid = CHECK_WORKSHEET_OPERATIONS.test(line);
  if (!isValid) throw new Error(`Couldn't parse line "${line}"`);

  return line.trim().split(/\s+/);
};

export const loadData = async (puzzleInputFile: ReadStream): Promise<Worksheet> => {
  const worksheet: Worksheet = {
    numberLines: [],
    operations: []
  };

  await parseFile(puzzleInputFile, line => {
    if (line === '') return;

    try {
      const numbers = parseWorksheetNumbers(line);
      worksheet.numberLines.push(numbers);
    } catch (e) {
      const operations = parseWorksheetOperations(line);
      worksheet.operations = operations;
    }
  });

  return worksheet;
};

/*
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
*/
