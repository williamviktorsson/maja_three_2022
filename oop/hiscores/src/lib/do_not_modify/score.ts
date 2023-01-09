import type { Player } from "./player";

export interface Score {
    value: number;
    date: Date;
    player: Player;
}

export class JumpScore implements Score {
    value: number;
    date: Date;
    player: Player;
    constructor(value: number, date: Date, player: Player) {
        this.value = value;
        this.date = date;
        this.player = player;
    }
}