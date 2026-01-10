// import React from "react";
// import { motion } from "framer-motion";
// import Button from "src/components/ui/Button";
// import { Tab } from "./CartForm";
// import { useCart } from "src/context/cart.context";
// import { useCreateOrder } from "src/hooks/queries/orders.queries";
// import { CreateOrderPayload } from "src/types/Order";
// import priceFormmater from "src/utils/priceFormmater";

// type PaymentDetailsProps = {
//   shippingData: {
//     state: string;
//     city: string;
//     addressLine1: string;
//     addressLine2?: string;
//     zip: string;
//     phone: string;
//   };
//   onChangeTab: (tab: Tab) => void;
// };

// const PaymentDetails: React.FC<PaymentDetailsProps> = ({
//   shippingData,
//   onChangeTab,
// }) => {
//   const { cartItems, getCartSubTotal, cartTotal } = useCart();
//   const { mutate: createOrder, isPending } = useCreateOrder();

//   const handlePayNow = () => {
//     const payload: CreateOrderPayload = {
//       items: cartItems.map((item: any) => ({
//         designId: item.designId,
//         quantity: item.quantity,
//       })),
//       address: shippingData,
//       totalPrice: cartTotal,
//       subTotal: getCartSubTotal(), 
//     };

//     createOrder(payload, {
//       onSuccess: (response) => {
//         console.log("✅ Order created successfully:", response);

//         window.location.href = response.paymentUrl;
//       },
//       onError: (error) => {
//         console.error("❌ Failed to create order:", error);
//       },
//     });
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 12 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.25 }}
//       className="space-y-6"
//     >
//       {/* Back */}
//       <button
//         type="button"
//         onClick={() => onChangeTab("Shipping Info")}
//         className="text-sm font-medium text-gray-600 hover:text-gray-900"
//       >
//         ← Back to Shipping
//       </button>

//       <h2 className="text-2xl font-semibold">Payment Details</h2>

//       {/* Payment Method */}
//       <div className="space-y-3">
//         <h3 className="text-lg font-medium">Payment Method</h3>

//         <div className="flex items-center justify-between rounded-lg border border-gray-900 bg-gray-50 px-4 py-3">
//           <div className="flex items-center gap-3">
//             <div className="flex h-10 w-10 items-center justify-center rounded-md bg-purple-600 font-bold text-white">
//               S
//             </div>
//             <div>
//               <p className="text-sm font-medium">Credit / Debit Card</p>
//               <p className="text-xs text-gray-500">Powered by Stripe</p>
//             </div>
//           </div>

//           <span className="text-xs font-medium text-green-600">Selected</span>
//         </div>
//       </div>

//       {/* Pay */}
//       <Button
//         className="w-full py-3"
//         onClick={handlePayNow}
//         disabled={isPending || cartItems.length === 0}
//       >
//         {isPending ? "Processing..." : `Pay ${priceFormmater(cartTotal)}`}
//       </Button>
//     </motion.div>
//   );
// };

// export default PaymentDetails;
