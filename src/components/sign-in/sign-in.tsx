"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import type React from "react";
import { toast } from "sonner";

import { loginWithEmail } from "~/libs/auth.lib";

import { customErrorMessage } from "~/utils/custom-error.util";

import { useAuthStore } from "~/stores/auth.store";

import Container from "../container";
import MyButton from "../custom/button";
import Spinner from "../ui/spinner";

export const SignIn = () => {
  const { t } = useTranslation("auth");
  const router = useRouter();

  const { callbackUrl } = useAuthStore();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    if (loading) return;

    e.preventDefault();
    setLoading(true);

    try {
      await loginWithEmail(email, password);

      if (!callbackUrl) {
        router.push("/");
        toast.success(t("login_successfully"));
      }
    } catch (error) {
      toast.error(customErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <Spinner />}

      <div className="mb-[140px] mt-[60px] justify-end bg-contain bg-left bg-no-repeat lg:bg-[url('/images/banner.png')]">
        <Container className="flex justify-center lg:justify-end">
          <div className="flex flex-col justify-end py-10 xl:py-[125px]">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
              <h1 className="font-inter text-36 font-medium tracking-[0.04em]">
                {t("login_in_to_exclusive")}
              </h1>

              <p className="pb-[48px] pt-[24px]">
                {t("enter_ur_details_below")}
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="border-b">
                  <input
                    type="text"
                    name="emailOrPhone"
                    placeholder={t("email_or_phone_number")}
                    required
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full rounded-md border-0 py-2 pl-0 text-16 font-normal focus:border-none focus:outline-none"
                  />
                </div>

                <div className="border-b">
                  <input
                    type="password"
                    name="password"
                    placeholder={t("password")}
                    required
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full rounded-md border-0 py-2 pl-0 text-16 font-normal focus:border-none focus:outline-none"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <MyButton className="">{t("login")}</MyButton>
                  </div>

                  <div>
                    <Link
                      className="text-button-2 hover:underline"
                      href={"/forgot-password"}
                    >
                      {t("forget_password")}
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
