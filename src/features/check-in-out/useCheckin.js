import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useCheckin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: checkin, isLoading: isCheckingIn } = useMutation({
    mutationFn: ({ bookingId, breakfast }) =>
      updateBooking(bookingId, {
        status: "checked-in",
        isPaid: true,
        ...breakfast,
        // hasBreakfast, extrasPrice and totalPrice coming from breakfast object are getting spread and added to object and be sent to supabase to update the table
      }),

    // the data is the returned value of mutationFn
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} successfully checked in`);

      // we can pass in the query key to invalidate or we can pass an object with property active to invalidate all the queries that are active at the moment
      queryClient.invalidateQueries({ active: true });
      navigate("/");
    },

    onError: () => toast.error("There was an error while checking in"),
  });

  return { checkin, isCheckingIn };
}
