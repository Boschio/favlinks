const express = require('express');

const passport = require('passport')
const LocalStrategy = require('passport-local')

const crypto = require('crypto')

const db = require('./db')

passport.use(
  "local-signup",
  new LocalStrategy(
    {
      username: "username",
      password: "password",
    },
    async (username, password, done) => {
      try {
        const userExists = await db.usernameExists(username);

        if (userExists) {
          return done(null, false);
        }

        const user = await db.createUser(username, password);
        return done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.use(
  "local-login",
  new LocalStrategy(
    {
      username: "username",
      password: "password",
    },
    async (username, password, done) => {
      try {
        const user = await db.usernameExists(username);
        if (!user) return done(null, false);
        const isMatch = await db.matchPassword(password, user.password);
        if (!isMatch) return done(null, false);
        return done(null, { id: user.id, username: user.username });
      } catch (error) {
        return done(error, false);
      }
    }
  )
);

const router = express.Router();

router.post(
  "/auth/signup",
  passport.authenticate("local-signup", { session: false }),
  (req, res, next) => {
    res.json({
      user: req.user,
    });
  }
);

router.post(
  "/auth/login",
  passport.authenticate("local-login", { session: false }),
  (req, res, next) => {
    res.json({ user: req.user });
  }
);

module.exports = router;