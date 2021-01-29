//exporting this as an object! we can call require Auth easier this way with middlewares?

module.exports = {

  requireAuth(req, res, next) {
    if (!req.session.userId) {
      return res.redirect('/signin');
    }

    next();
  }
};
