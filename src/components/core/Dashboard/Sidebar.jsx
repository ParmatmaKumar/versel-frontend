import { useDispatch, useSelector } from "react-redux"
import { sidebarLinks } from "../../../data/dashboard-links"
import { logout } from "../../../services/operations/authAPI"
import SidebarLink from "../Dashboard/SidebarLink"
import ConfirmationModal from "../../common/ConfirmationModal"
import { VscSignOut } from "react-icons/vsc"
import { useNavigate } from "react-router-dom"
import { useState } from "react"


const Sidebar = () => {
    const { user, loading: profileLoading } = useSelector((state) => state.profile);
    const { loading: authLoading } = useSelector((state) => state.auth)

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [confirmationModal, setConfirmationModal] = useState(null);


    if (profileLoading || authLoading) {
        return (
            <div className="loader mt-10">
                Loading....
            </div>
        )
    }

    return (
        <div className="flex min-w-[222px] flex-col border-r border-r-gray-600 h-[calc(100vh-3.5rem)] bg-gray-900 text-gray-500">
            <div className="flex flex-col">
                {
                    sidebarLinks.map((link, index) => {
                        if (link.type && user?.accountType !== link.type) return null;
                        return (
                            <SidebarLink key={link.id} link={link} iconName={link.icon} />
                        )
                    })
                }
            </div>

            <div className="mx-auto mt-6 mb-2 h-px w-10/12 bg-gray-400" />

            <div className="flex flex-col">
                <SidebarLink
                    link={{ name: "Setting", path: "/dashboard/settings" }}
                    iconName="VscSettingsGear"
                />

                <button
                    onClick={() =>
                        setConfirmationModal(
                            {
                                text1: "Are You Sure",
                                text2: " You will be logged out of your Account",
                                btn1Text: "Logout",
                                btn2Text: "Cancel",
                                btn1Handler: () => dispatch(logout(navigate)),
                                btn2Handler: () => setConfirmationModal(null)
                            }
                        )
                    }
                    className="px-8 py-2 text-start text-sm font-medium text-gray-400 transition-colors hover:bg-white/5 hover:text-gray-100"
                >
                    <div className="flex items-center gap-2">
                        <VscSignOut className="text-lg" />
                        Logout
                    </div>
                </button>
            </div>

            {
                confirmationModal && <ConfirmationModal modalData={confirmationModal} />
            }
        </div>
    )
}
export default Sidebar
