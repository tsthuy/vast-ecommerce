import { useAuthStore } from "~/stores/auth.store"

import Breadcrumbs from "../breadcrumbs"

export const AccountBreadcrumb: React.FC = () => {
    const {user} = useAuthStore();
    console.log(user);
    return (
        <div className="flex justify-between items-center pb-[80px]">
        <Breadcrumbs/>
        <div className="text-14 font-normal pt-[80px]">
            <span>Welcome!</span> <span className="text-button-2">{user?.displayName}</span>
        </div>
        
        </div>
    )
}