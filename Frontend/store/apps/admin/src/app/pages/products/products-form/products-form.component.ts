import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ProductssService, Category, CategoriesService } from '@store/products';
import { Product } from '@store/products';
import { timer } from 'rxjs';

@Component({
  selector: 'admin-products-form',
  templateUrl: './products-form.component.html',
  styles: [
  ]
})
export class ProductsFormComponent implements OnInit {

  form!: FormGroup;
  categories: Category[] = []
  editMode = false;
  isSubmited = false;
  currentProductId!: string;
  imageDisplay!: string | ArrayBuffer
  constructor(private messageService: MessageService,
    private categoryService: CategoriesService,
    private location: Location,
    private route: Router,
    private router: ActivatedRoute,
    private formBuilder: FormBuilder, private productsService: ProductssService) { }


  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      brand: ['', Validators.required],
      price: ['', Validators.required],
      category: ['', Validators.required],
      countInStock: ['', Validators.required],
      description: ['', Validators.required],
      image: ['', Validators.required],
      richDescription: [''],
      isFeatured: [false],
    });
    this.checkEditMode();
    this._getCategories()
  }

  checkEditMode() {
    this.router.params.subscribe(params => {
      if (params['id']) {
        this.editMode = true;
        this.currentProductId = params['id'];
        this.productsService.getProductById(params['id']).subscribe(product => {
          this.productForm['name'].setValue(product.name);
          this.productForm['image'].setValue(product.image);
          this.productForm['category'].setValue(product.category?.id);
          this.productForm['price'].setValue(product.price);
          this.productForm['brand'].setValue(product.brand);
          this.productForm['countInStock'].setValue(product.countInStock);
          this.productForm['description'].setValue(product.description);
          this.productForm['richDescription'].setValue(product.richDescription);
          this.productForm['isFeatured'].setValue(product.isFeatured);
          this.imageDisplay != product.image;
          if (product.image) {
            this.imageDisplay = product.image;
          }
          this.productForm['image'].setValidators([])
          this.productForm['image'].updateValueAndValidity()
        })
      }
    })
  }
  canceln() {
    this.route.navigateByUrl(`products`);
  }

  get productForm() {
    return this.form.controls;
  }

  onSubmit() {
    this.isSubmited = true;
    if (this.form.invalid) {

      return;
    }
    const productFormData = new FormData();

    Object.keys(this.productForm).map((key) => {
      productFormData.append(key, this.productForm[key].value);
    })
    if (this.editMode) {
      const id = this.currentProductId;
      this.updateProduct(productFormData, id)
    }
    else {
      this.addProduct(productFormData)
    }
  }

  private _getCategories() {
    this.categoryService.getCategories().subscribe(data => {
      this.categories = data
    })
  }

  onImageUpload(event: any) {
    const file = event.target.files[0]
    if (file) {
      this.form.patchValue({ image: file });
      this.form.get('image')?.updateValueAndValidity()
      const fileReader = new FileReader();
      fileReader.onload = () => {
        if (fileReader.result) {
          this.imageDisplay = fileReader.result
        }

        console.log(fileReader.result)
      }
      fileReader.readAsDataURL(file)
    }
  }

  private addProduct(productData: FormData) {
    this.productsService.createProduct(productData).subscribe((product: Product) => {
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Product ' + product.name + ' created'
      })
      timer(2000).toPromise().then(() => {
        this.location.back()
      })
    }, (() => {
      this.messageService.add({
        severity: 'error',
        summary: 'error',
        detail: 'Product not created'
      })
    }),
    )
  }

  private updateProduct(productData: FormData, currentProductId: string) {
    this.productsService.updateProduct(productData, currentProductId).subscribe((product: Product) => {
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Product ' + product.name + ' updated'
      })
      timer(2000).toPromise().then(() => {
        this.location.back()
      })
    }, (() => {
      this.messageService.add({
        severity: 'error',
        summary: 'error',
        detail: 'Product not updated'
      })
    }),
    )
  }
}

