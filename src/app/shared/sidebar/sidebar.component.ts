import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MenuService } from '../../services/menu.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  @Output() loading = new EventEmitter<boolean>();
  menuItems: any[] = [];
  mainRoute: string = '/advancio/'
  constructor( private sidebarService: MenuService) { 
    this.sidebarService.getMenuByUser().subscribe( ( resp: any ) =>{
      this.menuItems =  resp.menu;
      this.loading.emit(false);
    })
  }

  ngOnInit(): void {
  }

}