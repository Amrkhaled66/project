import { getItem, setItem, removeItem } from "./localStorage";

const CART_STORAGE_KEY = "blanketCart";

export const getCart : any = () => getItem(CART_STORAGE_KEY) ?? null;
export const setCart = (cart: any) => setItem(CART_STORAGE_KEY, cart);
export const clearCart = () => removeItem(CART_STORAGE_KEY);
