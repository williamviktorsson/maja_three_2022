import { DiscFactory, Chad } from "./implementations";
// run program using following command:
// npm install
// npm run dev

const factory = new DiscFactory();

const student: Chad = new Chad("Chad Chaddington");

const item = factory.produce();

const success = student.interact(item);

console.log(success ? "item works!" : "item worksn't");
