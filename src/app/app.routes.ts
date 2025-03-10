import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { DasboardComponent } from './pages/dasboard/dasboard.component';
import { EmployeeComponent } from './pages/employee/employee.component';
import { ProjectComponent } from './pages/project/project.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
},
{
    path: 'login',
    component: LoginComponent
},
{
    path: "",
    component: LayoutComponent,
    children: [
        {   
            path: "dashboard",
            component: DasboardComponent
        },
        {
            path: "employee",
            component: EmployeeComponent
        },
        {
            path:"project",
            component:ProjectComponent
        }
    ]
}
];
