// src/config/userSidebarMenu.ts
import {
  LayoutDashboard,
  UploadCloud,
  Hand,
  User,
  ShoppingCart,
  ClipboardList,
  PaintRoller,
  PlusCircle
} from "lucide-react";

export const userSidebarMenu = [
  { icon: LayoutDashboard, label: "Atelier Lobby™", path: "/dashboard" },
  { icon: PlusCircle, label: "Buy New Build", path: "/buy-new-build" },
  { icon: UploadCloud, label: "Panel Library", path: "/uploads" },
  { icon: PaintRoller, label: "Custom Panel Studio™", path: "/custom-panels" },
  { icon: Hand, label: "Blueprint Review™", path: "/design-library" },
  { icon: User, label: "Collector Profile", path: "/user-profile" },
  { icon: ShoppingCart, label: "Build Ledger™", path: "/cart" },
  { icon: ClipboardList, label: "Commission Archive™", path: "/orders" },
];
