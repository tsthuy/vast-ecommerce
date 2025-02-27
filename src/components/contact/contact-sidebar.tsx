import { Mail,Phone } from "lucide-react"

export const ContactSidebar = () => {
return (
    <div className="py-10 px-[35px] flex md:flex-col flex-row w-full md:w-1/3 shadow justify-around md:justify-normal gap-8">
        <div className="flex flex-col space-y-6 pb-8 md:border-b-2 border-black">
            <div className="flex gap-4 items-center">
                <button className="border bg-button-2 p-4 rounded-full text-white">
                    <Phone size={24} />
                </button>
                <h3 className="text-16 font-medium">Call to Us</h3>
            </div>
            <p className="text-14">We are available 24/7, 7 days a week.</p>
            <p className="text-14">Phone: +8801611112222</p>
        </div>

        <div className="space-y-6">
         <div className="flex gap-4 items-center">
                <button className="border bg-button-2 p-4 rounded-full text-white">
                    <Mail size={24} />
                </button>
                <h3 className="text-16 font-medium">Write to Us</h3>
        </div>
            <p className="text-14">Fill out our form and we will contact you within 24 hours.</p>
            <p className="text-14">Emails: customer@exclusive.com</p>            
            <p className="text-14">Emails: support@exclusive.com</p>

        </div>
    </div>
)
}