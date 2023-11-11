import { useQuery } from "@tanstack/react-query";
import { getBooking } from "../../services/apiBookings";
import { useParams } from "react-router-dom";

export function useBooking() {
  const { bookingId } = useParams();

  const {
    isLoading,
    data: booking,
    error,
  } = useQuery({
    queryKey: ["booking", bookingId],
    // queryFn needs to return a promise so we could simply use a fetch() function but we are gonna use our own functions here.
    queryFn: () => getBooking(bookingId),
    // by default reactQuery will try to fetch the data 3 times but it doesn't make that much sense here so we turned it off
    retry: false,
  });

  return { isLoading, booking, error };
}
