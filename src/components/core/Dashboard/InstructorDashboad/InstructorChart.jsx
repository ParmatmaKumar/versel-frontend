import { useState } from "react"
import { Chart, registerables } from "chart.js"
import { Pie } from "react-chartjs-2"

Chart.register(...registerables)

// Palette that matches the app's dark theme + yellow accents
const CHART_COLORS = [
  "rgb(250, 204, 21)",   // yellow-400
  "rgb(253, 224, 71)",   // yellow-300
  "rgb(234, 179, 8)",    // yellow-500
  "rgb(245, 158, 11)",   // amber-500
  "rgb(217, 119, 6)",    // amber-600
  "rgb(161, 98, 7)",     // amber-700
  "rgb(251, 191, 36)",   // amber-400
  "rgb(252, 211, 77)",   // yellow-200
]

const getChartColors = (numColors) => {
  return Array.from({ length: numColors }, (_, i) => CHART_COLORS[i % CHART_COLORS.length])
}

export default function InstructorChart({ courses = [] }) {
  const [currChart, setCurrChart] = useState("students")
  const safeCourses = courses ?? []

  const chartDataStudents = {
    labels: safeCourses.map((course) => course.courseName),
    datasets: [
      {
        data: safeCourses.map((course) => course.totalStudentsEnrolled ?? 0),
        backgroundColor: getChartColors(safeCourses.length),
        borderColor: "rgb(31, 41, 55)",
        borderWidth: 2,
      },
    ],
  }

  const chartIncomeData = {
    labels: safeCourses.map((course) => course.courseName),
    datasets: [
      {
        data: safeCourses.map((course) => course.totalAmountGenerated ?? 0),
        backgroundColor: getChartColors(safeCourses.length),
        borderColor: "rgb(31, 41, 55)",
        borderWidth: 2,
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "rgb(209, 213, 219)",
          padding: 16,
          usePointStyle: true,
        },
      },
      tooltip: {
        backgroundColor: "rgb(31, 41, 55)",
        titleColor: "rgb(250, 204, 21)",
        bodyColor: "rgb(209, 213, 219)",
      },
    },
  }

  if (safeCourses.length === 0) {
    return (
      <div className="flex min-h-80 flex-col gap-y-4 rounded-lg bg-gray-800 p-6">
        <p className="text-lg font-bold text-white">Visualize</p>
        <p className="text-gray-400">No chart data available yet</p>
      </div>
    )
  }

  return (
    <div className="flex min-h-80 flex-col gap-y-4 rounded-lg bg-gray-800 p-6">
      <p className="text-lg font-bold text-white">Visualize</p>
      <div className="flex gap-2 font-semibold">
        <button
          onClick={() => setCurrChart("students")}
          className={`rounded-lg px-4 py-2 transition-all duration-200 ${
            currChart === "students"
              ? "bg-yellow-400 text-black"
              : "bg-gray-700 text-yellow-400 hover:bg-gray-600"
          }`}
        >
          Students
        </button>
        <button
          onClick={() => setCurrChart("income")}
          className={`rounded-lg px-4 py-2 transition-all duration-200 ${
            currChart === "income"
              ? "bg-yellow-400 text-black"
              : "bg-gray-700 text-yellow-400 hover:bg-gray-600"
          }`}
        >
          Income
        </button>
      </div>
      <div className="relative h-72 w-full sm:h-80">
          {
          courses.totalStudentsEnrolled > 0 ? (
            <div>
              No any Student are Enrolled
            </div>
          ) : (
            <div className="relative h-72 w-full sm:h-80">
              <Pie
                data={currChart === "students" ? chartDataStudents : chartIncomeData}
                options={options}
              />

            </div>
          )
        }
      </div>
    </div>
  )
}