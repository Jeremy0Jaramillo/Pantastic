import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import User from '../../interfaces/user.interface';
import {user} from "@angular/fire/auth";

@Component({
  selector: 'app-header',
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class HeaderComponent implements OnInit {
  loggedIn: boolean = false;
  currentUser: User | null = null;
  emailFirstPart: string = '';

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
    this.loginService.isLoggedIn().subscribe((isLoggedIn) => {
      this.loggedIn = isLoggedIn;
    });
    this.loginService.getCurrentUser().subscribe((user) => {
      this.currentUser = user;
      if (user && user.email) {
        this.emailFirstPart = this.getEmailFirstPart(user.email);
      }
    });
  }

  logout(): void {
    this.loginService.logout().subscribe(() => {
      this.router.navigate(['/home']);
    });
  }

  private getEmailFirstPart(email: string): string {
    return email.split('@')[0];
  }

  protected readonly user = user;
}
