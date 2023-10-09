const router = require('express').Router();
const usersRouter = require('./users');
const moviesRouter = require('./movies');
const signupRouter = require('./signup');
const signinRouter = require('./signin');
const NotFoundError = require('../errors/NotFoundError');
const auth = require('../middlewares/auth');

router.use('/signup', signupRouter);
router.use('/signin', signinRouter);
router.use(auth);
router.use('/users', usersRouter);
router.use('/movies', moviesRouter);
router.use('*', (req, res, next) => {
  next(new NotFoundError('страница не найдена.'));
});

module.exports = router;
