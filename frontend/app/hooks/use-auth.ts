import { postData } from "@/lib/fetch-utils";
// utility function to send POST requests (custom wrapper around fetch/axios)

import type { SigninUpFormData } from "@/routes/auth/sign-up";
// TypeScript type for the form data used during sign-up

import { useMutation } from "@tanstack/react-query";
// React Query hook for handling server mutations (e.g., POST requests)

export const userSignUpMutation = () => {
  return useMutation({
    // mutationFn is the function that performs the mutation (API call)
    mutationFn: (data: SigninUpFormData) => postData("/auth/register", data),
    // sends a POST request to /auth/register with form data
  });
};
