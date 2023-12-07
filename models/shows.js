const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const showSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    id: {
        type: String,
        required: true,
        unique: true
    },
    hasSubsequentSeasons: {
        type: Boolean,
    }
    
})

module.exports = mongoose.model('Show', showSchema)