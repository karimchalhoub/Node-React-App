const passport = require('passport');

module.exports = app => {
  //retreive code: auth/google route
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      //google strategy has an internal identifier as 'google'
      //asking google api for profile info and email
      scope: ['profile', 'email']
    })
  );
  //retreive profile info auth/google/callback route
  app.get('/auth/google/callback', passport.authenticate('google'));

  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  });

  app.get('/api/logout', (req, res) => {
    //logout is a method from passport that kills the id from cookie
    req.logout();
    res.send(req.user);
  });
};
