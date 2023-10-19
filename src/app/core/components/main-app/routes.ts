import { Routes } from "@angular/router";




export const ROUTES: Routes = [
    {
        path: 'register',
        loadComponent: ()=>import('../../../features/registration/components/registration/registration.component').then(m => m.RegistrationComponent),
    },
    {
        path: "",
        loadComponent: ()=>import('../starting-page/starting-page.component').then(m => m.StartingPageComponent),
    },
    {
        path: 'login',
        loadComponent: ()=>import('../../../features/login/components/login/login.component').then(m => m.LoginComponent),
    },
   
];