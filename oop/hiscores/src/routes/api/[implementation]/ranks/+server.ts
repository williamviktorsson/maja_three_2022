import type { RequestHandler } from "./$types";
import { error, json } from "@sveltejs/kit";
import type {
  GetRanksForPlayerRequest,
  GetRanksForPlayerResponse,
} from "$lib/do_not_modify/requests";
import { implementations } from "$lib/implementations";
import type { Hiscores } from "$lib/do_not_modify/hiscores";

export const GET: RequestHandler = async ({ url, params }) => {
  const player_id: string | null = url.searchParams.get("player_id");

  if (player_id == undefined) {
    throw error(404, "missing or wrongful params");
  }

  const req: GetRanksForPlayerRequest = { player_id };

  const implementation: string = params.implementation;

  if (!(implementation in implementations)) {
    throw error(404, "implementation does not exist.");
  }

  const hiscores: Hiscores = implementations[implementation];

  const response: GetRanksForPlayerResponse =
    await hiscores.get_all_ranks_for_player(req);

  return json(response);
};
