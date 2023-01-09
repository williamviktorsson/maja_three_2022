import type { RequestHandler } from "./$types";
import { error, json } from "@sveltejs/kit";
import type {
  GetScoresRequest,
  GetScoresResponse,
  SubmitScoreRequest,
  SubmitScoreResponse,
} from "$lib/do_not_modify/requests";
import { implementations } from "$lib/implementations";
import type { Hiscores } from "$lib/do_not_modify/hiscores";

export const GET: RequestHandler = async ({ url, params }) => {
  const leaderboard_id: string | null = url.searchParams.get("leaderboard_id");
  const start_index: number = Number(url.searchParams.get("start_index"));
  const end_index: number | null = Number(url.searchParams.get("end_index"));

  if (
    leaderboard_id == undefined ||
    start_index == undefined ||
    end_index == undefined
  ) {
    throw error(404, "missing or wrongful params");
  }

  const req: GetScoresRequest = { leaderboard_id, start_index, end_index };

  const implementation: string = params.implementation;

  if (!(implementation in implementations)) {
    throw error(404, "implementation does not exist.");
  }

  const hiscores: Hiscores = implementations[implementation];

  const response: GetScoresResponse =
    await hiscores.get_scores_from_leaderboard(req);

  return json(response);
};

export const POST: RequestHandler = async ({ request, params }) => {
  const req: SubmitScoreRequest = await request.json();

  const implementation: string = params.implementation;

  if (!(implementation in implementations)) {
    throw error(404, "implementation does not exist.");
  }

  const hiscores: Hiscores = implementations[implementation];

  const response: SubmitScoreResponse =
    await hiscores.submit_score_to_leaderboard(req);

  return json(response);
};
