import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
const log = console.log;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  userData = {
    password: '',
    username: '',
  }


  constructor(
    private api: ApiService
  ) { }

  ngOnInit(): void {
  }
  async login() {
    log(this.userData)
    const answer: any = await this.api.login(this.userData)
    log(answer)
    if (answer.ok) {
      localStorage.setItem('token', answer.token)
      alert('user was logged')
    } else {
      alert(answer.msg)
    }
  }

}
