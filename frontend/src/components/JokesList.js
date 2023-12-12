// JokesList.js

import React, { useState, useEffect } from "react";
import JokesDataService from "../service/JokesDataService";
import { Link } from "react-router-dom";
import { Card, Form, Button, Col, Row, Container } from "react-bootstrap";

const JokesList = () => {
  const [jokes, setJokes] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");

  const [currentPage, setCurrentPage] = useState(0);
  const [entriesPerPage, setEntriesPerPage] = useState(0);
  const [currentSearchMode, setCurrentSearchMode] = useState("");

  useEffect(() => {
    setCurrentPage(0);
  }, [currentSearchMode]);

  useEffect(() => {
    retrieveJokes();
  }, [currentPage]);

  const retrieveJokes = () => {
    JokesDataService.getJokes(currentPage)
      .then((response) => {
        console.log(response.data);
        setJokes(response.data.jokes);
        setCurrentPage(response.data.page);
        setEntriesPerPage(response.data.entries_per_page);
      })
      .catch((error) => {
        console.error("Error fetching jokes:", error);
      });
  };

  const onChangeSearchTitle = (e) => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
  };

  const find = (query) => {
    JokesDataService.find(query)
      .then((response) => {
        console.log(response.data);
        setJokes(response.data.jokes);
      })
      .catch((error) => {
        console.error("Error searching jokes:", error);
      });
  };

  const findByTitle = () => {
    setCurrentSearchMode("findByTitle");
    find(searchTitle);
  };

  return (
    <div className="App">
      <Container>
        <Form>
          <Row>
            <Col>
              <Form.Group>
                <Form.Control
                  type="text"
                  placeholder="Search by title"
                  value={searchTitle}
                  onChange={onChangeSearchTitle}
                />
              </Form.Group>
              <Button variant="primary" type="button" onClick={findByTitle}>
                Search
              </Button>
            </Col>
          </Row>
        </Form>
        <Row>
          {jokes.map((joke) => (
            <Col key={joke._id}>
              <Card style={{ width: "18rem", margin: "10px" }}>
                <Card.Img
                  variant="top"
                  src={
                    joke.image_url
                      ? joke.image_url
                      : `https://api.dicebear.com/7.x/fun-emoji/svg?seed=${joke._id}`
                  }
                />
                <Card.Body>
                  <Card.Title>{joke.title}</Card.Title>
                  <Card.Text>{joke.setup}</Card.Text>

                  <Link to={`/ah593_jokes/${joke._id}`}>View Details</Link>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
        <br />
        Showing Page: {currentPage}
        <Button
          variant="link"
          onClick={() => {
            setCurrentPage(currentPage + 1);
          }}
        >
          Get Next {entriesPerPage} Results
        </Button>
      </Container>
    </div>
  );
};

export default JokesList;
