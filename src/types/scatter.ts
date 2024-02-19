export type ScatterVector = [number, number];

export interface ScatterSeries {
  name: string;
  id: string;
  marker: {
    symbol: string;
  };
  data?: ScatterVector[];
}