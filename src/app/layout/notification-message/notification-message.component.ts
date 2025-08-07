import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationMessageService } from '../../services/notification-message.service';

@Component({
  selector: 'app-notification-message',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notification-message.component.html',
  styleUrl: './notification-message.component.css'
})
export class NotificationMessageComponent {
  notificationService = inject(NotificationMessageService);

  getClassByType(type: string): string {
    let notificationClass = 'bg-blue-500'; // Default class

    if (type === 'error') {
      notificationClass = 'bg-red-500'; // You can modify this to change the background color
    }

    if (type === 'success') {
      notificationClass = 'bg-green-500'; // You can modify this to change the background color
    }

    return notificationClass; // You can modify this to change the background color
  }

  hideNotification(): void {
    this.notificationService.hideNotification();
  }
}
