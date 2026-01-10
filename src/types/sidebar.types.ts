// src/components/layouts/Sidebar/types.ts
import { LucideIcon } from "lucide-react";

export interface SidebarMenuItem {
  icon: LucideIcon;
  label: string;
  path: string;
}

export interface SidebarUserInfo {
  name?: string;
  email?: string;
}
