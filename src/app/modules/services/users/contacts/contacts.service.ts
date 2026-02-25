import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../../../models/User.model';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  private readonly contactsSubject = new BehaviorSubject<User[]>([]);
  contacts$ = this.contactsSubject.asObservable();

  constructor() {
    this.loadFromSessionStorage();
  }

  
  private loadFromSessionStorage() {
    const stored = sessionStorage.getItem('contactsList');
    if (stored) {
      this.contactsSubject.next(JSON.parse(stored));
    }
  }


  private updateState(contacts: User[]) {
    this.contactsSubject.next(contacts);
    sessionStorage.setItem('contactsList', JSON.stringify(contacts));
  }


  setContacts(contacts: User[]) {
    this.updateState(contacts);
  }

  
  addContact(contact: User) {
    const current = this.contactsSubject.value;

    
    const exists = current.some(c => c.id === contact.id);
    if (exists) return;

    const updated = [...current, contact];
    this.updateState(updated);
  }


  removeContact(contactId: number) {
    const current = this.contactsSubject.value;
    const updated = current.filter(c => c.id !== contactId);
    this.updateState(updated);
  }


  getCurrentContacts(): User[] {
    return this.contactsSubject.value;
  }
}