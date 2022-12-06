import { Leaderboard } from "./leaderboard";
import { CreateLeaderboardRequest, CreateLeaderboardResponse, DeleteLeaderboardRequest, DeleteLeaderboardResponse, GetRanksForPlayerRequest, GetRanksForPlayerResponse, GetScoresRequest, GetScoresResponse, SubmitScoreRequest, SubmitScoreResponse } from "./requests";

export interface Hiscores {
    leaderboards: Leaderboard[];

    get_scores_from_leaderboard(request: GetScoresRequest): GetScoresResponse;
    post_score_to_leaderboard(request: SubmitScoreRequest): SubmitScoreResponse;

    post_leaderboard(request: CreateLeaderboardRequest): CreateLeaderboardResponse;
    delete_leaderboard(request: DeleteLeaderboardRequest): DeleteLeaderboardResponse;
    
    get_all_ranks_for_player(request: GetRanksForPlayerRequest): GetRanksForPlayerResponse;
}

