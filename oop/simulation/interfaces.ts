export interface Simulation {
  people: Person[];
  activities: Activity[];
  buildings: Building[];

  execute(): void;
}

export interface Person {
  knowledge: Experience[];
  hunger: number;
  happiness: number;
  fitness: number;

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
  happiness: number;
  fitness: number;
}

export interface Hobby extends Activity {
  rewards: Reward[];
}

export interface Study extends Activity {
  difficulty: number;
}

export interface Building {
  occupants: Person[];
  capacity: number;
  enter(person: Person): boolean;
}

export interface Food {
  calories: number;
  split(percentage: number): boolean;
}
