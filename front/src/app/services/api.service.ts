import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

let headers = new HttpHeaders();

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient,
    //  private headers:HttpHeaders,
  ) { }
  get httpOptions() {
    const authToken = localStorage.getItem('authToken') || '';
    return {
      headers: headers.set('Content-Type', 'application/json').set('auth-token', authToken)
    }
  }
  register(userData: any) {
    return this.http.post('http://localhost:3000/api/auth/register', userData, this.httpOptions).toPromise()
  }
  login(userData: any) {
    return this.http.post('http://localhost:3000/api/auth/login', userData, this.httpOptions).toPromise()
  }
  testSession() {
    return this.http.post('http://localhost:3000/api/test', {}, this.httpOptions).toPromise()
  }
  
  user = {
    get: () => this.http.get('http://localhost:3000/api/user', this.httpOptions).toPromise(),
    add: (info:any) => this.http.post('http://localhost:3000/api/user',info, this.httpOptions).toPromise(),
    del: (id:string) => this.http.delete('http://localhost:3000/api/user/'+id, this.httpOptions).toPromise(),
    edit: (info:any) => this.http.put('http://localhost:3000/api/user',info, this.httpOptions).toPromise(),
  }
  // rooms = {
  //   get: (flow: any = '') => this.http.get(url + '/api/admin/rooms/' + flow, this.httpOptions).toPromise(),
  //   add: (info:any) => this.http.post(url + '/api/admin/rooms', info, this.httpOptions).toPromise(),
  //   del: (id:string) => this.http.delete(url + '/api/admin/rooms/' + id, this.httpOptions).toPromise(),
  //   edit: (info:any) => this.http.put(url + '/api/admin/rooms', info, this.httpOptions).toPromise(),
  // };
}
