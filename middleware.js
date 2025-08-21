function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next(); // proceed if logged in
    }
    req.flash('error', 'You must be logged in to view this page.');
    res.redirect('/login');
}

module.exports = isLoggedIn;