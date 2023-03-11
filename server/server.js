const express = require("express");
require('dotenv').config();
const { ApolloServer } = require("apollo-server-express");
const path = require("path");
const db = require('./config/connection');


// NEED TO IMPLEMENT GRAPHQL THINGS
// const { authMiddleware } = require('./utils/auth');
// const { typeDefs, resolvers } = require('./schemas');

const PORT = process.env.PORT
const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware
});

// image uploading
const multer = require('multer');
const bodyParser = require('body-parser')
const postImage = require('./models/Post');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

const Storage = multer.diskStorage({
  destination: 'uploads',
  filename: (req, file, cb) => {
    cb(null, Date.now + file.originalname)
  }
});

const upload = multer({
  storage: Storage
}).single('testImage');

app.post('/upload', (req, res) => {
  upload(req, res, (err) => {
    if(err) {
      console.log(err)
    } else {
      const newImage = new postImage({
        // do i need to add tags and comments fields?
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        image: {
          data: req.file.filename,
          contentType: 'image/png'
        }
      })
      newImage.save()
        .then(() => {
          res.send('uploaded successfully')
        })
        .catch((err) => {
          console.log(err)
        })
    }
  })
})


app.use(express.urlencoded({ extended: false }));
app.use(express.json());

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
}

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async (typeDefs, resolvers) => {
  await server.start();
  server.applyMiddleware({ app });

  db.once("open", () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(
        `Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`
      );
    });
  });
};

// Call the async function to start the server
startApolloServer(typeDefs, resolvers);
