//Althesia Hylton | IT302-001 | 11/17/2023 | Unit 9 Assignment | ah593@njit.edu
import CommentsDAO from "../DAO/commentsDAO.js";

export default class CommentsController {
  static async apiPostComment(req, res, next) {
    try {
      const jokeId = req.body.joke_id;
      const comment = req.body.comment;
      const userInfo = {
        name: req.body.name,
        _id: req.body.user_id,
      };

      const date = new Date();

      const CommentResponse = await CommentsDAO.addComment(
        jokeId,
        userInfo,
        comment,
        date
      );
      res.json(CommentResponse);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }
  static async apiUpdateComment(req, res, next) {
    try {
      const commentId = req.body.comment_id;
      const comment = req.body.comment;
      const date = new Date();
      const CommentResponse = await CommentsDAO.updateComment(
        commentId,
        req.body.user_id,
        comment,
        date
      );

      var { error } = CommentResponse;
      if (error) {
        res.status(400).json({ error });
      }
      if (CommentResponse.modifiedCount === 0) {
        throw new Error(
          "unable to update comment. User may not be original poster"
        );
      }
      res.json(CommentResponse);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }
  static async apiDeleteComment(req, res, next) {
    try {
      const commentId = req.body.comment_id;
      const userId = req.body.user_id;
      const CommentResponse = await CommentsDAO.deleteComment(
        commentId,
        userId
      );
      res.json(CommentResponse);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }
  static async apiGetComment(req, res, next) {
    try {
      const jokeId = req.query.jokeId;
      if (!jokeId) {
        res.status(400).json({ error: "Missing jokeId parameter" });
        return;
      }

      const { commentsList, totalNumComments } = await CommentsDAO.getComments({
        jokeId,
      });

      res.json({ commentsList, totalNumComments });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }
}
