import { useEffect, useState } from "react";
import reading from "../../assets/Courses/reading-course.jpeg";
import { NavLink, Outlet, useParams, useOutletContext } from "react-router-dom";
import { FaAngleLeft, FaChevronDown } from "react-icons/fa";
import api from "../../services/api";
import { useAuth } from "../../context/AuthContext";

export const CoursePage = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const { courseSlug, lessonSlug } = useParams();
  const [singleLesson, setSingleLesson] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loggedUser, setLoggedUser] = useState(null)

  const completeCourseData = useOutletContext();
  const { user } = useAuth();

  // Track completed lessons
  const [completedLessons, setCompletedLessons] = useState(new Set());

  // Calculate total lessons in course
  const totalLessons =
    completeCourseData?.topics?.reduce(
      (acc, topic) => acc + topic.lessons.length,
      0
    ) || 0;

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

    useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get(`/users/${user.id}`);
        setLoggedUser(res.data)
        console.log(res.data);
        
      } catch (err) {
        console.error("Failed to fetch progress", err);
      }
    };
    fetchUser();
  }, []);

  // ✅ Fetch user’s progress from backend
  useEffect(() => {
    const fetchProgress = async () => {
      if (!completeCourseData?._id) return;
      try {
        const res = await api.get(`/progress/course/${completeCourseData._id}`);
        setCompletedLessons(new Set(res.data.completedLessons || []));
      } catch (err) {
        console.error("Failed to fetch progress", err);
      }
    };
    fetchProgress();
  }, [completeCourseData]);

  const handleCheckboxChange = async (lessonId) => {
    const isCompleted = completedLessons.has(lessonId);
    try {
      await api.put(`/progress/lesson/${lessonId}`, {
        completed: !isCompleted,
      });

      setCompletedLessons((prev) => {
        const updated = new Set(prev);
        if (isCompleted) {
          updated.delete(lessonId);
        } else {
          updated.add(lessonId);
        }
        return updated;
      });
    } catch (err) {
      console.error("Failed to toggle lesson progress:", err);
    }
  };
  

  if (loggedUser && !loggedUser.hasPaid) {
    return (
      <div className="w-full max-w-2xl mx-auto mt-20 px-6">
        <div className="bg-white border shadow-md rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-3">
            Access Restricted
          </h2>
          <p className="text-gray-700 mb-6">
            You need to purchase a <span className="font-semibold">Bundle</span>{" "}
            to view this course.
          </p>
          <NavLink
            to="/"
            className="inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-md shadow hover:bg-blue-700 transition"
          >
            View Bundles
          </NavLink>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="text-center mt-10 text-gray-600 font-semibold">
        Loading...
      </div>
    );
  }

  if (!loading && lessonSlug) {
    return (
      <div className="w-full max-w-5xl mx-auto mt-10">
        <Outlet />
      </div>
    );
  }

  if (!lessonSlug) {
    return (
      <div className="w-full max-w-3xl mx-auto flex flex-col items-center mt-12 px-4">
        {/* Back button */}
        <NavLink
          to={`/dashboard`}
          className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg shadow-sm transition"
        >
          <FaAngleLeft className="text-sm" /> Back to Courses
        </NavLink>

        {/* Title */}
        <h2 className="text-3xl font-bold capitalize mt-6 text-gray-800">
          {courseSlug} Course
        </h2>

        {/* Cover Image */}
        <img
          src={reading}
          alt="Course"
          className="rounded-xl shadow-md mt-6 mb-10 w-full object-cover max-h-80"
        />

        {/* Topics with Progress */}
        <div className="w-full">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-xl font-semibold text-gray-800">
              Course Topics
            </h3>
            <span className="text-sm text-gray-600 font-medium">
              {completedLessons.size}/{totalLessons} completed
            </span>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-gray-200 rounded-full h-3 mb-5 overflow-hidden">
            <div
              className="bg-blue-500 h-3 rounded-full transition-all"
              style={{
                width: `${
                  totalLessons > 0
                    ? (completedLessons.size / totalLessons) * 100
                    : 0
                }%`,
              }}
            ></div>
          </div>

          {loading ? (
            <div>Loading...</div>
          ) : (
            <div className="space-y-4">
              {completeCourseData.length !== 0 &&
                completeCourseData.topics.map((topic, index) => (
                  <div
                    key={index}
                    className="border rounded-lg shadow-sm overflow-hidden"
                  >
                    {/* Accordion Header */}
                    <button
                      className="w-full flex justify-between items-center px-5 py-4 bg-gray-50 hover:bg-gray-100 text-gray-700 font-medium transition"
                      onClick={() => toggleAccordion(index)}
                    >
                      {topic.title}
                      <FaChevronDown
                        className={`transition-transform duration-300 ${
                          openIndex === index ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {/* Lessons List */}
                    {openIndex === index && (
                      <div className="px-6 py-4 bg-white space-y-3 animate-fadeIn">
                        {topic.lessons.map((lesson) => {
                          const slugify = (text) =>
                            text
                              .toString()
                              .toLowerCase()
                              .trim()
                              .replace(/\s+/g, "-")
                              .replace(/[^\w\-]+/g, "")
                              .replace(/\-\-+/g, "-");

                          return (
                            <div
                              key={lesson._id}
                              className="flex items-center gap-3 px-3 py-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition"
                            >
                              <input
                                type="checkbox"
                                checked={completedLessons.has(lesson._id)}
                                onChange={() =>
                                  handleCheckboxChange(lesson._id)
                                }
                                className="w-4 h-4 text-blue-500 border-gray-300 rounded focus:ring-blue-400"
                              />
                              <NavLink
                                onClick={() => setSingleLesson(lesson)}
                                to={`${slugify(lesson.title)}`}
                                className="flex-1"
                              >
                                {lesson.title}
                              </NavLink>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    );
  }
};
