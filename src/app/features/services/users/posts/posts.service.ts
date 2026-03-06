import { Injectable } from '@angular/core';
import { User } from '../../../../models/User.model';
import { Post } from '../../../../models/Posts.model';


@Injectable({
  providedIn: 'root'
})
export class PostsService {

  private readonly staticTexts: readonly string[] = [
    'Hoy fue un gran día 🚀',
    'Trabajando en nuevos retos.',
    'Mejorando mis habilidades.',
    'Construyendo algo interesante.',
    'Refactorizando código.',
    'Aprendiendo Angular cada día.'
  ];

  // ================================
  // Public API
  // ================================

  getOrCreatePostsForUser(user: User, min: number, max: number): Post[] {
    const key = this.getStorageKey(user.id);
    const stored = sessionStorage.getItem(key);

    if (stored) {
      return this.rehydrate(JSON.parse(stored) as Post[]);
    }

    const amount = this.randomBetween(min, max);
    const posts = this.generatePosts(user, amount);

    sessionStorage.setItem(key, JSON.stringify(posts));
    return posts;
  }

  generatePostsForFriends(friends: User[]): Post[] {
    const allPosts: Post[] = [];

    for (const friend of friends) {
      const posts = this.getOrCreatePostsForUser(friend, 5, 10);
      allPosts.push(...posts);
    }

    return allPosts.sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
  }

  // ================================
  // Generación
  // ================================

  generatePosts(user: User, amount: number): Post[] {
    const posts: Post[] = new Array(amount);

    for (let i = 0; i < amount; i++) {
      posts[i] = {
        id: this.generateId(),
        userId: user.id,
        content: this.generateDynamicText(user),
        createdAt: this.generateRandomDate(),
        likes: this.randomBetween(0, 299)
      };
    }

    return posts;
  }

  generateDynamicText(user: User): string {
    const base =
      this.staticTexts[
        Math.floor(Math.random() * this.staticTexts.length)
      ];

    return `${base} — ${user.firstName} ${user.lastName}`;
  }

  // ================================
  // Helpers
  // ================================

  getStorageKey(userId: number): string {
    return `posts_user_${userId}`;
  }

  randomBetween(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  rehydrate(posts: Post[]): Post[] {
    return posts.map(post => ({
      ...post,
      createdAt: new Date(post.createdAt)
    }));
  }

  generateRandomDate(): Date {
    const now = Date.now();
    const days30 = 30 * 24 * 60 * 60 * 1000;

    const randomTime = now - Math.floor(Math.random() * days30);
    return new Date(randomTime);
  }

  private generateId(): number {
    return Math.floor(Math.random() * 1_000_000);
  }
}
