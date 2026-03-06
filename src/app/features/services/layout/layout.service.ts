import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {
  
  private readonly showHeader = new BehaviorSubject<boolean>(true);
  private readonly showFooter = new BehaviorSubject<boolean>(true);

  showHeader$ = this.showHeader.asObservable();
  showFooter$ = this.showFooter.asObservable();

  setLayout(config: { header?: boolean; footer?: boolean }) {
    this.showHeader.next(config.header ?? true);
    this.showFooter.next(config.footer ?? true);
  }

    toggleHeader() {
      this.showHeader.next(!this.showHeader.getValue());
    }

  toggleFooter() {
    this.showFooter.next(!this.showFooter.getValue());
  }

}
