import { Injectable } from '@angular/core';
import{HttpClient, HttpHeaders} from '@angular/common/http';

let headers= new HttpHeaders();

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
   private http:HttpClient,
  //  private headers:HttpHeaders,
  ) { }
  get httpOptions(){
    return {
      headers:headers.set('Content-Type','application/json')
    }
  }
  register(userData:any){
     return this.http.post('http://localhost:3000/api/auth/register', userData, this.httpOptions).toPromise()
  }
  login(userData:any){
    return this.http.post('http://localhost:3000/api/auth/login', userData, this.httpOptions).toPromise()
 }
}
