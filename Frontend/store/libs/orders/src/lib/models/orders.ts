import { OrderItems } from "./orders-item";
import { User } from '@store/users';

export class Order {
  id?: string;
  orderItems?: OrderItems[];
  shippingAddress1?: string;
  shippingAddress2?: string;
  city?: string
  zip?: string
  country?: string;
  phone?: string;
  status?: number;
  totaLprice?: string;
  user?: any;
  dateOrdered?: string;
}

export const ORDERS_STATUS = {
  0: {
    label: 'Pending',
    color: 'primary'
  },
  1: {
    label: 'Processed',
    color: 'warning'
  },
  2: {
    label: 'Shipped',
    color: 'warning'
  },
  3: {
    label: 'Delivered',
    color: 'success'
  },
  4: {
    label: 'Failed',
    color: 'danger'
  },
}


