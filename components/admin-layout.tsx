"use client"

import { useState } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { DashboardPage } from "@/components/pages/dashboard-page"
import { MembershipPage } from "@/components/pages/membership-page"
import { DonationPage } from "@/components/pages/donation-page"
import { ResourcePage } from "@/components/pages/resource-page"
import { MessagesPage } from "@/components/pages/messages-page"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { SettingsPage } from "@/components/pages/settings-page"

export type PageType = "dashboard" | "membership" | "donation" | "resource" | "messages" | "settings"

export function AdminLayout() {
  const [currentPage, setCurrentPage] = useState<PageType>("dashboard")

  const renderPage = () => {
    switch (currentPage) {
      case "dashboard":
        return <DashboardPage />
      case "membership":
        return <MembershipPage />
      case "donation":
        return <DonationPage />
      case "resource":
        return <ResourcePage />
      case "messages":
        return <MessagesPage />
      case "settings":
        return <SettingsPage />
      default:
        return <DashboardPage />
    }
  }

  const getPageTitle = () => {
    switch (currentPage) {
      case "dashboard":
        return "Dashboard Overview"
      case "membership":
        return "Membership Management"
      case "donation":
        return "Donation Management"
      case "resource":
        return "Resource Library"
      case "messages":
        return "Messages"
      case "settings":
        return "Settings"
      default:
        return "Dashboard"
    }
  }

  return (
    <SidebarProvider>
      <AppSidebar currentPage={currentPage} onPageChange={setCurrentPage} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <div className="flex flex-1 items-center gap-2">
            <h1 className="text-lg font-semibold">{getPageTitle()}</h1>
          </div>
        </header>
        <div className="flex flex-1 flex-col">{renderPage()}</div>
      </SidebarInset>
    </SidebarProvider>
  )
}
