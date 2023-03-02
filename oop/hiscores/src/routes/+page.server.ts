import type { PageServerLoad, Actions } from "./$types";

import { JumpPlayer } from "$lib/do_not_modify/player";
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
} from "$lib/do_not_modify/requests";
import { JumpScore } from "$lib/do_not_modify/score";
import { implementations } from "$lib/implementations";
import { fail } from "@sveltejs/kit";

async function create_leaderboard(
  host: string,
  implementation: string,
  id: string,
  save_multiple_scores_per_player: boolean
) {
  let request: CreateLeaderboardRequest = {
    leaderboard_id: id,
    save_multiple_scores_per_player: save_multiple_scores_per_player,
  };

  const response = await fetch(
    `http://${host}/api/${implementation}/leaderboard`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
      body: JSON.stringify(request),
    }
  )
    .then((response) => response.json())
    .then((data) => {
      if (!data) throw null;

      let response: CreateLeaderboardResponse = data;

      var jsonPretty = JSON.stringify(response, null, 2);
      console.log(jsonPretty);
      return jsonPretty;
    })
    .catch((error) => {
      console.log(error);
      var jsonPretty = JSON.stringify(error, null, 2);

      return jsonPretty;
    });

  return "CREATELEADERBOARD - " + response;
}

async function delete_leaderboard(
  host: string,
  implementation: string,
  id: string
) {
  let request: DeleteLeaderboardRequest = {
    leaderboard_id: id,
  };

  const response = await fetch(
    `http://${host}/api/${implementation}/leaderboard`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
      body: JSON.stringify(request),
    }
  )
    .then((response) => response.json())
    .then((data) => {
      if (!data) throw null;

      let response: DeleteLeaderboardResponse = data;

      var jsonPretty = JSON.stringify(response, null, 2);
      console.log(jsonPretty);
      return jsonPretty;
    })
    .catch((error) => {
      console.log(error);
      var jsonPretty = JSON.stringify(error, null, 2);

      return jsonPretty;
    });

  return "DELETELEADERBOARD - " + response;
}

async function get_leaderboards(host: string, implementation: string) {
  let request: GetLeaderboardsRequest = {};

  const response = await fetch(
    `http://${host}/api/${implementation}/leaderboards`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
    }
  )
    .then((response) => response.json())
    .then((data) => {
      if (!data) throw null;

      let response: GetLeaderboardsResponse = data;

      var jsonPretty = JSON.stringify(response, null, 2);
      console.log(jsonPretty);
      return jsonPretty;
    })
    .catch((error) => {
      console.log(error);
      var jsonPretty = JSON.stringify(error, null, 2);

      return jsonPretty;
    });

  return "GETLEADERBOARDS - " + response;
}

async function submit_score_to_leaderboard(
  host: string,
  implementation: string,
  leaderboard_id: string,
  player_id: string,
  score: number
) {
  let request: SubmitScoreRequest = {
    leaderboard_id,
    score: new JumpScore(score, new Date(), new JumpPlayer(player_id, 9000)),
  };

  const response = await fetch(`http://${host}/api/${implementation}/scores`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
    },
    body: JSON.stringify(request),
  })
    .then((response) => response.json())
    .then((data) => {
      if (!data) throw null;

      let response: SubmitScoreResponse = data;

      var jsonPretty = JSON.stringify(response, null, 2);
      console.log(jsonPretty);
      return jsonPretty;
    })
    .catch((error) => {
      console.log(error);
      var jsonPretty = JSON.stringify(error, null, 2);

      return jsonPretty;
    });
  return "SUBMITSCORE - " + response;
}

async function get_scores_from_leaderboard(
  host: string,
  implementation: string,
  leaderboard_id: string
) {
  let request: GetScoresRequest = {
    leaderboard_id,
    start_index: 0,
    end_index: 20,
  };

  const response = await fetch(
    `http://${host}/api/${implementation}/scores?leaderboard_id=${request.leaderboard_id}&start_index=${request.start_index}&end_index=${request.end_index}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
    }
  )
    .then((response) => response.json())
    .then((data) => {
      if (!data) throw null;

      let response: GetScoresResponse = data;

      var jsonPretty = JSON.stringify(response, null, 2);
      console.log(jsonPretty);
      return jsonPretty;
    })
    .catch((error) => {
      console.log(error);
      var jsonPretty = JSON.stringify(error, null, 2);

      return jsonPretty;
    });
  return "GETSCORES - " + response;
}

async function get_ranks_for_player(
  host: string,
  implementation: string,
  player_id: string
) {
  let request: GetRanksForPlayerRequest = { player_id };

  const response = await fetch(
    `http://${host}/api/${implementation}/ranks?player_id=${request.player_id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
    }
  )
    .then((response) => response.json())
    .then((data) => {
      if (!data) throw null;

      let response: GetRanksForPlayerResponse = data;

      var jsonPretty = JSON.stringify(response, null, 2);
      console.log(jsonPretty);
      return jsonPretty;
    })
    .catch((error) => {
      console.log(error);
      var jsonPretty = JSON.stringify(error, null, 2);

      return jsonPretty;
    });
  return "GETRANKS - " + response;
}

export const load = (async () => {
  return {};
}) satisfies PageServerLoad;

export const actions: Actions = {
  test: async ({ request }) => {
    const data = await request.formData();
    const host = data.get("host")?.toString();

    if (!host) {
      return fail(404, { message: "host not supplied" });
    }

    const results: Record<string, string[]> = {};

    for (let implementation in implementations) {
      let testresults = [
        await create_leaderboard(host, implementation, "willi", false),
        await create_leaderboard(host, implementation, "dompi", true),

        await get_leaderboards(host, implementation),

        await submit_score_to_leaderboard(
          host,
          implementation,
          "willi",
          "willid",
          15
        ),
        await submit_score_to_leaderboard(
          host,
          implementation,
          "willi",
          "zeweid",
          20
        ),
        await submit_score_to_leaderboard(
          host,
          implementation,
          "willi",
          "miltonid",
          25
        ),

        await submit_score_to_leaderboard(
          host,
          implementation,
          "dompi",
          "willid",
          15
        ),
        await submit_score_to_leaderboard(
          host,
          implementation,
          "dompi",
          "linusid",
          5
        ),
        await submit_score_to_leaderboard(
          host,
          implementation,
          "dompi",
          "emmalid",
          12
        ),
        await submit_score_to_leaderboard(
          host,
          implementation,
          "dompi",
          "domasid",
          0
        ),
        await submit_score_to_leaderboard(
          host,
          implementation,
          "dompi",
          "willid",
          8
        ),

        await get_scores_from_leaderboard(host, implementation, "willi"),
        await get_scores_from_leaderboard(host, implementation, "dompi"),

        await get_ranks_for_player(host, implementation, "willid"),
        await delete_leaderboard(host, implementation, "willi"),
        await delete_leaderboard(host, implementation, "dompi"),
      ];
      results[implementation] = testresults;
    }
    return {
      mongodb: results.mongodb,
      sqlite: results.sqlite,
      inmemory: results.inmemory,
    };
  },
};
