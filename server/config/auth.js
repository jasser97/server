const jwt = require("jsonwebtoken");
const keys = require("../config/keys");

module.exports = function (req, res, next) {
  // get Token from the header
  const token = req.header("x-auth-token");
  // chek if token exists
  if (!token) {
    return res.json({ msg: "No Token,acess denied !" });
  }
  jwt.verify(token, keys.secretOrKey, (err, decoded) => {
    if (err) res.json({ msg: "token not valid" });

    req.user = decoded.user;
    next();
  });
};

// const JwtStrategy = require("passport-jwt").Strategy;
// const ExtractJwt = require("passport-jwt").ExtractJwt;
// const mongoose = require("mongoose");
// const User = mongoose.model("users");
// const keys = require("../config/keys");
// const opts = {};
// opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
// opts.secretOrKey = keys.secretOrKey;
// module.exports = (passport) => {
//   passport.use(
//     new JwtStrategy(opts, (jwt_payload, done) => {
//       User.findById(jwt_payload.id)
//         .then((user) => {
//           if (user) {
//             return done(null, user);
//           }
//           return done(null, false);
//         })
//         .catch((err) => console.log(err));
//     })
//   );
// };
