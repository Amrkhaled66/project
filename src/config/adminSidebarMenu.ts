import {
  ClipboardList,
  User,
  UserPlus2Icon,
  LogIn,
  Palette,
  Layers3,
} from "lucide-react";
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
  {
    icon: LogIn,
    label: "Login As User",
    path: "/login-as-user",
  },
  {
    icon: UserPlus2Icon,
    label: "Add User",
    path: "/add-user",
  },
  {
    icon: Palette,
    label: "Add Design",
    path: "/add-design",
  },
  {
    icon: Layers3,
    label: "Premium Builds",
    path: "/premium-builds",
  },
];
