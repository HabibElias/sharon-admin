import { SidebarProvider, SidebarTrigger } from "../components/ui/sidebar";
import { AppSidebar } from "../components/app-sidebar";
import { Outlet } from "react-router";
import AppearanceToggleTab from "./appearance-tabs";

export default function Layout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="p-4 w-full font-[poppins]">
        <div className="flex items-center justify-between">
          <SidebarTrigger className="text-2xl" />
          <AppearanceToggleTab />
        </div>
        <Outlet />
      </main>
    </SidebarProvider>
  );
}
