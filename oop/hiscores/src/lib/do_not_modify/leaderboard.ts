import type { Score } from "./score";

export interface Leaderboard {
  id: string;
  scores: Score[];
}

export class DefaultLeaderboard implements Leaderboard {
  id: string;
  scores: Score[];
  save_multiple_scores_per_player: boolean;

  constructor(
    id: string,
    scores: Score[],
    save_multiple_scores_per_player: boolean
  ) {
    this.id = id;
    this.scores = scores;
    this.save_multiple_scores_per_player = save_multiple_scores_per_player;
  }
}
