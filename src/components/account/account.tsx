import AccountContent from "./account-content"
import AccountSidebar from "./account-sidebar"

export const Account: React.FC = () => {
    return <div className="flex pb-[140px] gap-4">
        <AccountSidebar/>
        <AccountContent/>
    </div>
}