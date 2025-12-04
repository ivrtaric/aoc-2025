import { MappedArea } from 'src/common/types';

export type Position = [number, number];
export const PAPER_ROLL = '@';
export const FLOOR = '.';
export const enum StorageType {
  PAPER_ROLL = '@',
  FLOOR = '.'
}
export type StorageLine = Array<StorageType>;
export type Storage = MappedArea<StorageType>;
