const passport = require("passport");

const auth = require("./auth");

module.exports = function routing(app, db) {
  auth(db);
  app.use(passport.initialize());
  app.use(passport.session());

  app.get("/login", passport.authenticate("github"));

  app.get("/user-info", passport.authenticate("github"), (req, res) => {
    res.json({ user: req.user });
  });

  app.get("/logout", (req, res) => {
    req.logout();
    if (!req.user) res.send("You have logged out.");
    else res.send("you have not logged out. Something has went wrong");
  });
};
