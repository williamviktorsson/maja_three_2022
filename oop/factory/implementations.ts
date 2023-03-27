import {
  Factory,
  Item,
  Machine,
  Part,
  Person,
  SerialNumber,
} from "./interfaces";

export class Chad implements Person {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  interact(item: Item): boolean {
    console.log("im about to try this: " + item.constructor.name);
    return item.use();
  }
}

export class Plastic extends Part {
  constructor() {
    super("hard plastic", "k3");
  }
}

export class Paint extends Part {
  constructor() {
    super("nice finish theme", "moomin");
  }
}

export class DiscCraftSerialNumber extends SerialNumber {
  constructor(serialNumber: string) {
    super("DiscCraft", "XYZ", new Date(), serialNumber);
  }
}

export class DiscCraftMachine implements Machine {
  serialNumber: DiscCraftSerialNumber;
  parts: Part[] = Array.from({ length: 100 }, () => new Plastic());
  operator: Person | undefined;

  constructor(serialNumber: string) {
    this.serialNumber = new DiscCraftSerialNumber(serialNumber);
  }

  occupy(operator: Person): boolean {
    if (!this.operator) {
      this.operator = operator;
      console.log("operator seated");
      return true;
    } else {
      console.log("operator seat taken");
      return false;
    }
  }

  assemble(item: Disc): boolean {
    if (!this.operator) {
      console.log("no operator present");
      return false;
    }
    console.log("Doing some fancy stuff with plastic");
    let pour = this.parts.pop();
    if (pour) {
      item.parts.push(pour);
      return true;
    } else {
      console.log("out of plastic");
      return false;
    }
  }
}

export class Molder extends DiscCraftMachine {
  constructor() {
    super("molder");
  }

  parts: Part[] = Array.from({ length: 100 }, () => new Plastic());

  assemble(item: Item): boolean {
    if (!this.operator) {
      console.log("no operator present");
      return false;
    }
    console.log("Pouring plastic and stamping the mold.");
    let pour = this.parts.pop();
    if (pour) {
      item.parts.push(pour);
      return true;
    } else {
      console.log("out of plastic");
      return false;
    }
  }
}

export class Painter extends DiscCraftMachine {
  parts: Part[] = Array.from({ length: 100 }, () => new Paint());
  constructor() {
    super("painter");
  }
  assemble(item: Item): boolean {
    if (!this.operator) {
      console.log("no operator present");
      return false;
    }
    console.log("Pouring paint and painting the disc.");
    let paint = this.parts.pop();
    if (paint) {
      item.parts.push(paint);
      return true;
    } else {
      console.log("out of paint");
      return false;
    }
  }
}

export class DiscFactory implements Factory {
  assembly: Machine[] = [];

  constructor() {
    const machine = new DiscCraftMachine("123");
    const molder = new Molder();
    const painter = new Painter();
    machine.occupy(new Chad("gilly"));
    molder.occupy(new Chad("billy"));
    painter.occupy(new Chad("willy"));
    this.assembly.push(machine);
    this.assembly.push(molder);
    this.assembly.push(painter);
  }

  produce(): Item | undefined {
    let disc: Item | undefined = new Disc();
    let fail = false;
    for (let index = 0; index < this.assembly.length; index++) {
      const machine = this.assembly[index];
      const success = machine.assemble(disc);
      if (!success) {
        fail = true;
      }
    }
    if (!fail) {
      disc.complete = true;
    } else {
      disc = undefined;
    }
    return disc;
  }
}

export class Disc implements Item {
  parts: Part[] = [];
  complete: boolean = false;
  use(): boolean {
    if (!this.complete) {
      console.log("cant throw an unfinished disc");
      return false;
    } else {
      console.log("sick throw");
      return true;
    }
  }
}
