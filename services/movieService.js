const key = process.env.key;
const fetchMovies = async (req, res) => {
 
    try {
     
        const data = await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${key}&language=en-US&page=1`)
        .then(response => response.json())
        .catch((error) => {
            console.log("Error fetching data:", error.message)
            res.status(500).send('Error fetching movie data');
        })

        const moviesData = data.results

        return moviesData;


    } catch (error) {
        console.error("An unexpected error occurred:", error)
    }

}
const fetchMoviesByPage = async (page) => {
 
    try {

        const limit = 20;
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;

     
        const data = await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${key}&language=en-US&page=${page}`)
        .then(response => response.json())
        .catch((error) => {
            console.log("Error fetching data:", error.message)
            res.status(500).send('Error fetching movie data');
        })

        const moviesData = data.results

        // console.log(' moviesData length:', moviesData);
        // const pagesData = moviesData.slice(startIndex, endIndex);
        const pagesData = moviesData
        return pagesData;


    } catch (error) {
        console.error("An unexpected error occurred:", error)
    }

}

module.exports = {
    fetchMovies,
    fetchMoviesByPage
}