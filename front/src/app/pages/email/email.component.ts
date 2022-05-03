import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.sass']
})
export class EmailComponent implements OnInit {
email='';
password='';
  constructor() { }

  ngOnInit(): void {
  }

}
