import { Component, OnInit, OnDestroy } from '@angular/core';
import { Category } from '../../models/category';
import { CategoriesService } from '../../services/categories.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'ngshop-categories-banner',
  templateUrl: './categories-banner.component.html',
  styles: [
  ]
})
export class CategoriesBannerComponent implements OnInit, OnDestroy {
  categories: Category[] = []
  endSubs$: Subject<void> = new Subject()
  constructor(private categoriesService: CategoriesService) {

  }
  ngOnDestroy(): void {
    this.endSubs$.next()
    this.endSubs$.complete
  }
  ngOnInit(): void {
    this.categoriesService.getCategories().pipe(takeUntil(this.endSubs$)).subscribe(data => {
      this.categories = data;
    })
  }
}
