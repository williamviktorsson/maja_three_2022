import { DiscFactory, Chad } from "./implementations";
// run program using following command:
// npm install
// npm run dev

const factory = new DiscFactory();

const william: Chad = new Chad("william");

const disc = factory.produce();

let success = false;

if (disc) {
  success = william.interact(disc);
}

console.log(success ? "item works!" : "item worksn't");
