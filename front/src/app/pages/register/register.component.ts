import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
const log = console.log;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements OnInit {
  userData = {
    password: '',
    username: '',
    email: '',
  }


  constructor(
    private api: ApiService
  ) { }

  ngOnInit(): void {
  }
  async register() {
    log(this.userData)
    const answer: any = await this.api.register(this.userData)
    log(answer)
    if (answer.ok) {
      alert('user was successful created')
    } else {
      alert(answer.msg)
    }
  }
}
