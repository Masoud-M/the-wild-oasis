import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateCurrentUser } from "../../services/apiAuth";

export function useUpdateUser() {
  const queryClient = useQueryClient();
  const { mutate: updateUser, isLoading: isUpdating } = useMutation({
    mutationFn: updateCurrentUser,
    onSuccess: () => {
      toast.success("User account successfully updated");
      // queryClient.setQueryData("user", user);
      queryClient.invalidateQueries({ queryKey: ["user"] });
      // this method of invalidating the query catch doesn't work as inted and won't reload the page after updating avatar so we use another method which is to set the query manually
    },
    onError: (err) => toast.error(err.message),
  });

  return { updateUser, isUpdating };
}
