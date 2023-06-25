import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesRountingModule } from './pages/pages.routing';
import { AuthRountingModule } from './auth/auth.routing';
import { NoPageFoundComponent } from './no-page-found/no-page-found.component';

const routes: Routes = [

  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: '**', component: NoPageFoundComponent }

]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [
    RouterModule,
    PagesRountingModule,
    AuthRountingModule
  ]
})
export class AppRoutingModule { }
