import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { NotificationMessageService } from '../../services/notification-message.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule
  ],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent {
  users: any[] = [];

  constructor(
    private router: Router,
    private userService: UserService,
    private notificationService: NotificationMessageService,
  ) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(){
    this.userService.getUsers().subscribe({
      next: (response) => {
        let { data, message, success } = response;
        this.users = data.users;
      },
      error: (error) => {
        this.notificationService.showError(error.message);
      }
    });
  }

  deleteUser(id: string|null) {
    // preguntar si desea eliminar el usuario
    let confirmDeleteUser = confirm('¿Está seguro de eliminar el usuario?');
    if(confirmDeleteUser){
      this.userService.deleteUser(id).subscribe({
        next: (response) => {
          let { data, message, success } = response;
          // this.users = data.users;
          if(success){
            this.notificationService.showSuccess(message);
            this.getUsers();
          }
        },
        error: (error) => {
          this.notificationService.showError(error.message);
        }
      });      
    }
  }

  isActiveUser(state: any): boolean {
    console.log(state);
    let isActive = false;
    if(state == 1){
      isActive = true;
    }

    return isActive;
  }

  getStateLabel(state: any): string {
    let stateLabel = 'Inactivo';
    let isActive = this.isActiveUser(state);
    if(isActive){
      stateLabel = 'Activo';
    }
    return stateLabel;
  }

  getRolClass(userRol: any): string {
    let rolClass = 'bg-orange-100 text-orange-800';
    if(userRol == 'administrador'){
      rolClass = 'bg-blue-100 text-blue-800';
    }

    return rolClass;
  }

}
