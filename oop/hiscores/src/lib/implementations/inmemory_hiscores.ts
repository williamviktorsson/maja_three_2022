import { Implementation, type Hiscores } from "$lib/do_not_modify/hiscores";
import {
  DefaultLeaderboard,
  type Leaderboard,
} from "$lib/do_not_modify/leaderboard";
import { JumpPlayer } from "$lib/do_not_modify/player";
import { DefaultRank, type Rank } from "$lib/do_not_modify/rank";
import type {
  GetLeaderboardsRequest,
  GetLeaderboardsResponse,
  CreateLeaderboardRequest,
  CreateLeaderboardResponse,
  DeleteLeaderboardRequest,
  DeleteLeaderboardResponse,
  GetScoresRequest,
  GetScoresResponse,
  SubmitScoreRequest,
  SubmitScoreResponse,
  GetRanksForPlayerRequest,
  GetRanksForPlayerResponse,
} from "$lib/do_not_modify/requests";
import { JumpScore, type Score } from "$lib/do_not_modify/score";

let leaderboards: Map<string, Leaderboard> = new Map<string, Leaderboard>();

export class InMemoryHiscores implements Hiscores {
  implementation: Implementation = Implementation.INMEMORY;

  async get_leaderboards(
    request: GetLeaderboardsRequest
  ): Promise<GetLeaderboardsResponse> {
    // TODO: implement logic

    console.log("GetLeaderboardsResponse");
    console.log(request);

    const response: GetLeaderboardsResponse = {
      success: true,
      leaderboards: [...leaderboards.keys()],
    };

    return response;
  }
  async create_leaderboard(
    request: CreateLeaderboardRequest
  ): Promise<CreateLeaderboardResponse> {
    // TODO: implement logic

    console.log("CreateLeaderboardRequest");
    console.log(request);

    const response: CreateLeaderboardResponse = {
      success: false,
    };

    if (leaderboards.has(request.leaderboard_id)) {
      response.success = false;
    } else {
      leaderboards.set(
        request.leaderboard_id,
        new DefaultLeaderboard(
          request.leaderboard_id,
          [],
          request.save_multiple_scores_per_player
        )
      );
      response.success = true;
    }

    return response;
  }
  async delete_leaderboard(
    request: DeleteLeaderboardRequest
  ): Promise<DeleteLeaderboardResponse> {
    // TODO: implement logic

    console.log("DeleteLeaderboardRequest");
    console.log(request);

    const response: DeleteLeaderboardResponse = {
      success: false,
    };

    if (!leaderboards.has(request.leaderboard_id)) {
      response.success = false;
    } else {
      // TODO: Remove leaderboard.
      leaderboards.delete(request.leaderboard_id);
    }

    return response;
  }
  async get_scores_from_leaderboard(
    request: GetScoresRequest
  ): Promise<GetScoresResponse> {
    // TODO: implement logic

    console.log("GetScoresRequest");
    console.log(request);

    const response: GetScoresResponse = {
      success: false,
      scores: [],
    };

    if (!leaderboards.has(request.leaderboard_id)) {
      response.success = false;
    } else {
      response.success = true;
      let leaderboard: Leaderboard = leaderboards.get(request.leaderboard_id)!;
      response.scores = leaderboard.scores.slice(
        request.start_index,
        request.end_index
      );
    }

    return response;
  }
  async submit_score_to_leaderboard(
    request: SubmitScoreRequest
  ): Promise<SubmitScoreResponse> {
    // TODO: implement logic

    console.log("SubmitScoreRequest");
    console.log(request);

    const response: SubmitScoreResponse = {
      success: false,
      rank: new DefaultRank(
        0,
        "foo",
        new JumpScore(1337, new Date(), new JumpPlayer("bar", 9001))
      ),
    };

    if (!leaderboards.has(request.leaderboard_id)) {
      response.success = false;
    } else {
      response.success = true;
      let leaderboard: DefaultLeaderboard = leaderboards.get(
        request.leaderboard_id
      ) as DefaultLeaderboard;
      if (leaderboard.save_multiple_scores_per_player) {
        leaderboard.scores = [request.score, ...leaderboard.scores];
      } else {
        let index: number = leaderboard.scores
          .map((score) => score.player.id)
          .indexOf(request.score.player.id);
        if (index != -1) {
          let score: Score = leaderboard.scores[index];
          if (score.value < request.score.value) {
            leaderboard.scores[index] = request.score;
          }
        } else {
          leaderboard.scores = [request.score, ...leaderboard.scores];
        }
      }
      leaderboard.scores.sort((a, b) => b.value - a.value);
      leaderboards.set(request.leaderboard_id, leaderboard);
      let index: number = leaderboard.scores
        .map((score) => score)
        .indexOf(request.score);
      let rank: Rank = new DefaultRank(index, leaderboard.id, request.score);
      response.rank = rank;
    }

    return response;
  }
  async get_all_ranks_for_player(
    request: GetRanksForPlayerRequest
  ): Promise<GetRanksForPlayerResponse> {
    // TODO: implement logic

    console.log("GetRanksForPlayerRequest");
    console.log(request);

    const response: GetRanksForPlayerResponse = {
      success: true,
      ranks: [],
    };

    for (let [leaderboard_id, leaderboard] of leaderboards) {
      let scores: Score[] = leaderboard.scores;
      for (let index = 0; index < scores.length; index++) {
        const score: Score = scores[index];
        if (score.player.id == request.player_id) {
          let rank: Rank = new DefaultRank(index, leaderboard_id, score);
          response.ranks = [rank, ...response.ranks];
        }
      }
    }

    return response;
  }
}
