import { Observable } from 'rxjs';

import { DashboardService } from '../../../services/users/dashboard/dashboard.service';
import { Component, inject } from '@angular/core';
import { UserData } from '../../../../models/UserData.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  user$: Observable<UserData | null>;

  dashboardService = inject(DashboardService)
  
  constructor(){
    this.user$ = this.dashboardService.user$;
  }
  
}
