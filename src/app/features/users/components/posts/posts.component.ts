import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';



import { ProfileService } from '../../../services/users/profile/profile.service';
import { PostsService } from '../../../services/users/posts/posts.service';
import { ContactsService } from '../../../services/users/contacts/contacts.service';
import { Post } from '../../../../models/Posts.model';
import { User } from '../../../../models/User.model';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss'
})
export class PostsComponent implements OnInit, OnDestroy {

  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly profileServ = inject(ProfileService);
  private readonly postsServ = inject(PostsService);
  private readonly contactsServ = inject(ContactsService);

  private readonly destroy$ = new Subject<void>();

  posts: Post[] = [];
  userMap = new Map<number, User>();

  private readonly currentUserId = 1;

  // ================================
  // Lifecycle
  // ================================

  ngOnInit(): void {
    this.handleDashboard();
    this.handleProfile();
  }

  // ================================
  // Dashboard
  // ================================

  handleDashboard(): void {
    const isDashboard = this.router.url.includes('/dashboard');
    if (!isDashboard) return;

    this.contactsServ.contacts$
      .pipe(takeUntil(this.destroy$))
      .subscribe(contacts => {
        if (!contacts?.length) return;

        // llenar mapa
        for (const user of contacts) {
          this.userMap.set(user.id, user);
        }

        this.posts = this.postsServ.generatePostsForFriends(contacts);
      });
  }

  // ================================
  // Profile
  // ================================

  handleProfile(): void {
    this.profileServ.user$
      .pipe(takeUntil(this.destroy$))
      .subscribe(user => {
        if (!user) return;

        this.userMap.set(user.id, user);

        const isOwner = user.id === this.currentUserId;

        this.posts = this.postsServ.getOrCreatePostsForUser(
          user,
          isOwner ? 10 : 5,
          10
        );
      });
  }

  // ================================
  // Template helpers
  // ================================

  trackByPostId(index: number, post: Post): number {
    return post.id;
  }

  getUser(post: Post): User | undefined {
    return this.userMap.get(post.userId);
  }

  // ================================
  // Cleanup
  // ================================

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}