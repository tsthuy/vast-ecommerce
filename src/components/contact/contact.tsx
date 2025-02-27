import ContactForm from "./contact-form"
import { ContactSidebar } from "./contact-sidebar"

export const Contact = () => {
    return (
        <div className="pt-[80px] pb-[140px] flex-col md:flex-row flex gap-[60px]">
        <ContactSidebar />
        <ContactForm />
        </div>
    )   
}