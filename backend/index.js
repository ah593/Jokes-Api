//Althesia Hylton | IT302-001 | 11/17/2023 | Unit 9 Assignment | ah593@njit.edu
import app from "./server.js";
import mongodb from "mongodb";
import dotenv from "dotenv";
import JokesDAO from "./DAO/jokesDAO.js";
import CommentsDAO from "./DAO/commentsDAO.js";
async function main() {
  dotenv.config();

  const client = new mongodb.MongoClient(process.env.JOKES_DB_URI);

  const port = process.env.PORT || 5050;

  try {
    await client.connect();
    await JokesDAO.injectDB(client);
    await CommentsDAO.injectDB(client);
    app.listen(port, () => {
      console.log("server is running on port:" + port);
    });
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}
main().catch(console.error);
