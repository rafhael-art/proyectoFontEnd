import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigurationsComponent } from './configurations/configurations.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { BreadcrumsComponent } from './breadcrums/breadcrums.component';
@NgModule({
  declarations: [
    ConfigurationsComponent,
    HeaderComponent,
    SidebarComponent,
    BreadcrumsComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    ConfigurationsComponent,
    HeaderComponent,
    SidebarComponent
  ]
})
export class SharedModule { }
