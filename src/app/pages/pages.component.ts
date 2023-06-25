import { Component } from '@angular/core';
declare function customInitFunctions(): any;
@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent {
  ngOnInit(): void {
    customInitFunctions();
  }
}
