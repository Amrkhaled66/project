import { Truck } from "lucide-react";

import Button from "src/components/ui/Button";
import Model from "src/components/ui/Model";
import { AdminOrderDetailsResponse } from "src/services/admin/orders.service";

type Props = {
  isOpen: boolean;
  order: AdminOrderDetailsResponse;
  isSubmitting?: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

const OrderShipmentConfirmModal = ({
  isOpen,
  order,
  isSubmitting = false,
  onClose,
  onConfirm,
}: Props) => {
  return (
    <Model isOpen={isOpen} onClose={onClose}>
      <div className="rounded-2xl bg-white p-6 shadow-xl">
        <div className="flex items-start gap-3">
          <div className="flex size-11 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Truck size={20} />
          </div>

          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-gray-900">
              Create shipment?
            </h3>
            <p className="text-sm leading-6 text-gray-600">
              You are about to create a shipment for order{" "}
              <span className="font-semibold text-gray-900">#{order.id}</span>.
              Confirm only when the order is ready to leave production.
            </p>
          </div>
        </div>

        <div className="mt-5 rounded-xl border border-gray-200 bg-gray-50 p-4">
          <div className="grid gap-3 text-sm sm:grid-cols-2">
            <div>
              <p className="text-gray-500">Order status</p>
              <p className="font-medium text-gray-900">{order.status}</p>
            </div>
            <div>
              <p className="text-gray-500">Customer</p>
              <p className="font-medium text-gray-900">{order.user.email}</p>
            </div>
            <div>
              <p className="text-gray-500">Destination</p>
              <p className="font-medium text-gray-900">
                {order.city}, {order.state}, {order.country}
              </p>
            </div>
            <div>
              <p className="text-gray-500">Total</p>
              <p className="font-medium text-gray-900">${order.totalPrice}</p>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <Button
            variant="danger"
            disabled={isSubmitting}
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button isLoading={isSubmitting} onClick={onConfirm}>
            Confirm Shipment
          </Button>
        </div>
      </div>
    </Model>
  );
};

export default OrderShipmentConfirmModal;
