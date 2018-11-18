import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  public isLoading = false;

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.createLoginForm();
    this.authService.user$.subscribe(
      data => {
        if (data) {
          this.isLoading = true;
          this.router.navigate(['/dashboard/task']);
        } else {
          this.isLoading = false;
        }
      });
  }

  createLoginForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  loginSubmit() {
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;
    this.isLoading = true;
    this.authService.loginByEmail(email, password)
      .then(data => {
        this.router.navigate(['/dashboard/task']);
      })
      // Capturo errores de LogIn como Usuario no encontrado o Datos Incorrectos
      .catch(err => {
        this.isLoading = false;
        alert(err.message);
      });
  }

}
