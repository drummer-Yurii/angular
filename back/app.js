import { log } from 'high-level';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));
import 'dotenv/config';

import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';
import indexRouter from './routes/index.js';
import fileUpload from 'express-fileupload';
import fs from 'fs';

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


app.use(express.static(path.join(__dirname, 'uploads')));
app.use(fileUpload());


app.post('/upload', function (req, res) {
    let sampleFile;
    let uploadPath;
    let pathForUploading;
    let fileName;

    if (!req.files || Object.keys(req.files).length === 0) {
        res.status(400).send('No files were uploaded.');
        return;
    };
    console.log('params:', req.params, req.query)

    console.log('req.files >>>', req.files, req.files.sampleFile.test); // eslint-disable-line

    sampleFile = req.files.sampleFile;
    pathForUploading = req.query.pathForUploading;
    fileName = req.query.fileName;
    let counter = 0;
    // remove all avators 
    ['jpg', 'jpeg', 'png'].forEach((extention, i, arr) => {
        const path = __dirname + '/uploads' + pathForUploading + 'avatar.' + extention;
        try {
            fs.unlink(path, () => {
                console.log('deleted', path);
                counter++;
                if (counter == arr.length) rest()
            });
        } catch (error) {
            console.log('can not deleted', path);
        }
    });
    async function rest() {
        console.log('rest')
        if (req.query.fileName) {
            console.log(sampleFile.name.split('.'))
            const extention = sampleFile.name.split('.')[1];
            fileName = `${req.query.fileName}.${extention}`
        } else {
            fileName = sampleFile.name
        }
        const folders = __dirname + '/uploads' + pathForUploading
        uploadPath = folders + fileName;

        await ensureFolder(folders);
        setTimeout(() => {
            log(uploadPath)
            sampleFile.mv(uploadPath, function (err) {
                if (err) {
                    log(err)
                    return res.status(500).send(err)
                };
                res.send('File uploaded to ' + uploadPath);
            });
        }, 2000)

    }
});
async function canAccess(path) {
    return new Promise((resolve, reject) => {
        try {
            fs.promises.access(path, fs.constants.R_OK | fs.constants.W_OK)
                .then(() => resolve(true))
                .catch(() => resolve(false));
        } catch (error) {
            reject('Err: Crash in "canAccess()" function')
        }
    })
};
async function ensureFolder(path) {
    if (typeof path !== 'string') return; // .................... processing does not make sense if it is not a string
    const pathParts = path.split('/').filter((word) => word != ''); // ............ split the path and cut the garbage
    let untilFullPath = ''; // .................................................... prepare like string
    for (let i = 0; i < pathParts.length; i++) {
        const folderName = pathParts[i]; // ....................................... reduction
        untilFullPath += folderName + '/'; // ..................................... deeper and deeper each time
        if (untilFullPath == './') continue; // ..................... it doesn't make sense to check the current place
        if (!await canAccess(untilFullPath)) fs.mkdirSync(untilFullPath); // Create a folder if it does not exist
    }
    return 'ok'
};

app.use('/', indexRouter);
export default app;
// 2 admin page for diferent items
// 3 email : confirmation and restoration