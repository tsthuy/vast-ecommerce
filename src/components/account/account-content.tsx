"use client";

import { useEffect } from "react";
// Firebase imports
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

import { splitComplexName } from "~/libs/name.lib";

import { useAuthStore } from "~/stores/auth.store";

import MyButton from "../custom/button";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z
  .object({
    first_name: z.string().min(1, "First name is required").optional(),
    last_name: z.string().min(1, "Last name is required").optional(), 
    email: z.string().email("Invalid email").min(1, "Email is required"),
    address: z.string().optional(),
    current_password: z.string().optional(),
    new_password: z.string().optional(),
    confirm_new_password: z.string().optional(),
  })
  .refine((data) => !data.new_password || data.new_password === data.confirm_new_password, {
    message: "Passwords must match",
    path: ["confirm_new_password"],
  });

export default function AccountContent() {
  const { user } = useAuthStore();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      address: "",
      current_password: "",
      new_password: "",
      confirm_new_password: "",
    },
  });
  
  function onSubmit(values: z.infer < typeof formSchema > ) {
    try {
      console.log(values);
      toast(
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>
      );
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
    }
  }

  useEffect(() => {
    if (user) {
      const { firstName, lastName } = splitComplexName(user.displayName || "");
      form.reset({
        first_name: firstName || "",
        last_name: lastName || "",
        email: user.email || "",
        address: "", 
      }); 
    }
  }, [user, form]);

  return (
    <div className="w-3/4 lg:shadow py-10 flex-1 px-2">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 max-w-2xl mx-auto">
          <h2 className="text-20 font-medium text-button-2">Edit Your Profile</h2>

          <div className="grid md:grid-cols-12 gap-4">
            <div className="col-span-6">
              <FormField
                control={form.control}
                name="first_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-16 font-normal">First Name</FormLabel>
                    <FormControl>
                      <Input
                        className="py-5 bg-secondary-2"
                        placeholder="Md"
                        type="text"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="col-span-6">
              <FormField
                control={form.control}
                name="last_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-16 font-normal">Last Name</FormLabel>
                    <FormControl>
                      <Input
                        className="py-5 bg-secondary-2"
                        placeholder="Rimel"
                        type="text"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="grid md:grid-cols-12 gap-4">
            <div className="col-span-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-16 font-normal">Email</FormLabel>
                    <FormControl>
                      <Input
                        className="py-5 bg-secondary-2"
                        placeholder="rimel1111@hmail.com"
                        type="email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="col-span-6">
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-16 font-normal">Address</FormLabel>
                    <FormControl>
                      <Input
                        className="py-5 bg-secondary-2"
                        placeholder="Kingston, 5236, United State"
                        type="text"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <FormField
            control={form.control}
            name="current_password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-16 font-normal">Password Changes</FormLabel>
                <FormControl>
                  <Input
                    className="py-5 bg-secondary-2"
                    placeholder="Current Password"
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="new_password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-16 font-normal">New Password</FormLabel>
                <FormControl>
                  <Input
                    className="py-5 bg-secondary-2"
                    placeholder="New Password"
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirm_new_password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-16 font-normal">Confirm New Password</FormLabel>
                <FormControl>
                  <Input
                    className="py-5 bg-secondary-2"
                    placeholder="Confirm New Password"
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end items-center gap-8">
            <Button variant={"ghost"}>Cancel</Button>
            <MyButton type="submit">Save Changes</MyButton>
          </div>
        </form>
      </Form>
    </div>
  );
}