interface Upgrade {
  name: string;
  price: string;
}

interface Item {
  size: string;
  color: string | null;
  borderColor: string | null;
  upgrades: Upgrade[];
  quantity: number;
  totalPrice: number;
  designImage: string | null;
}
interface Order {
  id: number;
  date: string;
  amount: string;
  item: Item;
  paymentOption: string;
  status: "Completed" | "In Progress" | "Pending" | "Cancelled";
  estimatedDeliveryDate: string;
}

export default Order;
