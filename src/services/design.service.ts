import { axiosPrivate } from "src/api/axios";
import { Design, DesignData } from "src/types/design.types";

const BASE_URL = "/designs";

export const DesignService = {
  /* -------------------------------------------------------------------------- */
  /* CREATE DESIGN                                                              */
  /* -------------------------------------------------------------------------- */
  create: async (name: string): Promise<{ id: string }> => {
    const res = await axiosPrivate.post(`${BASE_URL}/new`, { name });
    return res.data;
  },

  /* -------------------------------------------------------------------------- */
  /* GET ALL DESIGNS                                                            */
  /* -------------------------------------------------------------------------- */
  getAll: async (): Promise<Design[]> => {
    const res = await axiosPrivate.get<Design[]>(BASE_URL);
    return res.data;
  },

  /* -------------------------------------------------------------------------- */
  /* GET DESIGN BY ID                                                           */
  /* -------------------------------------------------------------------------- */
  getById: async (id: string): Promise<Design> => {
    const res = await axiosPrivate.get<Design>(`${BASE_URL}/${id}`);
    console.log(res.data)
    return res.data;
  },

  /* -------------------------------------------------------------------------- */
  /* GET LATEST DESIGN                                                          */
  /* -------------------------------------------------------------------------- */
  getLatest: async () => {
    const res = await axiosPrivate.get(`${BASE_URL}/latest`);
    return res.data;
  },

  /* -------------------------------------------------------------------------- */
  /* UPDATE DESIGN (AUTO-SAVE JSON ONLY)                                        */
  /* -------------------------------------------------------------------------- */
 update: async (
  id: string,
  payload: {
    name?: string;
    designData?: DesignData;
  },
  preview: Blob | null
): Promise<{ success: boolean; price: number }> => {
  const formData = new FormData();

  if (payload.name) {
    formData.append("name", payload.name);
  }

  if (payload.designData) {
    formData.append("designData", JSON.stringify(payload.designData));
  }

  if (preview) {
    formData.append("preview", preview, "preview.webp");
  }

  const res = await axiosPrivate.put<{ success: boolean; price: number }>(
    `${BASE_URL}/${id}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return res.data;
},


  /* -------------------------------------------------------------------------- */
  /* UPLOAD / OVERWRITE DESIGN PREVIEW                                          */
  /* -------------------------------------------------------------------------- */
  uploadPreview: async (
    id: string,
    file: Blob
  ): Promise<{ previewImage: string }> => {
    const formData = new FormData();
    formData.append("file", file);

    const res = await axiosPrivate.post<{ previewImage: string }>(
      `${BASE_URL}/${id}/preview`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return res.data;
  },

  /* -------------------------------------------------------------------------- */
  /* DELETE DESIGN                                                              */
  /* -------------------------------------------------------------------------- */
  delete: async (id: string): Promise<{ success: boolean }> => {
    const res = await axiosPrivate.delete<{ success: boolean }>(
      `${BASE_URL}/${id}`
    );
    return res.data;
  },
};
