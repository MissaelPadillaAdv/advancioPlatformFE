import { Component, OnInit } from '@angular/core';
import { MytalentsService } from '../../../services/prospect/mytalents.service';

@Component({
  selector: 'app-mytalents',
  templateUrl: './mytalents.component.html',
  styleUrls: ['./mytalents.component.css']
})
export class MytalentsComponent implements OnInit {

  public talentInProcess: any[] = [];
  public indicator: string = '#';

  constructor(private myTalentService: MytalentsService) { 
    this.getTalentInProcess();
  }

  ngOnInit(): void {
  }

  getTalentInProcess(){
    this.myTalentService.getTalentInProcess().subscribe( (resp: any) => {
      this.talentInProcess = resp.items;
      console.log(this.talentInProcess)
    })
  }

  test(id: string) {
    const element = document.getElementById(id);
    element?.setAttribute('display','inline')
    console.log()
  }
}
