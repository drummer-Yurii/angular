// import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import type { AxiosRequestConfig } from 'axios';
const log = console.log;

interface MyOption {
    headers: {
        'auth-token' : string | null,
    }
}
const httpOptions : AxiosRequestConfig <MyOption> =  {
    headers: {
       'auth-token': localStorage.getItem('authToken'),
    }
}
export {httpOptions, log}