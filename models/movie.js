const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const movieSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    id: {
        type: String,
        required: true,
        unique: true
    }
    
})

const Movie = mongoose.model('movie', movieSchema)

module.exports = Movie;