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
import Posts from "./pages/Posts";
import CommunityLayout from "./layout/CommunityLayout";
import PostDetail from "./pages/PostDetail";
import QuizAttempts from "./pages/Dashboard/QuizAttempts";
import BlogsPage from "./pages/BlogsPage";
import CreateBlogs from "./pages/Dashboard/CreateBlogs";
import NotFound from "./pages/NotFound";
import SingleBlog from "./components/Blogs/SingleBlog";
import Checkout from "./pages/Checkout";
import Contact from "./pages/Contact";
import MyQuizAttempts from "./pages/Dashboard/MyQuizAttempts";
import MyQAs from "./pages/Dashboard/MyQas";
import MyProfile from "./pages/Dashboard/Profile";
import CoursesProgress from "./pages/Dashboard/CoursesProgress";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="blogs" element={<BlogsPage />} />
          <Route path="contact" element={<Contact />} />
          <Route path="/:slug" element={<SingleBlog />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
           <Route path="/checkout" element={<Checkout />} />
        </Route>

         <Route path="/not-found" element={<NotFound />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRoles={["superadmin", "admin", "student"]}>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardHome />} />
          <Route path="quiz-builder" element={<QuizBuilder />} />
          <Route path="create-course" element={<CreateCourse />} />
          <Route path="create-topics" element={<CreateTopics />} />
          <Route path="create-lessons" element={<CreateLessons />} />
          <Route path="profile" element={<MyProfile />} />
          <Route path="create-blogs" element={<CreateBlogs />} />
          <Route path="quiz-attempts" element={<QuizAttempts />} />
          <Route path="my-quiz-attempts" element={<MyQuizAttempts />} />
          <Route path="my-qas" element={<MyQAs />} />
          <Route path="community" element={<Posts />} />
          <Route path="courses-progress" element={<CoursesProgress />} />
          <Route path="/dashboard/community/:id" element={<PostDetail />} />
        </Route>

        {/* <Route element={<CommunityLayout />}>
          <Route path="/community" element={<Posts />} />
          <Route path="/community/:id" element={<PostDetail />} />
        </Route> */}

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
