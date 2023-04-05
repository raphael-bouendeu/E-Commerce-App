import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User, UsersService } from '@store/users';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'admin-users-list',
  templateUrl: './users-list.component.html',
  styles: [
  ]
})
export class UsersListComponent implements OnInit {
  users: User[] = []

  constructor(
    private usersService: UsersService,
    private confirmationService: ConfirmationService,
    private router: Router,
    private messageService: MessageService
  ) {

  }
  ngOnInit(): void {
    this._getUsers()
  }

  deleteUser(userId: string) {
    this.confirmationService.confirm({
      message: 'Do you want to delete this User?',
      header: 'Delete User',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.usersService.deleteUser(userId).subscribe(() => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'User deleted'
          })
          this._getUsers()
        }, (() => {
          this.messageService.add({
            severity: 'error',
            summary: 'error',
            detail: 'User not deleted'
          })
        }))
      },
    });

  }

  editUser(userId: string) {
    this.router.navigateByUrl(`users/form/${userId}`)
  }

  private _getUsers() {
    this.usersService.getUsers().subscribe(data => {
      this.users = data
    })
  }
}
