import { Factory, Item, Machine, Part, Person } from "./interfaces";

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

export class Plastic implements Part {
  description: string = "hard plastic";
  name: string = "k3";
}

export class Paint implements Part {
  description: string = "nice finish theme";
  name: string = "moomin";
}

export class Molder implements Machine {
  parts: Plastic[] = Array.from({ length: 100 }, () => new Plastic());
  operator: Person | undefined;
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

export class Painter implements Machine {
  parts: Paint[] = Array.from({ length: 100 }, () => new Paint());
  operator: Person | undefined;
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
    const molder = new Molder();
    const painter = new Painter();
    molder.occupy(new Chad("billy"));
    painter.occupy(new Chad("willy"));
    this.assembly.push(molder);
    this.assembly.push(painter);
  }

  produce(): Item {
    let disc = new Disc();
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
