import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { JobpositionsComponent } from './prospect/jobpositions/jobpositions.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { MatIconModule} from '@angular/material/icon';
import { ComponentsModule } from '../components/components.module';




@NgModule({
  declarations: [
    PagesComponent,
    JobpositionsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    AngularEditorModule,
    MatIconModule,
    ComponentsModule
  ]
})
export class PagesModule { }
