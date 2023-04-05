import { Component, OnInit } from '@angular/core';
import { Order, OrdersService, ORDERS_STATUS } from '@store/orders';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'admin-orders-detail',
  templateUrl: './orders-detail.component.html',
  styles: [
  ]
})
export class OrdersDetailComponent implements OnInit {
  orderStatus: any[] = []
  order!: Order;
  selectedStatus!: Order;
  constructor(private ordersService: OrdersService,
    private messageService: MessageService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.mapOrderStatus()
    this.getOrder()
  }

  getSelectedValue(event: any) {
    if (this.order.id) {
      this.ordersService.updateOrder({ status: event.value }, this.order.id).subscribe(order => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Order Status   updated'
        })
      }, (() => {
        this.messageService.add({
          severity: 'error',
          summary: 'error',
          detail: 'Order cannot change'
        })
      }),
      )
    }
  }
  mapOrderStatus() {
    const ORDERS_STATUS_TO_MAP = new Map(Object.entries(ORDERS_STATUS));
    this.orderStatus = Array.from(ORDERS_STATUS_TO_MAP, ([id, value]) => ({ id, value })).
      map(({ id, value }) => {
        return {
          id: id,
          name: value.label
        }
      })
  }

  private getOrder() {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.ordersService.getOrderById(params['id']).subscribe(data => {
          this.order = data;
          this.selectedStatus = data;
        })
      }
    })
  }
}
