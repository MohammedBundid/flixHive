const NodeCache = require('node-cache');
const myCache = new NodeCache();
const movieService = require('../services/movieService');
const showService = require('../services/showService');

const fetchCachedMovies = async () => {
    try {
        console.log('Checking cache...');
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
const fetchCachedShows = async () => {
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

module.exports = {
    fetchCachedMovies,
    fetchCachedShows
};
