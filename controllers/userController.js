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
        const page = req.query.page ? parseInt(req.query.page) : 1; // Convert to integer

        if(page){

            try {

                const paginatedMovies = await cacheUtility.fetchCachedMoviePages(page);
                locals.movies = paginatedMovies
                locals.title = 'flixhive movies'
                locals.totalPages = 20;
                locals.currentPage = page;
                locals.contentType = 'movies'
                // console.log('Movies Data:', paginatedMovies);

            // res.json({message: 'pagination is happening'});
            res.render('pages/Pages', locals)
            } catch (error) {
                console.error(`smth unexpected happened ${error.message}`)
                res.status(500).send('error from the server');
            }
            
        }
        else {
            const moviesData = await cacheUtility.fetchCachedMovies()
        
            locals.movies = moviesData
            
            res.render('pages/movies', locals);
        }
        

    } catch (error) {
        console.error("An unexpected error occurred:", error);
        res.status(500).send(`oops! something went wrong ${error.message}`);
    }

}

const tv_shows = async (req, res) => {
    try {
        const locals = {
            title: "shows for you to watch",
            desc: "movies to watch",
        }

        const page = req.query.page ? parseInt(req.query.page) : 1; // Convert to integer

        if(page){

            try {
                const paginatedShows = await cacheUtility.fetchCachedShowPages(page);
                locals.shows = paginatedShows
                locals.title = 'flixhive tv shows'
                locals.totalPages = 20;
                locals.currentPage = page;
                locals.contentType = 'shows'

            res.render('pages/shows', locals);

            } catch (error) {
                console.error(`smth unexpected happened ${error.message}`)
                res.status(500).send('error from the server');
            }
        }
        else {
            const showsData = await cacheUtility.fetchCachedShows()
        
            locals.shows = showsData
            
            res.render('pages/shows', locals);
        }

    } catch (error) {
        console.error("An unexpected error occurred:", error)
    }
}

const movieById  = async (req, res) => {

    try {

        const id = req.params.id;
        const page = req.query.page ? parseInt(req.query.page) : 1; // Convert to integer
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
            data: movie,
            contentType: 'movies',
            currentPage: page,
            totalPages: 20

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
        const page = req.query.page ? parseInt(req.query.page) : 1; // Convert to integer
        const response = await fetch(`https://api.themoviedb.org/3/tv/${id}?api_key=${process.env,key}`)

        if(!response.ok){
            const errorData = await response.json();
            console.error("Error from TMDb API:", errorData);
            return res.status(response.status).send('Error from TMDb API');
        }

        const movie = await response.json();

        const locals = {
            title: "tv show",
            desc: "shows to watch",
            data: movie,
            contentType: 'shows',
            currentPage: page,
            totalPages: 20
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
        const page = req.query.page ? parseInt(req.query.page) : 1; // Convert to integer
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

        locals.totalPages = 20;
        locals.currentPage = page;
        locals.contentType = 'movies'

    res.render('pages/movieTrailer', locals)


    } catch (error) {
        console.error("An unexpected error occurred:", error);
        res.status(500).send('Internal Server Error');
    }
}
const showTrailer  = async (req, res) => {

    try {

        const id = req.params.id;
        const page = req.query.page ? parseInt(req.query.page) : 1; // Convert to integer
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

        locals.totalPages = 20;
        locals.currentPage = page;
        locals.contentType = 'movies'
        
    res.render('pages/showTrailer', locals)


    } catch (error) {
        console.error("An unexpected error occurred:", error);
        res.status(500).send('Internal Server Error');
    }
}

// const PaginationMovies = async (req, res) => {
//     try {
//         // Extract the 'page' query parameter from the request
//         const page = parseInt(req.query.page) || 1;
//         const limit = 20

//         // Ensure 'page' is a positive integer
//         if (isNaN(page) || page < 1) {
//             return res.status(400).send('Invalid page parameter.');
//         }

//         const locals = {
//             title: "movies",
//             desc: "next page",
            
//         }

//         // Fetch movies for the specified page
//         const moviesData = await fetchMovieByPage(key, page);
//         const totalMovies = moviesData.length;
//         const totalPages = Math.ceil(totalMovies / limit)

//         locals.totalPages = totalPages
//         locals.contentType = 'movies'

//         // Render or send the movies data to the client
//         res.render('pages/movies', locals);
//     } catch (error) {
//         console.error("An unexpected error occurred:", error);
//         res.status(500).send('Internal Server Error');
//     }
// };

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
    // PaginationMovies,
    account,
    register
}