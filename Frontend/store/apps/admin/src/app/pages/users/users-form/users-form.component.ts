import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { User, UsersService } from '@store/users';
import { timer } from 'rxjs';
import { Location } from '@angular/common';
import *  as countriesList from 'i18n-iso-countries';

declare const require: (arg0: string) => countriesList.LocaleData;

@Component({
  selector: 'admin-users-form',
  templateUrl: './users-form.component.html',
  styles: [
  ]
})
export class UsersFormComponent implements OnInit {

  form!: FormGroup;
  editMode = false;
  isSubmited = false;
  currentUserId!: string;
  countries: any[] = []
  constructor(
    private messageService: MessageService,
    private location: Location,
    private route: Router,
    private router: ActivatedRoute,
    private formBuilder: FormBuilder, private usersService: UsersService) { }

  ngOnInit(): void {
    this.initUserForm()
    this.getCountries()
    this.checkEditMode()
  }

  private getCountries() {
    countriesList.registerLocale(require("i18n-iso-countries/langs/en.json"));
    this.countries = Object.entries(countriesList.getNames("en", { select: "official" })).map(entry => {
      return {
        id: entry[0],
        name: entry[1]
      }
    })
  }

  initUserForm() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      phone: ['', Validators.required],
      country: [''],
      isAdmin: [true],
      zip: [''],
      city: [''],
      street: [''],
      appartment: [''],

    })
  }

  checkEditMode() {
    this.router.params.subscribe(params => {
      if (params['id']) {
        this.editMode = true;
        this.currentUserId = params['id'];
        this.usersService.getUserById(params['id']).subscribe(user => {
          this.userForm['name'].setValue(user.name);
          this.userForm['email'].setValue(user.email);
          this.userForm['isAdmin'].setValue(user.isAdmin);
          this.userForm['street'].setValue(user.street);
          this.userForm['appartment'].setValue(user.appartment);
          this.userForm['zip'].setValue(user.zip);
          this.userForm['city'].setValue(user.city);
          this.userForm['phone'].setValue(user.phone);
          this.userForm['country'].setValue(user.country);

          this.userForm['password'].setValidators([]);
          this.userForm['password'].updateValueAndValidity()
        })
      }
    })
  }
  get userForm() {
    return this.form.controls;
  }
  onSubmit() {
    this.isSubmited = true;
    if (this.form.invalid) {

      return;
    }
    let user: User = {
      name: this.userForm['name'].value,
      email: this.userForm['email'].value,
      street: this.userForm['street'].value,
      phone: this.userForm['phone'].value,
      zip: this.userForm['zip'].value,
      city: this.userForm['city'].value,
      appartment: this.userForm['appartment'].value,
      isAdmin: this.userForm['isAdmin'].value,
      password: this.userForm['password'].value,
      country: this.userForm['country'].value,

    }
    if (this.editMode) {
      const id = this.currentUserId;
      user = { ...user, id }
      this.updateUser(user)
    }
    else {
      this.addUser(user)
    }

  }

  private updateUser(user: User) {
    this.usersService.updateUser(user).subscribe(() => {
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'User updated'
      })
      timer(2000).toPromise().then(() => {
        this.location.back()
      })
    }, (() => {
      this.messageService.add({
        severity: 'error',
        summary: 'error',
        detail: 'User not updated'
      })
    }),
    )
  }

  private addUser(user: User) {
    this.usersService.createUser(user).subscribe((user) => {
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'User ' + user.name + ' created'
      })
      timer(2000).toPromise().then(() => {
        this.location.back()
      })
    }, (() => {
      this.messageService.add({
        severity: 'error',
        summary: 'error',
        detail: 'User not created'
      })
    }),
    )
  }
  canceln() {
    this.route.navigateByUrl(`users`);
  }
}
