// using useQuery so we can save the data in the cache and reduce the time for redownloading it every time, and also we can use the isLoading state to show a spinner

import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/apiAuth";

export function useUser() {
  const { isLoading, data: user } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  });

  let isAuthenticated = user?.role === "authenticated";

  return { isLoading, user, isAuthenticated };
}
