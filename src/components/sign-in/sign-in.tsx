"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import type React from "react";

import { loginWithEmail, loginWithGoogle } from "~/libs/auth.lib";

import Container from "../container";
import MyButton from "../custom/button";

export const SignIn = () => {
  const { t } = useTranslation("auth");
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await loginWithEmail(email, password);
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await loginWithGoogle();
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="xl:bg-[url('/images/banner.png')] bg-no-repeat justify-end bg-left mt-[60px] mb-[140px]">
        <Container className="flex xl:justify-end justify-center">
          <div className="flex flex-col justify-end  py-[125px] ">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
              <h1 className="text-36 font-medium font-inter tracking-[0.04em]">
                {t("login_in_to_exclusive")}
              </h1>

              <p className="pt-[24px] pb-[48px]">
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
                    className="text-16 font-normal block w-full rounded-md border-0 py-2 pl-0 focus:outline-none focus:border-none"
                  />
                </div>

                <div className="border-b">
                  <input
                    type="password"
                    name="password"
                    placeholder={t("password")}
                    required
                    onChange={(e) => setPassword(e.target.value)}
                    className="text-16 font-normal block w-full rounded-md border-0 py-2 pl-0 focus:outline-none focus:border-none"
                  />
                </div>

                <div className="flex justify-between items-center">
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

                <div>
                  <MyButton
                    onClick={handleGoogleSignIn}
                    className="w-full bg-transparent text-black border border-black hover:bg-button-1"
                  >
                    <Image
                      src={"/images/google.png"}
                      alt="Google logo"
                      width={20}
                      height={20}
                    />

                    {t("sign_in_with_google")}
                  </MyButton>
                </div>
              </form>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};
