import { signUpSchema } from "@/lib/schemas";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import type z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  CREATE_ACCOUNT,
  CREATE_ACCOUNT_DESCRIPTION,
  SIGN_IN,
  SIGN_UP,
  SIGNING_UP,
} from "@/lib/constants";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router";
import { PUBLIC_ROUTES } from "@/lib/routes";
import { userSignUpMutation } from "@/hooks/use-auth";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export type SigninUpFormData = z.infer<typeof signUpSchema>;

const SignUp = () => {
  const navigate = useNavigate();
  const [showLoader, setShowLoader] = useState(false);

  const form = useForm<SigninUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const { mutate, isPending } = userSignUpMutation();

  const handleOnSubmit = (values: SigninUpFormData) => {
    mutate(values, {
      onSuccess: () => {
        toast.success("Account created successfully");
        setShowLoader(true); // hide form, show loader
        setTimeout(() => {
          form.reset();
          navigate(PUBLIC_ROUTES.SIGN_IN);
        }, 5000); // wait 5 sec then redirect
      },
      onError: (error: any) => {
        const errorMessage =
          error.response?.data?.message || "An error occured";
        toast.error(errorMessage);
      },
    });
  };

  if (showLoader) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
        <p className="mt-4 text-lg font-medium">{SIGNING_UP}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <Card className="max-w-md w-full shadow-xl">
        <CardHeader className="text-center pb-5">
          <CardTitle className="text-2xl font-bold">{CREATE_ACCOUNT}</CardTitle>
          <CardDescription className="text-sm text-muted-foreground">
            {CREATE_ACCOUNT_DESCRIPTION}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleOnSubmit)}
              className="space-y-4"
            >
              <FormField
                name="name"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Vishal Kulkarni"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="email"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="email@example.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="password"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="********"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="confirmPassword"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="********"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isPending}>
                {isPending ? SIGNING_UP : SIGN_UP}
              </Button>
            </form>
          </Form>
          <CardFooter className="flex justify-center items-center mt-5">
            <div className="flex items-center justify-center">
              <p className="text-sm text-muted-foreground">
                Already Have an account?{" "}
                <Link
                  to={PUBLIC_ROUTES.SIGN_IN}
                  className="text-blue-700 hover:underline"
                >
                  {SIGN_IN}
                </Link>
              </p>
            </div>
          </CardFooter>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignUp;
