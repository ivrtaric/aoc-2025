import { MappedArea } from 'src/common/types';

export const enum ManifoldSpot {
  EMPTY = '.',
  START = 'S',
  SPLITTER = '^',
  BEAM = '|'
}
export type ManifoldLine = Array<ManifoldSpot>;
export type TachyonManifold = MappedArea<ManifoldSpot>;
