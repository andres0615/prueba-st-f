import { Routes } from '@angular/router';
// import { UserComponent } from './user/user.component';
import { LoginComponent } from './login/login.component';
import { UserLayoutComponent } from './user/user-layout/user-layout.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { UserCreateComponent } from './user/user-create/user-create.component';

export const routes: Routes = [
    // { path: 'users', component: UserComponent },
    { path: 'login', component: LoginComponent },
    { 
        path: 'user', 
        component: UserLayoutComponent,
        children: [
            { path: '', component: UserListComponent },
            { path: 'create', component: UserCreateComponent },
        ]
    },
];
