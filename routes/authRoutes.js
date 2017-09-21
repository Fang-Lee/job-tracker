const passport = require('passport');

module.exports = app => {
	// route to authorize login
	app.get(
		'/auth/google',
		passport.authenticate('google', {
			prompt: 'consent',
			scope: ['profile', 'email']
		})
	);

	// callback route after logging in on google
	app.get('/auth/google/callback', passport.authenticate('google'));

	// route handler for logging out
	// logout automicatlly bound to passport req object.
	app.get('/api/logout', (req, res) => {
		req.logout();
		res.send(req.user);
	});

	// call to get currently logged in user
	app.get('/api/current_user', (req, res) => {
		res.send(req.user);
	})
};
