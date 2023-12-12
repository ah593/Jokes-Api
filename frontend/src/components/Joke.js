import React, { useState, useEffect } from "react";
import { Card, Button, Media, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import JokesDataService from "../service/JokesDataService";
import AddComment from "./addComment";

const Joke = (props) => {
  const [joke, setJoke] = useState({
    id: null,
    title: "",
    setup: "",
    punchline: "",
    comments: [],
  });
  const [error, setError] = useState(null);

  const jokeId = props.match.params.id;

  useEffect(() => {
    // Fetch the individual joke and its comments when the component mounts
    JokesDataService.getJokeById(jokeId)
      .then((response) => {
        setJoke(response.data);
      })
      .catch((error) => setError(error.message));
  }, [jokeId]);

  const deleteComment = (commentId, index) => {
    JokesDataService.deleteComment(commentId, props.user.id)
      .then((response) => {
        setJoke((prevState) => {
          prevState.comments.splice(index, 1);
          return {
            ...prevState,
          };
        });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div>
      {error && <div>Error: {error}</div>}
      <Container>
        <Row>
          <Col>
            <Card style={{ width: "18rem", margin: "10px" }}>
              <Card.Body>
                <Card.Title>{joke.title}</Card.Title>
                <Card.Text>{joke.setup}</Card.Text>
                <Card.Text>{joke.punchline}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <h3>Comments</h3>
            {joke.comments?.map((comment, index) => (
              <Media key={index}>
                <Media.Body>
                  <h5>
                    {comment.name +
                      " commented on " +
                      new Date(Date.parse(comment.date)).toDateString()}
                  </h5>
                  <p>{comment.comment}</p>
                  {props.user && props.user.id === comment.user_id && (
                    <Row>
                      <Col>
                        <Link
                          to={{
                            pathname: `/ah593_jokes/${jokeId}/edit-comment`,
                            state: { currentComment: comment },
                          }}
                        >
                          Edit
                        </Link>
                      </Col>
                      <Col>
                        <Button
                          variant="link"
                          onClick={() => deleteComment(comment._id, index)}
                        >
                          Delete
                        </Button>
                      </Col>
                    </Row>
                  )}
                </Media.Body>
              </Media>
            ))}
          </Col>
        </Row>

        {/* Add Comment Link (based on user login) */}
        {props.user && (
          <Link to={`/ah593_jokes/${jokeId}/add-comment`}>
            <Button variant="primary">Add Comment</Button>
          </Link>
        )}

        {/* Edit Comment Link (if user is the author of the joke) */}
        {props.user && props.user.id === joke.authorId && (
          <Link to={`/ah593_jokes/${jokeId}/edit-comment`}>
            <Button variant="info">Edit Comment</Button>
          </Link>
        )}

        {/* If the user is not logged in, show a login link */}
        {!props.user && (
          <Link to="/ah593_login">
            <Button variant="info">Login to Add/Edit Comment</Button>
          </Link>
        )}
      </Container>
    </div>
  );
};

export default Joke;
