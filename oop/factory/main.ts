import { DiscFactory, Chad, Disc } from "./implementations";
// run program using following command:
// npm install
// npm run dev


const factory = new DiscFactory();

// TODO: Fill the factory with crates of items
// TODO: Fill the factory with workers

const william: Chad = new Chad("william");


const disc = factory.produce();
william.interact(disc);
