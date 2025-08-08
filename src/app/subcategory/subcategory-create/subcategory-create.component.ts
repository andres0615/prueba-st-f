import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { SubcategoryService } from '../../services/subcategory.service';
import { CommonModule } from '@angular/common';
import { NotificationMessageService } from '../../services/notification-message.service';
import { RouterOutlet, RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-subcategory-create',
  standalone: true,
  imports: [
    ReactiveFormsModule, 
    CommonModule, 
    RouterLink
  ],
  templateUrl: './subcategory-create.component.html',
  styleUrl: './subcategory-create.component.css'
})
export class SubcategoryCreateComponent {
  subcategoryForm: FormGroup;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private subcategoryService: SubcategoryService,
    private notificationService: NotificationMessageService,
    private router: Router
  ) {
    this.subcategoryForm = this.fb.group({
      name: ['', [Validators.required]],
      state: [true],
      categoryId: [1],
    });
  }

  onSubmit() {
    this.subcategoryForm.markAllAsTouched();

    if (this.subcategoryForm.valid) {
      this.isLoading = true;
      
      const subcategoryData = {
        name: this.subcategoryForm.value.name,
        state: this.subcategoryForm.value.state ? 1 : 0,
        category_id: 1
      };

      this.subcategoryService.createSubcategory(subcategoryData).subscribe({
        next: (response) => {
          console.log('Usuario creado exitosamente:', response);
          this.isLoading = false;
          // Aquí puedes agregar lógica adicional como redirigir o mostrar mensaje
          // window.location.href = 'users-list.html';
          console.log(response);
          this.notificationService.showSuccess(response.message);
          //redireccion a la lista de usuarios
          this.router.navigate(['/subcategory']);
        },
        error: (error) => {
          console.error('Error al crear subcategoria:', error);
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

    Object.keys(this.subcategoryForm.controls).forEach(key => {
      const control = this.subcategoryForm.get(key);
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

    console.log('this.subcategoryForm', this.subcategoryForm);

    // hacer un trim de errorMessages
    errorMessages = errorMessages.trim();

    // validar si errorMessage no esta vacio
    if (errorMessages) {
      this.notificationService.showError(errorMessages);
    }
  }
}
