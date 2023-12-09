const express = require('express');
const userController = require('../controllers/userController')
const router = express.Router()

router.get('/', userController.movies)
router.get('/movies', userController.movies)
router.get('/shows', userController.tv_shows)

router.get('/movies/:id', userController.movieById)
router.get('/movies/watch-trailer/:id', userController.movieTrailer)

router.get('/shows/:id', userController.showById)
router.get('/shows/watch-trailer/:id', userController.showTrailer)

// router.get('/movies/:page', userController.PaginationMovies)

router.get('/account', userController.account);
router.get('/register', userController.register);

module.exports = router;