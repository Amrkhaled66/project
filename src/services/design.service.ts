import { axiosPrivate } from "src/api/axios";
import { Design, DesignData } from "src/types/design.types";

const BASE_URL = "/designs";

export const DesignService = {
  // Create a new blank design
  create: async (name:string): Promise<{ id: string }> => {
    const res = await axiosPrivate.post(`${BASE_URL}/new`,{name});
    return res.data;
  },

  // Fetch all user designs
  getAll: async (): Promise<Design[]> => {
    const res = await axiosPrivate.get<Design[]>(BASE_URL);
    return res.data;
  },

  // Fetch one design by ID
  getById: async (id: string): Promise<Design> => {
    const res = await axiosPrivate.get<Design>(`${BASE_URL}/${id}`);
    return res.data;
  },

  // Fetch the latest design for the user
  getLatest: async () => {
    const res = await axiosPrivate.get(`${BASE_URL}/latest`);
    return res.data;
  },

  // Update or auto-save design
  update: async (
    id: string,
    payload: {
      name?: string;
      previewImage?: string;
      designData?: DesignData;
    }
  ): Promise<{ message: string }> => {
    const res = await axiosPrivate.put<{ message: string }>(
      `${BASE_URL}/${id}`,
      payload
    );
    return res.data;
  },

  // Delete design
  delete: async (id: string): Promise<{ message: string }> => {
    const res = await axiosPrivate.delete<{ message: string }>(
      `${BASE_URL}/${id}`
    );
    return res.data;
  },
};
