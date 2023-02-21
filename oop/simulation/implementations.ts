import {
  Activity,
  Building,
  Experience,
  Food,
  Person,
  Simulation,
  Study,
} from "./interfaces";

export class Math implements Study {
  difficulty: Number = 9001;
  affects: Experience[] = [{ name: "logic", value: 100 }];
}

export class School implements Building {
  occupants: Person[] = [];
  capacity: Number = 1000;
  studies: Study[] = [];
  enter(person: Person): boolean {
    throw new Error("Method not implemented.");
  }
}

class William implements Person {
  knowledge: Experience[] = [];
  hunger: Number = 1000;
  happiness: Number = 1000;
  fitness: Number = 20;
  move(location: Building): boolean {
    throw new Error("Method not implemented.");
  }
  perform(activity: Activity): boolean {
    if (activity instanceof CoffeSession) {
      console.log("damn thats some good coffe");
    }
    for (let index = 0; index < activity.affects.length; index++) {
      const element = activity.affects[index];

      this.knowledge.push(element);
    }
    return true;
  }
  consume(food: Food): boolean {
    throw new Error("Method not implemented.");
  }
}

class CoffeSession implements Activity {
  affects: Experience[] = [{ name: "coffedrinking", value: 10 }];
}

export class Assignment implements Simulation {
  people: Person[] = [new William()];
  activities: Activity[] = [new CoffeSession()];
  buildings: Building[] = [];
  execute(): void {
    for (let index = 0; index < this.people.length; index++) {
      const person = this.people[index];
      for (let j = 0; j < this.activities.length; j++) {
        const activity = this.activities[j];
        person.perform(activity);
      }
      console.log(JSON.stringify(person));
    }
  }
}
