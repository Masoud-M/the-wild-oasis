import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";

export function useBookings() {
  const {
    isLoading,
    data: bookings,
    error,
  } = useQuery({
    queryKey: ["bookings"],
    // queryFn needs to return a promise so we could simply use a fetch() function but we are gonna use our own function here.
    queryFn: getBookings,
  });

  return { isLoading, bookings, error };
}
