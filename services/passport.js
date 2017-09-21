const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

// serialize and deserialize user to create code for cookie to send to client side.
// user is the user returned (exisiting or new) from the callback in the strategy
// user argument in serialize user comes from the done() function at the bottom of this file.
passport.serializeUser((user, done) => {
	// user.id is an id generated by mongodb, NOT the google id because there could be multiple ways of Oauth
	// first param of done() is error, but null because simple operation has no errors.
	done(null, user.id);
});

passport.deserializeUser((id, done) => {
	// query for user with id
	User.findById(id).then(user => {
		done(null, user);
	});
});

passport.use(
	new GoogleStrategy(
		{
			clientID: keys.googleClientID,
			clientSecret: keys.googleClientSecret,
			callbackURL: '/auth/google/callback', // google oauth will route here after login
		},
		// this function will run after google logs in.
		// async code using ES2015 async await syntax
		async (accessToken, refreshToken, profile, done) => {
			// find a user with profile id, if found, don't create new acc. otherwise make new acc in db.
			const exisitingUser = await User.findOne({ googleId: profile.id });
			if (exisitingUser) {
				return done(null, exisitingUser);
			}
			const user = await new User({
				googleId: profile.id,
				firstName: profile.name.givenName,
				lastName: profile.name.familyName,
				email: profile.emails[0].value
			}).save();
			done(null, user);
		}
	)
);
