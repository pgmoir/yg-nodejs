exports.getHome = (req, res, next) => {
  res.render('index', { pageTitle: 'Index'});
};

exports.notFound = (req, res, next) => {
  res.status(404).render('404', { pageTitle: 'Page Not Found'});
};