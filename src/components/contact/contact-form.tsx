"use client";

import { memo } from "react";
import { useTranslation } from "next-i18next";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

import { cn } from "~/libs/utils";

import { customErrorMessage } from "~/utils/custom-error.util";

import MyButton from "../custom/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  name: z.string().min(1),
  email: z.string().min(1),
  phone: z.string().min(1),
  messages: z.string(),
});

export default memo(function ContactForm() {
  const { t } = useTranslation("common");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      toast(
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>
      );
    } catch (error) {
      toast.error(customErrorMessage(error));
    }
  }

  return (
    <div className="flex-1 shadow">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 px-8 py-10"
        >
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12 xl:col-span-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel></FormLabel>

                    <FormControl>
                      <div className="relative">
                        <Input
                          className="bg-secondary-2 py-5 placeholder:text-transparent"
                          type="text"
                          {...field}
                        />

                        <span
                          className={cn(
                            "pointer-events-none absolute inset-y-0 left-4 flex items-center text-sm transition-opacity duration-200",
                            field.value ? "opacity-0" : "opacity-70"
                          )}
                        >
                          {t("contact.ur_name")}

                          <span className="text-red-500">*</span>
                        </span>
                      </div>
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="col-span-12 xl:col-span-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel></FormLabel>

                    <FormControl>
                      <div className="relative">
                        <Input
                          className="bg-secondary-2 py-5 placeholder:text-transparent"
                          type="text"
                          {...field}
                        />

                        <span
                          className={cn(
                            "pointer-events-none absolute inset-y-0 left-4 flex items-center text-sm transition-opacity duration-200",
                            field.value ? "opacity-0" : "opacity-70"
                          )}
                        >
                          {t("contact.ur_email")}

                          <span className="text-red-500">*</span>
                        </span>
                      </div>
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="col-span-12 xl:col-span-4">
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel></FormLabel>

                    <FormControl>
                      <div className="relative">
                        <Input
                          className="bg-secondary-2 py-5 placeholder:text-transparent"
                          type="text"
                          {...field}
                        />

                        <span
                          className={cn(
                            "pointer-events-none absolute inset-y-0 left-4 flex items-center text-sm transition-opacity duration-200",
                            field.value ? "opacity-0" : "opacity-70"
                          )}
                        >
                          {t("contact.ur_phone")}

                          <span className="text-red-500">*</span>
                        </span>
                      </div>
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <FormField
            control={form.control}
            name="messages"
            render={({ field }) => (
              <FormItem>
                <FormLabel></FormLabel>

                <FormControl>
                  <Textarea
                    rows={8}
                    placeholder={t("contact.ur_message")}
                    className="resize-none bg-secondary-2"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end">
            <MyButton>{t("contact.send_messages")}</MyButton>
          </div>
        </form>
      </Form>
    </div>
  );
});
