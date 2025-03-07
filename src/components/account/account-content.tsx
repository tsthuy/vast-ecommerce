"use client";

import { useEffect, useState } from "react";
import { useTranslation } from "next-i18next";
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  sendEmailVerification,
  updateEmail,
  updatePassword,
  updateProfile,
} from "firebase/auth";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

import { auth } from "~/libs/firebase.lib";
import { splitComplexName } from "~/libs/name.lib";

import { customErrorMessage } from "~/utils/custom-error.util";

import { useAuthStore } from "~/stores/auth.store";

import MyButton from "../custom/button";
import Loader8 from "../loader8";
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
    new_password: z
      .string()
      .min(8, "New password must be at least 8 characters")
      .optional(),
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
  console.log("AccountContent");
  const { t } = useTranslation("common");
  const { user, setUser, isLoading: isLoadingAuth } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState<boolean>(false);

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

  useEffect(() => {
    if (user) {
      const { firstName, lastName } = splitComplexName(user.displayName || "");
      form.reset({
        first_name: firstName || "",
        last_name: lastName || "",
        email: user.email || "",
        address: "",
        current_password: "",
        new_password: "",
        confirm_new_password: "",
      });
      setIsEmailVerified(user.emailVerified);
    }
  }, [user, form]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        setIsEmailVerified(firebaseUser.emailVerified);
        setUser(firebaseUser);
      }
    });
    return () => unsubscribe();
  }, [setUser]);

  const reauthenticateUser = async (currentPassword: string) => {
    if (!user || !user.email) {
      throw new Error("User not found or email not available.");
    }

    const credential = EmailAuthProvider.credential(
      user.email,
      currentPassword
    );
    try {
      await reauthenticateWithCredential(user, credential);
    } catch (error) {
      toast.error(customErrorMessage(error, "Failed to reauthenticate user."));
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!user) {
      toast.error("User not logged in.");
      return;
    }

    setIsLoading(true);

    try {
      if (values.email !== user.email || values.new_password) {
        if (!values.current_password) {
          throw new Error(
            "Current password is required to update email or password."
          );
        }
        await reauthenticateUser(values.current_password);
      }

      const fullName = `${values.first_name} ${values.last_name}`;
      if (fullName !== user.displayName) {
        await updateProfile(user, { displayName: fullName });
      }

      if (values.email !== user.email) {
        await updateEmail(user, values.email);
        await sendEmailVerification(user);
        toast.success("Email updated! Please verify your new email.");
      }

      if (values.new_password) {
        await updatePassword(user, values.new_password);
        toast.success("Password updated successfully!");
      }

      const updatedUser = auth.currentUser;
      if (updatedUser) {
        setUser(updatedUser);
      }

      toast.success("Profile updated successfully!");
      form.reset({
        ...values,
        current_password: "",
        new_password: "",
        confirm_new_password: "",
      });
    } catch (erro) {
      toast.error(
        customErrorMessage(erro, "Failed to update profile. Please try again.")
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="px-2 sm:w-3/4 sm:flex-1 lg:py-10 lg:shadow">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mx-auto max-w-2xl space-y-4"
        >
          <h2 className="text-center text-20 font-medium text-button-2">
            {t("account.edit_ur_profile")}
          </h2>

          <div className="grid gap-4 md:grid-cols-12">
            <div className="col-span-6">
              <FormField
                control={form.control}
                name="first_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-16 font-normal">
                      {t("account.first_name")}
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading || isLoadingAuth}
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
                      {t("account.last_name")}
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading || isLoadingAuth}
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
                        disabled={isLoading || isLoadingAuth}
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
                      {t("account.address")}
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading || isLoadingAuth}
                        className="bg-secondary-2 py-5"
                        placeholder="Kingston, 5236, United States"
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
                  {t("account.current_password")}
                </FormLabel>
                <FormControl>
                  <Input
                    className="bg-secondary-2 py-5"
                    placeholder={t("account.current_password")}
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
                  {t("account.new_password")}
                </FormLabel>
                <FormControl>
                  <Input
                    className="bg-secondary-2 py-5"
                    placeholder={t("account.new_password")}
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
                  {t("account.confirm_new_password")}
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
            <Button variant={"ghost"}>{t("account.cancel")}</Button>
            <MyButton type="submit" disabled={isLoading}>
              {isLoading
                ? <Loader8 /> + "Saving..."
                : t("account.save_changes")}
            </MyButton>
          </div>
        </form>
      </Form>
    </div>
  );
}
