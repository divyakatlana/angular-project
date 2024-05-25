import { Component } from '@angular/core';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { ThemePalette } from '@angular/material/core';
import { ProgressBarMode } from '@angular/material/progress-bar';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'drooms-starwars-app';
  loading = false;
  color: ThemePalette = 'warn';
  mode: ProgressBarMode = 'indeterminate';
  value = 50;
  bufferValue = 75;

  constructor(private router: Router) {
    router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.loading = true;
      } else if (event instanceof NavigationEnd) {
        setTimeout(() => {
          this.loading = false;
        }, 1000);
      }
    });
  }
}
