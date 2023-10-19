import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { customPassValidator } from 'src/app/shared/validators/validators';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthorizationService } from 'src/app/shared/services/authorization-services/authorization.service';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  
  constructor(public formBuilder: FormBuilder, private userControl: AuthorizationService, private router: Router){};

  public loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8), customPassValidator]],
  });


  login(): void{
    const password = this.loginForm.get('password')?.value;
    const email = this.loginForm.get('email')?.value;
    let res = false;
    
    if(email && password) res = this.userControl.validLoginData(email, password);
    if(res){
      console.log(this.userControl.currUserId); 
      this.router.navigate(['']);
    }
    this.loginForm.reset(); 
  } 

}
