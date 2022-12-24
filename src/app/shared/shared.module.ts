//Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule} from '@angular/material/icon';

//Components
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';


@NgModule({
  declarations: [HeaderComponent, SidebarComponent ],
  imports: [
    CommonModule, RouterModule, MatIconModule
  ],
  exports: [ HeaderComponent, SidebarComponent]
})
export class SharedModule { }
