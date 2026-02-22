import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import RenderSteps from "../AddCourse/RenderSteps"
import { setEditCourse, setCourse, resetCourseState } from "../../../../slices/courseSlice"
import { getFullCourseDetails } from "../../../../services/operations/courseDetailsAPI"

export default function EditCourse() {
    const dispatch = useDispatch()
    const { token } = useSelector((state) => state.auth)
    const { courseId } = useParams()
    const { course } = useSelector((state) => state.course)
    const [loading, setLoading] = useState(true)
    const [fetchDone, setFetchDone] = useState(false)

    useEffect(() => {
        if (!courseId || !token) {
            setLoading(false)
            setFetchDone(true)
            return
        }
        let cancelled = false
        setLoading(true)
        setFetchDone(false)
        dispatch(resetCourseState())

        const populateCourseDetails = async () => {
            try {
                const result = await getFullCourseDetails(courseId, token)
                if (cancelled) return
                if (result) {
                    dispatch(setEditCourse(true))
                    dispatch(setCourse(result))
                }
            } catch (error) {
                if (!cancelled) console.error("Failed to fetch course details:", error)
            } finally {
                if (!cancelled) {
                    setLoading(false)
                    setFetchDone(true)
                }
            }
        }
        populateCourseDetails()
        return () => { cancelled = true }
    }, [courseId, token, dispatch])

    if (loading) {
        return (
            <div className="text-white flex items-center justify-center min-h-[200px]">
                <p>Loading course...</p>
            </div>
        )
    }

    if (fetchDone && !course) {
        return (
            <div className="text-white">
                <h1>Edit Course</h1>
                <p className="text-red-400">Course not found or you don&apos;t have access.</p>
            </div>
        )
    }

    return (
        <div className="text-white">
            <h1 className="text-2xl font-semibold mb-6">Edit Course</h1>
            <RenderSteps />
        </div>
    )
}