const jwt = require('jsonwebtoken');
require('dotenv').config()

// expiration date
const expiration = '2h';

module.exports = {
  // function for our authenticated routes
  authMiddleware: function ({ req }) {
    // allows token to be sent via  req.query or headers
    let token = req.query.token || req.headers.authorization;

    // ["Bearer", "<tokenvalue>"]
    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }

    if (!token) {
      return req;
    }

    // verify token and get user data out of it
    try {
      const { data } = jwt.verify(token, process.env.SECRET, { maxAge: expiration });
      req.user = data;
    } catch {
      console.log('Invalid token');
      return res.status(400).json({ message: 'invalid token!' });
    }

    return req
  },
  signToken: function ({ username, email, _id, firstName, lastName, phoneNumber, profilePicture }) {
    const payload = { username, email, _id, firstName, lastName, phoneNumber, profilePicture };

    return jwt.sign({ data: payload }, process.env.SECRET, { expiresIn: expiration });
  },
};
