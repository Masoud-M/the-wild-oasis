import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";

import toast from "react-hot-toast";

export function useCreateCabin() {
  const queryClient = useQueryClient();

  // useMutation hook gives us access to the mutate function which allows us to mutate the data with the specified mutationFn, in this case the createCabin function that we created. and if it is successful, then using useQueryClient we can get access to the queryClient and invalidate the query with the key of cabins in order to reload the page. and then using the reset function coming from react hook form, resetting the form.
  const { mutate: createCabin, isLoading: isCreating } = useMutation({
    mutationFn: createEditCabin,
    onSuccess: () => {
      toast.success("New cabin successfully created");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isCreating, createCabin };
}
