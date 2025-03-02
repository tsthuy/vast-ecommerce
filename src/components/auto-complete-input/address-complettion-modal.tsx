"use client";

import { useState } from "react";
import type React from "react";

import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

interface AddressComponent {
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
}

interface AddressCompletionModalProps {
  isOpen: boolean;
  onClose: () => void;
  missingComponents: string[];
  initialComponents: AddressComponent;
  onComplete: (components: AddressComponent) => void;
}

export function AddressCompletionModal({
  isOpen,
  onClose,
  missingComponents,
  initialComponents,
  onComplete,
}: AddressCompletionModalProps) {
  const [components, setComponents] =
    useState<AddressComponent>(initialComponents);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onComplete(components);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Complete Address Information</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          {missingComponents.includes("city") && (
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>

              <Input
                id="city"
                value={components.city || ""}
                onChange={(e) =>
                  setComponents({ ...components, city: e.target.value })
                }
                required
              />
            </div>
          )}

          {missingComponents.includes("state") && (
            <div className="space-y-2">
              <Label htmlFor="state">State/Province/Region</Label>

              <Input
                id="state"
                value={components.state || ""}
                onChange={(e) =>
                  setComponents({ ...components, state: e.target.value })
                }
                required
              />
            </div>
          )}

          {missingComponents.includes("postalCode") && (
            <div className="space-y-2">
              <Label htmlFor="postalCode">Postal Code</Label>

              <Input
                id="postalCode"
                value={components.postalCode || ""}
                onChange={(e) =>
                  setComponents({ ...components, postalCode: e.target.value })
                }
                required
              />
            </div>
          )}

          {missingComponents.includes("country") && (
            <div className="space-y-2">
              <Label htmlFor="country">Country</Label>

              <Input
                id="country"
                value={components.country || ""}
                onChange={(e) =>
                  setComponents({ ...components, country: e.target.value })
                }
                required
              />
            </div>
          )}

          <Button type="submit" className="w-full">
            Complete Address
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
