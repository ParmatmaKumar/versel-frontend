import React, { useEffect, useState } from 'react'
import { getInstructorData } from '../../../../services/operations/profileAPI';
import { fetchInstructorCourses } from '../../../../services/operations/courseDetailsAPI';
import { Link } from 'react-router-dom';
import InstructorChart from './InstructorChart'
import { useSelector } from 'react-redux';

const Insturctor = () => {

    const [loading, setLoading] = useState(false);
    const [instructorData, setInstructorData] = useState(null);
    const [courses, setCourses] = useState([]);
    const {user} = useSelector((state)=>state.profile)
    const {token} = useSelector((state)=>state.auth)



    useEffect(() => {
        const getCourseDataWithStars = async () => {
            setLoading(true);

            const instructorApiData = await getInstructorData(token);

            const result = await fetchInstructorCourses(token);

            console.log(instructorApiData);

            if (instructorApiData.length)
                setInstructorData(instructorApiData);

            if (result) {
                setCourses(result);
            }
            setLoading(false);
        }
        getCourseDataWithStars();
    }, [token])

    const totalAmount = instructorData?.reduce((acc, curr) => acc + curr.totalAmountGenerated, 0);
    const totalStudents = instructorData?.reduce((acc, curr) => acc + curr.totalStudentsEnrolled, 0);



    return (
        <div className="space-y-8 text-gray-100">
            {/* Header */}
            <div className="rounded-lg bg-gray-900 p-6">
                <h1 className="text-2xl font-semibold text-white">
                    Hi, {user?.firstName || "Instructor"}!
                </h1>
                <p className="mt-1 text-gray-400">Let's start something great today.</p>
            </div>

            {
                loading ? (
                <div className="flex min-h-[200px] items-center justify-center">
                    <div className="h-10 w-10 animate-spin rounded-full border-2 border-yellow-400 border-t-transparent" />
                </div>
            ) :
                    courses.length > 0 ? (
                        <div className="space-y-8">
                            {/* Chart + Stats Row */}
                            <div className="grid gap-6 lg:grid-cols-2">
                                <InstructorChart courses={instructorData || []} />
                                <div className="flex flex-col gap-4">
                                    <p className="text-lg font-semibold text-white">Statistics</p>
                                    <div className="flex flex-col gap-3">
                                        <div className="rounded-lg bg-gray-800 p-4 transition hover:bg-gray-700/80">
                                            <p className="text-sm text-gray-400">Total Courses</p>
                                            <p className="mt-1 text-2xl font-bold text-yellow-400">{courses.length}</p>
                                        </div>
                                        <div className="rounded-lg bg-gray-800 p-4 transition hover:bg-gray-700/80">
                                            <p className="text-sm text-gray-400">Total Students</p>
                                            <p className="mt-1 text-2xl font-bold text-yellow-400">{totalStudents ?? 0}</p>
                                        </div>
                                        <div className="rounded-lg bg-gray-800 p-4 transition hover:bg-gray-700/80">
                                            <p className="text-sm text-gray-400">Total Income</p>
                                            <p className="mt-1 text-2xl font-bold text-yellow-400">Rs. {totalAmount ?? 0}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Your Courses */}
                            <div className="rounded-lg bg-gray-900 p-6">
                                <div className="mb-4 flex items-center justify-between">
                                    <p className="text-lg font-semibold text-white">Your Courses</p>
                                    <Link
                                        to="/dashboard/my-courses"
                                        className="text-sm font-medium text-yellow-400 transition hover:text-yellow-300"
                                    >
                                        View all →
                                    </Link>
                                </div>

                                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                    {courses.slice(0, 3).map((course) => (
                                        <Link
                                            key={course._id || course.id || course.courseName}
                                            to={`/dashboard/edit-course/${course._id || course.id}`}
                                            className="group overflow-hidden rounded-lg bg-gray-800 transition hover:bg-gray-700/80"
                                        >
                                            <div className="aspect-video overflow-hidden">
                                                <img
                                                    src={course.thumbnail}
                                                    alt={course.courseName}
                                                    className="h-full w-full object-cover transition group-hover:scale-105"
                                                />
                                            </div>
                                            <div className="p-3">
                                                <p className="line-clamp-2 font-medium text-white group-hover:text-yellow-100">
                                                    {course.courseName}
                                                </p>
                                                <div className="mt-2 flex items-center gap-2 text-sm text-gray-400">
                                                    <span>{course.studentsEnrolled?.length ?? 0} students</span>
                                                    <span>·</span>
                                                    <span className="font-medium text-yellow-400">Rs.{course.price}</span>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-gray-600 bg-gray-900/50 py-16 text-center">
                            <p className="mb-4 text-lg text-gray-400">
                                You have not created any courses yet
                            </p>
                            <Link
                                to="/dashboard/add-course"
                                className="rounded-lg bg-yellow-400 px-6 py-3 font-semibold text-black transition hover:bg-yellow-300"
                            >
                                Create a course
                            </Link>
                        </div>
                    )
            }

        </div>
    )
}

export default Insturctor