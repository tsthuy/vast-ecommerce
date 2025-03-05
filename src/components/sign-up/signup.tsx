"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import type React from "react";
import { toast } from "sonner";

import { loginWithGoogle, signUpWithEmail } from "~/libs/auth.lib";

import { customErrorMessage } from "~/utils/custom-error.util";

import { useAuthStore } from "~/stores/auth.store";

import Container from "../container";
import MyButton from "../custom/button";

export const SignUp = () => {
  const { t } = useTranslation("auth");

  const { callbackUrl } = useAuthStore();

  const [name, setName] = useState("");
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    if (isLoading) return;

    e.preventDefault();
    setIsLoading(true);
    try {
      await signUpWithEmail(name, emailOrPhone, password);

      if (!callbackUrl) {
        router.push("/");
        toast.success(t("account_created_successfully"));
      }
    } catch (error) {
      toast.error(customErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    if (isLoading) return;

    try {
      await loginWithGoogle();

      if (!callbackUrl) {
        router.push("/");
        toast.success(t("login_successfully"));
      }
    } catch (error) {
      toast.error(customErrorMessage(error));
    }
  };

  return (
    <>
      <div className="mb-[140px] mt-[60px] justify-end bg-contain bg-left bg-no-repeat lg:bg-[url('/images/banner.png')]">
        <Container className="flex justify-center lg:justify-end">
          <div className="flex flex-col justify-end py-10 xl:py-[100px]">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
              <h1 className="font-inter text-36 font-medium tracking-[0.04em]">
                {t("create_an_account")}
              </h1>

              <p className="pb-[48px] pt-[24px]">
                {t("enter_ur_details_below")}
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="border-b">
                  <input
                    disabled={isLoading}
                    type="text"
                    name="name"
                    placeholder={t("name")}
                    required
                    onChange={(e) => setName(e.target.value)}
                    className="block w-full rounded-md border-none py-2 pl-0 text-16 font-normal outline-none focus:border-none focus:outline-none"
                  />
                </div>

                <div className="border-b">
                  <input
                    disabled={isLoading}
                    type="text"
                    name="emailOrPhone"
                    placeholder={t("email_or_phone_number")}
                    required
                    onChange={(e) => setEmailOrPhone(e.target.value)}
                    className="block w-full rounded-md border-0 py-2 pl-0 text-16 font-normal focus:border-none focus:outline-none"
                  />
                </div>

                <div className="border-b">
                  <input
                    disabled={isLoading}
                    type="password"
                    name="password"
                    placeholder={t("password")}
                    required
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full rounded-md border-0 py-2 pl-0 text-16 font-normal focus:border-none focus:outline-none"
                  />
                </div>

                <div>
                  <MyButton disabled={isLoading} className="w-full">
                    {" "}
                    {t("create_account")}
                  </MyButton>
                </div>
              </form>

              <div className="pt-4">
                <MyButton
                  onClick={handleGoogleSignIn}
                  className="w-full border border-black bg-transparent text-black hover:bg-button-1"
                >
                  <Image
                    src={"/images/google.png"}
                    alt="Google logo"
                    width={20}
                    height={20}
                  />

                  {t("sign_up_with_google")}
                </MyButton>
              </div>

              <p className="text-muted-foreground mt-8 text-center text-sm">
                {t("already_have_account")}{" "}
                <Link
                  href="/login"
                  className="text-black underline opacity-70 hover:text-link hover:opacity-100"
                >
                  {t("login")}
                </Link>
              </p>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};
