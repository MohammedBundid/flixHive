const NodeCache = require('node-cache');
const myCache = new NodeCache();
const movieService = require('../services/movieService');
const showService = require('../services/showService');

const fetchCachedMovies = async (req, res) => {
    try {
        // console.log('Checking cache...');
        // Check if movies exist in the cache
        const cachedMovies = myCache.get('movies');

        if (!cachedMovies) {
            // console.log('Cache miss. Fetching movies from the service...');
            // Fetch movies from the service
            const moviesData = await movieService.fetchMovies();
            
            // Cache the moviesData with a TTL (e.g., 1 hour)
            myCache.set('movies', moviesData, 3600);
            
            // console.log('Movies fetched and cached successfully.');
            
            return moviesData;
        } else {
            // console.log('Cache hit. Using cached movies.');
            return cachedMovies;
        }
    } catch (error) {
        console.error('Error in fetchCachedMovies:', error);
        throw error;
    }
};

const fetchCachedShows = async (req, res) => {
    try {
        console.log('Checking cache...');
        // Check if Shows exist in the cache
        const cachedShows = myCache.get('shows');

        if (!cachedShows) {
            // console.log('Cache miss. Fetching Show from the service...');
            // Fetch Show from the service
            const ShowsData = await showService.fetchShows();
            
            // Cache the ShowData with a TTL (e.g., 1 hour)
            myCache.set('shows', ShowsData, 3600);
            
            // console.log('Show fetched and cached successfully.');
            
            return ShowsData;
        } else {
            // console.log('Cache hit. Using cached Show.');
            return cachedShows;
        }
    } catch (error) {
        console.error('Error in fetchCachedShow:', error);
        throw error;
    }
};

const fetchCachedMoviePages = async (page) => {
    try {
        console.log('Checking cache for movie pages on page', page);

        // Assume each page has a limit of 20 movies (adjust as needed)
       
        // Check if movie pages exist in the cache
        const cachedPages = myCache.get(`moviePagesData${page}`);

        if (!cachedPages) {
            // Cache miss. Fetch movie pages from the service
            const moviePagesData = await movieService.fetchMoviesByPage(page);
            // console.log(moviePagesData)
            // Slice happens in the service

            // Cache the pagesData with a TTL (e.g., 1 hour)
            myCache.set(`moviePagesData${page}`, moviePagesData, 3600);

            return moviePagesData;
        } else if (Array.isArray(cachedPages)) {
            // Cache hit. Use the cached movie pages and apply pagination

            console.log('Using cached movie pages for page', page);

            return cachedPages;
        } else {
            // Handle the case where cachedPages is not an array
            console.error('Unexpected data structure in cache for movie pages');
            return [];
        }
    } catch (error) {
        console.error('Error in fetchCachedMoviePages:', error);
        throw error;
    }
};
const fetchCachedShowPages = async (page) => {
    try {
        // console.log('Checking cache for shows pages on page', page);

        // Assume each page has a limit of 20 movies (adjust as needed)
       
        // Check if movie pages exist in the cache
        const cachedPages = myCache.get(`showPageData${page}`);

        if (!cachedPages) {
            // Cache miss. Fetch movie pages from the service
            const showPageData = await showService.fetchShowsByPage(page);
            // console.log(moviePagesData)
            // Slice happens in the service

            // Cache the pagesData with a TTL (e.g., 1 hour)
            myCache.set(`showPageData${page}`, showPageData, 3600);

            return showPageData;
        } else if (Array.isArray(cachedPages)) {
            // Cache hit. Use the cached movie pages and apply pagination

            // console.log('Using cached movie pages for page', page);

            return cachedPages;
        } else {
            // Handle the case where cachedPages is not an array
            console.error('Unexpected data structure in cache for movie pages');
            return [];
        }
    } catch (error) {
        console.error('Error in fetchCachedShowPages:', error);
        throw error;
    }
};


module.exports = {
    fetchCachedMovies,
    fetchCachedShows,
    fetchCachedMoviePages,
    fetchCachedShowPages
};
