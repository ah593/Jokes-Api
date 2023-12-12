import React, { useState } from "react";
import { Switch, Route, Link, NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import JokesList from "./components/JokesList";
import AddComment from "./components/addComment";
import Joke from "./components/Joke";
import Login from "./components/login";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Button } from "react-bootstrap";

function App() {
  const [user, setUser] = useState(null);

  const login = (user) => {
    setUser(user);
    //alert("Logged in successfully!");
  };

  const logout = () => {
    setUser(null);
    alert("Logged out successfully");
  };

  return (
    <div className="App">
      <Navbar style={{ backgroundColor: "#243E36" }} variant="dark" expand="lg">
        <Navbar.Brand>Joke Reviews</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link as={NavLink} to={"/ah593_jokes"}>
              Jokes
            </Nav.Link>
            {user ? (
              <Button onClick={logout}>Logout User</Button>
            ) : (
              <Nav.Link as={NavLink} to={"/ah593_login"}>
                Login
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Switch>
        <Route exact path={["/", "/ah593_jokes"]} component={JokesList}></Route>

        <Route
          path="/ah593_jokes/:id/add-comment"
          render={(props) => <AddComment {...props} user={user} />}
        ></Route>
        <Route
          path="/ah593_jokes/:id/"
          render={(props) => <Joke {...props} user={user} />}
        ></Route>
        <Route
          path="/ah593_login"
          render={(props) => <Login {...props} login={login} />}
        ></Route>
      </Switch>
    </div>
  );
}

export default App;
