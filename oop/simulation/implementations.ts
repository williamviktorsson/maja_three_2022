import {
  Activity,
  Building,
  Experience,
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

export class Assignment implements Simulation {
  people: Person[] = [];
  activities: Activity[] = [];
  buildings: Building[] = [];
  execute(): void {
    console.log("oopsie woopsie I'm not implemented");
  }
}
