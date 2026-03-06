import { Component, inject, OnInit } from '@angular/core';
import { DummyjsonService } from '../../../services/users/api/dummyjson.service';
import { ContactsService } from '../../../services/users/contacts/contacts.service';
import { User, UserResponse } from '../../../../models/User.model';
import { ChatService } from '../../../services/chat/chat.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.scss'
})
export class ContactsComponent implements OnInit{
  private readonly mockUsersApi = inject(DummyjsonService);
  private readonly contactsService = inject(ContactsService);
  private readonly chatService = inject(ChatService);

  totalUsers: number = 200;
  limit: number = 15;
  skip: number = Math.floor(Math.random() * (this.totalUsers - this.limit));

  contacts$ = this.contactsService.contacts$;

  ngOnInit() {
    if (this.contactsService.getCurrentContacts().length === 0) {
      this.fetchContacts();
    }
  }

  fetchContacts() {
    this.mockUsersApi.getAllUsers(this.limit, this.skip).subscribe({
      next: (res: UserResponse) => {
        const shuffledArray = this.shuffleArray(res.users);

        const randomContacts = shuffledArray.slice(
          0,
          Math.floor(Math.random() * (shuffledArray.length - 5) + 1) + 5
        );

        this.contactsService.setContacts(randomContacts);
      },
      error: (error: Error) => {
        console.error('Error fetching contacts:', error);
      }
    });
  }

  addContact(user: User) {
    this.contactsService.addContact(user);
  }

  openChat(user: User) {
    this.chatService.openChat(user);
  }

  shuffleArray<T>(array: T[]): T[] {
    const shuffled = [...array];

    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    return shuffled;
  }
}