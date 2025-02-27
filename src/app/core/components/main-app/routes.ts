import { Routes } from "@angular/router";
import { loggedIn, loggedOut } from "src/app/shared/guards/auth.guard";




export const ROUTES: Routes = [
    {
        path: 'register',
        canActivate: [loggedOut],
        loadComponent: ()=>import('../../../features/registration/components/registration/registration.component').then(m => m.RegistrationComponent),
    },
    {
        path: "", 
        loadComponent: ()=>import('../starting-page/starting-page.component').then(m => m.StartingPageComponent),
    },
    {
        path: 'login',
        canActivate: [loggedOut],
        loadComponent: ()=>import('../../../features/login/components/login/login.component').then(m => m.LoginComponent),
    },
    {
        path: 'homepage',
        canActivate: [loggedIn],
        loadComponent: ()=> import('../../../features/home-page/components/home-page/home-page.component').then(m => m.HomePageComponent),
    },
    {
        path: 'myprofile',
        canActivate: [loggedIn],
        loadComponent: ()=> import('../../../features/my-profile/components/my-profile/my-profile.component').then(m => m.MyProfileComponent),
    },
    {
        path: 'adminpanel',
        canActivate: [loggedIn],
        loadComponent: ()=> import('../../../features/admin-panel/components/admin-panel/admin-panel.component').then(m => m.AdminPanelComponent),
    },
    {
        path: '**', 
        loadComponent: ()=>import('../starting-page/starting-page.component').then(m => m.StartingPageComponent),
    }
];