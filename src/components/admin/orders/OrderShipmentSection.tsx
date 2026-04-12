import { useState } from "react";
import { CircleAlert, Truck, ExternalLink } from "lucide-react";

import Button from "src/components/ui/Button";
import { AdminOrderDetailsResponse } from "src/services/admin/orders.service";
import OrderShipmentConfirmModal from "./OrderShipmentConfirmModal";
import getUpsTrackingLink from "src/utils/getUpsTrackingLink";

type Props = {
  order: AdminOrderDetailsResponse;
  isCreatingShipment?: boolean;
  onCreateShipment: () => void;
};

const OrderShipmentSection = ({
  order,
  isCreatingShipment = false,
  onCreateShipment,
}: Props) => {
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const shipment = order.shipment;
  const isShipmentCreated = !!shipment;
  const canCreateShipment = order.status === "IN_PRODUCTION" && !shipment;

  const formatDateTime = (value?: string | null) => {
    if (!value) return "Not available yet";
    return new Date(value).toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleCloseModal = () => {
    if (!isCreatingShipment) setIsConfirmModalOpen(false);
  };

  const handleConfirmShipment = () => {
    onCreateShipment();
    setIsConfirmModalOpen(false);
  };

  return (
    <>
      <div className="rounded-2xl border border-stroke bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-semibold tracking-[0.18em] uppercase text-primary">
              <Truck size={16} />
              Shipment
            </div>

            <h2 className="text-xl font-semibold text-primary">
              {isShipmentCreated
                ? "Shipment already created"
                : "Create a shipment for this order"}
            </h2>

            <p className="max-w-2xl text-sm text-mainProfile-600">
              {isShipmentCreated
                ? "This order already has shipment activity. Shipment details will appear here."
                : canCreateShipment
                  ? "Once you confirm, the system will create a shipment for this order."
                  : "Shipment creation should happen after the order reaches production."}
            </p>
          </div>

          <div className="flex flex-col items-stretch gap-3 sm:items-end">
            {/* Status badge */}
            <div
              className={`inline-flex self-start rounded-full px-3 py-1 text-xs font-semibold sm:self-auto ${
                isShipmentCreated
                  ? "bg-primary-50 text-primary"
                  : canCreateShipment
                    ? "bg-amber-100 text-amber-700"
                    : "bg-stroke text-mainProfile-600"
              }`}
            >
              {isShipmentCreated
                ? "Shipment Created"
                : canCreateShipment
                  ? "Ready To Create"
                  : "Waiting For Production"}
            </div>

            <Button
              isLoading={isCreatingShipment}
              disabled={isShipmentCreated || !canCreateShipment}
              onClick={() => setIsConfirmModalOpen(true)}
              className="min-w-[190px]"
            >
              {isShipmentCreated ? "Shipment Created" : "Create Shipment"}
            </Button>
          </div>
        </div>

        {/* Shipment details panel */}
        {isShipmentCreated ? (
          <div className="mt-5 rounded-xl border border-primary-50 bg-primary-50 p-4">
            <div className="flex items-start gap-3">
              <Truck className="mt-0.5 text-primary" size={18} />
              <div className="w-full space-y-1">
                <p className="text-sm font-semibold text-primary">
                  Shipment summary
                </p>
                <p className="text-sm text-primary/80">
                  Shipment created on{" "}
                  {formatDateTime(shipment?.createdAt || order.shippedAt)}.
                </p>

                <div className="grid gap-2 pt-2 text-sm text-primary sm:grid-cols-2">
                  <p>
                    Tracking:{" "}
                    <span className="font-medium">
                      {shipment?.trackingNumber || "Not available yet"}
                    </span>
                  </p>
                  <p>
                    Shipment ID:{" "}
                    <span className="font-medium">
                      {shipment?.shipmentId || "Not available yet"}
                    </span>
                  </p>
                  <p>
                    Carrier:{" "}
                    <span className="font-medium">
                      {shipment?.carrier || "UPS"}
                    </span>
                  </p>
                  <p>
                    Weight:{" "}
                    <span className="font-medium">
                      {shipment?.billingWeight
                        ? `${shipment.billingWeight} ${shipment.billingWeightUnit || ""}`.trim()
                        : "Not available yet"}
                    </span>
                  </p>
                </div>

                {/* Action buttons — replaced <a> with Button */}
                <div className="flex flex-wrap items-center gap-2 pt-2">
                  {shipment?.labelUrl ? (
                    <Button
                      variant="outline"
                      onClick={() =>
                        window.open(
                          `${import.meta.env.VITE_API_URL}${shipment.labelUrl}`,
                          "_blank",
                          "noreferrer"
                        )
                      }
                      className="flex items-center gap-1.5 text-sm"
                    >
                      <ExternalLink size={14} />
                      Open shipping label
                    </Button>
                  ) : null}

                  <Button
                    variant="ghost"
                    onClick={() =>
                      window.open(
                        getUpsTrackingLink(shipment?.trackingNumber),
                        "_blank",
                        "noreferrer"
                      )
                    }
                    className="flex items-center gap-1.5 text-sm"
                  >
                    <ExternalLink size={14} />
                    Track shipment
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ) : !canCreateShipment ? (
          <div className="mt-5 rounded-xl border border-strokeFont/30 bg-stroke p-4">
            <div className="flex items-start gap-3">
              <CircleAlert className="mt-0.5 text-mainProfile-600" size={18} />
              <p className="text-sm text-mainProfile-600">
                Move the order to{" "}
                <span className="font-semibold text-primary">IN_PRODUCTION</span>{" "}
                before creating a shipment.
              </p>
            </div>
          </div>
        ) : null}
      </div>

      <OrderShipmentConfirmModal
        isOpen={isConfirmModalOpen}
        order={order}
        isSubmitting={isCreatingShipment}
        onClose={handleCloseModal}
        onConfirm={handleConfirmShipment}
      />
    </>
  );
};

export default OrderShipmentSection;