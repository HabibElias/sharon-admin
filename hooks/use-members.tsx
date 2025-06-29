import Member from "@/models/Member";
import apiClient from "@/services/api-client";
import { useQuery } from "@tanstack/react-query";

interface FetchMembersResponse {
  status: string;
  members: Member[];
}

const useMembers = () => {
  const fetchMembers = async () => {
    const { data } = await apiClient.get<FetchMembersResponse>("/members");

    return data.members;
  };

  return useQuery({ queryKey: ["members"], queryFn: fetchMembers });
};

export default useMembers;
