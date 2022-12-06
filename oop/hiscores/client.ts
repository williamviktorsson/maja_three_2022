import { GetRanksForPlayerRequest, GetRanksForPlayerResponse, CreateLeaderboardRequest, CreateLeaderboardResponse, GetScoresRequest, GetScoresResponse, SubmitScoreRequest, SubmitScoreResponse } from "./requests";
import { JumpScore, Score } from "./score";

import * as fetch from 'node-fetch';
import { JumpPlayer } from "./player";

async function create_leaderboard(id: string, save_multiple_scores_per_player: boolean) {

    let request: CreateLeaderboardRequest = new CreateLeaderboardRequest();
    request.leaderboard_id = id;
    request.save_multiple_scores_per_player = save_multiple_scores_per_player;

    await fetch(`http://localhost:1337/leaderboard`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=UTF-8",
        },
        body: JSON.stringify(request)


    })
        .then((response) => response.json())
        .then((data) => {
            if (!data) throw null;

            let response: CreateLeaderboardResponse = data;

            var jsonPretty = JSON.stringify(response, null, 2);
            console.log(jsonPretty)


        })
        .catch((error) => {
            console.log(error);
        });

}

async function submit_score_to_leaderboard(leaderboard_id: string, player_id: string, score: number) {

    let request: SubmitScoreRequest = new SubmitScoreRequest();
    request.leaderboard_id = leaderboard_id;
    request.score = new JumpScore(score, new Date(), new JumpPlayer(player_id, 9000));

    await fetch(`http://localhost:1337/scores`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=UTF-8",
        },
        body: JSON.stringify(request)


    })
        .then((response) => response.json())
        .then((data) => {
            if (!data) throw null;

            let response: SubmitScoreResponse = data;

            var jsonPretty = JSON.stringify(response, null, 2);
            console.log(jsonPretty)


        })
        .catch((error) => {
            console.log(error);
        });

}

async function get_scores_from_leaderboard(leaderboard_id: string) {

    let request: GetScoresRequest = new GetScoresRequest();
    request.leaderboard_id = leaderboard_id;
    request.start_index = 0;
    request.end_index = 20;

    await fetch(`http://localhost:1337/scores?leaderboard_id=${request.leaderboard_id}&start_index=${request.start_index}&end_index=${request.end_index}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json;charset=UTF-8",
        },

    })
        .then((response) => response.json())
        .then((data) => {
            if (!data) throw null;

            let response: GetScoresResponse = data;

            var jsonPretty = JSON.stringify(response, null, 2);
            console.log(jsonPretty)

        })
        .catch((error) => {
            console.log(error);
        });

}

async function get_ranks_for_player(id: string) {

    let request: GetRanksForPlayerRequest = new GetRanksForPlayerRequest();
    request.player = new JumpPlayer(id, 9000)

    await fetch(`http://localhost:1337/ranks?player=${JSON.stringify(request.player)}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json;charset=UTF-8",
        },

    })
        .then((response) => response.json())
        .then((data) => {
            if (!data) throw null;

            let response: GetRanksForPlayerResponse = data;

            var jsonPretty = JSON.stringify(response, null, 2);
            console.log(jsonPretty)

        })
        .catch((error) => {
            console.log(error);
        });

}

async function main() {
    await create_leaderboard("willi", false)
    await create_leaderboard("dompi", true)

    await submit_score_to_leaderboard("willi", "willid", 15)
    await submit_score_to_leaderboard("willi", "zeweid", 20)
    await submit_score_to_leaderboard("willi", "miltonid", 25)

    await submit_score_to_leaderboard("dompi", "willid", 15)
    await submit_score_to_leaderboard("dompi", "linusid", 5)
    await submit_score_to_leaderboard("dompi", "emmalid", 12)
    await submit_score_to_leaderboard("dompi", "domasid", 0)
    await submit_score_to_leaderboard("dompi", "willid", 8)


    await get_scores_from_leaderboard("willi");
    await get_scores_from_leaderboard("dompi");

    await get_ranks_for_player("willid");

}

main();