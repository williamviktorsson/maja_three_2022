import type { RequestHandler } from "./$types";
import { error, json } from "@sveltejs/kit";
import type {
  CreateLeaderboardRequest,
  CreateLeaderboardResponse,
  DeleteLeaderboardRequest,
  DeleteLeaderboardResponse,
} from "$lib/do_not_modify/requests";

import { implementations } from "$lib/implementations";
import type { Hiscores } from "$lib/do_not_modify/hiscores";

export const POST: RequestHandler = async ({ request, params }) => {
  const req: CreateLeaderboardRequest = await request.json();

  const implementation: string = params.implementation;

  if (!(implementation in implementations)) {
    throw error(404, "implementation does not exist.");
  }

  const hiscores: Hiscores = implementations[implementation];

  const response: CreateLeaderboardResponse = await hiscores.create_leaderboard(req);

  return json(response);
};

export const DELETE: RequestHandler = async ({ request, params }) => {
  const req: DeleteLeaderboardRequest = await request.json();

  const implementation: string = params.implementation;

  if (!(implementation in implementations)) {
    throw error(404, "implementation does not exist.");
  }

  const hiscores: Hiscores = implementations[implementation];

  const response: DeleteLeaderboardResponse = await hiscores.delete_leaderboard(req);

  return json(response);
};
