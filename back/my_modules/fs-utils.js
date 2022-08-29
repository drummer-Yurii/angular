import { log } from 'high-level';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));
import fs from 'fs';
const fsp = fs.promises;

/*
delete fails in folder
cleanUp(`/posts/62ba931031583299577448d1/`,'post-img') // example 
*/
 function cleanUp(pathForUploading, fileName, dirname) {
    return new Promise((resolve, reject)=>{
    let counter = 0;
        ['jpg', 'jpeg', 'png','jpg', 'jpeg', 'png','jpg', 'jpeg', 'PNG', 'svg', 'webp' ].forEach((extention, i, arr) => {
            const path = dirname + '/uploads' + pathForUploading + fileName + '.' + extention;
            log('shoud delete', path)
            try {
                fs.unlink(path, () => {
                    console.log('deleted', path);
                    counter++;
                    if (counter == arr.length) resolve()
                });
            } catch (error) {
                console.log('can not deleted', path);
            }
        });
    })       
};

async function cleanUpOldFiles(set) {
    const path = set.path;
    const files = await fsp.readdir(path);
    const oldFiles = files.filter((f) => {
        const isActual = set.actualFiles.some((fn) => fn == f);
        return !isActual;
    });
    log('oldFiles', oldFiles);
    oldFiles.forEach((f) => {
        const pathToFile = path + '/' + f
        try {
            fs.unlink(pathToFile, () => {
                console.log('deleted', pathToFile);
            });
        } catch (error) {
            console.log('can not delete', pathToFile);
        }
    });
    return { ok: true };
};

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

export {cleanUp, canAccess, ensureFolder, cleanUpOldFiles};

