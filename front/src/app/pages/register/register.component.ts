import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements OnInit {
  userData={
    password:'',
    username:'',
    firstName:'',
    lastName:''
  }
  
  
  constructor(
    private api:ApiService
  ) { }

  ngOnInit(): void {
  }
  async register(){
    console.log(this.userData)
   const answer=await this.api.register(this.userData)
   console.log(answer)
  }
}
