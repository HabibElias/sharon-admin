"use client";

import {
  BookOpen,
  Home,
  MessageSquare,
  Users,
  Gift,
  FileText,
  Settings,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Badge } from "@/components/ui/badge";
import type { PageType } from "@/components/admin-layout";
import { useAuth } from "@/components/auth-provider";

interface AppSidebarProps {
  currentPage: PageType;
  onPageChange: (page: PageType) => void;
}

const sidebarItems = [
  {
    title: "Dashboard",
    page: "dashboard" as PageType,
    icon: Home,
  },
  {
    title: "Membership",
    page: "membership" as PageType,
    icon: Users,
  },
  {
    title: "Donation",
    page: "donation" as PageType,
    icon: Gift,
  },
  {
    title: "Resource",
    page: "resource" as PageType,
    icon: FileText,
  },
  {
    title: "Messages",
    page: "messages" as PageType,
    icon: MessageSquare,
  },
  {
    title: "Settings",
    page: "settings" as PageType,
    icon: Settings,
  },
];

export function AppSidebar({ currentPage, onPageChange }: AppSidebarProps) {
  const { user, signOut } = useAuth();

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-4 py-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <BookOpen className="h-4 w-4" />
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">Admin Panel</span>
            <span className="truncate text-xs text-muted-foreground">
              Church Management
            </span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {sidebarItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    isActive={currentPage === item.page}
                    onClick={() => onPageChange(item.page)}
                  >
                    <item.icon />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        {user && (
          <div className="border-t border-muted-foreground p-4">
            <div className="flex flex-col gap-1">
              <span className="text-sm font-medium">{user.name}</span>
              <span className="text-xs text-muted-foreground">
                {user.email}
              </span>
            </div>
          </div>
        )}
      </SidebarContent>
      <SidebarFooter>
        <div className="p-4 text-center text-xs text-muted-foreground">
          © 2024 Church Admin System
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
