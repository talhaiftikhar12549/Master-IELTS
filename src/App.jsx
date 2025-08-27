import "./App.css";
import { Routes, Route } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import Home from "./pages/HomePage";
import { DashboardLayout } from "./layout/DashboardLayout";
import { DashboardHome } from "./pages/Dashboard/DashboardHome";
import { CoursePage } from "./pages/Courses/CoursePage";
import { CourseLayout } from "./layout/CourseLayout";
import { Lesson } from "./pages/Courses/Lessons/lesson";
import { AllCourses } from "./pages/Courses/AllCourses";
import QuizBuilder from "./pages/Dashboard/QuizBuilder";
import CreateCourse from "./pages/Dashboard/CreateCourse";
import Login from "./pages/auth/Login";
import { AuthProvider } from "./context/AuthContext";
import Register from "./pages/auth/Register";
import CreateTopics from "./pages/Dashboard/CreateTopics";
import CreateLessons from "./pages/Dashboard/CreateLessons";
import ProtectedRoute from "./services/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRoles={["superadmin","admin","student"]}>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardHome />} />
          <Route path="quiz-builder" element={<QuizBuilder />} />
          <Route path="create-course" element={<CreateCourse />} />
          <Route path="create-topics" element={<CreateTopics />} />
          <Route path="create-lessons" element={<CreateLessons />} />
        </Route>



          
        <Route path="/all-courses" element={<AllCourses />} />
        <Route path="/course" element={<CourseLayout />}>
          <Route path=":courseSlug" element={<CoursePage />}>
            <Route path=":lessonSlug" element={<Lesson />} />
          </Route>
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
