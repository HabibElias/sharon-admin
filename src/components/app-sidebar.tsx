import {
  Book,
  Calendar,
  Contact2Icon,
  Inbox,
  LayoutDashboard,
  Search,
  Settings,
} from "lucide-react";
import { Link, NavLink } from "react-router-dom";

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
} from "../components/ui/sidebar";
import Logo from "./Logo";

// Menu items.
const items = [
  {
    label: "Platforms",
    routes: [
      {
        title: "Dashboard",
        url: "/dashboard",
        icon: LayoutDashboard,
      },
      {
        title: "Members",
        url: "/members",
        icon: Contact2Icon,
      },
      {
        title: "Donations",
        url: "/donations",
        icon: Contact2Icon,
      },
    ],
  },
  {
    label: "Resources",
    routes: [
      {
        title: "Books",
        url: "/books",
        icon: Book,
      },
    ],
  },
];

export function AppSidebar() {
  return (
    <Sidebar className="font-[poppins]" collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link to="/dashboard">
                <Logo />
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        {items.map(({ label, routes }, index) => (
          <SidebarGroup key={index}>
            <SidebarGroupLabel>{label}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {routes.map((item) => (
                  <SidebarMenuItem
                    className="[&_a.active]:text-blue-700 [&_a.active]:bg-neutral-800/10 [&_a.active]:dark:bg-neutral-200/10"
                    key={item.title}
                  >
                    <SidebarMenuButton asChild>
                      <NavLink to={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem className="[&_a.active]:text-blue-700 [&_a.active]:bg-neutral-800/10 [&_a.active]:dark:bg-neutral-200/10">
            <SidebarMenuButton className="py-5 " asChild>
              <NavLink to={"/settings"}>
                <Settings />
                <span>Settings</span>
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
