import { useState } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Home from "./page/Home"
import Navbar from './components/common/Navbar'
import Signup from './page/Signup'
import Login from './page/Login'
import ForgotPassword from './page/ForgotPassword'
import UpdatePassword from './page/UpdatePassword'
import VerifyEmail from './page/VerifyEmail'
import About from './page/About'
import Contact from './page/Contect'
import Dashboard from "./page/Dashboard"
import Error from './page/Error'
import PrivateRoute from './components/core/Auth/PrivateRoute'
import MyProfile from './components/core/Dashboard/MyProfile'
import EnrolledCourse from './components/core/Dashboard/EnrolledCourse'
import Cart from './components/core/Dashboard/Cart'
import { ACCOUNT_TYPE } from './utils/constants'
import { useSelector } from 'react-redux'
import Settings from './components/core/Dashboard/Settings'
import AddCourse from './components/core/Dashboard/AddCourse/Index'
import MyCourses from "./components/core/Dashboard/MyCourses"
import EditCourse from './components/core/Dashboard/Edit Course/Index'
import { Catalog } from './page/Catalog'
import CourseDetails from './page/CourseDetails'
import ViewCourse from './page/ViewCourse'
import VideoDetails from './components/core/ViewCourse/VideoDetails'
import Insturctor from "./components/core/Dashboard/InstructorDashboad/Insturctor"


function App() {
  const { user } = useSelector((state) => state.profile)

  return (
    <div className='w-screen min-h-screen bg-[#000814] flex flex-col font-Inter'>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#1e293b',
            color: '#f1f5f9',
            border: '1px solid #334155',
          },
          success: { iconTheme: { primary: '#22c55e' } },
          error: { iconTheme: { primary: '#ef4444' } },
        }}
      />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="catalog/:catalogName" element={<Catalog />} />
        <Route path="course/:courseId" element={<CourseDetails />} />
        <Route path="signup" element={<Signup />} />

        <Route path="login" element={<Login />} />

        <Route path="forgot-password" element={<ForgotPassword />} />

        <Route path="update-password/:token" element={<UpdatePassword />} />

        <Route path="/verify-email" element={<VerifyEmail />} />

        <Route path="/about" element={<About />} />

        <Route path="/contact" element={<Contact />} />

        {/* Dashboard with nested routes (protected) */}
        <Route path="/dashboard" element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }>
          <Route index element={
            <Navigate to={
              user?.accountType === ACCOUNT_TYPE.INSTRUCTOR
                ? "/dashboard/instructor"
                : user?.accountType === ACCOUNT_TYPE.STUDENT
                  ? "/dashboard/enrolled-courses"
                  : "/dashboard/my-profile"
            } replace />
          } />
          <Route path="my-profile" element={<MyProfile />} />
          <Route path="settings" element={<Settings />} />

          {user?.accountType === ACCOUNT_TYPE.STUDENT && (
            <>
              <Route path="cart" element={<Cart />} />
              <Route path="enrolled-courses" element={<EnrolledCourse />} />
            </>
          )}

          {user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
            <>
              <Route path="add-course" element={<AddCourse />} />
              <Route path="my-courses" element={<MyCourses />} />
              <Route path="instructor" element={<Insturctor />} />
            </>
          )}

          {/* Edit course route always registered so URL matches; EditCourse handles auth */}
          <Route path="edit-course/:courseId" element={<EditCourse />} />

          <Route path="*" element={<Error />} />

        </Route>


        <Route element={
          <PrivateRoute>
            <ViewCourse />
          </PrivateRoute>
        }>
          {user?.accountType === ACCOUNT_TYPE.STUDENT && (
            <>
              <Route
                path="view-course/:courseId/section/:sectionId/sub-section/:subSectionId"
                element={<VideoDetails />}
              />
            </>
          )}
        </Route>
      </Routes>
    </div>
  )
}

export default App
