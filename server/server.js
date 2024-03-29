const express = require("express");
require("dotenv").config();
const { ApolloServer } = require("apollo-server-express");
const path = require("path");
const db = require("./config/connection");

const PORT = process.env.PORT || 8080;

const { authMiddleware } = require("./utils/auth");
const { typeDefs, resolvers } = require("./schemas");

const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware
});

const bodyParser = require("body-parser");

app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000
  })
);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
//app.use(express.static(path.join(__dirname, 'post-uploads')))

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
}

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async (typeDefs, resolvers) => {
  await server.start();
  server.applyMiddleware({ app });

  db.once("open", () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!!`);
      console.log(
        `Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`
      );
    });
  });
};

// Call the async function to start the server
startApolloServer(typeDefs, resolvers);
