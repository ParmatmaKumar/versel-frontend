import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import IconBtn from '../../common/IconBtn'
import CourseTable from "./InstructorCourses/CourseTable"
import { fetchInstructorCourses } from '../../../services/operations/courseDetailsAPI'

const MyCourses = () => {

    const { token } = useSelector((state) => state.auth)
    const navigate = useNavigate()

    const [courses, setCourses] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                setLoading(true)
                const result = await fetchInstructorCourses(token)

                if (result) {
                    setCourses(result)
                }
            } catch (error) {
                console.error("Failed to fetch courses:", error)
                setError("Failed to load courses")
            } finally {
                setLoading(false)
            }
        }

        if (token) {
            fetchCourses()
        }
    }, [token])

    return (
        <div className="text-white mx-10">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-semibold">My Courses</h1>
                <IconBtn
                    text="Add Course"
                    onClick={() => navigate("/dashboard/add-course")}
                />
            </div>

            {loading && <p>Loading courses...</p>}
            {error && <p className="text-red-500">{error}</p>}
            {!loading && courses?.length === 0 && (
                <p>No courses found. Start by adding one!</p>
            )}

            {!loading && courses?.length > 0 && (
                <CourseTable courses={courses} setCourses={setCourses} />
            )}
        </div>
    )
}

export default MyCourses
