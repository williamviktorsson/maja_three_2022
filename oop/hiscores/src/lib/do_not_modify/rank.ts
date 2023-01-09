import type { Score } from "./score";

export interface Rank {
    index: number;
    leaderboard_id: string;
    score: Score;
}

export class DefaultRank implements Rank {
    index: number;
    leaderboard_id: string;
    score: Score;

    constructor(index: number,
        leaderboard_id: string,
        score: Score) {
        this.index = index;
        this.leaderboard_id = leaderboard_id;
        this.score = score;
    }

}