"use client";

import { useEffect } from "react";
import { useTranslation } from "next-i18next";
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
  .refine(
    (data) =>
      !data.new_password || data.new_password === data.confirm_new_password,
    {
      message: "Passwords must match",
      path: ["confirm_new_password"],
    }
  );

export default function AccountContent() {
  const { t } = useTranslation(["account", "common"]);
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

  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
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
    <div className="px-2 sm:w-3/4 sm:flex-1 lg:py-10 lg:shadow">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mx-auto max-w-2xl space-y-4"
        >
          <h2 className="text-center text-20 font-medium text-button-2">
            {t("edit_ur_profile")}
          </h2>

          <div className="grid gap-4 md:grid-cols-12">
            <div className="col-span-6">
              <FormField
                control={form.control}
                name="first_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-16 font-normal">
                      {t("first_name")}
                    </FormLabel>

                    <FormControl>
                      <Input
                        className="bg-secondary-2 py-5"
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
                    <FormLabel className="text-16 font-normal">
                      {t("last_name")}
                    </FormLabel>

                    <FormControl>
                      <Input
                        className="bg-secondary-2 py-5"
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

          <div className="grid gap-4 md:grid-cols-12">
            <div className="col-span-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-16 font-normal">Email</FormLabel>

                    <FormControl>
                      <Input
                        className="bg-secondary-2 py-5"
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
                    <FormLabel className="text-16 font-normal">
                      {t("address")}
                    </FormLabel>

                    <FormControl>
                      <Input
                        className="bg-secondary-2 py-5"
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
                <FormLabel className="text-16 font-normal">
                  {t("password_changes")}
                </FormLabel>

                <FormControl>
                  <Input
                    className="bg-secondary-2 py-5"
                    placeholder={t("current_password")}
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
                <FormLabel className="text-16 font-normal">
                  {t("new_password")}
                </FormLabel>

                <FormControl>
                  <Input
                    className="bg-secondary-2 py-5"
                    placeholder={t("new_password")}
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
                <FormLabel className="text-16 font-normal">
                  {t("account:confirm_new_password")}
                </FormLabel>

                <FormControl>
                  <Input
                    className="bg-secondary-2 py-5"
                    placeholder="Confirm New Password"
                    type="password"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex items-center justify-end gap-8">
            <Button variant={"ghost"}>{t("cancel")}</Button>

            <MyButton type="submit">{t("save_changes")}</MyButton>
          </div>
        </form>
      </Form>
    </div>
  );
}
