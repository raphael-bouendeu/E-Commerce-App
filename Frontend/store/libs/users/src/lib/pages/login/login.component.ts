import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LocalstorageService } from '../../services/localstorage.service';


@Component({
  selector: 'users-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {

  form!: FormGroup;
  isSubmited = false;
  authError = false;
  authMessage = 'Email or Password are wrong'
  constructor(private formBuilder: FormBuilder,
    private localstorageService: LocalstorageService,
    private router: Router,
    private authService: AuthService) {

  }
  ngOnInit(): void {
    this.initForm()
  }

  onSubmit() {
    this.isSubmited = true;
    if (this.form.invalid) {
      return;
    }
    const user = {
      email: this.loginForm['email'].value,
      password: this.loginForm['password'].value,
    }
    this.authService.login(user.email, user.password).subscribe(data => {
      this.authError = false
      this.localstorageService.setToken(data.token)
      this.router.navigateByUrl('/')
    },
      (error: HttpErrorResponse) => {
        this.authError = true
        if (error.status !== 400) {
          this.authMessage = 'Error in the Server,please try again later'
        }
      })
  }

  get loginForm() {
    return this.form.controls;
  }
  private initForm() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }
}
