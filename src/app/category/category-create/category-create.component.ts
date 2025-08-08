import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { CategoryService } from '../../services/category.service';
import { CommonModule } from '@angular/common';
import { NotificationMessageService } from '../../services/notification-message.service';
import { RouterOutlet, RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-category-create',
  standalone: true,
  imports: [
    ReactiveFormsModule, 
    CommonModule, 
    RouterLink
  ],
  templateUrl: './category-create.component.html',
  styleUrl: './category-create.component.css'
})
export class CategoryCreateComponent {
  categoryForm: FormGroup;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private notificationService: NotificationMessageService,
    private router: Router
  ) {
    this.categoryForm = this.fb.group({
      name: ['', [Validators.required]],
      state: [true]
    });
  }

  onSubmit() {
    this.categoryForm.markAllAsTouched();

    if (this.categoryForm.valid) {
      this.isLoading = true;
      
      const categoryData = {
        name: this.categoryForm.value.name,
        state: this.categoryForm.value.state ? 1 : 0
      };

      this.categoryService.createCategory(categoryData).subscribe({
        next: (response) => {
          console.log('Usuario creado exitosamente:', response);
          this.isLoading = false;
          // Aquí puedes agregar lógica adicional como redirigir o mostrar mensaje
          // window.location.href = 'users-list.html';
          console.log(response);
          this.notificationService.showSuccess(response.message);
          //redireccion a la lista de usuarios
          this.router.navigate(['/category']);
        },
        error: (error) => {
          console.error('Error al crear usuario:', error);
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

    Object.keys(this.categoryForm.controls).forEach(key => {
      const control = this.categoryForm.get(key);
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

    console.log('this.categoryForm', this.categoryForm);

    // hacer un trim de errorMessages
    errorMessages = errorMessages.trim();

    // validar si errorMessage no esta vacio
    if (errorMessages) {
      this.notificationService.showError(errorMessages);
    }
  }
}
