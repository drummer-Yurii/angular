import { log } from 'high-level'
import axios from 'axios'
import { httpOptions } from '@/utils'



// ??? custom 
const customTarget = async () => {
    const isImgChoise: any = document.getElementById("fileToUpload");
    const myTarget = {
        type: 'custom',
        files: [isImgChoise.files[0]],
        fileName: 'post-img',
    };
    if (isImgChoise.files.length !== 0) return myTarget
}


const RUN = async (targets: any[], publicFolder: string, pathForUploading: string): Promise<void> => {

    const targetsForUploading = targets.filter((target) => (target.files?.length > 0) || (target.type == 'custom'))

    const promises = targetsForUploading.map((target) => {
        const isMyTarget = !!target.fileName;
        var fileName = isMyTarget ? target.fileName : target.name;
        const fd = new FormData();
        fd.append("sampleFile", target.files[0]);
        const path = `${publicFolder}?pathForUploading=${pathForUploading}&fileName=${fileName}`
        const options = {
            method: 'POST',
            body: fd
        }
        return new Promise(async (resolve, reject) => {
            // const answer: any = await $fetch(path, options) // for Nuxt3
            const answer: any = await axios.post(path, fd, httpOptions(), {}) // for Vue3
            resolve(answer);
        })
    })
    const result = await Promise
        .all(promises)
        .catch(log);
    var inputs = document.querySelectorAll('input[type=file]');
    inputs.forEach(input => input.value = '');
}


const fileUploader = async ({DOMQuery, publicFolder, pathForUploading }: any) => {
    let targets: any[] = [...document.querySelectorAll(DOMQuery)] // target gathering
    RUN(targets, publicFolder, pathForUploading)
}

export { fileUploader }