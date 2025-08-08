import { Routes } from '@angular/router';
// import { UserComponent } from './user/user.component';
import { LoginComponent } from './login/login.component';
import { UserLayoutComponent } from './user/user-layout/user-layout.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { UserCreateComponent } from './user/user-create/user-create.component';
import { UserEditComponent } from './user/user-edit/user-edit.component';
import { CategoryLayoutComponent } from './category/category-layout/category-layout.component';
import { CategoryListComponent } from './category/category-list/category-list.component';
import { CategoryCreateComponent } from './category/category-create/category-create.component';
import { CategoryEditComponent } from './category/category-edit/category-edit.component';

export const routes: Routes = [
    // { path: 'users', component: UserComponent },
    { path: '', redirectTo: 'user', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { 
        path: 'user', 
        component: UserLayoutComponent,
        children: [
            { path: '', component: UserListComponent },
            { path: 'create', component: UserCreateComponent },
            { path: 'edit/:id', component: UserEditComponent },
        ]
    },
    { 
        path: 'category', 
        component: CategoryLayoutComponent,
        children: [
            { path: '', component: CategoryListComponent },
            { path: 'create', component: CategoryCreateComponent },
            { path: 'edit/:id', component: CategoryEditComponent },
        ]
    },
];
