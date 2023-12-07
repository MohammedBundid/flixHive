// const { response } = require('express');
const requests = require('../helpers/requests')
const userService = require('../services/userService')
const Redis = require('redis')
const cacheUtility = require('../utils/cacheUtil')
const key = process.env.key;
const redisClient = Redis.createClient()
const DEFAULTEXPDATE = 3600

// const home = (req, res) => {
//     // res.send('hello world');
//     const locals = {
//         title: "home",
//         desc: "flixhive, a free movie streaming site"
//     }
//     res.render('pages/movies', locals);
// }

const movies = async (req, res) => {
 
    try {
        const locals = {
            title: "movies",
            desc: "movies to watch",
        }
        
        const moviesData = await cacheUtility.fetchCachedMovies()

        locals.movies = moviesData

    res.render('pages/movies', locals);

    } catch (error) {
        console.error("An unexpected error occurred:", error)
    }

}

const tv_shows = async (req, res) => {
    try {
        const locals = {
            title: "shows for you to watch",
            desc: "movies to watch",
        }
        
        const showsData = await cacheUtility.fetchCachedShows()
        locals.shows = showsData

    res.render('pages/shows', locals);

    } catch (error) {
        console.error("An unexpected error occurred:", error)
    }
}

const movieById  = async (req, res) => {

    try {

        const id = req.params.id;
        const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env,key}`)

        if(!response.ok){
            const errorData = await response.json();
            console.error("Error from TMDb API:", errorData);
            return res.status(response.status).send('Error from TMDb API');
        }

        const movie = await response.json();

        const locals = {
            title: "movies",
            desc: "movies to watch",
            data: movie
        };

    res.render('pages/movieViewer', locals)


    } catch (error) {
        console.error("An unexpected error occurred:", error);
        res.status(500).send('Internal Server Error');
    }
}
const showById  = async (req, res) => {

    try {

        const id = req.params.id;
        const response = await fetch(`https://api.themoviedb.org/3/tv/${id}?api_key=${process.env,key}`)

        if(!response.ok){
            const errorData = await response.json();
            console.error("Error from TMDb API:", errorData);
            return res.status(response.status).send('Error from TMDb API');
        }

        const movie = await response.json();

        const locals = {
            title: "tv show",
            desc: "movies to watch",
            data: movie
        };

    res.render('pages/showViewer', locals)


    } catch (error) {
        console.error("An unexpected error occurred:", error);
        res.status(500).send('Internal Server Error');
    }
}

const movieTrailer  = async (req, res) => {

    try {

        const id = req.params.id;
        const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.key}&append_to_response=videos
        `)

        if(!response.ok){
            const errorData = await response.json();
            console.error("Error from TMDb API:", errorData);
            return res.status(response.status).send('Error from TMDb API');
        }

        const movie = await response.json();

        const locals = {
            title: "movie trailer",
            desc: "movies to watch",
            data: movie
        };

    res.render('pages/movieTrailer', locals)


    } catch (error) {
        console.error("An unexpected error occurred:", error);
        res.status(500).send('Internal Server Error');
    }
}
const showTrailer  = async (req, res) => {

    try {

        const id = req.params.id;
        const response = await fetch(`https://api.themoviedb.org/3/tv/${id}?api_key=${process.env.key}&append_to_response=videos
        `)

        if(!response.ok){
            const errorData = await response.json();
            console.error("Error from TMDb API:", errorData);
            return res.status(response.status).send('Error from TMDb API');
        }

        const movie = await response.json();

        const locals = {
            title: "movie trailer",
            desc: "movies to watch",
            data: movie
        };

    res.render('pages/showTrailer', locals)


    } catch (error) {
        console.error("An unexpected error occurred:", error);
        res.status(500).send('Internal Server Error');
    }
}

const account = (req, res) => {
    const locals = {
        title: "coming soon",
        desc: "coming soon",
    };
    res.render('pages/SOON.ejs', locals);
}
const register =  (req, res) => {
    const locals = {
        title: "coming soon",
        desc: "coming soon",
    };

    // try {
    //     await userService.register()
    //     res.render('pages/SOON.ejs', locals);
    // } catch (error) {
    //     console.error(error);
    //     res.status(500).send("Internal Server Error");
    // }
    
}

module.exports = {
    // home,
    movies,
    tv_shows,
    movieById,
    movieTrailer,
    showById,
    showTrailer,
    account,
    register
}