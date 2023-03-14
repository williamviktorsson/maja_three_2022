import { Sorter } from "./interfaces";
const fs = require("fs");
export class DefaultSorter implements Sorter {
  timed_sort(array: number[]): { array: number[]; milliseconds: number } {
    let start = Date.now();
    let temp = this.sort(array);
    let end = Date.now();
    return { array: temp, milliseconds: end - start };
  }
  sort(array: number[]): number[] {
    // TODO: complete the default sort
    throw Error("Method not yet implemented");
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
    // TODO: log the elapsed time to console
    throw Error("Method not yet implemented");
    return temp;
  }
}

export class BubbleSorter extends DefaultSorterTimeLogger {
  //https://rajat-m.medium.com/implement-5-sorting-algorithms-using-javascript-63c5a917e811
  sort(array: number[]): number[] {
    // TODO: implement bubblesort, check at the link
    throw Error("Method not yet implemented");
  }
}

export class QuickSorter extends DefaultSorterTimeLogger {
  //https://rajat-m.medium.com/implement-5-sorting-algorithms-using-javascript-63c5a917e811
  sort(array: number[]): number[] {
    // TODO: implement quicksort, check the link
    throw Error("Method not yet implemented");
  }
}

// this sorter does the parent sort and also dumps the result to file
export class QuickSorterTimeFileDumper extends QuickSorter {
  override timed_sort(array: number[]): {
    array: number[];
    milliseconds: number;
  } {
    let temp = super.timed_sort(array);
    // TODO: log the time to a file. use "./log.txt" as filename
    // make sure that you are logging a string and not a number
    // https://nodejs.dev/en/learn/writing-files-with-nodejs/
    throw Error("Method not yet implemented");

    return temp;
  }
}
