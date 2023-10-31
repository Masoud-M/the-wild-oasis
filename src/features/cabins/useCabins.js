import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";

export function useCabins() {
  const {
    isLoading,
    data: cabins,
    error,
  } = useQuery({
    queryKey: ["cabins"],
    // queryFn needs to return a promise so we could simply use a fetch() function but we are gonna use our own functions here.
    queryFn: getCabins,
  });

  return { isLoading, cabins, error };
}
