import { ProfileService } from './../../../services/users/profile/profile.service';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, Observable } from 'rxjs';
import { User } from '../../../models/User.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit, OnDestroy {

  readonly profileServ = inject(ProfileService);
  readonly route = inject(ActivatedRoute);

  user$: Observable<User | null> = this.profileServ.user$;

  private readonly destroy$ = new Subject<void>();

  ngOnInit(): void {
    this.loadUserFromRoute();
  }

  private loadUserFromRoute(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (!idParam) return;

    const id = Number(idParam);
    if (Number.isNaN(id)) return;

    this.profileServ.fetchUserData(id);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
