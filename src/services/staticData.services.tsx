import { axiosPrivate } from "src/api/axios";

export const getOrderStatuses = async () => {
  const res = await axiosPrivate.get("/static/orderStatuses");
  return res.data;
};

export const getStates = async () => {
  const res = await axiosPrivate.get("/static/states");
  return res.data;
};
