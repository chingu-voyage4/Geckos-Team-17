const passport = require("passport");
const gitHubStrategy = require("passport-github").Strategy;

module.exports = function auth(db) {
  passport.use(
    new gitHubStrategy(
      {
        clientID: "024bcc7068913fa79df9",
        clientSecret: "c62ab79d8ba01160530fa61eb0a75623d9107734",
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
