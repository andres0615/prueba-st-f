import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
// import { NotificationMessageComponent } from '../../layout/notification-message/notification-message.component';
import { NotificationMessageService } from '../../services/notification-message.service';

@Component({
  selector: 'app-user-create',
  standalone: true,
  imports: [
    ReactiveFormsModule, 
    CommonModule, 
    // NotificationMessageComponent
  ],
  templateUrl: './user-create.component.html',
  styleUrl: './user-create.component.css'
})
export class UserCreateComponent {
  userForm: FormGroup;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private notificationService: NotificationMessageService
  ) {
    this.userForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
      rol: ['', [Validators.required]],
      state: [true]
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      this.isLoading = true;
      
      const userData = {
        username: this.userForm.value.username,
        password: this.userForm.value.password,
        rol: this.userForm.value.rol,
        state: this.userForm.value.state ? 1 : 0
      };

      this.userService.createUser(userData).subscribe({
        next: (response) => {
          console.log('Usuario creado exitosamente:', response);
          this.isLoading = false;
          // Aquí puedes agregar lógica adicional como redirigir o mostrar mensaje
          // window.location.href = 'users-list.html';
          console.log(response);
          this.notificationService.showSuccess(response.message);
        },
        error: (error) => {
          console.error('Error al crear usuario:', error);
          this.isLoading = false;
          // Aquí puedes manejar errores
        }
      });
    } else {
      console.log('Formulario inválido');
    }
  }

  goBack() {
    window.location.href = 'users-list.html';
  }
}
