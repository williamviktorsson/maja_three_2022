
/* EXAMPLE INTERFACE */

export interface User {
  name: string;
  shout(): void;
}

/* EXAMPLE CLASS */
/* EXAMPLE ENCAPSULATION */

class Student implements User {
  name: string; // public by default
  protected _secret: string; // protected are private in class and subclasses
  private _id: number; // private are private in only this class and cannot be accessed by subclasses
  constructor(name: string, secret: string, id: number) {
    this.name = name;
    this._secret = secret;
    this._id = id;
  }
  shout(): void {
    console.log("bruh my id is: " + this._id);
  }
}

/* EXAMPLE HERITAGE */
/* EXAMPLE OVERRIDE */

class DemotivatedStudent extends Student {
  override shout(): void {
    console.log("I GIVE UP! MY SECRET IS: " + this._secret);
    super.shout();
  }
}

/* EXAMPLE GENERIC */

class SkilledStudent<B> extends Student {
  sport: B;
  constructor(name: string, secret: string, id: number, sport: B) {
    super(name, secret, id);
    this.sport = sport;
  }
}

/* EXAMPLE CLASS INSTANTIATION */

let user: User = new Student("William", "I love to sauna!", 1995);

/* EXAMPLE CLASS METHOD INVOCATION */

user.shout();

/* EXAMPLE POLYMORPHISM */

let youngling: User = new DemotivatedStudent("Pelle", "I love dry rice!", 2004);

youngling.shout();

class Sport {
  club: string;
  constructor(club: string) {
    this.club = club;
  }
}

class Football extends Sport {}

class Gaming extends Sport {
  private count: number = 0;

  play(): void {
    let count: string = "im a gamer: " + this.count; // don't get bamboozled by local variables
    console.log(count);
    this.count += 1.5;
  }
}

/* EXAMPLE GENERIC USAGE */

let zlatan: User = new SkilledStudent<Football>(
  "Ibra",
  "I eat lots of spinach!",
  1981,
  new Football("AC Milan")
);

let william: SkilledStudent<Gaming> = new SkilledStudent<Gaming>(
  "Wilhelm",
  "No secrets!",
  2003,
  new Gaming("Team Teg Gaming Academy")
);

console.log((zlatan as SkilledStudent<Football>).sport.club);

william.sport.play();
william.sport.play();
william.sport.play();

/* EXAMPLE COMPARISON METHOD */

class ComparableStudent extends Student {
  equals(other: Student): boolean {
    return this.name == other.name;
  }
}

let buddy: ComparableStudent = new ComparableStudent(
  "William",
  "I love to sauna!",
  1995
);

let friend: ComparableStudent = new ComparableStudent(
  "William",
  "I love to sauna!",
  1995
);

/* EXAMPLE DIFFERENCE OF COMPARING EQUALITY WITH COMPARING OBJECT IDENTIFIERS */

console.log("*** DIFFERENT OBJECTS CHECK ***");

console.log("--- ARE THEY THE SAME?? ---");
console.log(buddy == friend);
console.log("--- ARE THEY EQUAL?? ---");
console.log(buddy.equals(friend));

console.log("*** COPY CHECK ***");

let copy = buddy;

console.log("--- ARE THEY THE SAME?? ---");

console.log(copy == buddy);

console.log("--- ARE THEY EQUAL?? ---");

console.log(copy.equals(buddy));

/* EXAMPLE PUBLIC SETTERS AND GETTERS FOR PRIVATE VARIABLES */

class ExposedStudent extends Student {
  get secret(): string {
    return this._secret;
  }

  set secret(secret: string) {
    this._secret = secret;
  }
}

let exposed: ExposedStudent = new ExposedStudent(
  "William",
  "I love to sauna!",
  1995
);

exposed.secret = "SQL INJECT ATTACKO";
console.log(exposed.secret);
