import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getUserEnrolledCourses } from "../../../services/operations/profileAPI";
import { useNavigate } from "react-router-dom";

const ProgressBar = ({ completed }) => {
  const safeCompleted = Number.isFinite(completed) ? completed : 0;
  const clamped = Math.min(Math.max(safeCompleted, 0), 100);

  return (
    <div className="h-2 w-40 rounded-full bg-gray-700 overflow-hidden">
      <div
        className="h-full bg-yellow-400 transition-all duration-500 ease-in-out"
        style={{ width: `${clamped}%` }}
      />
    </div>
  );
};

const EnrolledCourse = () => {
  const { token } = useSelector((state) => state.auth);
  const [enrolledCourses, setEnrolledCourses] = useState(null);
  const navigate = useNavigate();

  const getenrolledCourses = async () => {
    try {
      const response = await getUserEnrolledCourses(token);
      setEnrolledCourses(response);
    } catch (error) {
      console.log("Unable to fetch enrolled courses");
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    getenrolledCourses();
  }, [token, navigate]);

  return (
    <div className="text-white bg-gray-900 min-h-screen px-6 py-8">
      <h1 className="text-3xl font-semibold mb-8">Enrolled Courses</h1>

      {!enrolledCourses ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-yellow-400"></div>
        </div>
      ) : !enrolledCourses.length ? (
        <div className="bg-gray-800 p-6 rounded-lg text-center border border-gray-700">
          <p className="text-gray-400">
            You have not enrolled in any courses yet.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          
          {/* Header */}
          <div className="hidden md:grid grid-cols-12 text-gray-400 text-sm border-b border-gray-700 pb-3">
            <p className="col-span-6">Course</p>
            <p className="col-span-3 text-center">Duration</p>
            <p className="col-span-3 text-center">Progress</p>
          </div>

          {/* Course Cards */}
          {enrolledCourses.map((course, index) => (
            <div
              key={course._id || index}
              className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center bg-gray-800 p-4 rounded-lg hover:bg-gray-700 transition"
            >
              {/* Course Info */}
              <div className="col-span-6 flex gap-4 items-center"
              onClick={()=>{
                navigate(`/view-course/${course?._id}/section/${course.courseContent?.[0]?._id}/sub-section/${course.courseContent?.[0]?.subSection?.[0]?._id}`)
              }}
              
              >
                <img
                  src={course.thumbnail}
                  alt={course.courseName}
                  className="w-24 h-16 object-cover rounded-md"
                />
                <div>
                  <h2 className="font-semibold text-lg text-white">
                    {course.courseName}
                  </h2>
                  <p className="text-sm text-gray-400 line-clamp-2">
                    {course.courseDescription}
                  </p>
                </div>
              </div>

              {/* Duration */}
              <div className="col-span-3 text-center text-gray-300">
                {course?.totalDuration ? course.totalDuration : "N/A"}
              </div>

              {/* Progress */}
              <div className="col-span-3 flex flex-col items-center gap-2">
                <p className="text-sm font-medium text-gray-200">
                  {course.progressPercentage || 0}%
                </p>
                <ProgressBar
                  completed={course.progressPercentage || 0}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EnrolledCourse;
