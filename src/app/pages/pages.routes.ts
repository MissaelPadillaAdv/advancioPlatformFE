import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
// import { JobpositionsComponent } from './Prospect/jobpositions/jobpositions.component';
// import { HomeComponent } from './home/home.component';
// import { SavedtalentComponent } from './Prospect/savedtalent/savedtalent.component';

const routes: Routes = [
  {
    path: 'advancio',
    component: PagesComponent,
    children: [
    //   { path:'home', component:HomeComponent},
    //   {path: 'MyJobPositions', component: JobpositionsComponent},
    //   {path: 'WishList', component: SavedtalentComponent},
      { path: '', redirectTo: 'home', pathMatch: 'full' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
