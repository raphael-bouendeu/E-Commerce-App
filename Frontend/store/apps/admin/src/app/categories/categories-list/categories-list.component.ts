import { Component, OnDestroy, OnInit } from '@angular/core';
import { CategoriesService, Category } from '@store/products';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'admin-categories-list',
  templateUrl: './categories-list.component.html',
  styles: [
  ]
})
export class CategoriesListComponent implements OnInit, OnDestroy {

  categories: Category[] = [];
  endSubs$: Subject<void> = new Subject()
  constructor(private confirmationService: ConfirmationService,
    private categoryService: CategoriesService, private router: Router,
    private messageService: MessageService,) {

  }

  ngOnInit(): void {
    this._getCategories()
  }

  deleteCategory(categoryId: string) {

    this.confirmationService.confirm({
      message: 'Do you want to delete this Category?',
      header: 'Delete Category',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.categoryService.deleteCategory(categoryId).pipe(takeUntil(this.endSubs$)).subscribe(() => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Category deleted'
          })
          this._getCategories()
        }, (() => {
          this.messageService.add({
            severity: 'error',
            summary: 'error',
            detail: 'Category not deleted'
          })
        }))
      },
    });

  }

  editCategory(categoryId: string) {
    this.router.navigateByUrl(`categories/form/${categoryId}`)
  }

  private _getCategories() {
    this.categoryService.getCategories().pipe(takeUntil(this.endSubs$)).subscribe(data => {
      this.categories = data
    })
  }

  ngOnDestroy(): void {
    this.endSubs$.next()
    this.endSubs$.complete()
  }
}
