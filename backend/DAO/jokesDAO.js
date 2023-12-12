//Althesia Hylton | IT302-001 | 11/17/2023 | Unit 9 Assignment | ah593@njit.edu
import { ObjectId } from "mongodb";
let jokes;

export default class JokesDAO {
  static async injectDB(conn) {
    if (jokes) {
      return;
    }
    try {
      jokes = await conn.db(process.env.JOKES_NS).collection("jokes_ah593");
    } catch (e) {
      console.error(`unable to connect in JokesDAO: ${e}`);
    }
  }
  static async getJokes({ filters = null, page = 0, jokesPerPage = 20 } = {}) {
    let query;
    if (filters) {
      if ("title" in filters) {
        query = { title: filters["title"] };
      }
      if ("type" in filters) {
        query = { type: filters["type"] };
      }
      if ("_id" in filters) {
        query = { _id: new ObjectId(filters["_id"]) };
      }
    }

    let cursor;
    try {
      console.log(query);
      cursor = await jokes
        .find(query)
        .limit(jokesPerPage)
        .skip(jokesPerPage * page);
      const jokesList = await cursor.toArray();
      console.log(cursor);
      const totalNumjokes = await jokes.countDocuments(query);
      return { jokesList, totalNumjokes };
    } catch (e) {
      console.error(`Unable to issue find command, ${e}`);
      console.error(e);
      return { jokesList: [], totalNumjokes: 0 };
    }
  }
  static async getJokeById(id) {
    try {
      return await jokes
        .aggregate([
          {
            $match: {
              _id: new ObjectId(id),
            },
          },
          {
            $lookup: {
              from: "comments",
              localField: "_id",
              foreignField: "joke_id",
              as: "comments",
            },
          },
        ])
        .next();
    } catch (e) {
      console.error(`something went wrong in getJokeById: ${e}`);
      throw e;
    }
  }
}
