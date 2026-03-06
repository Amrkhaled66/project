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
  { icon: LayoutDashboard, label: "Atelier", path: "/dashboard" },
  { icon: UploadCloud, label: "Panel Library", path: "/uploads" },
  { icon: PaintRoller, label: "Custom Panels", path: "/custom-panels" },
  { icon: Hand, label: "Blueprint", path: "/design-library" },
  { icon: User, label: "Profile", path: "/user-profile" },
  { icon: ShoppingCart, label: "Build Summary", path: "/cart" },
  { icon: ClipboardList, label: "Builds", path: "/orders" },
];
