import {
  Receipt,
  CheckCircle2,
  Truck,
  Home,
  XCircle,
  RefreshCcw,
  Factory,
  Pencil,
} from "lucide-react";

const ORDER_STATUS: Record<
  string,
  { label: string; color: string; icon: any; stepOrder: number }
> = {
  PENDING_PAYMENT: {
    label: "Commission Pending",
    color: "bg-amber-100 text-amber-700",
    icon: Receipt,
    stepOrder: 1,
  },
  PAID: {
    label: "Commissioned",
    color: "bg-blue-100 text-blue-700",
    icon: CheckCircle2,
    stepOrder: 2,
  },
  IN_DESIGN: {
    label: "Blueprint™ Review",
    color: "bg-purple-100 text-purple-700",
    icon: Pencil,
    stepOrder: 3,
  },
  DESIGN_APPROVED: {
    label: "Blueprint Locked",
    color: "bg-sky-100 text-sky-700",
    icon: CheckCircle2,
    stepOrder: 4,
  },
  IN_PRODUCTION: {
    label: "Stitch Arena™ Production",
    color: "bg-indigo-100 text-indigo-700",
    icon: Factory,
    stepOrder: 5,
  },
  SHIPPED: {
    label: "Artifact Shipped",
    color: "bg-indigo-100 text-indigo-700",
    icon: Truck,
    stepOrder: 6,
  },
  DELIVERED: {
    label: "Artifact Delivered",
    color: "bg-emerald-100 text-emerald-700",
    icon: Home,
    stepOrder: 7,
  },
  CANCELLED: {
    label: "Cancelled",
    color: "bg-red-100 text-red-700",
    icon: XCircle,
    stepOrder: 99,
  },
  REFUNDED: {
    label: "Refunded",
    color: "bg-gray-100 text-gray-700",
    icon: RefreshCcw,
    stepOrder: 100,
  },
};

const ADMIN_PATH = "/jb_blanket_admin@2020";
const MAX_UPLOAD_SIZE = 150;
type IMAGE_TYPE = "panel" | "corner" |"custome_panel";

const panels: Record<IMAGE_TYPE, { label: string; key: IMAGE_TYPE }> = {
  panel: {
    label: "Heirloom Panel™",
    key: "panel",
  },
  corner: {
    label: "Heirloom Stone™",
    key: "corner",
  },
  custome_panel:{
    label:"Custom Panel",
    key:"custome_panel"
  }
};
export { ORDER_STATUS, ADMIN_PATH, MAX_UPLOAD_SIZE, panels };
export type { IMAGE_TYPE };
