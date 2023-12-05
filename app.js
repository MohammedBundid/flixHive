require('dotenv').config()
const express = require('express');
const logger = require('morgan');
const multer = require('multer');
const userRoutes = require('./routes/userRoutes');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 4000 || process.env.PORT 

app.set('view engine', 'ejs')
app.use(express.static('public'));
app.use(logger('dev'))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(cors({
    origin: "https://www.youtube.com"
}))

app.use('/', userRoutes)

app.listen(PORT, (req, res) => {
    console.log(`app listening on port ${PORT}`)
})