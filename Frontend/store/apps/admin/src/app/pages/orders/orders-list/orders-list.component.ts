import { Component, OnDestroy, OnInit } from '@angular/core';
import { Order, OrdersService, ORDERS_STATUS } from '@store/orders';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'admin-orders-list',
  templateUrl: './orders-list.component.html',
  styles: [
  ]
})
export class OrdersListComponent implements OnInit, OnDestroy {

  orders: Order[] = []
  orderStatus = ORDERS_STATUS;
  ORDERS_STATUS_TO_MAP: any
  endSubs$: Subject<void> = new Subject()

  constructor(private ordersService: OrdersService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private router: Router) { }


  ngOnDestroy(): void {
    this.endSubs$.next()
    this.endSubs$.complete()
  }


  ngOnInit(): void {
    this._getOrders()
    this.ORDERS_STATUS_TO_MAP = new Map(Object.entries(this.orderStatus));

  }

  getlabelAndColor(order: Order) {
    const obj = this.ORDERS_STATUS_TO_MAP.get(order.status + "")
    return {
      label: obj.label,
      color: obj.color
    }


  }

  deleteOrder(orderId: string) {


    this.confirmationService.confirm({
      message: 'Do you want to delete this Order?',
      header: 'Delete Order',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.ordersService.deleteOrder(orderId).pipe(takeUntil(this.endSubs$)).subscribe(() => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Order deleted'
          })
          this._getOrders()
        }, (() => {
          this.messageService.add({
            severity: 'error',
            summary: 'error',
            detail: 'Order not deleted'
          })
        }))
      },
    });
  }
  showOrder(orderId: string) {
    this.router.navigateByUrl('orders/' + orderId)
  }

  _getOrders() {
    this.ordersService.getOrders().subscribe(data => {
      this.orders = data
    })
  }



}
