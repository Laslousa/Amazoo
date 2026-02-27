import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, effect, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterOutlet } from '@angular/router';
import { Header } from './features/layout/components/header/header';
import { Sidebar } from './features/layout/components/sidebar/sidebar';
import { EcommerceStore } from './ecommerce-store';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Sidebar, MatSidenavModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  store = inject(EcommerceStore);
  private readonly breakpointObserver = inject(BreakpointObserver);
  private readonly initialMobile =
    typeof window !== 'undefined' && window.matchMedia('(max-width: 1023px)').matches;
  private wasMobile = this.initialMobile;

  protected readonly title = signal('ecommerce-app');

  isMobile = toSignal(
    this.breakpointObserver.observe('(max-width: 1023px)').pipe(map((state) => state.matches)),
    { initialValue: this.initialMobile },
  );

  constructor() {
    if (this.initialMobile) {
      this.store.closeSidebar();
    }

    effect(() => {
      const mobile = this.isMobile();
      if (mobile === this.wasMobile) {
        return;
      }

      this.wasMobile = mobile;

      if (mobile) {
        this.store.closeSidebar();
      } else {
        this.store.openSidebar();
      }
    });
  }
}
