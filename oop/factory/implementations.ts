import { Crate, Factory, Item, Machine, Part, Person } from "./interfaces";

export class Chad implements Person {
  name: string;
  right_hand: Part | undefined;
  left_hand: Item | undefined;

  constructor(name: string) {
    this.name = name;
  }

  carry(object: Part | Item): boolean {
    throw new Error("Method not implemented.");
  }
  interact(item: Item): boolean {
    return item.use();
  }
}

export class FenderFactory implements Factory {
  setup(): boolean {
    throw new Error("Method not implemented.");
  }
  assembly: Machine[] = [];
  crates: Crate[] = [];
  workers: Person[] = [];
  worker_capacity = 50;
  crate_capacity = 20;
  enter(worker: Person): boolean {
    throw new Error("Method not implemented.");
  }
  receive(crate: Crate): boolean {
    throw new Error("Method not implemented.");
  }
  produce(): Item {
    return new Stratocaster();
  }
}

export class Stratocaster implements Item {
  parts: Part[] = [];
  complete: boolean = false;
  use(): boolean {
    if (!this.complete) {
      console.log("cant play an unfinished guitar");
      return false;
    } else {
      console.log("sickest riff");
      return true;
    }
  }
}
