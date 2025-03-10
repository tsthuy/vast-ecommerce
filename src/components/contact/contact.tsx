import { memo } from "react";

import ContactForm from "./contact-form";
import { ContactSidebar } from "./contact-sidebar";

export const Contact = memo(() => {
  return (
    <div className="flex flex-col gap-[60px] pb-[140px] pt-[80px] md:flex-row">
      <ContactSidebar />

      <ContactForm />
    </div>
  );
});
Contact.displayName = "Contact";
