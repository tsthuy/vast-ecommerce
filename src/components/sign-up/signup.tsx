"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import type React from "react";

import { signUpWithEmail, signUpWithPhone } from "~/libs/auth.lib";

import Container from "../container";
import MyButton from "../custom/button";

export const SignUp = () => {
  const { t } = useTranslation("auth");

  const [name, setName] = useState("");
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (validateEmail(emailOrPhone)) {
        await signUpWithEmail(emailOrPhone, password, name);
      } else if (validatePhone(emailOrPhone)) {
        await signUpWithPhone(emailOrPhone, name);
      } else {
        throw new Error("Invalid email or phone number.");
      }

      router.push("/");
    } catch (error) {
      console.log("Error creating user", error);
    }
  };

  const validateEmail = (input: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(input);
  };

  const validatePhone = (input: string) => {
    const phoneRegex = /^\+?[1-9]\d{1,14}$/;
    console.log(phoneRegex.test(input));
    return phoneRegex.test(input);
  };

  return (
    <>
      <div className="xl:bg-[url('/images/banner.png')] bg-no-repeat justify-left bg-left mt-[60px] mb-[140px]">
        <Container className="flex justify-center xl:justify-end">
          <div className="flex flex-col justify-end  py-[125px] ">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
              <h1 className="text-36 font-medium font-inter tracking-[0.04em]">
                {t("create_an_account")}
              </h1>

              <p className="pt-[24px] pb-[48px]">Enter your details below</p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="border-b">
                  <input
                    type="text"
                    name="name"
                    placeholder={t("name")}
                    required
                    onChange={(e) => setName(e.target.value)}
                    className="text-16 font-normal block w-full rounded-md border-none outline-none py-2 pl-0 focus:outline-none focus:border-none "
                  />
                </div>

                <div className="border-b">
                  <input
                    type="text"
                    name="emailOrPhone"
                    placeholder={t("email_or_phone_number")}
                    required
                    onChange={(e) => setEmailOrPhone(e.target.value)}
                    className="text-16 font-normal block w-full rounded-md border-0 py-2 pl-0 focus:outline-none focus:border-none"
                  />
                </div>

                {/* Show password field only for email sign-up */}
                {validateEmail(emailOrPhone) && (
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
                )}

                <div>
                  <MyButton className="w-full"> {t("create_account")}</MyButton>
                </div>

                <div>
                  <MyButton className="w-full bg-transparent text-black border border-black hover:bg-button-1">
                    <Image
                      src={"/images/google.png"}
                      alt="Google logo"
                      width={20}
                      height={20}
                    />

                    {t("sign_up_with_google")}
                  </MyButton>
                </div>
              </form>

              <p className="mt-8 text-center text-sm text-muted-foreground">
                {t("already_have_account")}{" "}
                <Link
                  href="/login"
                  className="text-black opacity-70 underline hover:text-link hover:opacity-100"
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
