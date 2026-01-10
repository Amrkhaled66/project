// src/config/userSidebarMenu.ts
import {
  LayoutDashboard,
  UploadCloud,
  Hand,
  User,
  ShoppingCart,
  ClipboardList,
  PaintRoller
} from "lucide-react";

export const userSidebarMenu = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
  { icon: UploadCloud, label: "Uploads", path: "/uploads" },
  { icon: PaintRoller, label: "Custom Panels", path: "/custom-panels" },
  { icon: Hand, label: "Design", path: "/design-library" },
  { icon: User, label: "Profile", path: "/user-profile" },
  { icon: ShoppingCart, label: "Cart", path: "/cart" },
  { icon: ClipboardList, label: "Orders", path: "/orders" },
];
