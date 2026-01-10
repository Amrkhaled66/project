import { ClipboardList, User } from "lucide-react";
import { SidebarMenuItem } from "src/types/sidebar.types";

export const adminSidebarMenu: SidebarMenuItem[] = [
  {
    icon: ClipboardList,
    label: "Orders",
    path: "/orders",
  },
  {
    icon: User,
    label: "User Management",
    path: "/user",
  },
];
