import { useMutation } from "convex/react";
import { useState } from "react";

export const useApiMutaion = (mutationFunction: any) => {
  const [pending, setPending] = useState(false);
  const apiMutaion = useMutation(mutationFunction);
  const mutate = (payload: any) => {
    setPending(true);
    return apiMutaion(payload)
      .finally(() => setPending(false))
      .then((result) => {
        return result;
      })
      .catch((error) => {
        throw error;
      });
  };
  return { mutate, pending };
};
