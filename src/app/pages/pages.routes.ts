import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { JobpositionsComponent } from './prospect/jobpositions/jobpositions.component';

const routes: Routes = [
  {
    path: 'advancio',
    component: PagesComponent,
    children: [
      //   {path: 'WishList', component: SavedtalentComponent},
      {path: 'MyJobPositions', component: JobpositionsComponent},
      { path: '', redirectTo: 'MyJobPositions', pathMatch: 'full' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
