import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { getBookingsAfterDate } from "../../services/apiBookings";

export function useRecentBookings() {
  const [searchParams] = useSearchParams();

  const numDays = !searchParams.get("last")
    ? 7
    : Number(searchParams.get("last"));

  // we need to calculate the date based on the numDays and for that we use subDays function to subtract these two
  const queryDate = subDays(new Date(), numDays).toISOString();

  const { isLoading, data: bookings } = useQuery({
    queryFn: () => getBookingsAfterDate(queryDate),
    // since we have another query with the queryKey of bookings we use a template literal and add the number of days to it so it can be refetch after changing the filter
    queryKey: ["bookings", `last-${numDays}`],
  });

  return { isLoading, bookings };
}
