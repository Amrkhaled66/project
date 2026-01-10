import { DesignData } from './../../types/design.types';
import { axiosAdmin } from "src/api/axios";

const API_BASE = import.meta.env.VITE_API_URL || "/api";

/* -------------------------------------------------------------------------- */
/* List Orders (Paginated)                                                     */
/* -------------------------------------------------------------------------- */
export type AdminOrderListParams = {
  page?: number;
  limit?: number;
  status?: string;
  search?: string;
};

export type AdminOrderListItem = {
  id: string;
  status: string;
  user: {
    email: string;
  };
};

export type AdminOrderListResponse = {
  meta: {
    page: number;
    limit: number;
    totalOrders: number;
    totalPages: number;
    statusFilter: string | null;
  };
  data: AdminOrderListItem[];
};

export const getAdminOrders = async (
  params: AdminOrderListParams
): Promise<AdminOrderListResponse> => {
  const res = await axiosAdmin.get(`${API_BASE}/admin/orders`, {
    params,
  });

  return res.data;
};

/* -------------------------------------------------------------------------- */
/* Order Details (By ID)                                                       */
/* -------------------------------------------------------------------------- */
export type AdminOrderDetailsItem = {
  id: string;
  designSnapshot:DesignData;
};


export type AdminOrderDetailsResponse = {
  /* ---------------- Order Core ---------------- */
  id: string;
  status: 
    | "PENDING_PAYMENT"
    | "PROCESSING"
    | "COMPLETED"
    | "CANCELLED";

  createdAt: string;
  updatedAt: string;

  /* ---------------- Pricing ---------------- */
  subtotal: string;        // before shipping / tax
  shippingFee: string;     // e.g. "5.00"
  totalPrice: string;      // final charged amount

  /* ---------------- Lifecycle ---------------- */
  paidAt: string | null;
  shippedAt: string | null;
  deliveredAt: string | null;
  cancelledAt: string | null;

  /* ---------------- Customer ---------------- */
  userId: string;
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
  };

  /* ---------------- Address ---------------- */
  country: string;        
  state: string;          
  city: string;
  addressLine1: string;
  addressLine2?: string;
  zip: string;
  phone: string;

  /* ---------------- Items ---------------- */
  items: {
    id: string;
    designId?: string;
    quantity?: number;
    price?: string;
    designSnapshot: DesignData;
  }[];
};


export const getAdminOrderById = async (
  orderId: string
): Promise<AdminOrderDetailsResponse> => {
  const res = await axiosAdmin.get(
    `${API_BASE}/admin/orders/${orderId}`
  );

  return res.data;
};

/* -------------------------------------------------------------------------- */
/* Update Order Info                                                          */
/* -------------------------------------------------------------------------- */
export type UpdateOrderPayload = {
  status?: string;
  addressLine1?: string;
  addressLine2?: string;
  city?: string;
  state?: string;
  zip?: string;
  phone?: string;
};

export const updateOrder = async (
  orderId: string,
  payload: UpdateOrderPayload
) => {
  const res = await axiosAdmin.put(`${API_BASE}/admin/orders/${orderId}`, payload);
  return res.data;
};
