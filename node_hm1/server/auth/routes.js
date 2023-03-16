const express = require("express")
const router = express.Router()
const passport = require('passport')

const LocalStrategy = require("passport-local")
const GoogleStrategy = require("passport-google-oauth20")
const GitHubStrategy = require('passport-github').Strategy;

const {registrationValidator} = require("./middlewares")
const {signup, signin, signout, signinGoogle, signinGithub, signinGitHubAuthenticate, signinGoogleAuthenticate, signinPassportAuthenticate, serializeUser, deserializeUser} = require("./controller")


passport.use(new LocalStrategy({usernameField:"email"}, signinPassportAuthenticate));

passport.use(new GoogleStrategy({
    // realm: 'http://localhost:3000/'
    clientID: '974450734442-aj7ks2orbo0s6lv400v7itbcdsthpp4l.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: 'http://localhost:3000/api/auth/google',
    scope: ['openid', 'profile', 'email'],
    state:true
  }, signinGoogleAuthenticate));
passport.use(new GitHubStrategy({
    clientID: "b6e66b32e1d8b50cbd0d",
    clientSecret: "d8af21189b510755aaf8fe17b10f82f69192c353",
    callbackURL: "http://localhost:3000/api/auth/github"
  }, signinGitHubAuthenticate));


// создает сессию
passport.serializeUser(serializeUser);

// во всех других запросах
passport.deserializeUser(deserializeUser);

router.post("/api/auth/signup",registrationValidator, signup)

router.post("/api/auth/signin", passport.authenticate('local', { failureRedirect: '/login?error=6' }), signin)

router.get("/api/auth/signout", signout)

router.get("/api/auth/google/signin", passport.authenticate('google'))

router.get("/api/auth/google", passport.authenticate('google', { failureRedirect: '/login?error=2' }),signinGoogle);

router.get("/api/auth/github/signin", passport.authenticate('github'))

router.get('/api/auth/github', passport.authenticate('github', { failureRedirect: '/login?error=33' }),signinGithub);

module.exports = router