export type FreshRange = [bigint, bigint];

export type Database = {
  freshRanges: Array<FreshRange>;
  ingredientIds: Array<bigint>;
};
