import { axiosAdmin } from "src/api/axios";

export type AdminCreateDesignByEmailInput = {
  email: string;
  name: string;
  startingSize: string;
};

export const adminCreateDesignService = async (
  payload: AdminCreateDesignByEmailInput,
) => {
  const res = await axiosAdmin.post("/designs", payload);
  return res.data;
};

export type AdminDesignListParams = {
  page?: number;
  limit?: number;
  status?: "sold" | "unsold";
  source?: "ADMIN" | "STRIPE";
  search?: string;
};

export type AdminDesignListItem = {
  id: string;
  name: string;
  price: number;
  previewImage: string | null;
  orderId: string | null;
  isSold: boolean;
  creationSource: "ADMIN" | "STRIPE";
  createdAt: string;
  user: {
    id: string;
    email: string;
    name: string;
  } | null;
};

export type AdminDesignListResponse = {
  meta: {
    page: number;
    limit: number;
    totalDesigns: number;
    totalPages: number;
    filters: {
      status: string | null;
      source: string | null;
      search: string | null;
    };
  };
  data: AdminDesignListItem[];
};

export const getAdminDesigns = async (
  params: AdminDesignListParams,
): Promise<AdminDesignListResponse> => {
  const res = await axiosAdmin.get("/designs", {
    params,
  });

  return res.data;
};

export const adminDeleteDesignService = async (designId: string, note: string) => {
  const res = await axiosAdmin.delete(`/designs/${designId}`, {
    data: { note },
  });

  return res.data;
};
