export interface Simulation {
  people: Person[];
  activities: Activity[];
  buildings: Building[];

  execute(): void;
}

export interface Person {
  knowledge: Experience[];
  hunger: Number;
  happiness: Number;
  fitness: Number;

  move(location: Building): boolean;
  perform(activity: Activity): boolean;
  consume(food: Food): boolean;
}

export interface Experience {
  name: string;
  value: number;
}

export interface Activity {
  affects: Experience[]; // increment or decrement these experiences from a persons experiences when performed
}

export interface Reward {
  happiness: Number;
  fitness: Number;
}

export interface Hobby extends Activity {
  rewards: Reward[];
}

export interface Study extends Activity {
  difficulty: Number;
}

export interface Building {
  occupants: Person[];
  capacity: Number;
  enter(person: Person): boolean;
}

export interface Food {
  calories: Number;
  split(percentage: Number): boolean;
}
