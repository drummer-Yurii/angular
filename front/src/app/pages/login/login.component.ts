import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  userData={
    password:'',
    username:'',
  }


  constructor(
    private api: ApiService
  ) { }

  ngOnInit(): void {
  }
  async login(){
    console.log(this.userData)
    const answer=await this.api.register(this.userData)
   console.log(answer)
  }

}
