"use client";

import Donation from "@/models/Donation";
import apiClient from "@/services/api-client";
import { useQuery } from "@tanstack/react-query";


interface FetchDonationsResponse {
  status: string;
  donations: Donation[];
}

const useDonations = () => {
  const fetchDonations = async () => {
    const { data } = await apiClient.get<FetchDonationsResponse>("/donations");

    return data.donations;
  };

  return useQuery({
    queryKey: ["donations"],
    queryFn: fetchDonations,
  });
};

export default useDonations;
