import { Component, NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-login',
  imports: [
    FormsModule,
    CommonModule],
  standalone: true,   
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  username = '';
  password = '';
  error    = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  async onSubmit() {
    this.error = '';
    try {
      await firstValueFrom(this.authService.login({
        username: this.username,
        password: this.password
      })
    );
      this.router.navigate(['/']);
    } catch (err) {
      this.error = 'Identifiants invalides';
    }
  }
}
