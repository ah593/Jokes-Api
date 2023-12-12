//Althesia Hylton | IT302-001 | 11/17/2023 | Unit 9 Assignment | ah593@njit.edu
import JokesDAO from "../DAO/jokesDAO.js";
export default class JokesController {
  static async apiGetJokes(req, res, next) {
    const jokesPerPage = req.query.itemsPerPage
      ? parseInt(req.query.itemsPerPage)
      : 10;
    const page = req.query.pageNumber ? parseInt(req.query.pageNumber) : 0;
    let filters = {};
    if (req.query.type) {
      filters.type = req.query.type;
    }
    if (req.query.title) {
      filters.title = req.query.title;
    }
    if (req.query.id) {
      filters.id = req.query.id;
    }
    if (req.query._id) {
      filters._id = req.query._id;
    }
    const { jokesList, totalNumJokes } = await JokesDAO.getJokes({
      filters,
      page,
      jokesPerPage,
    });
    let response = {
      jokes: jokesList,
      page: page,
      filters: filters,
      entries_per_page: jokesPerPage,
      total_results: totalNumJokes,
    };
    res.json(response);
  }
  static async apiGetJokeById(req, res, next) {
    try {
      let id = req.params.id || {};
      let joke = await JokesDAO.getJokeById(id);
      if (!joke) {
        res.status(404).json({ error: "not found" });
        return;
      }
      res.json(joke);
    } catch (e) {
      console.log(`api, ${e}`);
      res.status(500).json({ error: e });
    }
  }
}
