import { signInSchema } from "@/lib/schemas";
import React from "react";
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
  FORGOT_PASSWORD,
  SIGN_IN,
  SIGN_UP,
  WELCOME_BACK,
  WELCOME_BACK_DESCRIPTION,
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
import { userLoginMutation } from "@/hooks/use-auth";
import { toast } from "sonner";

type SigninFormData = z.infer<typeof signInSchema>;

const SignIn = () => {
  const navigate = useNavigate();
  const { mutate, isPending } = userLoginMutation();
  const form = useForm<SigninFormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleOnSubmit = (values: SigninFormData) => {
    mutate(values, {
      onSuccess: (data) => {
        console.log(data);
        toast.success("Login succesful");
        navigate("/dashboard");
      },
      onError: (error: any) => {
        const errorMessage =
          error.response?.data?.message || "An error occured";
        toast.error(errorMessage);
      },
    });
  };
  return (
    <div className="min-h-screen flex flex-col items-center justify-center  p-4">
      <Card className="max-w-md w-full shadow-xl">
        <CardHeader className="text-center pb-5">
          <CardTitle className="text-2xl font-bold">{WELCOME_BACK}</CardTitle>
          <CardDescription className="text-sm text-muted-foreground">
            {WELCOME_BACK_DESCRIPTION}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleOnSubmit)}
              className="space-y-4"
            >
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
                    <div className="flex items-center justify-between">
                      <FormLabel>Password</FormLabel>
                      <Link
                        to={PUBLIC_ROUTES.FORGOT_PASSWORD}
                        className="text-sm text-blue-600"
                      >
                        {FORGOT_PASSWORD}
                      </Link>
                    </div>
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
              <Button type="submit" className="w-full ">
                {SIGN_IN}
              </Button>
            </form>
          </Form>
          <CardFooter className="flex justify-center items-center mt-5">
            <div className="flex items-center justify-center ">
              <p className="text-sm text-muted-foreground">
                Don&apos;t have an account?{" "}
                <Link
                  to={PUBLIC_ROUTES.SIGN_UP}
                  className="text-blue-700 hover:underline"
                >
                  {SIGN_UP}
                </Link>
              </p>
            </div>
          </CardFooter>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignIn;
