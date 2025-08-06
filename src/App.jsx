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

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
      </Route>

      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<DashboardHome />} />
        <Route path="quiz-builder" element={<QuizBuilder />} />
      </Route>

      <Route path="/all-courses" element={<AllCourses />} />

      <Route path="/course" element={<CourseLayout />}>
        <Route path=":coursePage" element={<CoursePage />}>
          <Route path=":lessonSlug" element={<Lesson />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
