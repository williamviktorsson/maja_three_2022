import type { RequestHandler } from "./$types";
import { error, json } from "@sveltejs/kit";
import type {
  GetLeaderboardsRequest,
  GetLeaderboardsResponse,
} from "$lib/do_not_modify/requests";
import { implementations } from "$lib/implementations";
import type { Hiscores } from "$lib/do_not_modify/hiscores";

export const GET: RequestHandler = async ({ url, params }) => {
  const req: GetLeaderboardsRequest = {};

  const implementation: string = params.implementation;

  if (!(implementation in implementations)) {
    throw error(404, "implementation does not exist.");
  }

  const hiscores: Hiscores = implementations[implementation];

  const response: GetLeaderboardsResponse = await hiscores.get_leaderboards(req);

  return json(response);
};
