import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service'; // Adjust the path as needed

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private loginService: LoginService, private router: Router) { }

  login(): void {
    this.loginService.login(this.email, this.password).subscribe(
      () => {
        this.router.navigate(['/home']); // Redirect to simulations after login
      },
      error => {
        console.error('Login failed', error);
      }
    );
  }

  loginWithGoogle(): void {
    this.loginService.loginWithGoogle().subscribe(
      () => {
        this.router.navigate(['/home']); // Redirect to simulations after login
      },
      error => {
        console.error('Google login failed', error);
      }
    );
  }
}
