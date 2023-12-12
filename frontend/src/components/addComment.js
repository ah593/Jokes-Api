import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import JokesDataService from "../service/JokesDataService";
import { Link } from "react-router-dom";
const AddComment = (props) => {
  let editing = false;
  let initialCommentState = "";

  if (props.location.state && props.location.state.currentComment) {
    editing = true;
    initialCommentState = props.location.state.currentComment.comment;
  }
  const [comment, setComment] = useState(initialCommentState);

  const [submitted, setSubmitted] = useState(false);

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const saveComment = () => {
    var data = {
      comment: comment,
      name: props.user.name,
      user_id: props.user.id,
      // get joke id direct from url
      joke_id: props.match.params.id,
    };
    if (editing) {
      // get existing comment id
      data.comment_id = props.location.state.currentComment._id;
      JokesDataService.updateComment(data)
        .then((response) => {
          setSubmitted(true);
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      JokesDataService.addComment(data)
        .then((response) => {
          setSubmitted(true);
        })
        .catch((e) => {});
    }
  };

  return (
    <div>
      <h2>Add Comment</h2>

      {submitted ? (
        <div>
          <Alert variant="success">{"Your Comment Got Posted!"}</Alert>
          <Link to={"/ah593_jokes/" + props.match.params.id}>Back to Joke</Link>
        </div>
      ) : (
        <Form>
          <Form.Group controlId="comment">
            <Form.Label>Comment:</Form.Label>
            <Form.Control
              as="textarea"
              required
              rows={3}
              value={comment}
              onChange={handleCommentChange}
            />
          </Form.Group>
          <Button variant="primary" onClick={saveComment}>
            Submit Comment
          </Button>
        </Form>
      )}
    </div>
  );
};

export default AddComment;
