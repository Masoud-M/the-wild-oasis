import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabin as deleteCabinApi } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useDeleteCabin() {
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deleteCabin } = useMutation({
    // mutationFn: (id) => deleteCabin(id),
    // cuz we were inputting the same value were calling in the function, this is a more simple way to do it
    mutationFn: deleteCabinApi,
    onSuccess: () => {
      toast.success("Cabin successfully Deleted");

      // by invalidating queryClient cache, it will refetch the data and reload the page
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deleteCabin };
}
