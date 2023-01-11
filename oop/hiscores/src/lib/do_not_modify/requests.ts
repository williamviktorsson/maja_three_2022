import type { Rank } from "./rank";
import type { Score } from "./score";

// GET /leaderboards
export type GetLeaderboardsRequest = {};

export type GetLeaderboardsResponse = {
  success: boolean;
  leaderboards: string[];
};

// POST /leaderboard
export type CreateLeaderboardRequest = {
  leaderboard_id: string;
  save_multiple_scores_per_player: boolean;
};

export type CreateLeaderboardResponse = {
  success: boolean;
};

// DELETE /leaderboard
export type DeleteLeaderboardRequest = {
  leaderboard_id: string;
};

export type DeleteLeaderboardResponse = {
  success: boolean;
};

// GET /scores
export type GetScoresRequest = {
  leaderboard_id: string; // query param
  start_index: number; // query param
  end_index: number; // query param
};

export type GetScoresResponse = {
  success: boolean;
  scores: Score[];
};

// POST /scores
export type SubmitScoreRequest = {
  leaderboard_id: string;
  score: Score;
};

export type SubmitScoreResponse = {
  success: boolean;
  rank: Rank;
};



// GET /ranks
export type GetRanksForPlayerRequest = {
  player_id: string; // query param
};

export type GetRanksForPlayerResponse = {
  success: boolean;
  ranks: Rank[];
};
