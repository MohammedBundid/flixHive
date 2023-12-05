// const { response } = require('express');
const requests = require('../helpers/requests')
const key = process.env.key;


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
        
        const data = await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${key}&language=en-US&page=1`)
            .then(response => response.json())
            .catch((error) => {
                console.log("Error fetching data:", error.message)
                res.status(500).send('Error fetching movie data');
                throw error;
            })

        locals.movies = data.results

    res.render('pages/movies', locals);

    } catch (error) {
        console.error("An unexpected error occurred:", error)
    }

}

const tv_shows = async (req, res) => {
    // res.send('hello world');
    try {
        const locals = {
            title: "shows for you to watch",
            desc: "movies to watch",
        }
        
        const data = await fetch(`https://api.themoviedb.org/3/tv/top_rated?api_key=${key}&language=en-US&page=1`)
            .then(response => response.json())
            .catch((error) => {
                console.log("Error fetching data:", error.message)
                res.status(500).send('Error fetching movie data');
                throw error;
            })

        locals.shows = data.results

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
const register = (req, res) => {
    const locals = {
        title: "coming soon",
        desc: "coming soon",
    };
    res.render('pages/SOON.ejs', locals);
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