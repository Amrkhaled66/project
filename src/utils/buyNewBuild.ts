import { BlanketSize } from "src/data/blanketSizes";

export const getBuyNewBuildKey = (size: BlanketSize) =>
  size.name.toLowerCase();

export const getBuyNewBuildErrorMessage = (error: unknown) => {
  const maybeError = error as {
    response?: { data?: { message?: string } };
    message?: string;
  };

  return (
    maybeError.response?.data?.message ||
    maybeError.message ||
    "Unable to start checkout"
  );
};

export const getBuyNewBuildShippingLabel = (shippingPrice: number) => {
  if (shippingPrice <= 20) return "Standard";
  if (shippingPrice <= 30) return "Extended";
  return "Large";
};
