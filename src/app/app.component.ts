import { DOCUMENT } from '@angular/common';
import { Component, Inject, Renderer2 } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { AuthenticationService } from './services/firebase/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'simple-crm';
  isLoggedIn: boolean = false;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
    private authService: AuthenticationService
  ) {
    this.authService.isLoggedIn$.subscribe((data) => {
      this.isLoggedIn = data;
    });
  }

  onDarkModeSwitched({ checked }: MatSlideToggleChange) {
    const themeClass = checked ? 'dark-theme' : 'light-theme';
    this.renderer.setAttribute(this.document.body, 'class', themeClass);
  }
}
