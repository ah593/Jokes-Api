//Althesia Hylton | IT302-001 | 11/17/2023 | Unit 9 Assignment | ah593@njit.edu
import mongodb from "mongodb";
const ObjectId = mongodb.ObjectId;

let comments;
export default class CommentsDAO {
  static async injectDB(conn) {
    if (comments) {
      return;
    }
    try {
      comments = await conn.db(process.env.JOKES_NS).collection("comments");
    } catch (e) {
      console.error(
        `unable to establish connection handle in commentDAO: ${e}`
      );
    }
  }
  static async addComment(jokeId, user, comment, date) {
    try {
      const commentDoc = {
        name: user.name,
        user_id: user._id,
        date: date,
        comment: comment,
        joke_id: new ObjectId(jokeId),
      };
      return await comments.insertOne(commentDoc);
    } catch (e) {
      console.error(`unable to post comment: ${e}`);
      console.error(e);
      return { error: e };
    }
  }
  static async updateComment(commentId, userId, comment, date) {
    try {
      const updateResponse = await comments.updateOne(
        { user_id: userId, _id: new ObjectId(commentId) },
        { $set: { comment: comment, date: date } }
      );
      return updateResponse;
    } catch (e) {
      console.error(`unable to update comment: ${e}`);
      console.error(e);
      return { error: e };
    }
  }

  static async deleteComment(commentId, userId) {
    try {
      const deleteResponse = await comments.deleteOne({
        _id: new ObjectId(commentId),
        user_id: userId,
      });
      return deleteResponse;
    } catch (e) {
      console.error(`unable to delete comment: ${e}`);
      console.error(e);
      return { error: e.message };
    }
  }
}
