import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),

    onSuccess: (data) => {
      // after a successful login, we can just navigate to the dashboard but because of implementations, reactQuery would try to download the user data again, which is not necessary and its a waste of resources. instead we just manually set the data in the query cache with the queryClinet and passing the queryKey and the value.
      queryClient.setQueriesData(["user"], data);
      navigate("/dashboard");
    },

    onError: (err) => {
      console.log("Error", err);

      toast.error("Provided email or password are incorrect");
    },
  });

  return { login, isLoading };
}
