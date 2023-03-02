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
    throw Error("Unimplemented function");
    // TODO: seat the operator if seat isnt taken.
    // return success status based on if the operator could sit or not.
  }
  assemble(item: Disc): boolean {
    throw Error("Unimplemented function");
    // TODO: proceed the assembly if an operator is available

    // TODO: take the parts (if they exist in the machine) and perform the assembly
    // Assembly means assembling the item, adding the parts to the item.
  }
}

export class Painter implements Machine {
  parts: Paint[] = Array.from({ length: 100 }, () => new Paint());
  operator: Person | undefined;
  occupy(operator: Person): boolean {
    throw Error("Unimplemented function");
  }
  assemble(item: Disc): boolean {
    throw Error("Unimplemented function");
  }
}

export class DiscFactory implements Factory {
  assembly: Machine[] = [];

  constructor() {
    // TODO: Add the machines to the assembly
    // TODO: Occupy the machines with workers.

    const molder = new Molder();
    const painter = new Painter();
    molder.occupy(new Chad("billy"));
    painter.occupy(new Chad("willy"));
    this.assembly.push(molder);
    this.assembly.push(painter);
  }

  produce(): Item {
    let disc = new Disc();
    // TODO: pass the item through the assembly line
    // If the assebmly doesnt fail along the way, mark the item as complete
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
