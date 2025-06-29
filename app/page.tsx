"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { AdminLayout } from "@/components/admin-layout";

export default function Page() {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <AdminLayout />
    </QueryClientProvider>
  );
}
