import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsSearchComponent } from './components/products-search/products-search.component';
import { CategoriesBannerComponent } from './components/categories-banner/categories-banner.component';
import { Route, RouterModule } from '@angular/router';
import { ProductItemComponent } from './components/product-item/product-item.component';
import { FeaturedProductsComponent } from './components/featured-products/featured-products.component';
import { ButtonModule } from 'primeng/button';
import { ProductsListComponent } from './pages/products-list/products-list.component';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import { ProductPageComponent } from './pages/product-page/product-page.component';
import { RatingModule } from 'primeng/rating';
import { InputNumberModule } from 'primeng/inputnumber';
import { UiModule } from '@store/ui';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';


export const productsRoutes: Route[] = [
  {
    path: 'products', component: ProductsListComponent

  },
  {
    path: 'category/:categoryid', component: ProductsListComponent
  },
  {
    path: 'products/:productid', component: ProductPageComponent
  }
];

@NgModule({
  imports: [CommonModule, ToastModule, UiModule, RatingModule, InputNumberModule, FormsModule, CheckboxModule, RouterModule, ButtonModule, RouterModule.forChild(productsRoutes)],
  declarations: [
    ProductsSearchComponent,
    CategoriesBannerComponent,
    ProductItemComponent,
    FeaturedProductsComponent,
    ProductsListComponent,
    ProductPageComponent
  ],
  providers: [MessageService],

  exports: [ProductsSearchComponent, CategoriesBannerComponent, ProductItemComponent, FeaturedProductsComponent, ProductsListComponent, ProductPageComponent]
})
export class ProductsModule {

}
