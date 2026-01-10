export type OrderItemPayload = {
  designId: string;
  quantity: number;
};

export type OrderAddressPayload = {
  state: string;
  city: string;
  addressLine1: string;
  addressLine2?: string;
  zip: string;
  phone: string;
};

export type CreateOrderPayload = {
  items: OrderItemPayload[];
  address: OrderAddressPayload;
};
