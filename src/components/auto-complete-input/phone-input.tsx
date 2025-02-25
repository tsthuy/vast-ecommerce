import React, { useEffect, useRef, useState } from "react";
import intlTelInput from "intl-tel-input";

import { cn } from "~/libs/utils";

import { Input } from "../ui/input";

import "intl-tel-input/build/css/intlTelInput.css";

interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  onValidation: (isValid: boolean, errorMessage: string) => void;
}

const PhoneInput: React.FC<PhoneInputProps> = ({
  value,
  onChange,
  onValidation,
}) => {
  const phoneInputRef = useRef<HTMLInputElement>(null);
  const itiInstance = useRef<intlTelInput.Plugin | null>(null);
  const [isValid, setIsValid] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    if (phoneInputRef.current) {
      const iti = intlTelInput(phoneInputRef.current, {
        utilsScript:
          "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
        initialCountry: "auto",
        nationalMode: true,
        geoIpLookup: (callback) => {
          fetch("https://ipapi.co/json/")
            .then((res) => res.json())
            .then((data) => callback(data.country_code))
            .catch(() => callback("us"));
        },
      });

      itiInstance.current = iti;

      const handleBlur = () => {
        if (iti.isValidNumber()) {
          setIsValid(true);
          setErrorMessage("");
          const phoneNumber = iti.getNumber();
          onChange(phoneNumber);
          onValidation(true, "");
        } else {
          setIsValid(false);
          const errorCode = iti.getValidationError();
          const errorMessage = getErrorMessage(errorCode);
          setErrorMessage(errorMessage);
          onValidation(false, errorMessage);
        }
      };

      phoneInputRef.current.addEventListener("blur", handleBlur);

      return () => {
        if (phoneInputRef.current) {
          phoneInputRef.current.removeEventListener("blur", handleBlur);
        }
        iti.destroy();
      };
    }
  }, []);

  useEffect(() => {
    if (itiInstance.current && phoneInputRef.current) {
      const sanitizedValue = value || "";
      const currentValue = itiInstance.current.getNumber();

      if (currentValue !== sanitizedValue) {
        phoneInputRef.current.value = sanitizedValue;
        itiInstance.current.setNumber(sanitizedValue);
      }
    }
  }, [value]);

  const getErrorMessage = (errorCode: number): string => {
    switch (errorCode) {
      case 0:
        return "The phone number is possible.";
      case 1:
        return "Invalid country code.";
      case 2:
        return "The phone number is too short.";
      case 3:
        return "The phone number is too long.";
      case 4:
        return "The input is not a valid number.";
      default:
        return "Invalid phone number.";
    }
  };

  return (
    <div className="relative flex flex-col">
      <Input
        ref={phoneInputRef}
        type="tel"
        id="phone"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={cn(!isValid ? "error" : "", "bg-secondary-2 py-5 w-full")}
      />
    </div>
  );
};

export default PhoneInput;
