import type { Score } from "./score";

export interface Leaderboard {
  id: string;
  scores: Score[];
}
