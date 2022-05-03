import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
const log = console.log;

@Component({
  selector: 'app-dev',
  templateUrl: './dev.component.html',
  styleUrls: ['./dev.component.sass']
})
export class DevComponent implements OnInit {

  constructor(
    private api:ApiService
  ) { }

  ngOnInit(): void {
  }
  async testSession(){
    const answer: any = await this.api.testSession()
    log(answer)
  }

}
