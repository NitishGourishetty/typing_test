import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors'

import textRoutes from './routes/texts.js'

const app = express();

//middleware /texts to have better routes
app.use('/texts', textRoutes);

// setting up body parser and cors
app.use(bodyParser.json({limit : "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit : "30mb", extended: true}));
app.use(cors());

// mongodb integration
const CONNECTION_URL = 'mongodb+srv://nitish:tester123@cluster0.utzfs3l.mongodb.net/?retryWrites=true&w=majority; //temporary insecure credentials, make environmental variables later'
const PORT = process.env.PORT || 5001;

mongoose.connect(CONNECTION_URL, {useNewURLParser : true, useUnifiedTopology: true})
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch((error) => console.log(error.message));
    