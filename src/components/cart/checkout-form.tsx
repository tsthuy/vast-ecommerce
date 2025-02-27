"use client";

import { forwardRef, useImperativeHandle } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

import PhoneInput from "../auto-complete-input/phone-input";
import { Checkbox } from "../ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  first_name: z.string().min(1),
  company: z.string().min(1).optional(),
  street_address: z.string().min(1),
  apartment: z.string().min(1).optional(),
  town_city: z.string().min(1),
  phone_number: z.string().min(1),
  email: z.string().email(),
  save_term: z.boolean().default(true).optional(),
});

export type CheckOutFormHandle = {
  triggerFormValidation: () => Promise<boolean>;
  getFormValues: () => z.infer<typeof formSchema>;
};

const CheckOutForm = forwardRef<CheckOutFormHandle>((props, ref) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onBlur",
  });

  useImperativeHandle(ref, () => ({
    triggerFormValidation: () => form.trigger(),
    getFormValues: () => form.getValues(),
  }));

  function onSubmit(values: z.infer<typeof formSchema>) {
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

  return (
    
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 py-10 md:w-[40%]"
      >
        <FormField
          control={form.control}
          name="first_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                First Name<span className="text-red-600">*</span>
              </FormLabel>

              <FormControl>
                <Input
                  className="py-5 bg-secondary-2"
                  placeholder=""
                  type=""
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="company"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company Name</FormLabel>

              <FormControl>
                <Input
                  className="py-5 bg-secondary-2"
                  placeholder=""
                  type=""
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        {/* <FormField
          control={form.control}
          name="street_address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Street Address<span className="text-red-600">*</span>
              </FormLabel>
              <EnhancedGooglePlacesInput
                value={field.value}
                onChange={field.onChange}
                className="py-5 bg-secondary-2"
              />
              <FormMessage />
            </FormItem>
          )}
        /> */}

        <FormField
          control={form.control}
          name="street_address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Street Address<span className="text-red-600">*</span>
              </FormLabel>

              <FormControl>
                <Input
                  className="py-5 bg-secondary-2"
                  placeholder=""
                  type=""
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="apartment"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Apartment, floor, etc. (optional)</FormLabel>

              <FormControl>
                <Input
                  className="py-5 bg-secondary-2"
                  placeholder=""
                  type=""
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="town_city"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Town/City<span className="text-red-600">*</span>
              </FormLabel>

              <FormControl>
                <Input
                  className="py-5 bg-secondary-2"
                  placeholder=""
                  type=""
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        {/* Phone Input */}
        <FormField
          control={form.control}
          name="phone_number"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Phone Number<span className="text-red-600">*</span>
              </FormLabel>
              <FormControl>
                <PhoneInput
                  value={field.value}
                  onChange={field.onChange}
                  onValidation={(isValid, errorMessage) => {
                    console.log(isValid, errorMessage);

                    if (!isValid) {
                      form.setError("phone_number", {
                        type: "manual",
                        message: errorMessage,
                      });
                    } else {
                      form.clearErrors("phone_number");
                    }
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Address</FormLabel>

              <FormControl>
                <Input
                  className="py-5 bg-secondary-2"
                  placeholder=""
                  type=""
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="save_term"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md py-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  className="w-6 h-6 data-[state=checked]:bg-red-500"
                />
              </FormControl>

              <div className="space-y-1 leading-none">
                <FormDescription className="text-16 font-normal">
                  Save this information for faster check-out next time
                </FormDescription>

                <FormMessage />
              </div>
            </FormItem>
          )}
        />
      </form>

    </Form>
  );

}
);

CheckOutForm.displayName = "CheckOutForm"; 

export default CheckOutForm;