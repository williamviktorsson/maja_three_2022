export interface Sorter {
  sort(array: number[]): number[];
  timed_sort(array: number[]): { array: number[]; milliseconds: number };
  shuffle(array: number[]): number[];
}
