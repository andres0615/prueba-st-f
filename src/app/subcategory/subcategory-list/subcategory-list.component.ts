import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { SubcategoryService } from '../../services/subcategory.service';
import { NotificationMessageService } from '../../services/notification-message.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-subcategory-list',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule
  ],
  templateUrl: './subcategory-list.component.html',
  styleUrl: './subcategory-list.component.css'
})
export class SubcategoryListComponent {
  subcategories: any[] = [];

  constructor(
    private router: Router,
    private subcategoryService: SubcategoryService,
    private notificationService: NotificationMessageService,
  ) {}

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories(){
    this.subcategoryService.getCategories().subscribe({
      next: (response) => {
        let { data, message, success } = response;
        this.subcategories = data.subcategories;
      },
      error: (error) => {
        this.notificationService.showError(error.message);
      }
    });
  }

  deleteSubcategory(id: string|null) {
    // preguntar si desea eliminar el usuario
    let confirmDeleteUser = confirm('¿Está seguro de eliminar el usuario?');
    if(confirmDeleteUser){
      this.subcategoryService.deleteSubcategory(id).subscribe({
        next: (response) => {
          let { data, message, success } = response;
          if(success){
            this.notificationService.showSuccess(message);
            this.getCategories();
          }
        },
        error: (error) => {
          this.notificationService.showError(error.message);
        }
      });      
    }
  }

  isActiveSubcategory(state: any): boolean {
    console.log(state);
    let isActive = false;
    if(state == 1){
      isActive = true;
    }

    return isActive;
  }

  getStateLabel(state: any): string {
    let stateLabel = 'Inactivo';
    let isActive = this.isActiveSubcategory(state);
    if(isActive){
      stateLabel = 'Activo';
    }
    return stateLabel;
  }

}
