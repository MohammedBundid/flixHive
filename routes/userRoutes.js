const express = require('express');
const userController = require('../controllers/userController')
const router = express.Router()

router.get('/', userController.home)
router.get('/movies', userController.movies)
router.get('/shows', userController.tv_shows)

router.get('/movies/:id', userController.movieById)
router.get('/movies/watch-trailer/:id', userController.movieTrailer)

module.exports = router;