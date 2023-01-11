/* EXAMPLE INTERFACE */


// TODO: WRITE CODE HE

export interface User {
    name: string;
    shout() : void;
}

/* EXAMPLE CLASS */
/* EXAMPLE ENCAPSULATION */

class Example {
    test(){
        return 123
    }
}

class Student implements User {
    name: string;
    protected _secret: string;
    private _id: number;

    constructor(name:string,secret:string, id:number){
        this.name = name;
        this._secret = secret
        this._id = id;
    }

    shout(): void {
        console.log("This is my id: " + this._id);
    }
}

let student : User = new Student("William", "None", 1);
student.shout()


// TODO: WRITE CODE HERE

/* EXAMPLE HERITAGE */
/* EXAMPLE OVERRIDE */

class DemotivatedStudent extends Student {
    override shout(): void{
        super.shout()
        console.log("I GIVE UP! MY SECRET IS: " + this._secret );
    }
}

let dstudent : User = new DemotivatedStudent("William", "None", 2);
dstudent.shout()

// TODO: WRITE CODE HERE

/* EXAMPLE GENERIC */
class SkilledStudent<B> extends Student{
    sport: B;
    constructor(name:string,secret:string, id:number, sport:B){
    super(name, secret , id);
    this.sport = sport;
    }
}

// TODO: WRITE CODE HERE

/* EXAMPLE CLASS INSTANTIATION */

// TODO: WRITE CODE HERE

/* EXAMPLE CLASS METHOD INVOCATION */

// TODO: WRITE CODE HERE

/* EXAMPLE POLYMORPHISM */

// TODO: WRITE CODE HERE

class Sport {
    club: string;
    constructor(club:string){
        this.club = club;
    }
}

class Football extends Sport{}

class Gaming extends Sport {
    private count: number = 0;

    play(): void {
        let count:string = "Im a gamer; "+ this.count;
        console.log(count)
        this.count += 1.5;
    }
}

let zlatan: User = new SkilledStudent<Football>(
    "Ibra",
    "I eat lots of spinach!",
    1981,
    new Football("AC Milan")
  );

let william: SkilledStudent<Gaming> = new SkilledStudent<Gaming> ("Wilhelm", "No secrets!", 20093,new Gaming("Team Teg Gaming Academy"));

console.log((zlatan as SkilledStudent<Football>).sport.club)

william.sport.play();

william.sport.play();
william.sport.play();
/* CREATE SOME CLASSES FOR GENERICS EXAMPLE */

// TODO: WRITE CODE HERE

/* EXAMPLE GENERIC USAGE */

// TODO: WRITE CODE HERE

/* EXAMPLE COMPARISON METHOD */

// TODO: WRITE CODE HERE

class ComparableStudent extends Student {
    equals(other:Student):boolean{
        return this.name == other.name;
    }
}

let buddy: ComparableStudent = new ComparableStudent("WIlliam", "I love to sauna!", 1995);

let friend: ComparableStudent = new ComparableStudent("WIlliam", "I love to sauna!", 1995);

console.log("Are they the same? " )
console.log( buddy == friend);

console.log("Are they equal? " )
console.log( buddy.equals( friend));

let copy = buddy

console.log("Are they the same? " )
console.log( buddy == copy);

console.log("Are they equal? " )
console.log( buddy.equals( copy));


/* EXAMPLE DIFFERENCE OF COMPARING EQUALITY WITH COMPARING OBJECT IDENTIFIERS */

// TODO: WRITE CODE HERE

/* EXAMPLE PUBLIC SETTERS AND GETTERS FOR PRIVATE VARIABLES */

// TODO: WRITE CODE HERE


class ExposedStudent extends Student {

    get secret(): string {
        return this._secret;
    }

    set secret(secret:string){
        if(secret.length==0){
            throw Error("nah man")
        }
        this._secret = secret
        console.log("SHOULD WRITE TO DATABASE - " + secret)
    }

}


let exposed: ExposedStudent = new ExposedStudent("WIlliam", "I love to sauna!", 1995);

exposed.secret = ""