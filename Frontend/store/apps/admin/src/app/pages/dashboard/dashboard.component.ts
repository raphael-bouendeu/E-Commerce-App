import { Component, OnInit } from '@angular/core';
import { DashboardService } from '@store/ui';

@Component({
  selector: 'admin-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {

  countProducts !: number;
  userCount !: number;
  orderCount!: number;
  totalsales!: number;

  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.dashboardService.getProductsCount().subscribe(data => {
      this.countProducts = data.productCount
    })
    this.dashboardService.getUsersCount().subscribe(data => {
      this.userCount = data.userCount
    })
    this.dashboardService.getOrdersCount().subscribe(data => {
      this.orderCount = data.orderCount
    })
    this.dashboardService.getTotalSales().subscribe(data => {
      this.totalsales = data.totalsales;
    })
  }
}
