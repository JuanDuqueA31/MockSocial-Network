import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { LayoutService } from '../../../services/layout/layout.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, Subject } from 'rxjs';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent implements OnInit, OnDestroy {
  private readonly layoutService = inject(LayoutService)
  private readonly activatedRoute = inject(ActivatedRoute)
  private readonly router = inject(Router)
  
  private readonly destroy$ = new Subject<void>();

  showHeader$ = this.layoutService.showHeader$;
  showFooter$ = this.layoutService.showFooter$;


  ngOnInit(): void {

  this.updateLayout(this.activatedRoute);

  this.router.events
    .pipe(filter(event => event instanceof NavigationEnd))
    .subscribe(() => this.updateLayout(this.activatedRoute));
}

private updateLayout(route: ActivatedRoute) {
  let r = route;
  while (r.firstChild) {
    r = r.firstChild;
  }

  const data = r.snapshot.data;
  this.layoutService.setLayout({
    header: data['header'] ?? true,
    footer: data['footer'] ?? true
  });
}
  toggleSidenav(sidenav: any) {
  sidenav?.toggle();
  }

  ngOnDestroy(): void {
  this.destroy$.next();
  this.destroy$.complete();
  }

}
