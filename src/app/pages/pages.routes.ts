import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { JobpositionsComponent } from './prospect/jobpositions/jobpositions.component';
import { WishlistsComponent } from './prospect/wishlists/wishlists.component';
import { MytalentsComponent } from './prospect/mytalents/mytalents.component';

const routes: Routes = [
  {
    path: 'advancio',
    component: PagesComponent,
    children: [
      {path: 'WishList', component: WishlistsComponent},
      {path: 'MyJobPositions', component: JobpositionsComponent},
      {path: 'MyTalent', component: MytalentsComponent},
      { path: '', redirectTo: 'WishList', pathMatch: 'full' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
