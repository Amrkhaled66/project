import Order from "src/types/Order";

const orders: Order[] = [
  {
    id: 1232,
    date: "2023-10-01",
    amount: "122",
    items: [
      {
        name: "Blanket",
        quantity: 2,
      },
    ],
    paymentOption: "Visa",
    status: "Completed",
    estimatedDeliveryDate: "2023-10-10",
  },
];

export default orders;
