import type {
  CreateLeaderboardRequest,
  CreateLeaderboardResponse,
  DeleteLeaderboardRequest,
  DeleteLeaderboardResponse,
  GetLeaderboardsRequest,
  GetLeaderboardsResponse,
  GetRanksForPlayerRequest,
  GetRanksForPlayerResponse,
  GetScoresRequest,
  GetScoresResponse,
  SubmitScoreRequest,
  SubmitScoreResponse,
} from "./requests";

export enum Implementation {
  MONGODB = "mongodb",
  SQLITE = "sqlite",
  INMEMORY = "inmemory",
}

export interface Hiscores {
  implementation: Implementation;

  get_leaderboards(
    request: GetLeaderboardsRequest
  ): Promise<GetLeaderboardsResponse>;

  create_leaderboard(
    request: CreateLeaderboardRequest
  ): Promise<CreateLeaderboardResponse>;
  delete_leaderboard(
    request: DeleteLeaderboardRequest
  ): Promise<DeleteLeaderboardResponse>;

  get_scores_from_leaderboard(
    request: GetScoresRequest
  ): Promise<GetScoresResponse>;
  submit_score_to_leaderboard(
    request: SubmitScoreRequest
  ): Promise<SubmitScoreResponse>;

  get_all_ranks_for_player(
    request: GetRanksForPlayerRequest
  ): Promise<GetRanksForPlayerResponse>;
}
