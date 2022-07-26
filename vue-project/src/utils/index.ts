// import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import type { AxiosRequestConfig } from 'axios';
import axios from "axios";
const log = console.log;

interface MyOption {
    headers: {
        'auth-token': string | null,
    }
}
const httpOptions = (): AxiosRequestConfig<MyOption> => ({
    headers: {
        'auth-token': localStorage.getItem('authToken'),
    }
})
const uploadFile = async (target, path, fileName) => {
    const targetDom = document.getElementById(target);
    if (targetDom.files.length == 0)
        return alert("file not selected! please chois avatar");
    const file = targetDom.files[0];
    const url = `http://localhost:3001/upload?pathForUploading=${path}&fileName=${fileName}`
    var fd = new FormData();
    fd.append("sampleFile", file);

    var oReq = new XMLHttpRequest();
    oReq.open(
        "POST",
        url,
        true
    );
    const answer = await axios.post(
        url,
        fd,
        httpOptions(),
        {}
    );
    console.log(answer);
    location.reload();
}

const pause = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));


export { httpOptions, log, uploadFile, pause }