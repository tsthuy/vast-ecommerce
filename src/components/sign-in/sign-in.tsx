"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import type React from "react";
import { toast } from "sonner";

import { loginWithEmail } from "~/libs/auth.lib";

import { customErrorMessage } from "~/utils/custom-error.util";

import Container from "../container";
import MyButton from "../custom/button";
import Loader8 from "../loader8";

export const SignIn = () => {
  const { t } = useTranslation("common");
  const router = useRouter();

  const { callbackUrl } = router.query;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await loginWithEmail(email, password);

      if (callbackUrl) {
        router.push(callbackUrl as string);
        toast.success(t("auth.login_successfully"));
      } else router.push("/");
      toast.success(t("auth.login_successfully"));
    } catch (error) {
      toast.error(customErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="mb-[140px] mt-[60px] justify-end bg-contain bg-left bg-no-repeat lg:bg-[url('/images/banner.png')]">
        <Container className="flex justify-center lg:justify-end">
          <div className="flex flex-col justify-end py-10 xl:py-[125px]">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
              <h1 className="font-inter text-36 font-medium tracking-[0.04em]">
                {t("auth.login_in_to_exclusive")}
              </h1>

              <p className="pb-[48px] pt-[24px]">
                {t("auth.enter_ur_details_below")}
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="border-b">
                  <input
                    type="text"
                    name="emailOrPhone"
                    placeholder={t("auth.email_or_phone_number")}
                    disabled={isLoading}
                    required
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full rounded-md border-0 py-2 pl-0 text-16 font-normal focus:border-none focus:outline-none"
                  />
                </div>

                <div className="border-b">
                  <input
                    type="password"
                    name="password"
                    placeholder={t("auth.password")}
                    disabled={isLoading}
                    required
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full rounded-md border-0 py-2 pl-0 text-16 font-normal focus:border-none focus:outline-none"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <MyButton disabled={isLoading} className="">
                      {isLoading && <Loader8 />}
                      {t("auth.login")}
                    </MyButton>
                  </div>

                  <div>
                    <Link
                      className="text-button-2 hover:underline"
                      href={"/forgot-password"}
                    >
                      {t("auth.forget_password")}
                    </Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};
