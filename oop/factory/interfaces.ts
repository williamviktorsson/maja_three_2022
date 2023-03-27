export interface Factory {
  assembly: Machine[]; // a factory is composed of one or more machines
  produce(): Item | undefined; // creates an empty item, then passes it through each machine to complete it
}

export interface Item {
  parts: Part[]; // an item is composed of one or more parts
  complete: boolean; // an item is incomplete until all its parts have been added
  use(): boolean; // returns true if the item could be used (is complete)
}

export abstract class Part {
  name: string;
  description: string;
  constructor(name: string, description: string) {
    this.name = name;
    this.description = description;
  }
}

export interface Machine {
  serialNumber: SerialNumber; // a machine is assigned a serial number
  parts: Part[]; // a machine is composed of one or more parts
  occupy(operator: Person): boolean; // an operator needs to be present at the machine to assemble items
  assemble(item: Item): boolean; // adds parts to the item, return success status
}

export interface Person {
  name: string;
  interact(item: Item): boolean; // a person should be able to use a completed Item.
}

export abstract class SerialNumber {
  constructor(
    public manufacturer: string,
    public model: string,
    public productionDate: Date,
    public serialNumber: string
  ) {}
}
