const express = require("express");
require('dotenv').config()
const { ApolloServer } = require("apollo-server-express");
const path = require("path");
const db = require('./config/connection');


// NEED TO IMPLEMENT GRAPHQL THINGS
//const { authMiddleware } = require('./utils/auth');
const { typeDefs, resolvers } = require('./schemas');

const PORT = process.env.PORT
const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  // context: authMiddleware
});

// multiple image uploading for posts
const multer = require('multer');
const bodyParser = require('body-parser')
const postImage = require('./models/Post');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

const postStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'post-uploads')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
})

const postUpload = multer({
  storage: postStorage
}).array('postImgs', 6);

app.post('/postUpload', (req, res) => {
  postUpload(req, res, (err) => {
    if(err) {
      console.log(err)
    } else {
      const postImgs = new postImage({
        // do i need to add tags and comments fields?
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        postImgs: {
          data: req.files.filename,
          contentType: 'postImgs'
        }
      })
      postImgs.save()
        .then(() => {
          res.send(postImgs)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  })
})

// single image uploading for profile picture
const userImage = require('./models/User');

const userStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'profile-pictures')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
});

const profileUpload = multer({
  storage: userStorage
}).single('profilePicture');

app.post('/profileUpload', (req, res) => {
  profileUpload(req, res, (err) => {
    if(err) {
      console.log(err)
    } else {
      const profilePicture = new userImage({
        // do i need to add tags and comments fields?
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        username: req.body.username,
        profilePicture: {
          data: req.file.filename,
          contentType: 'profilePicture'
        }
      })
      profilePicture.save()
        .then(() => {
          res.send(profilePicture)
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
