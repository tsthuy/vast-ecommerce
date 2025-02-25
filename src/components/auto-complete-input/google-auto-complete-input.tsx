"use client";

import { useEffect, useRef, useState } from "react";

import { FormControl } from "../ui/form";
import { Input } from "../ui/input";

import { AddressCompletionModal } from "./address-complettion-modal";

interface AddressComponent {
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
}

interface EnhancedGooglePlacesInputProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export function EnhancedGooglePlacesInput({
  value,
  onChange,
  className,
}: EnhancedGooglePlacesInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [missingComponents, setMissingComponents] = useState<string[]>([]);
  const [addressComponents, setAddressComponents] = useState<AddressComponent>(
    {}
  );
  const [selectedAddress, setSelectedAddress] = useState("");

  useEffect(() => {
    if (typeof window === "undefined" || !window.google || !inputRef.current)
      return;

    const google = window.google;

    autocompleteRef.current = new google.maps.places.Autocomplete(
      inputRef.current,
      {
        componentRestrictions: { country: "vi" },
        fields: ["address_components", "formatted_address"],
      }
    );

    const listener = autocompleteRef.current.addListener(
      "place_changed",
      () => {
        const place = autocompleteRef.current?.getPlace();
        if (!place?.address_components) return;

        const components: AddressComponent = {};
        const missing: string[] = [];

        // Extract address components
        place.address_components.forEach((component) => {
          const types = component.types;

          if (types.includes("locality") || types.includes("sublocality")) {
            components.city = component.long_name;
          }

          if (types.includes("administrative_area_level_1")) {
            components.state = component.long_name;
          }

          if (types.includes("postal_code")) {
            components.postalCode = component.long_name;
          }

          if (types.includes("country")) {
            components.country = component.long_name;
          }
        });

        // Check for missing components
        if (!components.city) missing.push("city");
        if (!components.state) missing.push("state");
        if (!components.postalCode) missing.push("postalCode");
        if (!components.country) missing.push("country");

        setAddressComponents(components);
        setSelectedAddress(place.formatted_address || "");

        if (missing.length > 0) {
          setMissingComponents(missing);
          setIsModalOpen(true);
        } else {
          // If all components are present, update the form
          const fullAddress = formatAddress(
            components,
            place.formatted_address || ""
          );
          onChange(fullAddress);
        }
      }
    );

    return () => {
      google.maps.event.removeListener(listener);
      autocompleteRef.current = null;
    };
  }, [onChange]);

  const formatAddress = (
    components: AddressComponent,
    baseAddress: string
  ): string => {
    // Format the complete address with all components
    const parts = [
      baseAddress,
      components.city,
      components.state,
      components.postalCode,
      components.country,
    ].filter(Boolean);

    return parts.join(", ");
  };

  const handleModalComplete = (completedComponents: AddressComponent) => {
    const mergedComponents = { ...addressComponents, ...completedComponents };
    const fullAddress = formatAddress(mergedComponents, selectedAddress);
    onChange(fullAddress);
  };

  return (
    <>
      <FormControl>
        <Input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={className}
        />
      </FormControl>

      <AddressCompletionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        missingComponents={missingComponents}
        initialComponents={addressComponents}
        onComplete={handleModalComplete}
      />
    </>
  );
}
