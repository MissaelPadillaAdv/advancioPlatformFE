import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'app-no-information-card',
  templateUrl: './no-information-card.component.html',
  styleUrls: ['./no-information-card.component.css']
})
export class NoInformationCardComponent implements OnInit {

  @Input() display: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

}
