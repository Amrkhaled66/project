interface OrderItem {
  name: string;
  quantity: number;
}

interface Order {
  id: number;
  date: string; 
  amount: string;
  items: OrderItem[];
  paymentOption: string;
  status: "Completed" | "In Progress" | "Pending" | "Cancelled"; 
  estimatedDeliveryDate: string; 
}


export default Order;