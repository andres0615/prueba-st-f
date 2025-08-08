import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { CategoryService } from '../../services/category.service';
import { NotificationMessageService } from '../../services/notification-message.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule
  ],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.css'
})
export class CategoryListComponent {
  categories: any[] = [];

  constructor(
    private router: Router,
    private categoryService: CategoryService,
    private notificationService: NotificationMessageService,
  ) {}

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories(){
    this.categoryService.getCategories().subscribe({
      next: (response) => {
        let { data, message, success } = response;
        this.categories = data.categories;
      },
      error: (error) => {
        this.notificationService.showError(error.message);
      }
    });
  }

  deleteCategory(id: string|null) {
    // preguntar si desea eliminar el usuario
    let confirmDeleteUser = confirm('¿Está seguro de eliminar el usuario?');
    if(confirmDeleteUser){
      this.categoryService.deleteCategory(id).subscribe({
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

  isActiveCategory(state: any): boolean {
    console.log(state);
    let isActive = false;
    if(state == 1){
      isActive = true;
    }

    return isActive;
  }

  getStateLabel(state: any): string {
    let stateLabel = 'Inactivo';
    let isActive = this.isActiveCategory(state);
    if(isActive){
      stateLabel = 'Activo';
    }
    return stateLabel;
  }

}
