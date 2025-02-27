import Link from "next/link"

export default function AccountSidebar() {
  return (
    <div className="w-1/3 lg:w-1/4">
      <div className="">
      <h2 className="font-medium text-16">Manage My Account</h2>

      <div className="space-y-2 pt-4 pb-6 pl-2 md:pl-[35px]">
        <Link href="/account/profile" className="block text-16 font-normal text-red-500 hover:underline">
          My Profile
        </Link>
        <Link href="/account/address-book" className="block text-16 font-normal text-gray-500 hover:text-gray-700 hover:underline">
          Address Book
        </Link>
        <Link href="/account/payment-options" className="block text-16 font-normal text-gray-500 hover:text-gray-700 hover:underline">
          My Payment Options
        </Link>
      </div>
    </div>

      <div className="">
        <h3 className="font-medium text-16">My Orders</h3>
        <div className="space-y-2 pt-4 pb-4 pl-2 md:pl-[35px]">
          <Link href="/account/returns" className="block text-16 font-normal text-gray-500 hover:text-gray-700 hover:underline">
            My Returns
          </Link>
          <Link href="/account/cancellations" className="block text-16 font-normal text-gray-500 hover:text-gray-700 hover:underline">
            My Cancellations
          </Link>
        </div>
      </div>

      <div>
        <h3 className="font-medium text-16 mb-2">My Wishlist</h3>
      </div>
    </div>
  )
}
