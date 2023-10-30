import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { AuthenticationService } from './services/firebase/authentication.service';
import { Router } from '@angular/router';
import { FirestoreService } from './services/firebase/firestore.service';
import { ResponsiveService } from './services/responsive.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  isMobile!: boolean;
  isTablet!: boolean;
  isDesktop!: boolean;
  title = 'simple-crm';
  isLoggedIn: boolean = false; // Should be false; For dev can switch
  isAccountInfoComplete: boolean = false;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
    private authService: AuthenticationService,
    private fireService: FirestoreService,
    private ResponsiveService: ResponsiveService,
    private router: Router
  ) {
    this.authService.isLoggedIn$.subscribe((data) => {
      this.isLoggedIn = data;
    });
  }

  ngOnInit() {
    this.setCompleteInfo();
    this.listenForResponsive();
  }

  listenForResponsive() {
    this.ResponsiveService.isMobile$.subscribe((isMobile) => {
      this.isMobile = isMobile;
    });

    this.ResponsiveService.isTablet$.subscribe((isTablet) => {
      this.isTablet = isTablet;
    });

    this.ResponsiveService.isDesktop$.subscribe((isDesktop) => {
      this.isDesktop = isDesktop;
    });
  }

  onDarkModeSwitched({ checked }: MatSlideToggleChange) {
    const themeClass = checked ? 'dark-theme' : 'light-theme';
    this.renderer.setAttribute(this.document.body, 'class', themeClass);
  }

  setCompleteInfo() {
    this.fireService.singleEmployee$.subscribe((employee) => {
      this.isAccountInfoComplete = employee?.completeInfo;
    });
  }

  logout() {
    this.authService.signOut();
    this.router.navigate(['']);
    this.isLoggedIn = false;
    this.renderer.setAttribute(this.document.body, 'class', 'light-theme');
  }
}
