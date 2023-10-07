import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors'

import textRoutes from './routes/texts.js'
import wpmRoutes from './routes/wpm.js'

const app = express();
app.use(express.json());
app.use(cors());

//for some reason above line wasn't working
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    next();
  })

//middleware /texts to have better routes
app.use('/texts', textRoutes);
app.use('/wpm', wpmRoutes);

// setting up body parser and cors
app.use(bodyParser.json({limit : "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit : "30mb", extended: true}));


// mongodb integration
const CONNECTION_URL = 'mongodb+srv://nitish:tester123@cluster0.utzfs3l.mongodb.net/?retryWrites=true&w=majority';
const PORT = process.env.PORT || 5001;

mongoose.connect(CONNECTION_URL, {useNewURLParser : true, useUnifiedTopology: true})
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch((error) => console.log(error.message));
    