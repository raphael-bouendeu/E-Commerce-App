import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ShellComponent } from './shared/shell/shell.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { CategoriesListComponent } from './categories/categories-list/categories-list.component';
import { ToolbarModule } from 'primeng/toolbar';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { InputTextModule } from 'primeng/inputtext';
import { CategoriesFormComponent } from './categories/categories-form/categories-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { CategoriesService } from '@store/products';
import { ColorPickerModule } from 'primeng/colorpicker';
import { environment } from '../../environement';
import { APP_CONFIG } from '@store/app-config';
import { ProductsListComponent } from './pages/products/products-list/products-list.component';
import { ProductsFormComponent } from './pages/products/products-form/products-form.component';
import { ProductssService } from '@store/products';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputSwitchModule } from 'primeng/inputswitch';
import { DropdownModule } from 'primeng/dropdown';
import { EditorModule } from 'primeng/editor';
import { QuillModule } from 'ngx-quill';
import { UsersListComponent } from './pages/users/users-list/users-list.component';
import { UsersFormComponent } from './pages/users/users-form/users-form.component'
import { JwtInterceptor, UsersModule, UsersService } from '@store/users';
import { TagModule } from 'primeng/tag';
import { InputMaskModule } from 'primeng/inputmask';
import { OrdersListComponent } from './pages/orders/orders-list/orders-list.component';
import { OrdersDetailComponent } from './pages/orders/orders-detail/orders-detail.component';
import { FieldsetModule } from 'primeng/fieldset';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
const UX_MODULE = [CardModule, FieldsetModule, InputMaskModule, TagModule, EditorModule, DropdownModule, InputSwitchModule, InputTextareaModule, InputNumberModule, ColorPickerModule, ButtonModule, ConfirmDialogModule, ToolbarModule, ToastModule, TableModule, InputTextModule];


@NgModule({
  declarations: [AppComponent, NxWelcomeComponent, DashboardComponent, ShellComponent, SidebarComponent,
    CategoriesListComponent, CategoriesFormComponent, ProductsListComponent, ProductsFormComponent, UsersFormComponent, UsersListComponent, OrdersListComponent, OrdersDetailComponent],
  imports: [CommonModule,
    BrowserModule, UsersModule,
    BrowserAnimationsModule, ButtonModule, ...UX_MODULE, QuillModule.forRoot(), HttpClientModule, FormsModule, ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [MessageService, ConfirmationService, UsersService, ProductssService, CategoriesService,
    { provide: APP_CONFIG, useValue: environment }, {
      provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true
    }],
  bootstrap: [AppComponent],
})
export class AppModule { }
