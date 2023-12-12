//Althesia Hylton | IT302-001 | 11/17/2023 | Unit 9 Assignment | ah593@njit.edu
import express from "express";
import JokesController from "./jokes.controller.js";
import CommentsController from "./comments.controller.js";

const router = express.Router();

router.route("/jokes").get(JokesController.apiGetJokes);
router.route("/jokes/id/:id").get(JokesController.apiGetJokeById);

router
  .route("/comment")
  .post(CommentsController.apiPostComment)
  .put(CommentsController.apiUpdateComment)
  .delete(CommentsController.apiDeleteComment)
  .get(CommentsController.apiGetComment);
export default router;
