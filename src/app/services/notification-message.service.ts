import { Injectable, signal } from '@angular/core';

export interface Notification {
  message: string;
  type: 'error' | 'success' | 'info';
  visible: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationMessageService {

  constructor() { }

  private _notification = signal<Notification>({
    message: '',
    type: 'info',
    visible: false
  });

  notification = this._notification.asReadonly();

  showNotification(message: string, type: 'error' | 'success' | 'info' = 'info'): void {
    this._notification.set({
      message,
      type,
      visible: true
    });

    setTimeout(() => {
        this.hideNotification();
    }, 5000);
  }

  hideNotification(): void {
    this._notification.update(notification => ({
      ...notification,
      visible: false
    }));
  }

  showError(message: string): void {
    this.showNotification(message, 'error');
  }

  showSuccess(message: string): void {
    this.showNotification(message, 'success');
  }
}
