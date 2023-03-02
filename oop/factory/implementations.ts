import { Crate, Factory, Item, Machine, Part, Person } from "./interfaces";

export class Chad implements Person {
  name: string;
  right_hand: Part | undefined;
  left_hand: Item | undefined;

  constructor(name: string) {
    this.name = name;
  }

  carry(object: Part | Item): boolean {
    if ("name" in object) {
      this.right_hand = object;
    } else {
      this.left_hand = object;
    }
    return true;
  }

  interact(item: Item): boolean {
    return item.use();
  }
}

export class Plastic implements Part {
  name: string = "k3";
}

export class Paint implements Part {
  name: string = "moomin";
}

export class PlasticBox implements Crate {
  parts: Part[] = Array.from({ length: 50 }, () => new Plastic());
  take(): Part | undefined {
    return this.parts.pop();
  }
}
export class PaintBox implements Crate {
  parts: Part[] = Array.from({ length: 50 }, () => new Paint());
  take(): Part | undefined {
    return this.parts.pop();
  }
}

console.log(new PlasticBox());

export class MoldMachine implements Machine {
  operator: Person | undefined;
  parts: Plastic[] = [];
  occupy(operator: Person) {
    this.operator = operator;
  }
  assemble(item: Disc): Disc {
    if (!this.operator) {
      throw Error("operator MIA");
    }
    console.log("Pouring plastic and stamping the mold.");
    let pour = this.parts.pop();
    if (pour) {
      item.parts.push(pour);
    } else {
      throw Error("out of plastic");
    }
    return item;
  }

  fill(part: Plastic): boolean {
    this.parts.push(part);
    return true;
  }
}

export class DiscFactory implements Factory {
  setup(): boolean {
    // TODO : enter some workers
    /// TODO: for each machine, occupy the machine
    // for each machine, fill with required items.
    this.receive(new PaintBox());
    this.receive(new PlasticBox());
    this.assembly.push(new MoldMachine());
    return true;
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
    let disc = new Disc();
    let carryer: Person = {
      name: "",
      right_hand: undefined,
      left_hand: undefined,
      carry: function (object: Part | Item): boolean {
        this.right_hand = object as Part;
        return true;
      },
      interact: function (item: Item): boolean {
        throw new Error("Function not implemented.");
      },
    };

    carryer.carry(disc);

    for (let index = 0; index < this.assembly.length; index++) {
      const machine = this.assembly[index];
      // TODO: did we run out of items in the machine?
      // if so, make a worker, go and carry some parts from a crate.
      let temp = machine.assemble(carryer.left_hand!);
      carryer.carry(temp);
    }
    return new Disc();
  }
}

export class Disc implements Item {
  isItem(object: any): object is Item {
    throw new Error("Method not implemented.");
  }
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
