import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";

export function useBookings() {
  const [searchParams] = useSearchParams();

  // FILTER
  const filterValue = searchParams.get("status");
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : {
          field: "status",
          value: filterValue,
        };
  // : {
  //     field: "totalPrice",
  //     value: 5000,
  // method: "gte";
  // //   };

  const {
    isLoading,
    data: bookings,
    error,
  } = useQuery({
    // filter value in the queryKey in also used like dependency array in useEffect, and it will make the reactQuery to reload the page
    queryKey: ["bookings", filter],
    // queryFn needs to return a promise so we could simply use a fetch() function but we are gonna use our own function here.
    queryFn: () => getBookings({ filter }),
  });

  return { isLoading, bookings, error };
}
