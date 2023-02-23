import { FenderFactory, Chad } from "./implementations";
// run program using following command:
// npm install
// npm run dev


const factory = new FenderFactory();

// TODO: Fill the factory with crates of items
// TODO: Fill the factory with workers

const william: Chad = new Chad("william");


const guitar = factory.produce();
william.interact(guitar);
