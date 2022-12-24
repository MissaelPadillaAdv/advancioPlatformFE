import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-starrating',
  templateUrl: './starrating.component.html',
  styleUrls: ['./starrating.component.css']
})
export class StarratingComponent implements OnInit {

  @Input() globalRaiting: number = 1;
  @Input() raitingCount: number = 1;

  public raitingCountStr: string = '';

  public starQty = [1,2,3,4,5]
  constructor() { 
    this.raitingCountStr = this.raitingCount > 99 ? '(+99)' : `(${this.raitingCount})`
  }

  ngOnInit(): void {
  }

  buildStartRating(){

  }
}
