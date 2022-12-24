import { Component, Input, OnInit, Output, EventEmitter, AfterViewInit } from '@angular/core';


@Component({
  selector: 'app-jobpositioncard',
  templateUrl: './jobpositioncard.component.html',
  styleUrls: ['./jobpositioncard.component.css']
})
export class JobpositioncardComponent implements OnInit {

  
  @Input() display: boolean = false;
  @Input() isOpen: boolean = true;
  @Input() assineeUsername: string = '';
  @Input() identityName: string = '';
  @Input() description: string = '';
  @Input() id: string = '';
  @Output() deleteJobPosition = new EventEmitter<string>();
  @Output() openJobPosition = new EventEmitter<boolean>();
  @Output() editJobPosition = new EventEmitter<boolean>();
  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(){
    
    setTimeout(() => {
      const description = document.getElementById(this.identityName);
      description!.innerHTML = this.description;
    }, 100);
  }

  delete(id: string){
    this.deleteJobPosition.emit(id);
  }

  closeOpenJobPosition(open: boolean){
    this.openJobPosition.emit(open);
  }

  edit(){
    this.editJobPosition.emit(true);
  }
}
