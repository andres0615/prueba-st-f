import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { NotificationMessageService } from '../../services/notification-message.service';
import { RouterOutlet, RouterLink, Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-edit',
  standalone: true,
  imports: [
    ReactiveFormsModule, 
    CommonModule, 
    RouterLink
  ],
  templateUrl: './user-edit.component.html',
  styleUrl: './user-edit.component.css'
})
export class UserEditComponent {
  userForm: FormGroup;
  isLoading = false;
  id: string | null = null; // Define la propiedad id

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private notificationService: NotificationMessageService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.userForm = this.fb.group({
      username: ['', [Validators.required]],
      password: [''],
      confirmPassword: [''],
      rol: ['', [Validators.required]],
      state: [true]
    }, { validators: passwordMatchValidator() });
  }

  ngOnInit(): void {
    // Obtener el ID de la ruta
    this.id = this.route.snapshot.paramMap.get('id');
    console.log('ngoninit');

    this.showUser();
    
    // Si existe ID, cargar datos del usuario
    // if (this.id) {
    //   this.loadUserData(this.id);
    // }
  }

  showUser() {
    this.userService.showUser(this.id).subscribe({
      next: (response) => {
        let { data, message, success } = response;
        console.log(response);

        let userData = data.user;

        this.userForm.patchValue({
          username: userData.username,
          rol: userData.rol,
          state: userData.state === 1 // Convertir a boolean
          // Nota: No cargamos las contraseñas por seguridad
        });
      },
      error: (error) => {
        this.notificationService.showError(error.message);
      },
    });
  }

  onSubmit() {
    this.userForm.markAllAsTouched();

    if (this.userForm.valid) {
      this.isLoading = true;
      
      const userData = {
        username: this.userForm.value.username,
        password: this.userForm.value.password,
        rol: this.userForm.value.rol,
        state: this.userForm.value.state ? 1 : 0
      };

      this.userService.updateUser(this.id, userData).subscribe({
        next: (response) => {
          console.log('Usuario actualizado exitosamente:', response);
          this.isLoading = false;
          // Aquí puedes agregar lógica adicional como redirigir o mostrar mensaje
          // window.location.href = 'users-list.html';
          console.log(response);
          this.notificationService.showSuccess(response.message);
          //redireccion a la lista de usuarios
          this.router.navigate(['/user']);
        },
        error: (error) => {
          console.error('Error al actualizar el usuario:', error);
          this.isLoading = false;
          // Aquí puedes manejar errores
          this.notificationService.showError(error.message);
        }
      });
    } else {
      console.log('Formulario inválidos');
      this.displayValidationErrors();
    }
  }

  displayValidationErrors() {
    let errorMessages = '';

    Object.keys(this.userForm.controls).forEach(key => {
      const control = this.userForm.get(key);
      if (control && control.invalid) {
        const errors = control.errors;
        let errorMessage = `Error en ${key}: `;
        
        if (errors?.['required']) {
          errorMessage += 'Campo requerido';
        } else if (errors?.['minlength']) {
          errorMessage += `Mínimo ${errors['minlength'].requiredLength} caracteres`;
        }
        
        console.log(errorMessage);
        errorMessages += errorMessage + ' \n';
        // Opcional: mostrar con el servicio de notificaciones
        // this.notificationService.showError(errorMessage);
      }
    });

    console.log('this.userForm', this.userForm);
    
    // Verificar error de contraseñas no coinciden
                        if (this.userForm.errors?.['passwordMismatch']) {
      console.log('Las contraseñas no coinciden');
      errorMessages += 'Las contraseñas no coinciden' + ' \n';
      // this.notificationService.showError('Las contraseñas no coinciden');
    }

    // hacer un trim de errorMessages
    errorMessages = errorMessages.trim();

    // validar si errorMessage no esta vacio
    if (errorMessages) {
      this.notificationService.showError(errorMessages);
    }
  } 
}

export function passwordMatchValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    console.log( 'passwordMatchValidator' );
    
    if (password && confirmPassword && password.value !== confirmPassword.value) {
      return { passwordMismatch: true };
    }
    return null;
  };
}