import { log } from 'high-level';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));
import fs from 'fs';

 function cleanUp(pathForUploading, fileName) {
    return new Promise((resolve, reject)=>{
    let counter = 0;
        ['jpg', 'jpeg', 'png','jpg', 'jpeg', 'png','jpg', 'jpeg', 'PNG'].forEach((extention, i, arr) => {
            const path = __dirname + '/uploads' + pathForUploading + fileName + '.' + extention;
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
export {cleanUp};

