import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import IconBtn from "../../common/IconBtn"
import { AiOutlineCamera } from "react-icons/ai"

const MyProfile = () => {

    const { user } = useSelector((state) => state.profile)
    const navigate = useNavigate();
    const initials = `${user?.firstName?.[0] ?? ""}${user?.lastName?.[0] ?? ""}`.toUpperCase();

    if (!user) return <div className="text-gray-300 p-6">No profile data found.</div>

    return (
        <div className="bg-gray-900 rounded-lg p-6 text-gray-100 gap-8 ">
            <h1 className="text-2xl font-semibold mb-6">My Profile</h1>

            <div className="grid gap-6 md:grid-cols-3 sm:grid-cols-1 my-5 mx-5">
                {/* Avatar / Quick info */}
                <div className="md:col-span-1 bg-gray-800 rounded-lg p-4 flex flex-col items-center text-center">
                    <div className="relative">
                        {user?.image ? (
                            <img src={user.image} alt={`profile-${user?.firstName}`} className="h-28 w-28 rounded-full object-cover" />
                        ) : (
                            <div className="h-28 w-28 rounded-full bg-yellow-400 text-black flex items-center justify-center font-bold text-2xl">{initials || "U"}</div>
                        )}

                        <button onClick={() => navigate('/dashboard/settings')} title="Change photo" className="absolute right-0 bottom-0 -translate-y-2 translate-x-2 rounded-full bg-gray-700 p-2 text-gray-200 hover:bg-gray-600">
                            <AiOutlineCamera />
                        </button>
                    </div>

                    <div className="mt-4">
                        <p className="text-lg font-semibold">{user?.firstName} {user?.lastName}</p>
                        <p className="text-sm text-gray-400">{user?.email}</p>
                    </div>

                    <IconBtn text="Edit Profile" onClick={() => navigate('/dashboard/settings')} customClasses="mt-4 w-full" />
                </div>

                {/* About & Personal Details */}
                <div className="md:col-span-2 space-y-6 ">
                    <section className="bg-gray-800 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                            <h2 className="text-lg font-medium">About</h2>
                            <IconBtn text="Edit" onClick={() => navigate('/dashboard/settings')} outline={true} />
                        </div>
                        <p className="text-sm text-gray-300">{user?.additionalDetails?.about ?? 'Write something about yourself.'}</p>
                    </section>

                    <section className="bg-gray-800 rounded-lg p-4 py-10 px-5">
                        <div className="flex items-center justify-between mb-3">
                            <h2 className="text-lg font-medium">Personal Details</h2>
                            <IconBtn text="Edit" onClick={() => navigate('/dashboard/settings')} outline={true} />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <div>
                                <p className="text-xs text-gray-400">First Name</p>
                                <p className="text-gray-100">{user?.firstName ?? '—'}</p>
                            </div>

                            <div>
                                <p className="text-xs text-gray-400">Last Name</p>
                                <p className="text-gray-100">{user?.lastName ?? '—'}</p>
                            </div>

                            <div>
                                <p className="text-xs text-gray-400">Email</p>
                                <p className="text-gray-100">{user?.email ?? '—'}</p>
                            </div>

                            <div>
                                <p className="text-xs text-gray-400">Phone</p>
                                <p className="text-gray-100">{user?.additionalDetails?.contactNumber ?? 'Add Phone No'}</p>
                            </div>

                            <div>
                                <p className="text-xs text-gray-400">Gender</p>
                                <p className="text-gray-100">{user?.additionalDetails?.gender ?? 'Add Gender'}</p>
                            </div>

                            <div>
                                <p className="text-xs text-gray-400">Date of Birth</p>
                                <p className="text-gray-100">{user?.additionalDetails?.dob ?? 'Add DoB'}</p>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    )
}

export default MyProfile