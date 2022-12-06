import { Player } from "./player";
import { Rank } from "./rank";
import { Score } from "./score";

// GET /scores
export class GetScoresRequest {
    leaderboard_id: string; // query param
    start_index: number; // query param
    end_index: number; // query param
}

export class GetScoresResponse {
    success: boolean;
    scores: Score[];
}

// POST /scores
export class SubmitScoreRequest {
    leaderboard_id: string;
    score: Score;
}

export class SubmitScoreResponse {
    success: boolean;
    rank: Rank;
}

// POST /leaderboard
export class CreateLeaderboardRequest {
    leaderboard_id: string;
    save_multiple_scores_per_player: boolean;
}

export class CreateLeaderboardResponse {
    success: boolean;
}

// DELETE /leaderboard
export class DeleteLeaderboardRequest {
    leaderboard_id: string;
}

export class DeleteLeaderboardResponse {
    success: boolean;
}

// GET /ranks
export class GetRanksForPlayerRequest {
    player: Player; //query param
}

export class GetRanksForPlayerResponse {
    success: boolean;
    ranks: Rank[];
}