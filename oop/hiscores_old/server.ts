import { JumpPlayer } from "./player";
import { CreateLeaderboardRequest, CreateLeaderboardResponse, DeleteLeaderboardRequest, DeleteLeaderboardResponse, GetRanksForPlayerRequest, GetRanksForPlayerResponse, GetScoresRequest, GetScoresResponse, SubmitScoreRequest, SubmitScoreResponse } from "./requests";
import { JumpScore, Score } from "./score";

import * as express from 'express';
import * as http from 'http';
import { DefaultRank } from "./rank";

const MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;

var server = express();
const app = http.createServer(server);

server.use(express.json())

server.post('/leaderboard', async (req, res) => {

    let request: CreateLeaderboardRequest = req.body;
    let response: CreateLeaderboardResponse = new CreateLeaderboardResponse();

    try {
        MongoClient.connect("mongodb://localhost:27017/", async (err, client) => {
            if (err) throw err;
            let db = client.db("test");

            try {
                let result = await db.collection("leaderboards").insertOne(
                    {
                        "_id": request.leaderboard_id,
                        "save_multiple_scores_per_player": request.save_multiple_scores_per_player,
                        "scores": []
                    })
                response.success = result.acknowledged;
                return res.send(JSON.stringify(response));
            } catch (error) {
                response.success = false;
                return res.send(JSON.stringify(response));
            }
        });
    } catch (error) {
        response.success = false;
        return res.send(JSON.stringify(response));
    }

});

server.post('/scores', async (req, res) => {

    let request: SubmitScoreRequest = req.body;
    let response: SubmitScoreResponse = new SubmitScoreResponse();

    try {
        MongoClient.connect("mongodb://localhost:27017/", async (err, client) => {
            if (err) throw err;
            let db = client.db("test");

            try {
                let leaderboard = await db.collection("leaderboards").findOne(
                    {
                        "_id": request.leaderboard_id
                    })

                if (leaderboard == null) {
                    response.success = false;
                    return res.send(JSON.stringify(response));

                } else {

                    // check if keep multiple scores or not
                    if (leaderboard.save_multiple_scores_per_player) {
                        // TODO just save the score
                    } else {
                        // do not save multiple scores ( save only higher scores )
                        // TODO:remove all scores belonging to player with lower score than submitted :)



                        // check if a higher score already exists
                        if (leaderboard.scores.find((score: Score) => score.player.id == request.score.player.id)) {
                            // A higher score exists
                            response.success = false;
                            return res.send(JSON.stringify(response));

                        } else {
                            // TODO: just save the score

                        }

                    }

                    // TODO: Sort the leaderboard

                    // get the rank index after sorting the scores
                    let index: number = leaderboard.scores.indexOf(request.score);

                    let result = await db.collection("leaderboards").updateOne(
                        {
                            "_id": request.leaderboard_id,
                        },
                        {
                            "$set": {
                                "scores": leaderboard.scores
                            }
                        })
                    response.success = result.acknowledged && index >= 0;
                    response.rank = new DefaultRank(index, request.leaderboard_id, request.score)
                    return res.send(JSON.stringify(response));
                }
            } catch (error) {
                console.log(error);
                response.success = false;
                return res.send(JSON.stringify(response));
            }
        });
    } catch (error) {
        response.success = false;
        return res.send(JSON.stringify(response));
    }

});

server.delete('/leaderboard', async (req, res) => {

    let request: DeleteLeaderboardRequest = req.body;
    let response: DeleteLeaderboardResponse = new DeleteLeaderboardResponse();

    try {
        MongoClient.connect("mongodb://localhost:27017/", async (err, client) => {
            if (err) throw err;
            let db = client.db("test");

            try {
                // TODO: DELETE LEADERBOARD AND SET SUCCESS TRUE IF ACKNOWLEDGED

                return res.send(JSON.stringify(response));
            } catch (error) {
                response.success = false;
                return res.send(JSON.stringify(response));
            }
        });
    } catch (error) {
        response.success = false;
        return res.send(JSON.stringify(response));
    }

});



server.get('/scores', async (req, res) => {

    let request: GetScoresRequest = new GetScoresRequest()
    request.leaderboard_id = req.query.leaderboard_id;
    request.start_index = req.query.start_index;
    request.end_index = req.query.end_index;
    let response: GetScoresResponse = new GetScoresResponse();

    try {
        MongoClient.connect("mongodb://localhost:27017/", async (err, client) => {
            if (err) throw err;
            let db = client.db("test");

            try {
                
                //TODO: GET SCORES AND USE SLICE WITH START AND END INDEX ON LIST OF SCORES
                
                return res.send(JSON.stringify(response));
            }
            catch (error) {
                response.success = false;
                return res.send(JSON.stringify(response));
            }
        });


    } catch (error) {
        console.log(error);
        response.success = false;
        return res.send(JSON.stringify(response));
    }

});


server.get('/ranks', async (req, res) => {

    let request: GetRanksForPlayerRequest = new GetRanksForPlayerRequest()
    request.player = JSON.parse(req.query.player)

    let response: GetRanksForPlayerResponse = new GetRanksForPlayerResponse();
    response.ranks = []
    try {
        MongoClient.connect("mongodb://localhost:27017/", async (err, client) => {
            if (err) throw err;
            let db = client.db("test");

            try {
                let leaderboards = await db.collection("leaderboards").find().toArray()
                if (!leaderboards) {
                    response.success = false;
                    return res.send(JSON.stringify(response));
                }

                // TODO: GET ALL SCORES FOR PLAYER IN LIST OF LEADERBOARDS AND ADD RANKS TO RESPONSE OBJECT

                response.success = true;

                return res.send(JSON.stringify(response));
            }
            catch (error) {
                response.success = false;
                return res.send(JSON.stringify(response));
            }
        });


    } catch (error) {
        console.log(error);
        response.success = false;
        return res.send(JSON.stringify(response));
    }

});

app.listen(1337, () => {
    console.log("Server running on port 1337");
});