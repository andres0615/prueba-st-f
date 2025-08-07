import { Component } from '@angular/core';
import { NavbarComponent } from '../../navbar/navbar.component'
import { RouterOutlet, RouterLink } from '@angular/router';
import { NotificationMessageComponent } from '../../layout/notification-message/notification-message.component';

@Component({
  selector: 'app-user-layout',
  standalone: true,
  imports: [
    NavbarComponent,
    RouterOutlet,
    RouterLink,
    NotificationMessageComponent
  ],
  templateUrl: './user-layout.component.html',
  styleUrl: './user-layout.component.css'
})
export class UserLayoutComponent {

}
