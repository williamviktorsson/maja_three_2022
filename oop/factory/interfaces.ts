export interface Factory {
  assembly: Machine[];
  crates: Crate[];
  workers: Person[];
  enter(worker: Person): boolean; // a worker starts its shift
  receive(crate: Crate): boolean; // a crate is delivered to the factory
  produce(): Item; // Create an empty item, then pass it through each machine to complete it.
  setup(): boolean; // assign workers to the assembly line and take items from crates to the assembly line
}

export interface Item {
  parts: Part[]; // an item consists of X parts
  complete: boolean;
  use(): boolean;
}

export interface Part {
  name: string;
}

export interface Machine {
  operator: Person | undefined;
  parts: Part[];
  occupy(operator: Person);
  assemble(item: Item): Item; // adds parts to the item.
  fill(part: Part): boolean; // fills the machine with parts.
}

export interface Crate {
  parts: Part[];
  take(): Part | undefined; 
}

export interface Person {
  name: string;
  right_hand: Part | undefined;
  left_hand: Item | undefined;
  carry(object: Item | Part): boolean; // a person can carry something if hands are available.
  interact(item: Item): boolean; // a person should be able to use a completed Item.
}
