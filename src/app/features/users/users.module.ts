import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ChatModule } from '../chat/chat.module';
import { ContactsComponent } from './components/contacts/contacts.component';
import { PostsComponent } from './components/posts/posts.component';
import { MatIconModule } from '@angular/material/icon';

const routes: Routes = [
  {
  path: "dashboard",
  component: DashboardComponent
  },
  {
  path: "profile/:id",
  component: ProfileComponent
  }
];

@NgModule({
  declarations: [
    DashboardComponent,
    ProfileComponent,
    ContactsComponent,
    PostsComponent
  ],
  imports: [
    CommonModule,
    ChatModule,
    MatIconModule,
    RouterModule.forChild(routes)
  ]
})
export class UsersModule { }
