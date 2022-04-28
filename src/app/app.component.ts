import { Component } from '@angular/core';
import { Router, Event, NavigationStart, NavigationEnd } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Project';
  PreLoadingPage: boolean = false;
  constructor(private _Router: Router) {
    this._Router.events.subscribe((routerevent: Event) => {
      if (routerevent instanceof NavigationStart) {
        this.PreLoadingPage = true;
      }
      if (routerevent instanceof NavigationEnd) {
        this.PreLoadingPage = false;
      }
    });
  }
}
