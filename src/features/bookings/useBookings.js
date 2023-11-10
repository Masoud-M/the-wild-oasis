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

  // SORT
  const sortByRaw = searchParams.get("sortBy") || "startDate-desc";
  const [field, direction] = sortByRaw.split("-");
  const sortBy = { field, direction };

  // PAGINATION
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  // setting data's default value to an empty object cuz otherwise it will be undefined at first and cuz a bug
  const {
    isLoading,
    data: { data: bookings, count } = {},
    // data: bookings,
    error,
  } = useQuery({
    // filter and sortBy values in the queryKey are used like dependency array in useEffect, and it will make the reactQuery to reload the page
    queryKey: ["bookings", filter, sortBy, page],
    // queryFn needs to return a promise so we could simply use a fetch() function but we are gonna use our own function here.
    queryFn: () => getBookings({ filter, sortBy, page }),
  });

  return { isLoading, bookings, error, count };
}
