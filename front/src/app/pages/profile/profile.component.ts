import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
const log = console.log
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass']
})
export class ProfileComponent implements OnInit {
  userData = {
    age: '',
    phone: '',
    email: '',
    facebookPage: ''
  }
  constructor(
    private api: ApiService
  ) { }

  async ngOnInit(): Promise<any> {
    await this.getProfile()
  }
  async getProfile() {
    log(this.userData)
    const answer: any = await this.api.profile.get()
    log(answer)
    if (answer.ok) {
      this.userData = answer.user
    } else {
      alert(answer.msg)
    }
  }
  async editProfile() {
    const answer: any = await this.api.profile.edit(this.userData)
    log(answer)
    if (answer.ok) {
      await this.getProfile()
    } else {
      alert(answer.msg)
    }
  }

}