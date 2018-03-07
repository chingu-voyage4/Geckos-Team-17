const passport = require("passport");
const gitHubStrategy = require("passport-github").Strategy;

module.exports = function auth(db) {
  passport.use(
    new gitHubStrategy(
      {
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: "http://localhost:5000/user-info"
      },
      (accessToken, refreshToken, profile, cb) =>
        db
          .collection("users")
          .updateOne(
            { githubUsername: profile.username },
            { $set: { githubUsername: profile.username } },
            { upsert: true },
            (err, user) => cb(err, profile.username)
          )
    )
  );

  passport.serializeUser((user, cb) => {
    cb(null, user);
  });

  passport.deserializeUser((obj, cb) => {
    cb(null, obj);
  });
};
