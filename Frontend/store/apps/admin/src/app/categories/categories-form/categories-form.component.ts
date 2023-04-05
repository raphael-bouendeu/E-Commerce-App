import { Location } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriesService } from '@store/products'
import { Category } from '@store/products';
import { MessageService } from 'primeng/api';
import { timer, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'admin-categories-form',
  templateUrl: './categories-form.component.html',
  styles: [
  ]
})
export class CategoriesFormComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  editMode = false;
  isSubmited = false;
  currentCategoryId!: string;
  enSub$: Subject<void> = new Subject();

  constructor(private messageService: MessageService,
    private location: Location,
    private route: Router,
    private router: ActivatedRoute,
    private formBuilder: FormBuilder, private categorieService: CategoriesService) {

  }
  ngOnDestroy(): void {
    this.enSub$.next()
    this.enSub$.unsubscribe()
  }
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      icon: ['', Validators.required],
      color: ['#fff', Validators.required],
    })
    this.checkEditMode();
  }


  onSubmit() {
    this.isSubmited = true;
    if (this.form.invalid) {

      return;
    }
    let category: Category = {
      name: this.categoryForm['name'].value,
      icon: this.categoryForm['icon'].value,
      color: this.categoryForm['color'].value
    }
    if (this.editMode) {
      const id = this.currentCategoryId;
      category = { ...category, id }
      this.updateCategory(category)
    }
    else {
      this.addCategory(category)
    }

  }

  get categoryForm() {
    return this.form.controls;
  }

  checkEditMode() {
    this.router.params.subscribe(params => {
      if (params['id']) {
        this.editMode = true;
        this.currentCategoryId = params['id'];
        this.categorieService.getCategoryById(params['id']).pipe(takeUntil(this.enSub$)).subscribe(category => {
          this.categoryForm['name'].setValue(category.name);
          this.categoryForm['icon'].setValue(category.icon);
          this.categoryForm['color'].setValue(category.color);
        })
      }
    })
  }

  private updateCategory(category: Category) {
    this.categorieService.updateCategory(category).pipe(takeUntil(this.enSub$)).subscribe(() => {
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Category updated'
      })
      timer(2000).toPromise().then(() => {
        this.location.back()
      })
    }, (() => {
      this.messageService.add({
        severity: 'error',
        summary: 'error',
        detail: 'Category not updated'
      })
    }),
    )
  }
  canceln() {
    this.route.navigateByUrl(`categories`);
  }
  private addCategory(category: Category) {
    this.categorieService.createCategory(category).pipe(takeUntil(this.enSub$)).subscribe((category) => {
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Category ' + category.name + ' created'
      })
      timer(2000).toPromise().then(() => {
        this.location.back()
      })
    }, (() => {
      this.messageService.add({
        severity: 'error',
        summary: 'error',
        detail: 'Category not created'
      })
    }),
    )
  }
}
