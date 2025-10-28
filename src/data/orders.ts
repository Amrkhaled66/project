import Order from "src/types/Order";

const orders: Order[] = [
  {
    id: 1001,
    date: "2025-09-01",
    amount: "350",
    item: {
      size: "Large",
      color: "#F5F5DC",
      borderColor: "#333333",
      upgrades: [
        { name: "Extra Soft", price: "50" },
        { name: "Waterproof", price: "30" }
      ],
      quantity: 1,
      totalPrice: 350,
      designImage: "https://example.com/images/design1.png"
    },
    paymentOption: "Visa",
    status: "Completed",
    estimatedDeliveryDate: "2025-09-10"
  },
  {
    id: 1002,
    date: "2025-09-05",
    amount: "200",
    item: {
      size: "Medium",
      color: "#ADD8E6",
      borderColor: null,
      upgrades: [],
      quantity: 2,
      totalPrice: 200,
      designImage: null
    },
    paymentOption: "Cash",
    status: "In Progress",
    estimatedDeliveryDate: "2025-09-12"
  },
  {
    id: 1003,
    date: "2025-09-10",
    amount: "420",
    item: {
      size: "Extra Large",
      color: "#FFFFFF",
      borderColor: "#000000",
      upgrades: [
        { name: "Double Layer", price: "70" }
      ],
      quantity: 1,
      totalPrice: 420,
      designImage: "https://example.com/images/design3.png"
    },
    paymentOption: "PayPal",
    status: "Pending",
    estimatedDeliveryDate: "2025-09-20"
  },
  {
    id: 1004,
    date: "2025-09-15",
    amount: "150",
    item: {
      size: "Small",
      color: "#FFC0CB",
      borderColor: "#FF69B4",
      upgrades: [],
      quantity: 1,
      totalPrice: 150,
      designImage: null
    },
    paymentOption: "Mastercard",
    status: "Cancelled",
    estimatedDeliveryDate: "2025-09-25"
  },
  {
    id: 1005,
    date: "2025-09-20",
    amount: "310",
    item: {
      size: "Large",
      color: "#D3D3D3",
      borderColor: "#808080",
      upgrades: [
        { name: "Heated Fabric", price: "60" }
      ],
      quantity: 1,
      totalPrice: 310,
      designImage: "https://example.com/images/design5.png"
    },
    paymentOption: "Apple Pay",
    status: "Completed",
    estimatedDeliveryDate: "2025-09-30"
  }
];

export default orders;
