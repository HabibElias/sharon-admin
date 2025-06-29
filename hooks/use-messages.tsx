"use client";

import Message from "@/models/Message";
import apiClient from "@/services/api-client";
import { useQuery } from "@tanstack/react-query";

interface FetchMessagesResponse {
  status: string;
  contacts: Message[];
}

const useMessages = () => {
  const fetchMessages = () =>
    apiClient.get<FetchMessagesResponse>(`/contacts`).then((res) => {
      console.log(res.data);

      return res.data.contacts;
    });

  return useQuery({
    queryKey: ["messages"],
    queryFn: fetchMessages,
  });
};

export default useMessages;
