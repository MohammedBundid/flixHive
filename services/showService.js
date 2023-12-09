const key = process.env.key;
const fetchShows = async (req, res) => {
 
    try {
     
        const data = await fetch(`https://api.themoviedb.org/3/tv/top_rated?api_key=${key}&language=en-US&page=1`)
        .then(response => response.json())
        .catch((error) => {
            console.log("Error fetching data:", error.message)
            res.status(500).send('Error fetching movie data');
            throw error;
        })
        
        const showsData = data.results

        return showsData;


    } catch (error) {
        console.error("An unexpected error occurred:", error)
    }

}
const fetchShowsByPage = async (page) => {
 
    try {

        const limit = 20;
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;

     
        const data = await fetch(`https://api.themoviedb.org/3/tv/top_rated?api_key=${key}&language=en-US&page=${page}`)
        .then(response => response.json())
        .catch((error) => {
            console.log("Error fetching data:", error.message)
            res.status(500).send('Error fetching show data');
        })

        const showsData = data.results
        const pagesData = showsData
        return pagesData;


    } catch (error) {
        console.error("An unexpected error occurred:", error)
    }

}


module.exports = {
    fetchShows,
    fetchShowsByPage
}