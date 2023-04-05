import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product, ProductssService } from '@store/products';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'admin-products-list',
  templateUrl: './products-list.component.html',
  styles: [
  ]
})
export class ProductsListComponent implements OnInit {

  products: Product[] = []

  constructor(private productsService: ProductssService,
    private confirmationService: ConfirmationService,
    private router: Router,
    private messageService: MessageService) { }

  editProduct(productId: string) {
    this.router.navigateByUrl(`products/form/${productId}`)
  }
  deleteProduct(productId: string) {

    this.confirmationService.confirm({
      message: 'Do you want to delete this product?',
      header: 'Delete Product',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.productsService.deleteProduct(productId).subscribe(() => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Product deleted'
          })
          this._getProducts()
        }, (() => {
          this.messageService.add({
            severity: 'error',
            summary: 'error',
            detail: 'Product not deleted'
          })
        }))
      },
    });
  }


  ngOnInit(): void {
    this._getProducts()
  }

  private _getProducts() {
    this.productsService.getProducts().subscribe(data => {
      this.products = data
    })
  }
}

