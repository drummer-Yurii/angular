const log = console.log;
import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));

import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';
import indexRouter from './routes/index.js';
import usersRouter from './routes/users.js';

var app = express();

import mongoose from 'mongoose';
// mongoose.connect(`mongodb+srv://user:${process.env.DB_PASS}@cluster0-bpnma.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`, {
mongoose.connect('mongodb://localhost/angular', {
    // useCreateIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true,
    // useFindAndModify: false
})
    .then(() => log('\n DB Connected!'.info))
    .catch(err => log(`DB Connection Error: ${err.message}`));

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

export default app;