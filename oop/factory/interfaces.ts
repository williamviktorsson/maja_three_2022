
export interface Factory {
  assembly: Machine[]; // an item is passed through an assembly line to be created
  produce(): Item | undefined; // Create an empty item, then pass it through each machine to complete it.
}

export interface Item {
  parts: Part[]; // an item consists of X parts
  complete: boolean; // an item is incomplete until all parts have been added
  use(): boolean; // returns true if the item could be used (is complete)
}

export interface Part {
  name: string;
  description: string;
}

export interface Machine {
  parts: Part[]; // the machine has the parts that will be added to the Item
  occupy(operator: Person): boolean; // an operator needs to be present at the machine to assemble items
  assemble(item: Item): boolean; // adds parts to the item, return success status
}

export interface Person {
  name: string;
  interact(item: Item): boolean; // a person should be able to use a completed Item.
}
