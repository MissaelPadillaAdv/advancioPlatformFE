import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobpositioncardComponent } from './jobpositioncard/jobpositioncard.component';
import { MatIconModule } from '@angular/material/icon';
import { SpinnerComponent } from './spinner/spinner.component';
import { NoInformationCardComponent } from './no-information-card/no-information-card.component';



@NgModule({
  declarations: [
    JobpositioncardComponent,
    SpinnerComponent,
    NoInformationCardComponent
  ],
  imports: [
    CommonModule,
    MatIconModule
  ],
  exports: [
    JobpositioncardComponent,
    SpinnerComponent,
    NoInformationCardComponent
  ]
})
export class ComponentsModule { }
