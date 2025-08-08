import { Component } from '@angular/core';
import { NavbarComponent } from '../../navbar/navbar.component'
import { RouterOutlet, RouterLink } from '@angular/router';
import { NotificationMessageComponent } from '../../layout/notification-message/notification-message.component';

@Component({
  selector: 'app-category-layout',
  standalone: true,
  imports: [
    NavbarComponent,
    RouterOutlet,
    RouterLink,
    NotificationMessageComponent
  ],
  templateUrl: './category-layout.component.html',
  styleUrl: './category-layout.component.css'
})
export class CategoryLayoutComponent {

}
