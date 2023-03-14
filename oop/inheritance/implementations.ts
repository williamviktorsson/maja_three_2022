import { Sorter } from "./interfaces";

export class DefaultSorter implements Sorter {
  timed_sort(array: number[]): { array: number[]; milliseconds: number } {
    let start = Date.now();
    let temp = this.sort(array);
    let end = Date.now();
    return { array: temp, milliseconds: end - start };
  }
  sort(array: number[]): number[] {
    // TODO: use the default array sort method
    throw new Error("Method not implemented.");
  }
  shuffle(array: number[]): number[] {
    // https://stackoverflow.com/a/2450976
    let currentIndex = array.length;
    let randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  }
}

export class DefaultSorterTimeLogger extends DefaultSorter {
  override timed_sort(array: number[]): {
    array: number[];
    milliseconds: number;
  } {
    let temp = super.timed_sort(array);
    // TODO: log the sorting time to console
    return temp;
  }
}

export class BubbleSorter extends DefaultSorterTimeLogger {
  //https://rajat-m.medium.com/implement-5-sorting-algorithms-using-javascript-63c5a917e811
  sort(array: number[]): number[] {
    // TODO: implement bubblesort
    throw new Error("Method not implemented.");
  }
}

export class QuickSorter extends DefaultSorterTimeLogger {
  //https://rajat-m.medium.com/implement-5-sorting-algorithms-using-javascript-63c5a917e811
  sort(array: number[]): number[] {
    // TODO: implement quicksort
    throw new Error("Method not implemented.");
  }
}

export class BogoSorter extends DefaultSorterTimeLogger {
  sort(array: number[]): number[] {
    // TODO: implement Bogosort
    throw new Error("Method not implemented.");
  }
}

// this sorter does the parent sort and also dumps the result to file
export class BogoSorterTimeFileDumper extends DefaultSorterTimeLogger {
  override timed_sort(array: number[]): {
    array: number[];
    milliseconds: number;
  } {
    // TODO: log the sorting time to file
    // https://nodejs.dev/en/learn/writing-files-with-nodejs/
    throw new Error("Method not implemented.");
  }
}
