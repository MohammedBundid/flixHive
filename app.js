require('dotenv').config()
const express = require('express');
const logger = require('morgan');
const multer = require('multer');
const userRoutes = require('./routes/userRoutes');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 4000

app.set('view engine', 'ejs')
app.use(express.static('public'));
app.use(logger('dev'))
app.use(express.json());

app.use(cors({
    origin: "https://www.youtube.com"
}))

app.use('/a/v1', userRoutes)

app.listen(PORT, (req, res) => {
    console.log(`app listening on port ${PORT}`)
})